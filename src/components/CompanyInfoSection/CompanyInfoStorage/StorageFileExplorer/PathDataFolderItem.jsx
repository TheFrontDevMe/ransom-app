import { useDispatch, useSelector } from "react-redux";

import { changeDirectoryAndFetchCompanyStorageData } from "@/store/fileExplorerSlice";

import { cn, formatDateTime } from "@/lib/utils";

import folderIcon from "@assets/images/icon_folder.svg";

function PathDataFolderItem({ name, size, mod_time, className }) {
  const dispath = useDispatch();

  const { selectedCompanyId } = useSelector((state) => state.companies);

  function handleDirectoryClick() {
    dispath(
      changeDirectoryAndFetchCompanyStorageData({
        companyId: selectedCompanyId,
        path: `/${name}`,
      }),
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-[1fr_140px_45px] gap-3 text-[14px] text-white",
        className,
      )}
      onClick={handleDirectoryClick}
    >
      <div className="flex cursor-pointer items-center gap-3">
        <span className="inline-block h-[17px] w-[22px] flex-shrink-0">
          <img src={folderIcon} alt="Folder icon" />
        </span>
        <span className="">{name}</span>
      </div>
      <span>{formatDateTime(mod_time)}</span>
      <span>{size || "-"}</span>
    </div>
  );
}

export default PathDataFolderItem;
