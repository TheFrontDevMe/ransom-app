import { useCountdown } from "@/lib/hooks/useCountdown";
import { cn } from "@/lib/utils";

function CompanyItemTimerBadge({ timerExpiry, className }) {
  const { countdown, isExpiring } = useCountdown(timerExpiry);

  return (
    <div
      className={cn(
        "border-gray-primary bg-black-primary border border-dashed p-1.5",
        className,
      )}
    >
      <div
        className={cn(
          "border-gray-primary border px-2 py-1 text-[14px] text-black",
          isExpiring ? "bg-red-primary text-white" : "bg-gray-primary",
        )}
      >
        {countdown}
      </div>
    </div>
  );
}

export default CompanyItemTimerBadge;
