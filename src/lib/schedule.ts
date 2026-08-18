import scheduleJson from "@/data/vikings-schedule-2026.json";

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

const scheduleData = scheduleJson as ScheduleData;
const brazilTimeZone = "America/Sao_Paulo";
const scoreRefreshWindow = 48 * 60 * 60 * 1000;

function getKickoffDate(kickoffAt: string | null) {
  if (!kickoffAt) {
    return null;
  }

  const date = new Date(kickoffAt);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function getAllGames() {
  return [...scheduleData.games].sort((a, b) => a.sequence - b.sequence);
}

export function getPreseasonGames() {
  return getAllGames().filter((game) => game.seasonType === "preseason");
}

export function getRegularSeasonGames() {
  return getAllGames().filter((game) => game.seasonType === "regular");
}

export function getNextGame(referenceDate: Date = new Date()) {
  for (const game of getAllGames()) {
    if (game.status === "final" || game.status === "bye") {
      continue;
    }

    if (game.status === "tbd") {
      return game;
    }

    const kickoffDate = getKickoffDate(game.kickoffAt);
    if (kickoffDate && kickoffDate > referenceDate) {
      return game;
    }
  }

  return null;
}

export function getLastCompletedGame() {
  return (
    getAllGames()
      .filter((game) => game.status === "final")
      .sort((a, b) => b.sequence - a.sequence)[0] ?? null
  );
}

export function getScoreRefreshSeasonType(referenceDate: Date = new Date()) {
  const referenceTime = referenceDate.getTime();
  const recentlyStartedGame = getAllGames().find((game) => {
    if (game.status !== "scheduled") {
      return false;
    }

    const kickoffDate = getKickoffDate(game.kickoffAt);
    if (!kickoffDate) {
      return false;
    }

    const timeSinceKickoff = referenceTime - kickoffDate.getTime();
    return timeSinceKickoff >= 0 && timeSinceKickoff <= scoreRefreshWindow;
  });

  return recentlyStartedGame?.seasonType ?? getNextGame(referenceDate)?.seasonType ?? null;
}

export function getHighlightedGame(
  games: ScheduleGame[],
  referenceDate: Date = new Date(),
) {
  const sortedGames = [...games].sort((a, b) => a.sequence - b.sequence);
  const nextRelevantGame = sortedGames.find((game) => {
    if (game.status === "tbd") {
      return true;
    }

    if (game.status !== "scheduled") {
      return false;
    }

    const kickoffDate = getKickoffDate(game.kickoffAt);
    return kickoffDate ? kickoffDate > referenceDate : false;
  });

  return (
    nextRelevantGame ??
    [...sortedGames].reverse().find((game) => game.status === "final") ??
    sortedGames[0] ??
    null
  );
}

export function formatGameDateInBrazil(game: ScheduleGame) {
  if (game.status === "bye") {
    return "Semana de folga";
  }

  const kickoffDate = getKickoffDate(game.kickoffAt);
  if (!kickoffDate) {
    return "Data e horário a definir";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: brazilTimeZone,
  }).format(kickoffDate);
}

export function formatGameTimeInBrazil(game: ScheduleGame) {
  if (game.status === "bye") {
    return "Semana de folga";
  }

  const kickoffDate = getKickoffDate(game.kickoffAt);
  if (!kickoffDate) {
    return "Data e horário a definir";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: brazilTimeZone,
  }).format(kickoffDate);
}
