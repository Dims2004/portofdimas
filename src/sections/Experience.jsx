import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import Decor from "../components/Decor";
import { internships, getItem } from "../data/experience";
import { useLanguage } from "../lib/LanguageContext";
import { withBase } from "../lib/assetPath";
import { toneGradient } from "../lib/tones";

function InternshipCard({ item, index, detailLabel }) {
  return (
    <article className="glass hud group flex h-full flex-col overflow-hidden rounded-lg transition-colors hover:border-accent/50">
      <div className="relative aspect-[16/10] overflow-hidden">
        {item.image ? (
          <img
            src={withBase(item.image)}
            alt={item.org}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${toneGradient(index * 2 + 1)}`}
          >
            <span className="font-mono text-6xl font-bold tracking-tight text-white/25">
              {"</>"}
            </span>
          </div>
        )}
        {/* garis pindai */}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.18)_0,rgba(0,0,0,0.18)_1px,transparent_1px,transparent_3px)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050818] to-transparent" />
        <span className="absolute left-4 top-4 rounded-sm border border-accent/40 bg-black/60 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-accent backdrop-blur">
          {item.chip}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-6">
        {item.period && (
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-2">
            {item.period}
          </p>
        )}
        <h3 className="font-display text-xl font-bold text-white">{item.role}</h3>
        <p className="text-sm text-accent">{item.org}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
        {item.detailTo && (
          <Link
            to={item.detailTo}
            className="mt-auto pt-5 font-mono text-xs font-semibold uppercase tracking-wider text-white/90 transition-colors hover:text-accent"
          >
            {detailLabel} →
          </Link>
        )}
      </div>
    </article>
  );
}

export default function Experience() {
  const { t, lang } = useLanguage();
  const items = internships.map((i) => getItem(i, lang));

  return (
    <section
      id="experience"
      className="relative scroll-mt-4 overflow-hidden px-6 py-24 sm:px-10"
    >
      <Decor type="chart" className="right-[5%] top-10 w-48 sm:w-64" />
      <Decor type="network" className="bottom-10 left-[3%] hidden w-52 sm:block" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionTitle no={2}>{t.experience.title}</SectionTitle>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.slug} delay={i * 0.08}>
              <InternshipCard
                item={it}
                index={i}
                detailLabel={t.experience.detail}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
