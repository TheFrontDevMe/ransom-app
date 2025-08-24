import { useEffect, useState } from "react";

import { getCountdown } from "@/lib/utils";

export function useCountdown(timerExpiry) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!timerExpiry) return;

    const updateCountdown = () => {
      setCountdown(getCountdown(timerExpiry));
    };

    // Initialize immediately
    updateCountdown();

    // Calculate delay until the next full minute
    const now = new Date();
    const msUntilNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    // First timeout to sync exactly at the next minute
    const timeoutId = setTimeout(() => {
      updateCountdown();

      // Then repeat every full minute
      const intervalId = setInterval(updateCountdown, 60 * 1000);

      // Cleanup for interval
      return () => clearInterval(intervalId);
    }, msUntilNextMinute);

    // Cleanup for timeout
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timerExpiry]);

  return countdown;
}
