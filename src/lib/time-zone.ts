import type { ScheduleGame } from "@/data/schedules";

export const brazilTimeZone = "America/Sao_Paulo";

export function resolveTimeZone(timeZone: string | null | undefined) {
  if (!timeZone) {
    return brazilTimeZone;
  }

  try {
    new Intl.DateTimeFormat("pt-BR", { timeZone }).format(0);
    return timeZone;
  } catch {
    return brazilTimeZone;
  }
}

function getKickoffDate(game: ScheduleGame) {
  if (!game.kickoffAt) {
    return null;
  }

  const date = new Date(game.kickoffAt);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatGameDate(
  game: ScheduleGame,
  timeZone: string = brazilTimeZone,
) {
  if (game.status === "bye") {
    return "Semana de folga";
  }

  const kickoffDate = getKickoffDate(game);
  if (!kickoffDate) {
    return "Data e horário a definir";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: resolveTimeZone(timeZone),
  }).format(kickoffDate);
}

export function formatGameTime(
  game: ScheduleGame,
  timeZone: string = brazilTimeZone,
) {
  if (game.status === "bye") {
    return "Semana de folga";
  }

  const kickoffDate = getKickoffDate(game);
  if (!kickoffDate) {
    return "Data e horário a definir";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: resolveTimeZone(timeZone),
  }).format(kickoffDate);
}

function getComparableDateTime(kickoffAt: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: resolveTimeZone(timeZone),
  }).format(new Date(kickoffAt));
}

export function isBrazilTimeEquivalent(
  kickoffAt: string | null,
  timeZone: string,
) {
  if (!kickoffAt || timeZone === brazilTimeZone) {
    return true;
  }

  return (
    getComparableDateTime(kickoffAt, timeZone) ===
    getComparableDateTime(kickoffAt, brazilTimeZone)
  );
}

export function formatVerifiedDate(date: string) {
  const verifiedAt = new Date(`${date}T12:00:00Z`);

  if (Number.isNaN(verifiedAt.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(verifiedAt);
}
