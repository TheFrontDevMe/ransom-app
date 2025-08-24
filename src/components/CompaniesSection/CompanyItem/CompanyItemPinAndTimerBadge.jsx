import { useCountdown } from "@/lib/hooks/useCountdown";

import pinIcon from "@assets/images/icon_pin.svg";

function CompanyItemPinAndTimerBadge({ timerExpiry }) {
  const countdown = useCountdown(timerExpiry);

  return (
    <div className="absolute -top-[1px] -right-[1px] flex items-center gap-0.5">
      {/* Pin badge */}
      <div className="border-gray-primary bg-black-primary flex-shrink-0 border border-dashed p-0.5">
        <div className="bg-gray-primary border-gray-primary border p-1">
          <img src={pinIcon} alt="Pin icon" />
        </div>
      </div>

      {/* Timer badge */}
      <div className="border-gray-primary bg-black-primary flex-shrink-0 border border-dashed p-0.5">
        <div className="bg-gray-primary border-gray-primary border px-1 py-0.5 text-[10px] text-black">
          {countdown}
        </div>
      </div>
    </div>
  );
}

export default CompanyItemPinAndTimerBadge;
