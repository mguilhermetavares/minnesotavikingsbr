import schedule2026Json from "./2026.json";

export type SeasonType = "preseason" | "regular";

export type GameStatus = "scheduled" | "live" | "final" | "bye" | "tbd";

export type GameLocation = "home" | "away" | null;

export type Opponent = {
  code: string;
  name: string;
  shortName: string;
};

export type ScheduleGame = {
  id: string;
  sequence: number;
  seasonType: SeasonType;
  week: number;
  status: GameStatus;
  location: GameLocation;
  opponent: Opponent | null;
  kickoffAt: string | null;
  venue: string | null;
  vikingsScore: number | null;
  opponentScore: number | null;
};

export type ScheduleData = {
  season: number;
  team: string;
  source: {
    name: string;
    url: string;
  };
  lastVerifiedAt: string;
  games: ScheduleGame[];
};

const schedules = new Map<number, ScheduleData>([
  [2026, schedule2026Json as ScheduleData],
]);

export function getAvailableSeasons() {
  return [...schedules.keys()].sort((a, b) => b - a);
}

export function getSchedule(season: number) {
  if (!Number.isInteger(season)) {
    return null;
  }

  return schedules.get(season) ?? null;
}

export function getCurrentSchedule() {
  const [currentSeason] = getAvailableSeasons();
  const schedule = getSchedule(currentSeason);

  if (!schedule) {
    throw new Error("Nenhum calendário foi configurado.");
  }

  return schedule;
}

export function resolveSchedule(
  requestedSeason: string | string[] | undefined,
) {
  const seasonValue = Array.isArray(requestedSeason)
    ? requestedSeason[0]
    : requestedSeason;
  const season = seasonValue ? Number(seasonValue) : Number.NaN;

  return getSchedule(season) ?? getCurrentSchedule();
}
