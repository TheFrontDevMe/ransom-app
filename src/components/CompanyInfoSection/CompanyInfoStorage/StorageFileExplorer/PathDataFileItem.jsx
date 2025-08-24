import fileIcon from "@assets/images/icon_file.svg";
import connectFolderAndFileIcon from "@assets/images/icon_connect-folder-and-file.svg";

function PathDataFileItem({ type, size, name, mod_time }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <span className="inline-block h-[18px] w-[9px] flex-shrink-0 -translate-y-1/2">
          <img
            src={connectFolderAndFileIcon}
            alt="Connect folder and file icon"
          />
        </span>
        <span className="inline-block h-[17px] w-[20px] flex-shrink-0">
          <img src={fileIcon} alt="File icon" />
        </span>
      </div>
      <span className="text-[14px] text-white">{name}</span>
    </div>
  );
}

export default PathDataFileItem;
