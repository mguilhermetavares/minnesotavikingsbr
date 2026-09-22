"use client";

import { useEffect, useState } from "react";

import {
  isLiveGameUpdate,
  mergeLiveScoreUpdates,
  type DisplayScheduleGame,
} from "@/lib/live-scores";
import { getScoreRefreshSeasonType } from "@/lib/game-selection";
import type { ScheduleGame } from "@/lib/schedule";

export function useLiveSchedule(games: ScheduleGame[], season: number) {
  const [snapshot, setSnapshot] = useState({ base: games, games });

  useEffect(() => {
    let cancelled = false;
    let currentGames: DisplayScheduleGame[] = games;
    let timer: ReturnType<typeof setTimeout>;
    let activeRequest: AbortController | undefined;

    async function refreshScores() {
      // Settled results are already in the server-rendered schedule, so ESPN
      // is only asked during a game window. This local timer also wakes a page
      // left open before kickoff.
      if (getScoreRefreshSeasonType(currentGames, Date.now()) !== null) {
        activeRequest = new AbortController();
        const timeout = setTimeout(() => activeRequest?.abort(), 10_000);
        try {
          const response = await fetch(`/api/vikings-score?season=${season}`, {
            signal: activeRequest.signal,
          });
          if (response.ok) {
            const payload: unknown = await response.json();
            if (
              payload &&
              typeof payload === "object" &&
              "source" in payload &&
              payload.source === "espn" &&
              "season" in payload &&
              payload.season === season &&
              "games" in payload &&
              Array.isArray(payload.games) &&
              !cancelled
            ) {
              currentGames = mergeLiveScoreUpdates(
                currentGames,
                payload.games.filter(isLiveGameUpdate),
                season,
                Date.now(),
              );
              setSnapshot({ base: games, games: currentGames });
            }
          }
        } catch {
          // Keep the local schedule and every previously confirmed score.
        } finally {
          clearTimeout(timeout);
        }
      }
      if (!cancelled) timer = setTimeout(refreshScores, 60_000);
    }

    // Deferring the initial fetch also coalesces React Strict Mode's effect replay.
    timer = setTimeout(refreshScores, 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      activeRequest?.abort();
    };
  }, [games, season]);

  return snapshot.base === games ? snapshot.games : games;
}
