import "server-only";

import { getSchedule } from "@/data/schedules";

import type {
  LiveGameStatus,
  LiveGameUpdate,
  LiveScoreResponse,
} from "@/lib/live-scores";
import type { SeasonType } from "@/lib/schedule";

// Settled results come from Sanity (weekly sync); this only needs the games
// in progress, which ESPN's default scoreboard (the current week) covers.
// Date ranges spanning the season answer 400.
const espnScoreboardUrl =
  "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard";
const espnRequestTimeout = 4000;
export const scoreCacheLifetimeMs = 30_000;
const retryDelayMs = 5_000;
const maximumPayloadBytes = 8 * 1024 * 1024;
type ScoreCacheEntry = {
  result?: LiveScoreResponse;
  retryAt: number;
  pending?: Promise<LiveScoreResponse>;
};
// Bounded by configured seasons. Coalesce cold-cache requests in each server
// instance; CDN caching handles visitors across instances and regions.
const scoreCache = new Map<number, ScoreCacheEntry>();

async function readScoreboard(response: Response): Promise<unknown> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error("Missing scoreboard");
  const decoder = new TextDecoder();
  let body = "";
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maximumPayloadBytes) throw new Error("Scoreboard too large");
      body += decoder.decode(value, { stream: true });
    }
    return JSON.parse(body + decoder.decode());
  } finally {
    await reader.cancel();
    reader.releaseLock();
  }
}

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as UnknownRecord)
    : null;
}

function getString(record: UnknownRecord | null, key: string) {
  const value = record?.[key];
  return typeof value === "string" ? value : null;
}

function getNumber(record: UnknownRecord | null, key: string) {
  const value = record?.[key];
  return typeof value === "number" ? value : null;
}

function getBoolean(record: UnknownRecord | null, key: string) {
  const value = record?.[key];
  return typeof value === "boolean" ? value : null;
}

function getArray(record: UnknownRecord | null, key: string) {
  const value = record?.[key];
  return Array.isArray(value) ? value : [];
}

function parseScore(value: unknown) {
  const scoreRecord = asRecord(value);
  const rawScore = scoreRecord?.value ?? value;

  if (typeof rawScore !== "string" && typeof rawScore !== "number") {
    return null;
  }

  const score = Number(rawScore);
  return String(rawScore).trim() !== "" &&
    Number.isInteger(score) &&
    score >= 0 &&
    score <= 200
    ? score
    : null;
}

function normalizeTeamCode(code: string) {
  return code === "WSH" ? "WAS" : code;
}

function normalizeSeasonType(value: number | null): SeasonType | null {
  if (value === 1) {
    return "preseason";
  }

  if (value === 2) {
    return "regular";
  }

  return null;
}

function normalizeWeek(value: number | null) {
  return Number.isInteger(value) && value !== null && value >= 1 && value <= 18
    ? value
    : null;
}

function normalizeSeason(value: number | null) {
  return Number.isInteger(value) &&
    value !== null &&
    value >= 2000 &&
    value <= 2100
    ? value
    : null;
}

function normalizeStatus(
  statusType: UnknownRecord | null,
): LiveGameStatus | null {
  const state = getString(statusType, "state");
  const completed = getBoolean(statusType, "completed");

  if (completed === true && state === "post") {
    return "final";
  }

  if (state === "in" && completed === false) {
    return "live";
  }

  return state === "pre" && completed === false ? "scheduled" : null;
}

