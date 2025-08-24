import { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { useClickOutside } from "@/lib/hooks/useClickOutside";

import filterIcon from "@assets/images/icon_filter.svg";
import ArrowRight from "@components/icons/ArrowRight";
import filterOptionIcon from "@assets/images/icon_filter-option.svg";
import filterOptionSelectedIcon from "@assets/images/icon_filter-option_selected.svg";

function HeaderFilterBlock() {
  const [showSelectOptions, setShowSelectOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const selectRef = useRef(null);

  function handleOptionSelect(option) {
    setShowSelectOptions(false);
    setSelectedOption(option);
  }

  // Close the select options when clicking outside
  useClickOutside(selectRef, () => setShowSelectOptions(false));

  return (
    <div ref={selectRef} className="relative flex w-[311px] flex-col gap-1">
      {/* Select button */}
      <button
        className={cn(
          "hover:bg-black-secondary hover:border-green-primary justify-between gap-3 border border-dashed px-2.5 py-1",
          showSelectOptions
            ? "bg-black-secondary border-green-primary"
            : "bg-black-primary border-gray-primary",
        )}
        onClick={() => setShowSelectOptions((prevState) => !prevState)}
      >
        <span className="inline-block h-5 w-5 flex-shrink-0">
          <img src={filterIcon} alt="Filter icon" />
        </span>
        <span className="text-[21px] text-white">
          {selectedOption || "Filter"}
        </span>
        <span className="ml-auto inline-block h-[13px] w-[13px] flex-shrink-0">
          <ArrowRight
            className={cn(
              "text-gray-primary transition-all",
              showSelectOptions ? "-rotate-90" : "rotate-90",
            )}
          />
        </span>
      </button>
      {/* Select options */}
      {showSelectOptions && (
        <ul className="border-gray-primary bg-black-primary absolute top-10 left-0 z-[999] flex w-full flex-col gap-3.5 border border-dashed px-6 py-5">
          {["Filter 1", "Filter 2", "Filter 3", "Filter 4", "Filter 5"].map(
            (option) => (
              <li
                key={option}
                className={"flex cursor-pointer items-center gap-4"}
                onClick={() => handleOptionSelect(option)}
              >
                <span>
                  <img
                    src={
                      selectedOption === option
                        ? filterOptionSelectedIcon
                        : filterOptionIcon
                    }
                    alt="Filter option icon"
                  />
                </span>
                <span className="text-[21px] text-white">{option}</span>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}

export default HeaderFilterBlock;
