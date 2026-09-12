import type { ScheduleGame, SeasonType } from "@/data/schedules";

export const estimatedGameWindowMs = 4 * 60 * 60 * 1000;
export const maximumConfirmedLiveWindowMs = 6 * 60 * 60 * 1000;
const scorePollingLeadTimeMs = 30 * 60 * 1000;

export function getScheduleSectionOrder(
  games: ScheduleGame[],
  season: number,
  referenceTime: number,
): SeasonType[] {
  const preseason = games.filter(
    (game) => game.seasonType === "preseason" && game.status !== "bye",
  );
  const regularStarted = games.some((game) => {
    const kickoff = getKickoffTime(game);
    return (
      game.seasonType === "regular" &&
      game.status !== "bye" &&
      (game.status === "final" ||
        isConfirmedLiveGameActive(game, referenceTime) ||
        (kickoff !== null && kickoff <= referenceTime))
    );
  });
  const preseasonEnded = preseason.every((game) => {
    if (game.status === "final") return true;
    if (isConfirmedLiveGameActive(game, referenceTime)) return false;
    const kickoff = getKickoffTime(game);
    const window =
      game.status === "live"
        ? maximumConfirmedLiveWindowMs
        : estimatedGameWindowMs;
    return kickoff !== null && referenceTime >= kickoff + window;
  });
  // The displayed NFL season ends by March, including January/February of
  // the following year. Unknown dates otherwise keep preseason first.
  const seasonEnded = referenceTime >= Date.UTC(season + 1, 2, 1);
  return regularStarted || preseasonEnded || seasonEnded
    ? ["regular", "preseason"]
    : ["preseason", "regular"];
}

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
  season?: number,
) {
  if (season !== undefined && referenceTime >= Date.UTC(season + 1, 2, 1))
    return null;
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
        // An unresolved old date must not hide games later in the schedule.
        return !sortedGames.some((later) => {
          if (later.sequence <= game.sequence) return false;
          const kickoff = getKickoffTime(later);
          return (
            later.status === "final" ||
            (kickoff !== null && referenceTime >= kickoff)
          );
        });
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
  season?: number,
) {
  const currentGame = getCurrentGame(games, referenceTime);
  const nextGame = getNextGame(games, referenceTime, season);

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
