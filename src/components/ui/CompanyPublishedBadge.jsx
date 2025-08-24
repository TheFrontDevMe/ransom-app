import { cn } from "@/lib/utils";

import protectIcon from "@assets/images/icon_protect.svg";

function CompanyPublishedBadge({ className }) {
  return (
    <div
      className={cn(
        "border-gray-primary bg-black-primary border border-dashed p-0.5",
        className,
      )}
    >
      <div className="bg-gray-primary border-gray-primary flex items-center gap-1 border p-1">
        <span className="flsh-shrink-0">
          <img src={protectIcon} alt="Protect icon" />
        </span>
        <span className="text-[10px] text-black">Published</span>
      </div>
    </div>
  );
}

export default CompanyPublishedBadge;
