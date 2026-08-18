import type { Metadata } from "next";

import ScheduleList from "@/components/ScheduleList";
import scheduleData from "@/data/vikings-schedule-2026.json";
import {
  getHighlightedGame,
  getPreseasonGames,
  getRegularSeasonGames,
  getScoreRefreshSeasonType,
} from "@/lib/schedule";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Calendário 2026",
  description:
    "Calendário de jogos do Minnesota Vikings em horário de Brasília.",
};

export default function SchedulePage() {
  const preseasonGames = getPreseasonGames();
  const regularSeasonGames = getRegularSeasonGames();
  const referenceDate = new Date();
  const highlightedPreseasonGame = getHighlightedGame(
    preseasonGames,
    referenceDate,
  );
  const highlightedRegularSeasonGame = getHighlightedGame(
    regularSeasonGames,
    referenceDate,
  );
  const activeSeasonType = getScoreRefreshSeasonType(referenceDate);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <section className="relative overflow-hidden pb-16 pt-32 lg:pt-36">
        <div className="absolute inset-0 bg-gradient-to-br from-vikings-purple-dark/70 via-[#0a0a0f] to-[#0a0a0f]" />
        <div className="absolute -left-20 top-1/2 h-72 w-72 rounded-full bg-vikings-purple/20 blur-[100px]" />
        <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-vikings-gold/10 blur-[80px]" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-display text-sm tracking-[0.2em] text-vikings-gold">
            MINNESOTA VIKINGS
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-none tracking-tight text-white sm:text-7xl">
            CALENDÁRIO <span className="text-gold-gradient">2026</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/50">
            Todos os horários são exibidos no horário de Brasília.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 pb-20 sm:px-6 lg:px-8">
        <section aria-labelledby="preseason-title">
          <p className="font-display text-xs tracking-[0.2em] text-vikings-gold">
            AQUECIMENTO PARA A TEMPORADA
          </p>
          <h2
            id="preseason-title"
            className="mb-6 mt-2 font-display text-3xl font-bold text-white sm:text-4xl"
          >
            PRÉ-TEMPORADA
          </h2>
          <ScheduleList
            games={preseasonGames}
            focusGameId={highlightedPreseasonGame?.id}
            enableLiveScores={activeSeasonType === "preseason"}
          />
        </section>

        <section aria-labelledby="regular-season-title">
          <p className="font-display text-xs tracking-[0.2em] text-vikings-gold">
            CAMINHO ATÉ OS PLAYOFFS
          </p>
          <h2
            id="regular-season-title"
            className="mb-6 mt-2 font-display text-3xl font-bold text-white sm:text-4xl"
          >
            TEMPORADA REGULAR
          </h2>
          <ScheduleList
            games={regularSeasonGames}
            focusGameId={highlightedRegularSeasonGame?.id}
            enableLiveScores={activeSeasonType === "regular"}
          />
        </section>

        <aside className="flex flex-col gap-3 border-t border-white/10 py-6 text-sm leading-relaxed text-white/40 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <p className="max-w-3xl">
            Calendário baseado na programação oficial dos{" "}
            <a
              href={scheduleData.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded font-semibold text-vikings-gold underline decoration-vikings-gold/30 underline-offset-4 transition-colors hover:text-vikings-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vikings-gold"
            >
              Minnesota Vikings
            </a>
            . Placares atualizados via{" "}
            <a
              href="https://www.espn.com/nfl/scoreboard"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded font-semibold text-white/60 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vikings-gold"
            >
              ESPN
            </a>{" "}
            quando disponíveis.
          </p>
          <p className="flex-shrink-0 font-display text-xs tracking-[0.12em] text-white/30 sm:text-right">
            DATAS E HORÁRIOS SUJEITOS A ALTERAÇÕES
          </p>
        </aside>
      </div>
    </div>
  );
}
