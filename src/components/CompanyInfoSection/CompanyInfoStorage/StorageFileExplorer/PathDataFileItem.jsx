import { cn, formatDateTime } from "@/lib/utils";

import fileIcon from "@assets/images/icon_file.svg";

function PathDataFileItem({ name, size, mod_time, className }) {
  return (
    <div
      className={cn(
        "grid grid-cols-[1fr_140px_45px] gap-3 text-[14px] text-white",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="inline-block h-[17px] w-[20px] flex-shrink-0">
          <img src={fileIcon} alt="File icon" />
        </span>
        <span>{name}</span>
      </div>
      <span>{formatDateTime(mod_time)}</span>
      <span>{size}</span>
    </div>
  );
}

export default PathDataFileItem;
