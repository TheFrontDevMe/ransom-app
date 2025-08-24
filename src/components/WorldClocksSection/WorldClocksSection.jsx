import { WORLD_CLOCKS_ITEMS } from "@/lib/data";

import SectionCard from "@components/ui/SectionCard";
import SectionTitle from "@components/ui/SectionTitle";

import WorldClockItem from "./WorldClockItem";

import sectionCoverImg from "@assets/images/world-clocks_cover.svg";

function WorldClocksSection() {
  return (
    <section id="section-world-clocks">
      <SectionCard className="relative gap-2">
        {/* Section cover */}
        <div className="absolute inset-0 h-auto w-full p-[5px]">
          <img src={sectionCoverImg} alt="Section cover" />
        </div>

        <SectionTitle title="World clocks" />

        {/* World clock items list */}
        <ul className="flex flex-col gap-2 px-1">
          {WORLD_CLOCKS_ITEMS.map((item) => (
            <li key={item.city}>
              <WorldClockItem {...item} />
            </li>
          ))}
        </ul>
      </SectionCard>
    </section>
  );
}

export default WorldClocksSection;
