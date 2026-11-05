import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import Decor from "../components/Decor";
import WorkCard from "../components/WorkCard";
import { works, getWork } from "../data/works";
import { useLanguage } from "../lib/LanguageContext";

export default function Projects() {
  const { t, lang } = useLanguage();
  const items = works.map((w) => getWork(w, lang));

  return (
    <section
      id="projects"
      className="relative scroll-mt-4 overflow-hidden px-6 py-24 sm:px-10"
    >
      <Decor type="chip" className="left-[3%] top-10 hidden w-36 sm:block" />
      <Decor type="chart" className="bottom-10 right-[4%] w-56" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionTitle>{t.projects.title}</SectionTitle>

        {/* Grid bento: kartu ke-1, ke-4, ke-7, dst. dibuat lebih lebar di layar besar */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((w, i) => (
            <Reveal
              key={w.slug}
              delay={(i % 3) * 0.08}
              className={i % 3 === 0 ? "lg:col-span-2" : ""}
            >
              <WorkCard work={w} label={t.projects.detail} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
