import { useCountdown } from "@/lib/hooks/useCountdown";
import { cn } from "@/lib/utils";

function CompanyItemTimerBadge({ timerExpiry }) {
  const { countdown, isExpiring } = useCountdown(timerExpiry);

  return (
    <div className="border-gray-primary bg-black-primary absolute -top-[1px] -right-[1px] flex-shrink-0 border border-dashed p-0.5">
      <div
        className={cn(
          "border-gray-primary border px-1 py-0.5 text-[10px] text-black",
          isExpiring ? "bg-red-primary text-white" : "bg-gray-primary",
        )}
      >
        {countdown}
      </div>
    </div>
  );
}

export default CompanyItemTimerBadge;
