import { useSelector } from "react-redux";

import CompanyInfoNavigation from "./CompanyInfoNavigation";
import CompanyInfoOverview from "./CompanyInfoOverview";
import CompanyInfoStorage from "./CompanyInfoStorage/CompanyInfoStorage";

function CompanyInfoSection() {
  const { companyInfoActiveTab } = useSelector((state) => state.companies);

  return (
    <section
      id="section-company-info"
      className="border-gray-primary flex flex-col overflow-hidden border-t border-l border-dashed"
    >
      {/* Navigation block */}
      <CompanyInfoNavigation />

      {/* Content block */}
      <>
        {companyInfoActiveTab === "overview" && <CompanyInfoOverview />}
        {companyInfoActiveTab === "storage" && <CompanyInfoStorage />}
      </>
    </section>
  );
}

export default CompanyInfoSection;
