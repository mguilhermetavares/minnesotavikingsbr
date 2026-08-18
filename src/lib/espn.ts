import "server-only";

import type {
  LiveGameStatus,
  LiveGameUpdate,
  LiveScoreResponse,
} from "@/lib/live-scores";
import type { SeasonType } from "@/lib/schedule";

const espnScoreboardUrl =
  "https://cdn.espn.com/core/nfl/scoreboard?xhr=1&limit=50";
const espnCacheSeconds = 60;
const espnRequestTimeout = 4000;

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord | null {
  return typeof value === "object" && value !== null
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
  return Number.isInteger(score) && score >= 0 && score <= 200 ? score : null;
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

function normalizeStatus(statusType: UnknownRecord | null): LiveGameStatus {
  const state = getString(statusType, "state");
  const completed = getBoolean(statusType, "completed");

  if (completed || state === "post") {
    return "final";
  }

  if (state === "in") {
    return "live";
  }

  return "scheduled";
}

function normalizeEvent(value: unknown): LiveGameUpdate | null {
  const event = asRecord(value);
  const competition = asRecord(getArray(event, "competitions")[0]);
  const competitors = getArray(competition, "competitors")
    .map(asRecord)
    .filter((competitor): competitor is UnknownRecord => competitor !== null);
  const vikings = competitors.find(
    (competitor) =>
      getString(asRecord(competitor.team), "abbreviation") === "MIN",
  );
  const opponent = competitors.find((competitor) => competitor !== vikings);
  const opponentCode = getString(asRecord(opponent?.team), "abbreviation");
  const eventId = getString(event, "id");
  const kickoffAt = getString(event, "date");
  const seasonType = normalizeSeasonType(
    getNumber(asRecord(event?.season), "type"),
  );
  const statusType = asRecord(asRecord(event?.status)?.type);
  const week = normalizeWeek(getNumber(asRecord(event?.week), "number"));

  if (
    !vikings ||
    !opponent ||
    !opponentCode ||
    !eventId ||
    !kickoffAt ||
    !seasonType
  ) {
    return null;
  }

  return {
    eventId,
    seasonType,
    status: normalizeStatus(statusType),
    statusDetail:
      getString(statusType, "shortDetail") ??
      getString(statusType, "detail") ??
      "",
    kickoffAt,
    week,
    opponentCode: normalizeTeamCode(opponentCode),
    vikingsScore: parseScore(vikings.score),
    opponentScore: parseScore(opponent.score),
  };
}

export async function getEspnVikingsScores(): Promise<LiveScoreResponse> {
  const fetchedAt = new Date().toISOString();

  try {
    const response = await fetch(espnScoreboardUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (compatible; MinnesotaVikingsBR/1.0; +https://minnesotavikingsbr.com)",
      },
      next: { revalidate: espnCacheSeconds },
      signal: AbortSignal.timeout(espnRequestTimeout),
    });

    if (!response.ok) {
      return { games: [], source: "unavailable", fetchedAt };
    }

    const payload = asRecord(await response.json());
    const content = asRecord(payload?.content);
    const scoreboardData = asRecord(content?.sbData);
    const games = getArray(scoreboardData, "events")
      .map(normalizeEvent)
      .filter((game): game is LiveGameUpdate => game !== null);

    return { games, source: "espn", fetchedAt };
  } catch {
    return { games: [], source: "unavailable", fetchedAt };
  }
}
