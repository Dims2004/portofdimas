import Reveal from "../components/Reveal";
import WorkCard from "../components/WorkCard";
import { works, getWork } from "../data/works";
import { useLanguage } from "../lib/LanguageContext";

export default function Works() {
  const { t, lang } = useLanguage();
  const localizedWorks = works.map((w) => getWork(w, lang));

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
      <Reveal className="mb-16 max-w-[36ch]">
        <p className="mb-4 text-sm text-accent-2">{t.works.eyebrow}</p>
        <h1 className="font-serif text-4xl sm:text-5xl">{t.works.heading}</h1>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {localizedWorks.map((w, i) => (
          <Reveal
            key={w.slug}
            delay={(i % 3) * 0.08}
            className={w.size === "lg" ? "sm:col-span-2" : ""}
          >
            <WorkCard work={w} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}