import { useDispatch, useSelector } from "react-redux";

import { navigateBackwardAndFetchCompanyStorageData } from "@/store/fileExplorerSlice";

import { cn } from "@/lib/utils";

import ArrowReturn from "@/components/icons/ArrowReturn";

function FileExplorerNavigateBackwardButton({ className }) {
  const dispatch = useDispatch();

  const { selectedCompanyId } = useSelector((state) => state.companies);

  return (
    <button
      className={cn("gap-3", className)}
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
  );
}

export default FileExplorerNavigateBackwardButton;
