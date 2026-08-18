import { NextResponse } from "next/server";

import { getEspnVikingsScores } from "@/lib/espn";

export const runtime = "nodejs";

export async function GET() {
  const scores = await getEspnVikingsScores();

  return NextResponse.json(scores, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
