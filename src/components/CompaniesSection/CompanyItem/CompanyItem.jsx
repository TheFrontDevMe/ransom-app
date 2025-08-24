import { useDispatch, useSelector } from "react-redux";

import { clearFileExplorerData } from "@/store/fileExplorerSlice";
import { setSelectedCompanyId } from "@/store/companiesSlice";
import { cn, formatValueWithDots } from "@/lib/utils";

import CountryFlagAndName from "@components/ui/CountryFlagAndName";
import CompanyPublishedBadge from "@/components/ui/CompanyPublishedBadge";
import CompanyItemPinAndTimerBadge from "./CompanyItemPinAndTimerBadge";

import companyItemBgImage from "@assets/images/bg_company-item.svg";

import topLeftCornerIcon from "@assets/images/icon_corner_top-left.svg";
import bottomLeftCornerIcon from "@assets/images/icon_corner_bottom-left.svg";

function CompanyItem({ companyItemData }) {
  const { selectedCompanyId } = useSelector((state) => state.companies);

  const {
    country,
    employees,
    id,
    is_published,
    name,
    overview,
    revenue,
    timer_expiry,
    views,
  } = companyItemData;

  const dispatch = useDispatch();

  function handleCompanyItemClick() {
    // 1. Clear previous company's file explorer data
    dispatch(clearFileExplorerData());

    // 2. Set the selected company
    dispatch(setSelectedCompanyId(id));
  }

  return (
    <div
      className={cn(
        "border-gray-primary relative cursor-pointer border border-dashed px-2.5 py-2 transition-all",
        selectedCompanyId === id
          ? "bg-black-primary m-1 px-2.5 py-2"
          : "px-4 py-3.5",
      )}
      onClick={handleCompanyItemClick}
    >
      {/* //! Background image */}
      {/* <div className="absolute inset-0 bg-cover bg-center">
        <img src={companyItemBgImage} alt="Company item background" />
      </div> */}

      {/* Corner Icons */}
      {selectedCompanyId === id && (
        <>
          <div className="absolute -top-[7px] -left-[6px]">
            <img src={topLeftCornerIcon} alt="Top left corner icon" />
          </div>
          <div className="absolute -bottom-[7px] -left-[6px]">
            <img src={bottomLeftCornerIcon} alt="Bottom left corner icon" />
          </div>
          <div className="absolute -top-[7px] -right-[6px] rotate-180">
            <img src={bottomLeftCornerIcon} alt="Bottom left corner icon" />
          </div>
          <div className="absolute -right-[6px] -bottom-[7px] rotate-180">
            <img src={topLeftCornerIcon} alt="Top left corner icon" />
          </div>
        </>
      )}

      {/* Content */}
      <div>
        <div className="relative flex flex-col gap-7">
          <div className="flex flex-col gap-0.5">
            {/* Name */}
            <h3 className="text-[21px] text-white">{name}</h3>
            {/* Flag and country */}
            <CountryFlagAndName contryCode={country} />
          </div>

          <div className="flex gap-4">
            {/* Revenue */}
            <div className="flex flex-col">
              <span className="text-[10px]">Revenue</span>
              <span className="text-[14px]">${revenue}</span>
            </div>
            {/* Employees */}
            <div className="flex flex-col">
              <span className="text-[10px]">Employees</span>
              <span className="text-[14px]">{employees}</span>
            </div>
            {/* Views */}
            <div className="flex flex-col">
              <span className="text-[10px]">Views</span>
              <span className="text-[14px]">{formatValueWithDots(views)}</span>
            </div>
          </div>
        </div>
        {is_published ? (
          <CompanyPublishedBadge className="absolute top-0.5 right-1" />
        ) : (
          <CompanyItemPinAndTimerBadge timerExpiry={timer_expiry} />
        )}
      </div>
    </div>
  );
}

export default CompanyItem;
