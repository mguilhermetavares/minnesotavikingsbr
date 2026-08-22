import {
  getCurrentSchedule,
  type ScheduleData,
  type ScheduleGame,
} from "@/data/schedules";

export type {
  GameLocation,
  GameStatus,
  Opponent,
  ScheduleData,
  ScheduleGame,
  SeasonType,
} from "@/data/schedules";

export function getAllGames(schedule: ScheduleData = getCurrentSchedule()) {
  return [...schedule.games].sort((a, b) => a.sequence - b.sequence);
}

export function getPreseasonGames(
  schedule: ScheduleData = getCurrentSchedule(),
) {
  return getAllGames(schedule).filter(
    (game) => game.seasonType === "preseason",
  );
}

export function getRegularSeasonGames(
  schedule: ScheduleData = getCurrentSchedule(),
) {
  return getAllGames(schedule).filter(
    (game) => game.seasonType === "regular",
  );
}

export function getLastCompletedGame(
  games: ScheduleGame[] = getAllGames(),
) {
  return (
    [...games]
      .filter((game) => game.status === "final")
      .sort((a, b) => b.sequence - a.sequence)[0] ?? null
  );
}