function normalizeEvent(value: unknown): LiveGameUpdate | null {
  const event = asRecord(value);
  const competition = asRecord(getArray(event, "competitions")[0]);
  const competitors = getArray(competition, "competitors")
    .map(asRecord)
    .filter((competitor): competitor is UnknownRecord => competitor !== null);
  const vikings = competitors.find(
    (competitor) => getString(asRecord(competitor.team), "id") === "16",
  );
  const opponent = competitors.find((competitor) => competitor !== vikings);
  const opponentCode = getString(asRecord(opponent?.team), "abbreviation");
  const eventId = getString(event, "id");
  const kickoffAt = getString(event, "date");
  const season = normalizeSeason(getNumber(asRecord(event?.season), "year"));
  const seasonType = normalizeSeasonType(
    getNumber(asRecord(event?.season), "type"),
  );
  const statusType = asRecord(asRecord(event?.status)?.type);
  const week = normalizeWeek(getNumber(asRecord(event?.week), "number"));
  const status = normalizeStatus(statusType);
  const timeConfirmed =
    status !== "scheduled" ||
    (getBoolean(competition, "timeValid") === true &&
      getBoolean(asRecord(competition?.status), "isTBDFlex") !== true);
  const vikingsScore =
    status === "scheduled" ? null : parseScore(vikings?.score);
  const opponentScore =
    status === "scheduled" ? null : parseScore(opponent?.score);

  if (
    !vikings ||
    competitors.length !== 2 ||
    !opponent ||
    !opponentCode ||
    !eventId ||
    eventId.length > 64 ||
    !kickoffAt ||
    !Number.isFinite(Date.parse(kickoffAt)) ||
    !season ||
    !seasonType ||
    !week ||
    !status ||
    !/^[A-Z]{2,4}$/.test(opponentCode) ||
    (status !== "scheduled" &&
      (vikingsScore === null || opponentScore === null))
  ) {
    return null;
  }

  return {
    eventId,
    season,
    seasonType,
    status,
    statusDetail: (
      getString(statusType, "shortDetail") ??
      getString(statusType, "detail") ??
      ""
    ).slice(0, 120),
    kickoffAt: timeConfirmed ? kickoffAt : null,
    week,
    opponentCode: normalizeTeamCode(opponentCode),
    vikingsScore,
    opponentScore,
  };
}

async function fetchEspnVikingsScores(
  season: number,
): Promise<LiveScoreResponse> {
  const fetchedAt = new Date().toISOString();

  try {
    // ESPN answers 403 to a browser-like User-Agent.
    const response = await fetch(espnScoreboardUrl, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(espnRequestTimeout),
    });

    if (!response.ok) {
      await response.body?.cancel();
      return { season, games: [], source: "unavailable", fetchedAt };
    }

    const payload = asRecord(await readScoreboard(response));
    if (!Array.isArray(payload?.events) || payload.events.length > 1000) {
      return { season, games: [], source: "unavailable", fetchedAt };
    }
    const games = payload.events
      .map(normalizeEvent)
      .filter(
        (game): game is LiveGameUpdate =>
          game !== null && game.season === season,
      );
    return {
      season,
      games,
      source: games.length ? "espn" : "unavailable",
      fetchedAt,
    };
  } catch {
    return { season, games: [], source: "unavailable", fetchedAt };
  }
}

export async function getEspnVikingsScores(
  season: number,
): Promise<LiveScoreResponse> {
  const unavailable = (): LiveScoreResponse => ({
    season,
    games: [],
    source: "unavailable",
    fetchedAt: new Date().toISOString(),
  });
  if (!(await getSchedule(season))) return unavailable();
  const entry = scoreCache.get(season) ?? { retryAt: 0 };
  scoreCache.set(season, entry);
  if (entry.pending) return entry.pending;
  if (Date.now() < entry.retryAt) return entry.result ?? unavailable();

  entry.pending = fetchEspnVikingsScores(season)
    .then((result) => {
      if (result.source === "espn") {
        const previous = new Map(
          entry.result?.games.map((game) => [game.eventId, game]),
        );
        for (const game of result.games) {
          const known = previous.get(game.eventId);
          if (
            (known?.status === "final" && game.status !== "final") ||
            (known?.status === "live" && game.status === "scheduled")
          )
            continue;
          previous.set(game.eventId, game);
        }
        entry.result = {
          ...result,
          games: [...previous.values()].slice(-1000),
        };
        entry.retryAt = Date.parse(result.fetchedAt) + scoreCacheLifetimeMs;
      } else {
        entry.retryAt = Date.now() + retryDelayMs;
      }
      return entry.result ?? result;
    })
    .finally(() => {
      entry.pending = undefined;
    });
  return entry.pending;
}
