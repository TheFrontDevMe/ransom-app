import { useDispatch, useSelector } from "react-redux";

import { setSearchCompanyNameQuery } from "@/store/companiesSlice";

import SearchElement from "@/components/ui/SearchElement";

function HeaderSearchBlock() {
  // const { searchCompanyNameQuery } = useSelector((state) => state.companies);

  const dispatch = useDispatch();

  return (
    <div>
      <SearchElement
        className="w-80"
        // searchValue={searchCompanyNameQuery}
        onSearch={(query) => dispatch(setSearchCompanyNameQuery(query))}
      />
    </div>
  );
}

export default HeaderSearchBlock;
