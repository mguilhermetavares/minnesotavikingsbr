"use client";

import Link from "next/link";
import { useMemo } from "react";

import TeamBadge from "@/components/TeamBadge";
import type { ScheduleData } from "@/data/schedules";
import { getGameSelection } from "@/lib/game-selection";
import {
  brazilTimeZone,
  formatGameDate,
  formatGameTime,
  isBrazilTimeEquivalent,
} from "@/lib/time-zone";
import { useLiveSchedule } from "@/lib/use-live-schedule";
import { useLocalTimeZone } from "@/lib/use-local-time-zone";
import { useReferenceTime } from "@/lib/use-reference-time";

type NextGameCardProps = {
  schedule: ScheduleData;
  referenceTime: number;
};

export default function NextGameCard({
  schedule,
  referenceTime,
}: NextGameCardProps) {
  const timeZone = useLocalTimeZone();
  const currentReferenceTime = useReferenceTime(referenceTime);
  const displayedGames = useLiveSchedule(
    schedule.games,
    schedule.season,
  );
  const selection = useMemo(
    () => getGameSelection(displayedGames, currentReferenceTime, schedule.season),
    [currentReferenceTime, displayedGames, schedule.season],
  );
  const featuredGame = selection.currentGame ?? selection.nextGame;

  if (!featuredGame) {
    return (
      <section className="bg-[#0a0a0f] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-surface-raised p-8 text-center">
          <h2 className="font-display text-2xl font-bold tracking-wider text-white/60">
            TEMPORADA ENCERRADA
          </h2>
        </div>
      </section>
    );
  }

  const isCurrentGame = selection.currentGame?.id === featuredGame.id;
  const isConfirmedLive = isCurrentGame && featuredGame.status === "live";
  const seasonLabel =
    featuredGame.seasonType === "preseason"
      ? "PRÉ-TEMPORADA"
      : "TEMPORADA REGULAR";
  const locationLabel =
    featuredGame.location === "home"
      ? "EM CASA"
      : featuredGame.location === "away"
        ? "FORA DE CASA"
        : "LOCAL A DEFINIR";
  const opponentName = featuredGame.opponent?.name ?? "Adversário a definir";
  const usesBrazilTime = isBrazilTimeEquivalent(
    featuredGame.kickoffAt,
    timeZone,
  );

  return (
    <section
      aria-labelledby="next-game-title"
      className="relative overflow-hidden bg-[#0a0a0f] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-vikings-purple/20 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-vikings-gold/20 bg-gradient-to-br from-vikings-purple/30 via-surface-raised to-surface-raised p-6 shadow-[0_30px_80px_rgba(79,38,131,0.2)] sm:p-10">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-vikings-gold/10 blur-[70px]" />

        <div className="relative z-10">
          <div className="flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xs tracking-[0.2em] text-vikings-gold">
                {isConfirmedLive
                  ? "AO VIVO"
                  : isCurrentGame
                    ? "JOGO ATUAL"
                    : "PRÓXIMO JOGO"}
              </p>
              <p className="mt-2 font-display text-sm tracking-[0.15em] text-white/50">
                {seasonLabel} · SEMANA {featuredGame.week}
              </p>
            </div>
            <span className="self-start rounded-full border border-vikings-gold/20 bg-vikings-gold/10 px-4 py-2 font-display text-xs tracking-[0.15em] text-vikings-gold sm:self-auto">
              {isConfirmedLive
                ? "AO VIVO"
                : isCurrentGame
                  ? "JOGO ATUAL"
                  : locationLabel}
            </span>
          </div>

          <div className="grid gap-8 py-8 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div className="flex flex-col items-center text-center md:items-end md:text-right">
              <TeamBadge code="MIN" name="Minnesota Vikings" size="lg" />
              <p className="mt-4 font-display text-xs tracking-[0.18em] text-white/40">
                NOSSO TIME
              </p>
              <h2
                id="next-game-title"
                className="mt-2 font-display text-3xl font-bold uppercase text-white sm:text-4xl"
              >
                Minnesota Vikings
              </h2>
            </div>

            <span
              aria-hidden="true"
              className="mx-auto font-display text-2xl font-bold text-vikings-gold/60"
            >
              ×
            </span>
            <span className="sr-only">contra</span>

            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <TeamBadge
                code={featuredGame.opponent?.code ?? "NFL"}
                name={opponentName}
                size="lg"
              />
              <p className="mt-4 font-display text-xs tracking-[0.18em] text-white/40">
                ADVERSÁRIO
              </p>
              <p className="mt-2 font-display text-3xl font-bold uppercase text-white sm:text-4xl">
                {opponentName}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              {featuredGame.kickoffAt ? (
                <time dateTime={featuredGame.kickoffAt}>
                  <span className="block text-sm text-white/60">
                    {formatGameDate(featuredGame, timeZone)}
                  </span>
                  <span className="mt-1 block font-display text-xl font-bold tracking-wide text-white">
                    {formatGameTime(featuredGame, timeZone)} ·{" "}
                    {usesBrazilTime
                      ? "HORÁRIO DE BRASÍLIA"
                      : "SEU HORÁRIO LOCAL"}
                  </span>
                  {!usesBrazilTime && (
                    <span className="mt-2 block text-xs text-white/40">
                      Brasília: {formatGameDate(featuredGame, brazilTimeZone)} ·{" "}
                      {formatGameTime(featuredGame, brazilTimeZone)}
                    </span>
                  )}
                </time>
              ) : (
                <p className="font-display text-lg font-bold text-white">
                  {formatGameDate(featuredGame, timeZone)}
                </p>
              )}
              {featuredGame.venue && (
                <p className="mt-2 text-sm text-white/40">
                  {featuredGame.venue}
                </p>
              )}
            </div>

            <Link
              href={`/calendario?season=${schedule.season}`}
              className="inline-flex items-center justify-center rounded-full bg-vikings-gold px-6 py-3 font-display text-sm font-bold tracking-wider text-vikings-purple transition-all hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vikings-gold"
            >
              VER CALENDÁRIO COMPLETO
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
