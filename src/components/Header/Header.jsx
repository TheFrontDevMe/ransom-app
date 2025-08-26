import HeaderNavigationBlock from "./HeaderNavigationBlock";
import HeaderSearchBlock from "./HeaderSearchBlock";

function Header() {
  return (
    <header id="header">
      <div className="border-gray-primary flex items-center justify-between gap-3.5 border-b-2 pb-3.5 pl-1.5">
        <HeaderNavigationBlock />

        <HeaderSearchBlock />
      </div>
    </header>
  );
}

export default Header;
