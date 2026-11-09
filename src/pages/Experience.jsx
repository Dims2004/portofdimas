import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Display from "../components/Display";
import SectionTitle from "../components/SectionTitle";
import { internships, getItem } from "../data/experience";
import { useLanguage } from "../lib/LanguageContext";
import { withBase } from "../lib/assetPath";

export default function Experience() {
  const { t, lang } = useLanguage();
  const items = internships.map((i) => getItem(i, lang));
  return (
    <section className="pg">
      <SectionTitle no={2} label={t.experience.title} />
      <Display lines={[t.experience.title]} className="h-sec mb-12" immediate />
      <div className="atlas">
        {items.map((it, i) => (
          <Reveal key={it.slug} delay={i * 0.08} className={`plate ${items.length % 2 === 0 ? "s3" : "s2"}`} style={{ minHeight: 360 }}>
            <div className="ph">
              {it.image ? <img src={withBase(it.image)} alt={it.org} loading="lazy" /> : <span className="ph-fb">{"</>"}</span>}
            </div>
            <span className="k">{String(i + 1).padStart(2, "0")}{it.period ? ` · ${it.period}` : ""}</span>
            <span className="tag">{it.chip}</span>
            <h3>{it.role}</h3>
            <p style={{ color: "var(--bone-dim)" }}>{it.org}</p>
            <p>{it.summary}</p>
            {it.detailTo && (
              <Link to={it.detailTo} className="arrowlink mt-auto" data-cursor>
                <span>{t.experience.detail}</span>
                <span className="ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.3" /></svg></span>
              </Link>
            )}
            <i className="bar" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
