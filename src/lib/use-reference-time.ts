"use client";

import { useEffect, useState } from "react";

export function useReferenceTime(initialReferenceTime: number) {
  const [referenceTime, setReferenceTime] = useState(initialReferenceTime);

  useEffect(() => {
    setReferenceTime(Date.now());
    const timer = window.setInterval(() => setReferenceTime(Date.now()), 60_000);

    return () => window.clearInterval(timer);
  }, []);

  return referenceTime;
}
