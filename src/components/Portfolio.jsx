import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";
import { withBase } from "../lib/assetPath";
import { toneBackground } from "../lib/tones";
import { works, getWork } from "../data/works";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import Lightbox from "./Lightbox";

export default function Portfolio() {
  const { t, lang } = useLanguage();
  const p = t.site.portfolio;
  const items = works.map((w) => getWork(w, lang));

  // Kategori diambil dari tag pertama tiap proyek (urutannya sama di ID & EN)
  const cats = [...new Set(items.map((w) => w.tags[0]))];
  const [cat, setCat] = useState(-1); // -1 = Semua
  const [lb, setLb] = useState(null);

  const visible = items.filter((w) => cat < 0 || cats.indexOf(w.tags[0]) === cat);
  const lbImages = visible
    .filter((w) => w.cover)
    .map((w) => ({ slug: w.slug, src: w.cover, alt: w.title, caption: w.title }));

  return (
    <section id="portfolio" className="portfolio section light-background">
      <SectionTitle title={p.title} sub={p.sub} />
      <div className="container">
        <Reveal delay={100}>
          <ul className="portfolio-filters">
            <li className={cat < 0 ? "filter-active" : ""} onClick={() => setCat(-1)}>{p.all}</li>
            {cats.map((c, i) => (
              <li key={c} className={cat === i ? "filter-active" : ""} onClick={() => setCat(i)}>{c}</li>
            ))}
          </ul>
        </Reveal>

        <div className="row gy-4">
          {visible.map((w) => (
            <div className="col-lg-4 col-md-6 portfolio-item" key={w.slug}>
              <div className="portfolio-content h-100">
                {w.cover ? (
                  <img
                    src={withBase(w.cover)}
                    alt={w.title}
                    className="img-fluid"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                  />
                ) : (
                  <div className="portfolio-ph" style={{ background: toneBackground(w.tone) }}>
                    <span>{w.title}</span>
                  </div>
                )}
                <div className="portfolio-info">
                  <h4>{w.title}</h4>
                  <p>{w.tags.join(" · ")}</p>
                  {w.cover && (
                    <button
                      type="button"
                      className="preview-link"
                      title={p.zoom}
                      aria-label={`${p.zoom}: ${w.title}`}
                      onClick={() => setLb(lbImages.findIndex((x) => x.slug === w.slug))}
                    >
                      <i className="bi bi-zoom-in" />
                    </button>
                  )}
                  <Link to={`/karya/${w.slug}`} title={p.detail} aria-label={`${p.detail}: ${w.title}`} className="details-link">
                    <i className="bi bi-link-45deg" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Lightbox images={lbImages} index={lb} onClose={() => setLb(null)} onNavigate={setLb} />
    </section>
  );
}
