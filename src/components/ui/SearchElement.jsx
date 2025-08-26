import { useCallback, useEffect, useRef, useState } from "react";

// import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { cn } from "@/lib/utils";

import searchIcon from "@assets/images/icon_search.svg";

function SearchElement({ searchValue = "", onSearch = () => {}, className }) {
  const [searchQuery, setSearchQuery] = useState(searchValue);

  const searchRef = useRef(null);

  useEffect(() => {
    setSearchQuery(searchValue);
  }, [searchValue]);

  const handleSearchQueryChange = useCallback(
    (event) => {
      setSearchQuery(event.target.value);

      const timeOut = setTimeout(() => {
        onSearch(event.target.value);
      }, 300);

      return () => clearTimeout(timeOut);
    },
    [onSearch],
  );

  // useClickOutside(searchRef, () => {
  //   setSearchQuery("");

  //   onSearch("");
  // });

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      <span className="absolute top-1/2 left-2.5 h-5 w-5 -translate-y-1/2">
        <img src={searchIcon} alt="Search icon" />
      </span>
      <input
        type="search"
        name="search"
        placeholder="Search"
        autoComplete="off"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        className="border-gray-primary bg-black-primary hover:border-text-secondary focus:border-green-primary focus:bg-black-secondary w-full border border-dashed p-3 pl-11 text-[14px] text-white outline-0 transition-all placeholder:text-white"
      />
    </div>
  );
}

export default SearchElement;
