import { useEffect, useState } from "react";

import { getCountdown } from "@/lib/utils";

/**
 * React hook to provide a live-updating countdown string and expiring flag.
 *
 * - Uses `getCountdown` util to compute string + <24h status
 * - Updates immediately on mount
 * - Re-syncs with the next full minute, then updates every minute
 *
 * @param {number} timerExpiry - Future timestamp in ms
 * @returns {{ countdown: string, isExpiring: boolean }}
 *   countdown → formatted countdown string
 *   isExpiring → true if less than 24h remain
 */
export function useCountdown(timerExpiry) {
  const [countdown, setCountdown] = useState("");
  const [isExpiring, setIsExpiring] = useState(false);

  useEffect(() => {
    if (!timerExpiry) return;

    const updateCountdown = () => {
      const [countdown, isExpiring] = getCountdown(timerExpiry);
      setCountdown(countdown);
      setIsExpiring(isExpiring);
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
    return () => clearTimeout(timeoutId);
  }, [timerExpiry]);

  return { countdown, isExpiring };
}
