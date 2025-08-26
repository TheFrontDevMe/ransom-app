import { useDispatch, useSelector } from "react-redux";

import { navigateBackwardAndFetchCompanyStorageData } from "@/store/fileExplorerSlice";

import PathDataFileItem from "./PathDataFileItem";
import PathDataFolderItem from "./PathDataFolderItem";

import ArrowReturn from "@/components/icons/ArrowReturn";
import FileExplorerNavigateBackwardButton from "@/components/ui/FileExplorerNavigateBackwardButton";

const COL_TITLES = ["Name", "Last modified", "Size"];

function FileExplorerPathData() {
  const {
    currentDirectory,
    searchFileNameQuery,
    pathData,
    isLoading,
    success,
    error,
  } = useSelector((state) => state.fileExplorer);

  const { selectedCompanyId } = useSelector((state) => state.companies);

  const dispatch = useDispatch();

  if (isLoading) return <></>;

  const searchedPathData = pathData.filter((item) =>
    item.name.toLowerCase().includes(searchFileNameQuery.toLowerCase()),
  );

  return (
    <>
      {/* Current path */}
      <h3 className="mb-3.5 text-[21px] text-white">
        Current path: {currentDirectory === "" ? "/" : currentDirectory}
      </h3>

      {!success ? (
        <div className="flex flex-col items-start gap-4">
          <FileExplorerNavigateBackwardButton />
          <h3 className="text-[21px] text-white">No Date</h3>
        </div>
      ) : (
        <>
          <div className="border-gray-primary grid grid-cols-[1fr_140px_45px] gap-3 border-b border-dashed p-2">
            {COL_TITLES.map((title) => (
              <span
                key={title}
                className="text-center text-[14px] font-medium text-white underline"
              >
                {title}
              </span>
            ))}
          </div>

          <div className="px-1 pt-3 pb-1">
            {/* Return to previous path */}
            {currentDirectory !== "" && (
              <button
                className="mb-3.5 gap-3"
                onClick={() =>
                  dispatch(
                    navigateBackwardAndFetchCompanyStorageData({
                      companyId: selectedCompanyId,
                    }),
                  )
                }
              >
                <ArrowReturn className="h-5 w-5 text-white" />
                <span className="text-[14px] text-white">Parent directory</span>
              </button>
            )}

            <ul className="flex flex-col gap-3.5">
              {searchedPathData.length > 0 ? (
                searchedPathData.map((item) => (
                  <li key={`${currentDirectory}/${item.name}`}>
                    {item.type === "file" ? (
                      <PathDataFileItem {...item} />
                    ) : (
                      <PathDataFolderItem
                        {...item}
                        onToggleFolder={() => handleToggleFolder(item.name)}
                      />
                    )}
                  </li>
                ))
              ) : (
                <h3 className="text-[21px] text-white">No data found</h3>
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default FileExplorerPathData;
