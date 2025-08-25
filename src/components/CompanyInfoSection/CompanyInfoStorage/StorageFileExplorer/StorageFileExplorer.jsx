import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCompanyStorageData,
  selectDataByPath,
} from "@/store/fileExplorerSlice";

import FileExplorerPathData from "./FileExplorerPathData";

import folderIcon from "@assets/images/icon_folder.svg";

function StorageFileExplorer({ companyId, path = "/" }) {
  const loading = useSelector(
    (state) => state.fileExplorer.loadingByPath[path],
  );
  const status = useSelector((state) => state.fileExplorer.successByPath[path]);
  const data = useSelector(selectDataByPath(path));

  const dispatch = useDispatch();

  useEffect(() => {
    // only fetch if this path hasn't been fetched yet
    if (status === undefined && !loading) {
      dispatch(fetchCompanyStorageData({ companyId, path }));
    }
  }, [dispatch, companyId, path]);

  if (loading) return <div className="bg-[#0c0c0c]"></div>;

  if (status === "failed") return <div className="bg-[#0c0c0c]"></div>;

  return (
    <div className="ml-4 flex-grow bg-[#0c0c0c]">
      {data.length === 0 ? (
        <div className="flex h-full w-full items-center justify-center">
          <h3 className="text-[21px] text-white">No Date</h3>
        </div>
      ) : (
        <div className="p-6">
          {/* All data */}
          <div className="mb-3.5 flex items-center gap-3">
            <span className="inline-block h-[17px] w-[22px] flex-shrink-0">
              <img src={folderIcon} alt="Folder icon" />
            </span>
            <span className="text-[14px] text-white">All data</span>
          </div>

          {/* Data items */}

          <FileExplorerPathData companyId={companyId} path={path} />
        </div>
      )}
    </div>
  );
}

export default StorageFileExplorer;
