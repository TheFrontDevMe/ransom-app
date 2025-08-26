import { useDispatch, useSelector } from "react-redux";

import { setSearchFileNameQuery } from "@/store/fileExplorerSlice";

import SearchElement from "@/components/ui/SearchElement";

function StorageSearch() {
  const { searchFileNameQuery } = useSelector((state) => state.fileExplorer);

  const dispatch = useDispatch();

  return (
    <div className="pl-2">
      <SearchElement
        searchValue={searchFileNameQuery}
        onSearch={(query) => dispatch(setSearchFileNameQuery(query))}
        className="w-80"
      />
    </div>
  );
}

export default StorageSearch;
