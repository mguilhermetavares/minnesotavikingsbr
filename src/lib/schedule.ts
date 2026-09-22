import type { ScheduleData } from "@/data/schedules";

export type {
  GameLocation,
  GameStatus,
  Opponent,
  ScheduleData,
  ScheduleGame,
  SeasonType,
} from "@/data/schedules";

export function getAllGames(schedule: ScheduleData) {
  return [...schedule.games].sort((a, b) => a.sequence - b.sequence);
}

export function getPreseasonGames(schedule: ScheduleData) {
  return getAllGames(schedule).filter(
    (game) => game.seasonType === "preseason",
  );
}

export function getRegularSeasonGames(schedule: ScheduleData) {
  return getAllGames(schedule).filter(
    (game) => game.seasonType === "regular",
  );
}
