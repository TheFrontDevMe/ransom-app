import { cn } from "@/lib/utils";

import sectionTitleBackground from "@assets/images/bg_section-title_sm.svg";

function SectionTitle({ title, className }) {
  return (
    <div className={cn("relative h-10", className)}>
      {/* Background pattern */}
      <div className="absolute inset-0">
        <img
          src={sectionTitleBackground}
          alt="Grey lines"
          className="object-fill"
        />
      </div>
      {/* Title */}
      <h2 className="relative text-center text-[32px] font-medium text-black">
        {title}
      </h2>
    </div>
  );
}

export default SectionTitle;
