import type { ScheduleGame, SeasonType } from "@/data/schedules";

export const estimatedGameWindowMs = 4 * 60 * 60 * 1000;
export const maximumConfirmedLiveWindowMs = 6 * 60 * 60 * 1000;
const scorePollingLeadTimeMs = 30 * 60 * 1000;

function getKickoffTime(game: ScheduleGame) {
  if (!game.kickoffAt) {
    return null;
  }

  const kickoffTime = Date.parse(game.kickoffAt);
  return Number.isFinite(kickoffTime) ? kickoffTime : null;
}

function sortGames(games: ScheduleGame[]) {
  return [...games].sort((a, b) => a.sequence - b.sequence);
}

export function isConfirmedLiveGameActive(
  game: ScheduleGame,
  referenceTime: number = Date.now(),
) {
  if (game.status !== "live") {
    return false;
  }

  const kickoffTime = getKickoffTime(game);
  return (
    kickoffTime !== null &&
    referenceTime >= kickoffTime - scorePollingLeadTimeMs &&
    referenceTime < kickoffTime + maximumConfirmedLiveWindowMs
  );
}

export function getCurrentGame(
  games: ScheduleGame[],
  referenceTime: number = Date.now(),
) {
  return (
    sortGames(games).find((game) => {
      if (game.status === "live") {
        return isConfirmedLiveGameActive(game, referenceTime);
      }

      if (game.status !== "scheduled") {
        return false;
      }

      const kickoffTime = getKickoffTime(game);
      return (
        kickoffTime !== null &&
        referenceTime >= kickoffTime &&
        referenceTime < kickoffTime + estimatedGameWindowMs
      );
    }) ?? null
  );
}

export function getNextGame(
  games: ScheduleGame[],
  referenceTime: number = Date.now(),
) {
  const sortedGames = sortGames(games);
  const currentGame = getCurrentGame(sortedGames, referenceTime);

  return (
    sortedGames.find((game) => {
      if (
        game.status === "final" ||
        game.status === "bye" ||
        isConfirmedLiveGameActive(game, referenceTime) ||
        (currentGame && game.sequence <= currentGame.sequence)
      ) {
        return false;
      }

      if (game.status === "tbd") {
        return true;
      }

      const kickoffTime = getKickoffTime(game);
      return game.status === "scheduled" && kickoffTime !== null
        ? kickoffTime > referenceTime
        : false;
    }) ?? null
  );
}

export function getRelevantGame(
  games: ScheduleGame[],
  referenceTime: number = Date.now(),
) {
  const currentGame = getCurrentGame(games, referenceTime);
  const nextGame = getNextGame(games, referenceTime);
  const sortedGames = sortGames(games);
  const lastCompletedGame = [...sortedGames]
    .reverse()
    .find((game) => game.status === "final");

  return currentGame ?? nextGame ?? lastCompletedGame ?? sortedGames[0] ?? null;
}

export function getGameSelection(
  games: ScheduleGame[],
  referenceTime: number = Date.now(),
) {
  const currentGame = getCurrentGame(games, referenceTime);
  const nextGame = getNextGame(games, referenceTime);

  return {
    currentGame,
    nextGame,
    relevantGame:
      currentGame ?? nextGame ?? getRelevantGame(games, referenceTime),
  };
}

export function getScoreRefreshSeasonType(
  games: ScheduleGame[],
  referenceTime: number = Date.now(),
): SeasonType | null {
  const gameInPollingWindow = sortGames(games).find((game) => {
    if (game.status === "live") {
      return isConfirmedLiveGameActive(game, referenceTime);
    }

    if (game.status !== "scheduled") {
      return false;
    }

    const kickoffTime = getKickoffTime(game);
    return (
      kickoffTime !== null &&
      referenceTime >= kickoffTime - scorePollingLeadTimeMs &&
      referenceTime < kickoffTime + estimatedGameWindowMs
    );
  });

  return gameInPollingWindow?.seasonType ?? null;
}
