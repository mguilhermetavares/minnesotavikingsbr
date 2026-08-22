"use client";

import { useEffect, useState } from "react";

import { brazilTimeZone, resolveTimeZone } from "@/lib/time-zone";

export function useLocalTimeZone() {
  const [timeZone, setTimeZone] = useState(brazilTimeZone);

  useEffect(() => {
    try {
      const detectedTimeZone =
        Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimeZone(resolveTimeZone(detectedTimeZone));
    } catch {
      setTimeZone(brazilTimeZone);
    }
  }, []);

  return timeZone;
}
