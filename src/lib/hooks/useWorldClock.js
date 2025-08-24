import { useEffect, useState } from "react";

import { formatTimeForTimezone } from "@/lib/utils";

/**
 * Custom hook that returns live time data for a given timezone.
 * Updates exactly when the minute changes.
 *
 * @param {string} timeZone - IANA timezone string (e.g. "America/New_York")
 * @returns {{ time: string, amOrPm: string }}
 */
export function useWorldClock(timeZone) {
  const [timeData, setTimeData] = useState(() =>
    formatTimeForTimezone(timeZone),
  );

  useEffect(() => {
    // Function to sync updates at the start of each new minute
    const syncUpdate = () => {
      setTimeData(formatTimeForTimezone(timeZone));

      const now = new Date();
      const msToNextMinute = (60 - now.getSeconds()) * 1000;

      timer = setTimeout(syncUpdate, msToNextMinute);
    };

    // Run immediately on mount
    let timer = setTimeout(syncUpdate, 0);

    // Cleanup timer on unmount or timezone change
    return () => clearTimeout(timer);
  }, [timeZone]);

  return timeData;
}
