import { useSelector } from "react-redux";

import { formatValueWithDots } from "@/lib/utils";

import CountryFlagAndName from "@components/ui/CountryFlagAndName";
import CompanyPublishedBadge from "@components/ui/CompanyPublishedBadge";
import { useCountdown } from "@/lib/hooks/useCountdown";

function CompanyInfoOverview() {
  const { selectedCompanyId } = useSelector((state) => state.companies);

  const selectedCompany = useSelector((state) =>
    state.dashboard.companies.list.find(
      (company) => company.id === selectedCompanyId,
    ),
  );

  const {
    country,
    employees,
    id,
    is_published,
    name,
    overview: { description, files, size, website } = {},
    revenue,
    timer_expiry,
    views,
    stocks = null,
  } = selectedCompany || {};

  const countdown = useCountdown(timer_expiry);

  if (!selectedCompany) return null;

  return (
    <div className="custom-scrollbar mt-4 overflow-auto pr-2.5 pl-4">
      <div className="flex flex-col gap-3 bg-[#0c0c0c] py-2">
        {/* Description */}
        <div className="border-gray-primary flex flex-col gap-3 border-b border-dashed pb-3">
          <h4 className="pl-3 text-[10px]">Description::</h4>
          <p className="px-7 text-[14px] text-white">{description}</p>
        </div>

        {/* Revenue, Employees, Views, Country & Website */}
        <div className="border-gray-primary flex flex-col gap-6 border-b border-dashed pb-5">
          {/* Revenue, Employees, Views, Country */}
          <div className="flex flex-col gap-7">
            <div className="flex gap-4 px-5">
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
                <span className="text-[14px]">
                  {formatValueWithDots(views)}
                </span>
              </div>
              {/* Stocks */}
              <div className="flex flex-col">
                <span className="text-[10px]">Stocks</span>
                <span className="text-[14px]">{stocks ?? "--"}</span>
              </div>
              {/* Flag and country */}
              <div className="flex flex-col">
                <span className="text-[10px]">Country</span>
                <CountryFlagAndName contryCode={country} />
              </div>
            </div>
          </div>

          {/* Website */}
          <div className="flex flex-col gap-1.5">
            <h4 className="pl-3 text-[10px]">Website::</h4>
            <div className="pl-5">
              <a
                href={website}
                target="_blank"
                rel="noreferrer noopener"
                className="text-blue-primary border-blue-primary border-b border-dashed pb-1.5 text-[14px]"
              >
                {website}
              </a>
            </div>
          </div>
        </div>

        {/* Status & Updated at */}
        <div className="flex gap-14">
          {/* Status */}
          <div className="flex flex-col gap-2.5">
            <h4 className="pl-3 text-[10px]">Status::</h4>
            <div className="pl-5">
              {is_published ? (
                <CompanyPublishedBadge />
              ) : (
                <span className="text-[14px]">Awaiting</span>
              )}
            </div>
          </div>

          {/* Updated at */}
          <>
            {timer_expiry && (
              <div className="flex flex-col gap-4">
                <h4 className="text-[10px]">Update::</h4>
                <div className="text-[10px]">{countdown}</div>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default CompanyInfoOverview;
