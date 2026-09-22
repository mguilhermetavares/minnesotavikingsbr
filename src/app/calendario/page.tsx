import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import LocalTimeZoneNotice from "@/components/LocalTimeZoneNotice";
import ScheduleSections from "@/components/ScheduleSections";
import { getAvailableSeasons, resolveSchedule } from "@/data/schedules";
import { formatVerifiedDate } from "@/lib/time-zone";

export const revalidate = 300;

type SchedulePageProps = {
  searchParams: Promise<{
    season?: string | string[];
  }>;
};

export async function generateMetadata(
  { searchParams }: SchedulePageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { season } = await searchParams;
  const schedule = await resolveSchedule(season);
  if (!schedule) notFound();
  const inherited = await parent;
  const title = `Calendário ${schedule.season}`;
  const sharingTitle = `${title} | Minnesota Vikings BR`;
  const description = `Jogos, horários e resultados do Minnesota Vikings na temporada ${schedule.season}, com horários no fuso local e referência de Brasília.`;
  const calendarUrl = `/calendario?season=${schedule.season}`;

  return {
    title,
    description,
    alternates: { canonical: calendarUrl },
    openGraph: {
      title: sharingTitle,
      description,
      url: calendarUrl,
      siteName: inherited.openGraph?.siteName,
      locale: inherited.openGraph?.locale,
      type: "website",
    },
    // The route's opengraph-image file supplies the image for both cards.
    // Keep images unset here so Next.js can resolve its generated URL.
    twitter: {
      card: "summary_large_image",
      title: sharingTitle,
      description,
      site: inherited.twitter?.site,
      creator: inherited.twitter?.creator,
    },
  };
}

export default async function SchedulePage({
  searchParams,
}: SchedulePageProps) {
  const { season } = await searchParams;
  const [schedule, availableSeasons] = await Promise.all([
    resolveSchedule(season),
    getAvailableSeasons(),
  ]);
  if (!schedule) notFound();
  const referenceTime = Date.now();

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
            CALENDÁRIO{" "}
            <span className="text-gold-gradient">{schedule.season}</span>
          </h1>
          <LocalTimeZoneNotice />

          {availableSeasons.length > 1 && (
            <nav
              aria-label="Selecionar temporada"
              className="mt-8 flex flex-wrap justify-center gap-2"
            >
              {availableSeasons.map((availableSeason) => (
                <Link
                  key={availableSeason}
                  href={`/calendario?season=${availableSeason}`}
                  aria-current={
                    availableSeason === schedule.season ? "page" : undefined
                  }
                  className={`rounded-full border px-4 py-2 font-display text-sm tracking-wider transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vikings-gold ${
                    availableSeason === schedule.season
                      ? "border-vikings-gold/50 bg-vikings-gold/15 text-vikings-gold"
                      : "border-white/10 bg-white/5 text-white/50 hover:border-vikings-gold/30 hover:text-white"
                  }`}
                >
                  {availableSeason}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 pb-20 sm:px-6 lg:px-8">
        <ScheduleSections
          key={schedule.season}
          schedule={schedule}
          referenceTime={referenceTime}
        />

        <aside className="flex flex-col gap-3 border-t border-white/10 py-6 text-sm leading-relaxed text-white/40 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <p className="max-w-3xl">
            Calendário baseado na programação oficial dos{" "}
            <a
              href={schedule.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded font-semibold text-vikings-gold underline decoration-vikings-gold/30 underline-offset-4 transition-colors hover:text-vikings-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vikings-gold"
            >
              {schedule.source.name}
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
          <div className="flex-shrink-0 sm:text-right">
            <p className="font-display text-xs tracking-[0.12em] text-white/30">
              DATAS E HORÁRIOS SUJEITOS A ALTERAÇÕES
            </p>
            <p className="mt-2 text-xs text-white/25">
              Última verificação: {formatVerifiedDate(schedule.lastVerifiedAt)}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
