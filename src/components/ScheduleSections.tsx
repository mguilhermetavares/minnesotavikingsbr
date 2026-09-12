"use client";

import { useMemo } from "react";

import ScheduleList from "@/components/ScheduleList";
import type { ScheduleData } from "@/data/schedules";
import { getScheduleSectionOrder } from "@/lib/game-selection";
import { getPreseasonGames, getRegularSeasonGames } from "@/lib/schedule";
import { useLiveSchedule } from "@/lib/use-live-schedule";
import { useReferenceTime } from "@/lib/use-reference-time";

export default function ScheduleSections({
  schedule,
  referenceTime,
}: {
  schedule: ScheduleData;
  referenceTime: number;
}) {
  const currentReferenceTime = useReferenceTime(referenceTime);
  const games = useLiveSchedule(schedule.games, schedule.season);
  const sections = useMemo(
    () => ({
      preseason: getPreseasonGames({ ...schedule, games }),
      regular: getRegularSeasonGames({ ...schedule, games }),
    }),
    [games, schedule],
  );
  const order = getScheduleSectionOrder(
    games,
    schedule.season,
    currentReferenceTime,
  );

  return order.map((seasonType) => {
    const preseason = seasonType === "preseason";
    const titleId = preseason ? "preseason-title" : "regular-season-title";
    return (
      <section key={seasonType} aria-labelledby={titleId}>
        <p className="font-display text-xs tracking-[0.2em] text-vikings-gold">
          {preseason
            ? "AQUECIMENTO PARA A TEMPORADA"
            : "CAMINHO ATÉ OS PLAYOFFS"}
        </p>
        <h2
          id={titleId}
          className="mb-6 mt-2 font-display text-3xl font-bold text-white sm:text-4xl"
        >
          {preseason ? "PRÉ-TEMPORADA" : "TEMPORADA REGULAR"}
        </h2>
        <ScheduleList
          games={sections[seasonType]}
          seasonType={seasonType}
          referenceTime={currentReferenceTime}
        />
      </section>
    );
  });
}
