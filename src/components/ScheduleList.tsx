"use client";

import { useEffect, useMemo, useRef, type KeyboardEvent } from "react";

import TeamBadge from "@/components/TeamBadge";
import { getCurrentGame, getRelevantGame } from "@/lib/game-selection";
import {
  brazilTimeZone,
  formatGameDate,
  formatGameTime,
  isBrazilTimeEquivalent,
} from "@/lib/time-zone";
import { useLiveSchedule } from "@/lib/use-live-schedule";
import { useLocalTimeZone } from "@/lib/use-local-time-zone";
import { useReferenceTime } from "@/lib/use-reference-time";
import type { ScheduleGame } from "@/lib/schedule";

type ScheduleListProps = {
  games: ScheduleGame[];
  season: number;
  referenceTime: number;
  enableLiveScores?: boolean;
  fetchLiveScoresInitially?: boolean;
};

const statusLabels = {
  scheduled: "AGENDADO",
  live: "AO VIVO",
  final: "FINAL",
  bye: "FOLGA",
  tbd: "A DEFINIR",
};

export default function ScheduleList({
  games,
  season,
  referenceTime,
  enableLiveScores = false,
  fetchLiveScoresInitially = false,
}: ScheduleListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const timeZone = useLocalTimeZone();
  const currentReferenceTime = useReferenceTime(referenceTime);
  const displayedGames = useLiveSchedule(
    games,
    season,
    enableLiveScores,
    currentReferenceTime,
    fetchLiveScoresInitially,
  );
  const currentGameId = useMemo(
    () => getCurrentGame(displayedGames, currentReferenceTime)?.id ?? null,
    [currentReferenceTime, displayedGames],
  );
  const focusGameId = useMemo(
    () => getRelevantGame(displayedGames, currentReferenceTime)?.id ?? null,
    [currentReferenceTime, displayedGames],
  );

  useEffect(() => {
    const list = listRef.current;
    if (!list || !focusGameId) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      const focusedCard = list.querySelector<HTMLElement>(
        `[data-game-id="${focusGameId}"]`,
      );

      if (focusedCard) {
        list.scrollTo({
          left: Math.max(0, focusedCard.offsetLeft - list.offsetLeft - 16),
          behavior: "smooth",
        });
      }
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [focusGameId]);

  function scrollSchedule(direction: "previous" | "next") {
    const list = listRef.current;
    if (!list) {
      return;
    }

    list.scrollBy({
      left:
        direction === "next"
          ? list.clientWidth * 0.8
          : -list.clientWidth * 0.8,
      behavior: "smooth",
    });
  }

  function handleScheduleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const list = listRef.current;
    if (!list) {
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      scrollSchedule(event.key === "ArrowRight" ? "next" : "previous");
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      list.scrollTo({
        left: event.key === "End" ? list.scrollWidth : 0,
        behavior: "smooth",
      });
    }
  }

  const seasonLabel =
    games[0]?.seasonType === "preseason"
      ? "pré-temporada"
      : "temporada regular";

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm text-white/40">
          Arraste ou use as setas para navegar pelos jogos.
        </p>
        <div className="hidden flex-shrink-0 items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollSchedule("previous")}
            aria-label={`Ver jogos anteriores da ${seasonLabel}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:border-vikings-gold/40 hover:bg-vikings-gold/10 hover:text-vikings-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vikings-gold"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollSchedule("next")}
            aria-label={`Ver próximos jogos da ${seasonLabel}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:border-vikings-gold/40 hover:bg-vikings-gold/10 hover:text-vikings-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vikings-gold"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={listRef}
        role="region"
        aria-label={`Jogos da ${seasonLabel}`}
        tabIndex={0}
        onKeyDown={handleScheduleKeyDown}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-5 pr-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vikings-gold [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {displayedGames.map((game) => {
          const isBye = game.status === "bye";
          const isCurrentGame = game.id === currentGameId;
          const isLive = isCurrentGame && game.status === "live";
          const hasFinalScore =
            game.status === "final" &&
            game.vikingsScore !== null &&
            game.opponentScore !== null &&
            game.opponent !== null;
          const hasLiveScore =
            isLive &&
            game.vikingsScore !== null &&
            game.opponentScore !== null &&
            game.opponent !== null;
          const hasVisibleScore = hasFinalScore || hasLiveScore;
          const isVikingsVictory =
            hasFinalScore && game.vikingsScore! > game.opponentScore!;
          const isVikingsLoss =
            hasFinalScore && game.vikingsScore! < game.opponentScore!;
          const isFocused = game.id === focusGameId;
          const usesBrazilTime = isBrazilTimeEquivalent(
            game.kickoffAt,
            timeZone,
          );
          const resultLabel = isVikingsVictory
            ? "VITÓRIA"
            : isVikingsLoss
              ? "DERROTA"
              : hasFinalScore
                ? "EMPATE"
                : null;
          const resultClasses = isVikingsVictory
            ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
            : isVikingsLoss
              ? "border-red-400/40 bg-red-400/10 text-red-300"
              : "border-white/15 bg-white/5 text-white/60";
          const cardClasses = isVikingsVictory
            ? "border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 via-surface-raised to-surface-raised"
            : isVikingsLoss
              ? "border-red-400/30 bg-gradient-to-br from-red-500/10 via-surface-raised to-surface-raised"
              : isLive
                ? "border-red-400/40 bg-gradient-to-br from-red-500/15 via-vikings-purple/20 to-surface-raised shadow-[0_20px_60px_rgba(239,68,68,0.16)]"
              : isFocused
                ? "border-vikings-gold/40 bg-gradient-to-br from-vikings-purple/30 via-surface-raised to-surface-raised shadow-[0_20px_60px_rgba(79,38,131,0.3)]"
                : "border-white/10 bg-gradient-to-br from-white/[0.06] to-surface-raised";

          return (
            <article
              key={game.id}
              data-game-id={game.id}
              className={`relative flex min-h-[470px] w-[84vw] max-w-[360px] flex-none snap-start flex-col overflow-hidden rounded-3xl border p-5 transition-colors sm:w-[360px] sm:p-6 lg:w-[380px] lg:max-w-[380px] ${cardClasses}`}
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-vikings-purple/10 blur-[60px]" />

              <div className="relative z-10 flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-xs tracking-[0.18em] text-vikings-gold">
                    {game.seasonType === "preseason"
                      ? "PRÉ-TEMPORADA"
                      : "TEMPORADA REGULAR"}
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold text-white">
                    SEMANA {game.week}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 font-display text-[11px] tracking-wider text-white/60">
                    {isLive
                      ? "AO VIVO"
                      : isCurrentGame
                        ? "JOGO ATUAL"
                        : statusLabels[game.status]}
                  </span>
                  {isFocused && !isCurrentGame && !hasVisibleScore && (
                    <span className="rounded-full border border-vikings-gold/30 bg-vikings-gold/10 px-3 py-1 font-display text-[10px] tracking-wider text-vikings-gold">
                      EM DESTAQUE
                    </span>
                  )}
                </div>
              </div>

              {isBye ? (
                <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-24 w-24 items-center justify-center rounded-full border border-vikings-gold/20 bg-vikings-gold/10 font-display text-4xl text-vikings-gold"
                  >
                    Zzz
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-bold text-white">
                    SEMANA DE FOLGA
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/40">
                    Hora de recuperar as energias para a sequência da temporada.
                  </p>
                </div>
              ) : (
                <>
                  <div className="relative z-10 my-7 grid grid-cols-[1fr_auto_1fr] items-start gap-3 text-center">
                    <div className="flex min-w-0 flex-col items-center">
                      <TeamBadge
                        code="MIN"
                        name="Minnesota Vikings"
                        size="md"
                      />
                      <p className="mt-3 font-display text-sm font-bold text-white">
                        VIKINGS
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="mt-5 font-display text-xl font-bold text-vikings-gold/70"
                    >
                      ×
                    </span>
                    <span className="sr-only">contra</span>

                    <div className="flex min-w-0 flex-col items-center">
                      <TeamBadge
                        code={game.opponent?.code ?? "NFL"}
                        name={game.opponent?.name ?? "Adversário a definir"}
                        size="md"
                      />
                      <h3 className="mt-3 break-words font-display text-sm font-bold uppercase text-white">
                        {game.opponent?.shortName ?? "A DEFINIR"}
                      </h3>
                    </div>
                  </div>

                  {hasVisibleScore && game.opponent ? (
                    <div
                      aria-live="polite"
                      aria-atomic="true"
                      className="relative z-10 rounded-2xl border border-white/10 bg-black/20 p-4 text-center"
                    >
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 font-display text-xs font-bold tracking-[0.18em] ${
                          isLive
                            ? "border-red-400/50 bg-red-400/10 text-red-300"
                            : resultClasses
                        }`}
                      >
                        {isLive ? "JOGO EM ANDAMENTO" : `${resultLabel} DOS VIKINGS`}
                      </span>
                      <p className="mt-3 font-display text-3xl font-bold text-white">
                        {game.vikingsScore}
                        <span className="mx-3 text-white/30">×</span>
                        {game.opponentScore}
                      </p>
                      <p className="mt-1 text-xs text-white/40">
                        Vikings · {game.opponent.shortName}
                      </p>
                      {game.kickoffAt && (
                        <>
                          <time
                            dateTime={game.kickoffAt}
                            className="mt-3 block border-t border-white/10 pt-3 text-xs leading-relaxed text-white/40"
                          >
                            {formatGameDate(game, timeZone)} ·{" "}
                            {formatGameTime(game, timeZone)} ·{" "}
                            {usesBrazilTime
                              ? "horário de Brasília"
                              : "seu horário local"}
                          </time>
                          {!usesBrazilTime && (
                            <p className="mt-2 text-[11px] text-white/35">
                              Brasília: {formatGameDate(game, brazilTimeZone)} ·{" "}
                              {formatGameTime(game, brazilTimeZone)}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  ) : game.kickoffAt ? (
                    <time
                      dateTime={game.kickoffAt}
                      className="relative z-10 block rounded-2xl border border-white/10 bg-black/20 p-4 text-center"
                    >
                      <span className="block text-sm leading-relaxed text-white/60">
                        {formatGameDate(game, timeZone)}
                      </span>
                      <span className="mt-1 block font-display text-xl font-bold text-white">
                        {formatGameTime(game, timeZone)}
                      </span>
                      <span className="mt-1 block font-display text-[10px] tracking-[0.16em] text-white/30">
                        {usesBrazilTime
                          ? "HORÁRIO DE BRASÍLIA"
                          : "SEU HORÁRIO LOCAL"}
                      </span>
                      {!usesBrazilTime && (
                        <span className="mt-2 block text-xs text-white/40">
                          Brasília: {formatGameDate(game, brazilTimeZone)} ·{" "}
                          {formatGameTime(game, brazilTimeZone)}
                        </span>
                      )}
                    </time>
                  ) : (
                    <div className="relative z-10 rounded-2xl border border-vikings-gold/20 bg-vikings-gold/5 p-4 text-center">
                      <p className="font-display text-lg font-bold text-vikings-gold">
                        {formatGameDate(game, timeZone)}
                      </p>
                    </div>
                  )}

                  <div className="relative z-10 mt-auto border-t border-white/10 pt-4 text-center">
                    <p className="font-display text-xs tracking-[0.15em] text-white/40">
                      {game.location === "home" ? "EM CASA" : "FORA DE CASA"}
                    </p>
                    {game.venue && (
                      <p className="mt-1 text-sm text-white/60">{game.venue}</p>
                    )}
                    {game.scoreSource === "espn" && (
                      <p className="mt-2 font-display text-[10px] tracking-[0.14em] text-white/30">
                        PLACAR ATUALIZADO VIA ESPN
                      </p>
                    )}
                  </div>
                </>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
