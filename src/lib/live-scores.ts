import type { ScheduleGame, SeasonType } from "@/lib/schedule";
import { isConfirmedLiveGameActive } from "@/lib/game-selection";

export type LiveGameStatus = "scheduled" | "live" | "final";

export type LiveGameUpdate = {
  eventId: string;
  season: number;
  seasonType: SeasonType;
  status: LiveGameStatus;
  statusDetail: string;
  kickoffAt: string;
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

export function mergeLiveScoreUpdates(
  games: ScheduleGame[],
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
      const updateKickoff = new Date(candidate.kickoffAt).getTime();
      const matchesKickoff =
        Number.isFinite(gameKickoff) &&
        Number.isFinite(updateKickoff) &&
        Math.abs(updateKickoff - gameKickoff) <= maximumKickoffDifference;
      const kickoffCanBeMatched = Number.isFinite(gameKickoff)
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
        candidate.opponentCode === game.opponent?.code &&
        kickoffCanBeMatched
      );
    });

    if (!update) {
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
    const shouldPreserveFinalStatus =
      game.status === "final" && update.status !== "final";

    return {
      ...game,
      status: shouldPreserveFinalStatus
        ? game.status
        : hasScoreUpdate || update.status === "scheduled"
          ? update.status
          : game.status,
      kickoffAt: update.kickoffAt,
      vikingsScore: hasScoreUpdate ? update.vikingsScore : game.vikingsScore,
      opponentScore: hasScoreUpdate
        ? update.opponentScore
        : game.opponentScore,
      scoreSource: hasScoreUpdate ? "espn" : undefined,
      statusDetail: update.statusDetail,
    };
  });
}
