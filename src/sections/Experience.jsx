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
    <article className="glass flex h-full flex-col overflow-hidden rounded-3xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        {item.image ? (
          <img
            src={withBase(item.image)}
            alt={item.org}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${toneGradient(index * 2 + 1)}`}
          >
            <span className="text-6xl font-extrabold tracking-tight text-white/25">
              {"</>"}
            </span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {item.chip}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-6">
        {item.period && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            {item.period}
          </p>
        )}
        <h3 className="text-xl font-bold text-white">{item.role}</h3>
        <p className="text-sm text-accent-2">{item.org}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {item.summary}
        </p>
        {item.detailTo && (
          <Link
            to={item.detailTo}
            className="mt-auto pt-5 text-sm font-semibold text-white/90 transition-colors hover:text-accent-2"
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
      <Decor
        type="network"
        className="bottom-10 left-[3%] hidden w-52 sm:block"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionTitle>{t.experience.title}</SectionTitle>
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
