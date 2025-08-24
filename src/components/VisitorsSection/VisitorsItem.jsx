import { formatValueWithDots } from "@/lib/utils";

import GroupingLines from "@components/icons/GroupingLines";
import LineDashed from "@components/icons/LineDashed";

function VisitorsItem({ title, value }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center px-2.5">
        {/* Grouping lines */}
        <GroupingLines className="flex-shrink-0" />

        {/* Statistics */}
        <div className="flex flex-col gap-0.5 text-[16px]">
          <span>{title}</span>
          <span className="pl-2.5 font-medium text-white">
            {formatValueWithDots(value)}
          </span>
        </div>
      </div>

      {/* Separator line */}
      <LineDashed className="h-auto min-h-[1px] w-full" />
    </div>
  );
}

export default VisitorsItem;
