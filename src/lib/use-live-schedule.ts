"use client";

import { useEffect, useMemo, useState } from "react";

import {
  mergeLiveScoreUpdates,
  type LiveGameUpdate,
  type LiveScoreResponse,
} from "@/lib/live-scores";
import { getScoreRefreshSeasonType } from "@/lib/game-selection";
import type { ScheduleGame } from "@/lib/schedule";

export function useLiveSchedule(
  games: ScheduleGame[],
  season: number,
  enabled: boolean,
  referenceTime: number,
  fetchInitially: boolean = false,
) {
  const [liveUpdates, setLiveUpdates] = useState<LiveGameUpdate[]>([]);
  const displayedGames = useMemo(
    () => mergeLiveScoreUpdates(games, liveUpdates, season, referenceTime),
    [games, liveUpdates, referenceTime, season],
  );
  const shouldPoll =
    enabled &&
    getScoreRefreshSeasonType(displayedGames, referenceTime) !== null;

  useEffect(() => {
    if (!enabled || (!fetchInitially && !shouldPoll)) {
      return;
    }

    let cancelled = false;
    let pollTimer: ReturnType<typeof setTimeout> | undefined;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;
    let idleCallbackId: number | undefined;
    let activeRequest: AbortController | undefined;

    function scheduleNextRefresh() {
      pollTimer = setTimeout(refreshScores, 60_000);
    }

    async function refreshScores() {
      activeRequest?.abort();
      activeRequest = new AbortController();

      try {
        const response = await fetch(`/api/vikings-score?season=${season}`, {
          signal: activeRequest.signal,
        });

        if (!response.ok) {
          if (!cancelled && shouldPoll) {
            scheduleNextRefresh();
          }
          return;
        }

        const payload = (await response.json()) as Partial<LiveScoreResponse>;
        if (
          cancelled ||
          payload.source !== "espn" ||
          payload.season !== season ||
          !Array.isArray(payload.games)
        ) {
          if (!cancelled && shouldPoll) {
            scheduleNextRefresh();
          }
          return;
        }

        setLiveUpdates(payload.games);
        const refreshedGames = mergeLiveScoreUpdates(
          games,
          payload.games,
          season,
          Date.now(),
        );
        const continuePolling =
          getScoreRefreshSeasonType(refreshedGames, Date.now()) !== null;

        if (!cancelled && shouldPoll && continuePolling) {
          scheduleNextRefresh();
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        if (!cancelled && shouldPoll) {
          scheduleNextRefresh();
        }
      }
    }

    if (typeof window.requestIdleCallback === "function") {
      idleCallbackId = window.requestIdleCallback(refreshScores, {
        timeout: 2_000,
      });
    } else {
      fallbackTimer = setTimeout(refreshScores, 1_000);
    }

    return () => {
      cancelled = true;
      activeRequest?.abort();

      if (idleCallbackId !== undefined) {
        window.cancelIdleCallback(idleCallbackId);
      }

      if (fallbackTimer !== undefined) {
        clearTimeout(fallbackTimer);
      }

      if (pollTimer !== undefined) {
        clearTimeout(pollTimer);
      }
    };
  }, [enabled, fetchInitially, games, season, shouldPoll]);

  return displayedGames;
}
