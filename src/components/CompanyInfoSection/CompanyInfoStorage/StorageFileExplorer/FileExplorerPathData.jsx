import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCompanyStorageData,
  selectDataByPath,
  toggleFolder,
} from "@/store/fileExplorerSlice";

import PathDataFileItem from "./PathDataFileItem";
import PathDataFolderItem from "./PathDataFolderItem";

function FileExplorerPathData({ companyId, path = "/" }) {
  const loading = useSelector(
    (state) => state.fileExplorer.loadingByPath[path],
  );
  const status = useSelector((state) => state.fileExplorer.successByPath[path]);
  const data = useSelector(selectDataByPath(path));
  const openFolders =
    useSelector((state) => state.fileExplorer.openFoldersByPath[path]) || {};

  const dispatch = useDispatch();

  useEffect(() => {
    // only fetch if this path hasn't been fetched yet
    if (status === undefined && !loading) {
      dispatch(fetchCompanyStorageData({ companyId, path }));
    }
  }, [loading, status, dispatch, companyId, path]);

  function handleToggleFolder(folderName) {
    dispatch(toggleFolder({ path, folderName }));
  }

  if (loading) return <></>;

  if (status === "failed") return <></>;

  return (
    <ul className="ml-1.5 flex flex-col gap-3.5">
      {data.map((item) =>
        item.type === "file" ? (
          <li key={`${path}${item.name}`}>
            <PathDataFileItem {...item} />
          </li>
        ) : (
          <li key={`${path}${item.name}`}>
            <div className="flex flex-col gap-3.5">
              <PathDataFolderItem
                {...item}
                onToggleFolder={() => handleToggleFolder(item.name)}
              />

              <div className="ml-2.5">
                {openFolders[item.name] && (
                  <FileExplorerPathData
                    companyId={companyId}
                    path={`${path}${item.name}/`}
                  />
                )}
              </div>
            </div>
          </li>
        ),
      )}
    </ul>
  );
}

export default FileExplorerPathData;
