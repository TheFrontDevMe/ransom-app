import SectionCard from "@components/ui/SectionCard";
import SectionTitle from "@components/ui/SectionTitle";

import ThreeArrowsRight from "@components/icons/ThreeArrowsRight";

function WordLeaksSection() {
  return (
    <section id="section-word-leaks">
      <SectionCard className="gap-5">
        <SectionTitle title="Word Leaks" />

        <div className="flex items-center gap-5">
          <ThreeArrowsRight />
          <span className="text-[21px] text-white">Companies</span>
        </div>
      </SectionCard>
    </section>
  );
}

export default WordLeaksSection;
