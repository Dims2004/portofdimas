import { useState } from "react";
import Reveal from "../components/Reveal";
import Display from "../components/Display";
import SectionTitle from "../components/SectionTitle";
import ImageLightbox from "../components/ImageLightbox";
import { organizations, getItem } from "../data/experience";
import { useLanguage } from "../lib/LanguageContext";
import { withBase } from "../lib/assetPath";

export default function Organization() {
  const { t, lang } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const items = organizations.map((o) => getItem(o, lang));
  // gabungkan semua thumbnail untuk lightbox
  const allThumbs = items.flatMap((o) => o.thumbs.map((th) => ({ src: th.image, alt: th[lang], caption: th[lang] })));
  let counter = -1;

  return (
    <section className="pg">
      <SectionTitle no={3} label={t.organization.title} />
      <Display lines={[t.organization.title]} className="h-sec mb-12" immediate />
      <div className="rows">
        {items.map((o, i) => (
          <Reveal key={o.slug} className="row">
            <span className="k">{String(i + 1).padStart(2, "0")} · {o.period}</span>
            <div>
              <h3>{o.title}</h3>
              <p className="org">{o.org}</p>
            </div>
            <div>
              <ul className="bul">{o.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              {o.tags && <div className="mt-5 flex flex-wrap gap-2">{o.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>}
              {o.thumbs.length > 0 && (
                <div className="thumbs">
                  {o.thumbs.map((th) => {
                    counter += 1;
                    const idx = counter;
                    return (
                      <button key={th.image} type="button" className="thumb" data-cursor onClick={() => setLightboxIndex(idx)} aria-label={t.organization.zoom}>
                        <img src={withBase(th.image)} alt={th[lang]} loading="lazy" />
                        <p>{th[lang]}</p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <i className="bar" />
          </Reveal>
        ))}
      </div>
      <ImageLightbox images={allThumbs} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />
    </section>
  );
}
