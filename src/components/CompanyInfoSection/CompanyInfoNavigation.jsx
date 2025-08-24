import { useDispatch, useSelector } from "react-redux";

import { setCompanyInfoActiveTab } from "@/store/companiesSlice";

import { cn } from "@/lib/utils";

function CompanyInfoNavigation() {
  const { companyInfoActiveTab } = useSelector((state) => state.companies);

  const dispatch = useDispatch();

  function handleTabButtonClick(tab) {
    dispatch(setCompanyInfoActiveTab(tab));
  }

  return (
    <div className="border-gray-primary flex items-center gap-11 border-r border-b border-dashed px-7 py-3">
      <button
        className={cn(
          "pb-2 text-[14px] transition-all",
          companyInfoActiveTab === "overview" &&
            "border-gray-primary border-b border-dashed text-white",
        )}
        onClick={() => handleTabButtonClick("overview")}
      >
        Overview
      </button>
      <button
        className={cn(
          "pb-2 text-[14px] transition-all",
          companyInfoActiveTab === "storage" &&
            "border-gray-primary border-b border-dashed text-white",
        )}
        onClick={() => handleTabButtonClick("storage")}
      >
        Storage
      </button>
    </div>
  );
}

export default CompanyInfoNavigation;
