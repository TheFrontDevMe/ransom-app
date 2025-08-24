import { useWorldClock } from "@/lib/hooks/useWorldClock";

import SquareBracketOpen from "@components/icons/SquareBracketOpen";
import SquareBracketClose from "@components/icons/SquareBracketClose";

function WorldClockItem({ city, timeZone }) {
  const { time, amOrPm } = useWorldClock(timeZone);

  return (
    <div className="flex items-center justify-between">
      <span className="text-[20px]">{city}</span>

      <div className="flex items-center gap-1.5">
        <span className="text-[14px]">{amOrPm}</span>

        <div className="flex items-center">
          <SquareBracketOpen />
          <span className="text-[16px]">{time}</span>
          <SquareBracketClose />
        </div>
      </div>
    </div>
  );
}

export default WorldClockItem;
