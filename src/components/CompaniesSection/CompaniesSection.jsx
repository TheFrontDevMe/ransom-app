import { useSelector } from "react-redux";

import CompanyItem from "./CompanyItem/CompanyItem";

function CompaniesSection() {
  const { companies } = useSelector((state) => state.dashboard);
  const { companiesToShow } = useSelector((state) => state.companies);

  const companiesToShowList = companies.list.filter((company) =>
    companiesToShow === "all"
      ? true
      : companiesToShow === "awaiting"
        ? company.is_published === false
        : company.is_published === true,
  );

  return (
    <section id="section-companies" className="flex flex-col overflow-hidden">
      <ul className="custom-scrollbar flex h-full flex-col gap-4 overflow-auto pr-2">
        {companiesToShowList.length > 0 &&
          companiesToShowList.map((company) => (
            <li key={company.id}>
              <CompanyItem companyItemData={company} />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default CompaniesSection;
