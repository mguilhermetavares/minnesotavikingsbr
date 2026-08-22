import { NextRequest, NextResponse } from "next/server";

import { getCurrentSchedule, getSchedule } from "@/data/schedules";
import { getEspnVikingsScores } from "@/lib/espn";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const requestedSeason = Number(request.nextUrl.searchParams.get("season"));
  const schedule = getSchedule(requestedSeason) ?? getCurrentSchedule();
  const scores = await getEspnVikingsScores(schedule.season);

  return NextResponse.json(scores, {
    headers: {
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=30",
    },
  });
}
