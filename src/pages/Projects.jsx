import Reveal from "../components/Reveal";
import Display from "../components/Display";
import SectionTitle from "../components/SectionTitle";
import ClothCard from "../components/ClothCard";
import { works, getWork } from "../data/works";
import { useLanguage } from "../lib/LanguageContext";

export default function Projects() {
  const { t, lang } = useLanguage();
  const items = works.map((w) => getWork(w, lang));
  return (
    <section className="pg">
      <SectionTitle no={4} label={t.projects.title} />
      <div className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <Display lines={[t.projects.title]} className="h-sec" immediate />
        <Reveal><p className="body-lg">{t.projects.sub}</p></Reveal>
      </div>
      <div className="mosaic">
        {items.map((w, i) => (
          <ClothCard key={w.slug} work={w} no={i + 1} total={items.length} label={t.projects.detail} big={i === 0} />
        ))}
      </div>
    </section>
  );
}
