import { cn } from "@/lib/utils";

import protectIcon from "@assets/images/icon_protect.svg";

function CompanyPublishedBadge({ className }) {
  return (
    <div
      className={cn(
        "border-gray-primary bg-black-primary border border-dashed p-1.5",
        className,
      )}
    >
      <div className="bg-gray-primary border-gray-primary flex items-center gap-1 border px-2 py-1">
        <span className="flsh-shrink-0 h-4 w-4">
          <img src={protectIcon} alt="Protect icon" />
        </span>
        <span className="text-[14px] text-black">Published</span>
      </div>
    </div>
  );
}

export default CompanyPublishedBadge;
