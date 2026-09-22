import { NextRequest, NextResponse } from "next/server";

import { getCurrentSchedule, getSchedule } from "@/data/schedules";
import { getEspnVikingsScores, scoreCacheLifetimeMs } from "@/lib/espn";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const requestedSeason = request.nextUrl.searchParams.get("season");
  const schedule =
    requestedSeason === null
      ? await getCurrentSchedule()
      : /^\d{4}$/.test(requestedSeason)
        ? await getSchedule(Number(requestedSeason))
        : null;
  if (!schedule) {
    return NextResponse.json(
      { error: "Temporada não disponível." },
      { status: 400 },
    );
  }
  const scores = await getEspnVikingsScores(schedule.season);
  // Subtract the server cache age so the two caches share one freshness budget.
  const remainingFreshSeconds = Math.max(
    0,
    Math.floor(
      (Date.parse(scores.fetchedAt) + scoreCacheLifetimeMs - Date.now()) / 1000,
    ),
  );

  return NextResponse.json(scores, {
    status: scores.source === "unavailable" ? 503 : 200,
    headers: {
      "Cache-Control":
        scores.source === "espn" && remainingFreshSeconds > 0
          ? `public, max-age=0, s-maxage=${remainingFreshSeconds}, stale-while-revalidate=30`
          : "no-store",
    },
  });
}
