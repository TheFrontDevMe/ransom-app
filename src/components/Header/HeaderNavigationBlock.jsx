import { useDispatch, useSelector } from "react-redux";

import { setCompaniesToShow } from "@/store/companiesSlice";

import { cn } from "@/lib/utils";

function HeaderNavigationBlock() {
  const { companies } = useSelector((state) => state.dashboard);
  const { companiesToShow } = useSelector((state) => state.companies);

  const { awaiting = 0, published = 0 } = companies.stats || {};

  const dispatch = useDispatch();

  return (
    <nav className="flex items-center gap-12">
      <NavigationItem
        title="all"
        count={awaiting + published}
        activeNavItem={companiesToShow}
        onClick={() => dispatch(setCompaniesToShow("all"))}
      />
      <NavigationItem
        title="awaiting"
        count={awaiting}
        activeNavItem={companiesToShow}
        onClick={() => dispatch(setCompaniesToShow("awaiting"))}
      />
      <NavigationItem
        title="published"
        count={published}
        activeNavItem={companiesToShow}
        onClick={() => dispatch(setCompaniesToShow("published"))}
      />
    </nav>
  );
}

function NavigationItem({ title, count, activeNavItem, onClick }) {
  return (
    <button className="relative" onClick={onClick}>
      <span
        className={cn(
          "text-[14px] capitalize transition-all",
          activeNavItem === title && "font-medium text-white",
        )}
      >
        {title}
      </span>
      <span
        className={cn(
          "font-darker-grotesque absolute -top-2 -right-3 text-[10px] font-semibold capitalize transition-all",
          activeNavItem === title && "text-white",
        )}
      >
        {count}
      </span>
    </button>
  );
}

export default HeaderNavigationBlock;
