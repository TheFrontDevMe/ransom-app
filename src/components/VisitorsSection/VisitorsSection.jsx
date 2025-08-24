import { useSelector } from "react-redux";

import SectionCard from "@components/ui/SectionCard";
import SectionTitle from "@components/ui/SectionTitle";

import VisitorsItem from "./VisitorsItem";

const visitorsItemTitle = [
  { key: "24h", label: "Last 24 hours" },
  { key: "7d", label: "Last 7 days" },
  { key: "30d", label: "Last month" },
  { key: "online", label: "Online" },
];

function VisitorsSection() {
  const { visitors } = useSelector((state) => state.dashboard);

  return (
    <section id="section-word-leaks">
      <SectionCard className="gap-2 px-0">
        <div className="px-2.5">
          <SectionTitle title="Visitors" />
        </div>

        {/* Render each visitor item statistics */}
        <ul className="flex flex-col gap-2">
          {visitorsItemTitle.map(({ key, label }) => (
            <li key={key}>
              <VisitorsItem title={label} value={visitors.stats?.[key] ?? ""} />
            </li>
          ))}
        </ul>
      </SectionCard>
    </section>
  );
}

export default VisitorsSection;
