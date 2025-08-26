import { useSelector } from "react-redux";

import StorageSearch from "./StorageSearch";
import StorageFileExplorer from "./StorageFileExplorer/StorageFileExplorer";

function CompanyInfoStorage() {
  const { selectedCompanyId } = useSelector((state) => state.companies);

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto pt-2">
      {/* Search  */}
      <StorageSearch />

      {/* Sorage files and folders details */}
      <div className="mb-1.5 pl-4 text-[14px] text-white">
        0B - 0 files -{" "}
        <span className="text-blue-primary border-blue-primary border-b border-dashed pb-1.5 font-medium">
          List of Filies.txt
        </span>{" "}
        - Incomplete date
      </div>

      {/* Storage files and folders */}
      {selectedCompanyId ? (
        <StorageFileExplorer companyId={selectedCompanyId} />
      ) : (
        <div className="flex h-full w-full flex-grow pl-4">
          <div className="flex h-full w-full items-center justify-center bg-[#0c0c0c]">
            <h3 className="text-[21px] text-white">No Date</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyInfoStorage;
