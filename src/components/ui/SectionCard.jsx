import { cn } from "@/lib/utils";

function SectionCardWithTitle({ className, children }) {
  return (
    <div
      className={cn(
        "border-gray-primary flex flex-col border-2 p-2.5 pb-6",
        className,
      )}
    >
      {/* Content */}
      {children}
    </div>
  );
}

export default SectionCardWithTitle;
