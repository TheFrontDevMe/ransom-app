import { useRef, useState } from "react";

import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { cn } from "@/lib/utils";

import searchIcon from "@assets/images/icon_search.svg";
import ArrowRight from "@/components/icons/ArrowRight";
import ThreeArrowsRight from "@/components/icons/ThreeArrowsRight";

const SIZE_OPTIONS = ["mb", "gb", "tb"];

function StorageSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex items-center justify-between gap-4 pl-2">
      {/* Search input */}
      <div className="relative">
        <span className="absolute top-1/2 left-2.5 h-5 w-5 -translate-y-1/2">
          <img src={searchIcon} alt="Search icon" />
        </span>
        <input
          type="search"
          name="search"
          placeholder="Search"
          autoComplete="off"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="border-gray-primary bg-black-primary hover:border-text-secondary focus:border-green-primary focus:bg-black-secondary w-full border border-dashed p-3 pl-11 text-[14px] outline-0 transition-all placeholder:text-white"
        />
      </div>

      {/* Size select elements */}
      <div className="flex items-center gap-2.5">
        <SizeSelectElement />
        <ThreeArrowsRight />
        <SizeSelectElement />
      </div>
    </div>
  );
}

function SizeSelectElement() {
  const [showSelectOptions, setShowSelectOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(SIZE_OPTIONS[0]);

  const [inputValue, setInputValue] = useState("");

  const selectRef = useRef(null);

  function handleOptionSelect(option) {
    setShowSelectOptions(false);
    setSelectedOption(option);
  }

  // Close the select options when clicking outside
  useClickOutside(selectRef, () => setShowSelectOptions(false));

  return (
    <div ref={selectRef} className="relative flex flex-col gap-1">
      {/* Size input */}
      <input
        type="number"
        name="size-from"
        placeholder="Size"
        autoComplete="off"
        min={0}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        className="border-gray-primary bg-black-primary hover:border-text-secondary focus:border-green-primary focus:bg-black-secondary w-full border border-dashed p-3 pr-16 text-[14px] outline-0 transition-all placeholder:text-white"
      />

      {/* Size select */}
      <div className="absolute top-1/2 right-1 -translate-y-1/2">
        <button
          className="border-gray-primary bg-black-primary gap-2 border border-dashed px-2.5 py-2"
          onClick={() => setShowSelectOptions((prevState) => !prevState)}
        >
          <span className="inline-block flex-shrink-0">
            <ArrowRight
              className={cn(
                "transition-all",
                showSelectOptions ? "text-green-primary" : "text-white",
              )}
            />
          </span>
          <span className="text-[14px] text-white">{selectedOption}</span>
        </button>
        {/* Select options */}
        {showSelectOptions && (
          <ul className="absolute top-[38px] left-0 z-[999] flex w-full flex-col gap-0.5">
            {SIZE_OPTIONS.map(
              (option) =>
                option !== selectedOption && (
                  <li
                    key={option}
                    className="border-gray-primary bg-black-primary flex cursor-pointer items-center gap-2 border border-dashed px-2.5 py-2 transition-all hover:bg-[#404040]"
                    onClick={() => handleOptionSelect(option)}
                  >
                    <span>
                      <ArrowRight className="text-green-primary" />
                    </span>
                    <span className="text-[14px] text-white">{option}</span>
                  </li>
                ),
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default StorageSearch;
