import HeaderNavigationBlock from "./HeaderNavigationBlock";
import HeaderFilterBlock from "./HeaderFilterBlock";

function Header() {
  return (
    <header id="header">
      <div className="border-gray-primary flex items-center justify-between gap-3.5 border-b-2 pb-3.5 pl-1.5">
        <HeaderNavigationBlock />
        <HeaderFilterBlock />
      </div>
    </header>
  );
}

export default Header;
