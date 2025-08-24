import folderIcon from "@assets/images/icon_folder.svg";
import connectFolderAndFileIcon from "@assets/images/icon_connect-folder-and-file.svg";

function PathDataFolderItem({ type, size, name, mod_time, onToggleFolder }) {
  return (
    <div
      className="flex max-w-min cursor-pointer items-center gap-3"
      onClick={onToggleFolder}
    >
      <div className="flex items-center gap-1">
        <span className="inline-block h-[18px] w-[9px] flex-shrink-0 -translate-y-1/2">
          <img
            src={connectFolderAndFileIcon}
            alt="Connect folder and file icon"
          />
        </span>
        <span className="inline-block h-[17px] w-[22px] flex-shrink-0">
          <img src={folderIcon} alt="Folder icon" />
        </span>
      </div>
      <span className="text-[14px] text-white">{name}</span>
    </div>
  );
}

export default PathDataFolderItem;
