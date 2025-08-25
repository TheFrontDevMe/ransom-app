import { useDispatch, useSelector } from "react-redux";

import { clearFileExplorerData } from "@/store/fileExplorerSlice";
import { setSelectedCompanyId } from "@/store/companiesSlice";
import { cn, formatValueWithDots } from "@/lib/utils";

import CountryFlagAndName from "@components/ui/CountryFlagAndName";
import CompanyPublishedBadge from "@/components/ui/CompanyPublishedBadge";
import CompanyItemTimerBadge from "./CompanyItemTimerBadge";

import topLeftCornerIcon from "@assets/images/icon_corner_top-left.svg";
import bottomLeftCornerIcon from "@assets/images/icon_corner_bottom-left.svg";
import DashedBox from "@/components/icons/DashedBox";

function CompanyItem({ companyItemData }) {
  const { selectedCompanyId } = useSelector((state) => state.companies);

  const {
    country,
    employees,
    id,
    is_published,
    name,
    overview: { description, website, files, size } = {},
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
        "relative cursor-pointer border border-dashed px-2.5 py-2 transition-all",
        selectedCompanyId === id
          ? "bg-black-primary border-gray-primary m-1 px-2.5 py-2"
          : "border-transparent px-4 py-3.5",
      )}
      onClick={handleCompanyItemClick}
    >
      {/* Dashed box */}
      {selectedCompanyId !== id && (
        <DashedBox className="absolute inset-0 h-full w-full" />
      )}

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
            {/* Files */}
            {is_published && (
              <div className="flex flex-col">
                <span className="text-[10px]">Files</span>
                <span className="text-[14px]">
                  {formatValueWithDots(files)}
                </span>
              </div>
            )}
            {/* Size */}
            {is_published && (
              <div className="flex flex-col">
                <span className="text-[10px]">Size</span>
                <span className="text-[14px]">{size}</span>
              </div>
            )}
          </div>
        </div>
        {is_published ? (
          <CompanyPublishedBadge
            className={cn(
              "absolute",
              selectedCompanyId === id ? "top-0.5 right-1" : "top-1 right-2.5",
            )}
          />
        ) : (
          <CompanyItemTimerBadge
            timerExpiry={timer_expiry}
            className={cn(
              "absolute",
              selectedCompanyId === id
                ? "-top-[1px] -right-[1px]"
                : "top-0 right-1",
            )}
          />
        )}
      </div>
    </div>
  );
}

export default CompanyItem;
