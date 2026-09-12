import type { ScheduleGame, SeasonType } from "@/lib/schedule";
import { isConfirmedLiveGameActive } from "@/lib/game-selection";

export type LiveGameStatus = "scheduled" | "live" | "final";

export type LiveGameUpdate = {
  eventId: string;
  season: number;
  seasonType: SeasonType;
  status: LiveGameStatus;
  statusDetail: string;
  kickoffAt: string | null;
  week: number | null;
  opponentCode: string;
  vikingsScore: number | null;
  opponentScore: number | null;
};

export type LiveScoreResponse = {
  season: number;
  games: LiveGameUpdate[];
  source: "espn" | "unavailable";
  fetchedAt: string;
};

export type DisplayScheduleGame = ScheduleGame & {
  scoreSource?: "espn";
  statusDetail?: string;
};

const maximumKickoffDifference = 36 * 60 * 60 * 1000;

export function isLiveGameUpdate(value: unknown): value is LiveGameUpdate {
  if (!value || typeof value !== "object") return false;
  const game = value as Record<string, unknown>;
  const validScore = (score: unknown) =>
    score === null ||
    (typeof score === "number" &&
      Number.isInteger(score) &&
      score >= 0 &&
      score <= 200);

  return (
    typeof game.eventId === "string" &&
    game.eventId.length > 0 &&
    typeof game.season === "number" &&
    Number.isInteger(game.season) &&
    (game.seasonType === "preseason" || game.seasonType === "regular") &&
    (game.status === "scheduled" ||
      game.status === "live" ||
      game.status === "final") &&
    typeof game.statusDetail === "string" &&
    (game.kickoffAt === null ||
      (typeof game.kickoffAt === "string" &&
        Number.isFinite(Date.parse(game.kickoffAt)))) &&
    (game.week === null ||
      (typeof game.week === "number" &&
        Number.isInteger(game.week) &&
        game.week >= 1 &&
        game.week <= 18)) &&
    typeof game.opponentCode === "string" &&
    /^[A-Z]{2,4}$/.test(game.opponentCode) &&
    validScore(game.vikingsScore) &&
    validScore(game.opponentScore) &&
    (game.status === "scheduled" ||
      (game.kickoffAt !== null &&
        game.vikingsScore !== null &&
        game.opponentScore !== null))
  );
}

export function mergeLiveScoreUpdates(
  games: DisplayScheduleGame[],
  updates: LiveGameUpdate[],
  season: number,
  referenceTime: number = Date.now(),
): DisplayScheduleGame[] {
  return games.map((game) => {
    if (!game.opponent) {
      return game;
    }

    const gameKickoff = game.kickoffAt
      ? new Date(game.kickoffAt).getTime()
      : Number.NaN;
    const update = updates.find((candidate) => {
      const updateKickoff = candidate.kickoffAt
        ? Date.parse(candidate.kickoffAt)
        : Number.NaN;
      const matchesKickoff =
        Number.isFinite(gameKickoff) &&
        Number.isFinite(updateKickoff) &&
        Math.abs(updateKickoff - gameKickoff) <= maximumKickoffDifference;
      const kickoffCanBeMatched =
        Number.isFinite(gameKickoff) && candidate.kickoffAt !== null
          ? matchesKickoff
          : true;
      const matchesWeek = candidate.week === game.week;
      const matchesKnownPreseasonOffset =
        game.seasonType === "preseason" &&
        candidate.week !== null &&
        Math.abs(candidate.week - game.week) === 1 &&
        matchesKickoff;

      return (
        candidate.season === season &&
        candidate.seasonType === game.seasonType &&
        (matchesWeek || matchesKnownPreseasonOffset) &&
        candidate.opponentCode.replace(/^WSH$/, "WAS") ===
          game.opponent?.code.replace(/^WSH$/, "WAS") &&
        (kickoffCanBeMatched || (game.seasonType === "regular" && matchesWeek))
      );
    });

    if (!update) {
      return game;
    }

    // An older/partial response must not replace a confirmed result or live score.
    if (
      (game.status === "final" && update.status !== "final") ||
      (game.status === "live" && update.status === "scheduled")
    ) {
      return game;
    }

    if (
      update.status === "live" &&
      !isConfirmedLiveGameActive(
        { ...game, status: "live", kickoffAt: update.kickoffAt },
        referenceTime,
      )
    ) {
      return game;
    }

    const hasCompleteScore =
      update.vikingsScore !== null && update.opponentScore !== null;
    const hasScoreUpdate =
      hasCompleteScore &&
      (update.status === "live" || update.status === "final");
    return {
      ...game,
      status:
        hasScoreUpdate || update.status === "scheduled"
          ? update.status === "scheduled" && update.kickoffAt === null
            ? "tbd"
            : update.status
          : game.status,
      kickoffAt: update.kickoffAt,
      vikingsScore: hasScoreUpdate ? update.vikingsScore : game.vikingsScore,
      opponentScore: hasScoreUpdate ? update.opponentScore : game.opponentScore,
      scoreSource: hasScoreUpdate ? "espn" : game.scoreSource,
      statusDetail: update.statusDetail,
    };
  });
}
