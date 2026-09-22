import { client } from "@/sanity/client";
import { scheduleBySeasonQuery, scheduleSeasonsQuery } from "@/sanity/queries";

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

// Studio edits and the weekly ESPN sync show up within five minutes.
const scheduleFetchOptions = { next: { revalidate: 300 } };

export async function getAvailableSeasons() {
  return client.fetch<number[]>(scheduleSeasonsQuery, {}, scheduleFetchOptions);
}

export async function getSchedule(season: number) {
  if (!Number.isInteger(season)) {
    return null;
  }

  return client.fetch<ScheduleData | null>(
    scheduleBySeasonQuery,
    { season },
    scheduleFetchOptions,
  );
}

export async function getCurrentSchedule() {
  const [currentSeason] = await getAvailableSeasons();
  return currentSeason === undefined ? null : getSchedule(currentSeason);
}

export async function resolveSchedule(
  requestedSeason: string | string[] | undefined,
) {
  const seasonValue = Array.isArray(requestedSeason)
    ? requestedSeason[0]
    : requestedSeason;
  const season = seasonValue ? Number(seasonValue) : Number.NaN;

  return (await getSchedule(season)) ?? getCurrentSchedule();
}
