import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCompanyStorageData } from "@/store/fileExplorerSlice";

import FileExplorerPathData from "./FileExplorerPathData";

function StorageFileExplorer({ companyId, path = "/" }) {
  const { pathData, isLoading, success } = useSelector(
    (state) => state.fileExplorer,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (success === undefined && !isLoading) {
      dispatch(fetchCompanyStorageData({ companyId, path }));
    }
  }, [success, isLoading, dispatch, companyId, path]);

  if (isLoading) return <div className="bg-[#0c0c0c]"></div>;

  if (!success) return <div className="bg-[#0c0c0c]"></div>;

  return (
    <div className="custom-scrollbar flex-grow overflow-auto pl-4">
      <div className="h-full bg-[#0c0c0c] p-6">
        {pathData.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center">
            <h3 className="text-[21px] text-white">No Date</h3>
          </div>
        ) : (
          <FileExplorerPathData companyId={companyId} path={path} />
        )}
      </div>
    </div>
  );
}

export default StorageFileExplorer;
