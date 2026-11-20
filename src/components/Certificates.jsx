import { useState } from "react";
import { useLanguage } from "../lib/LanguageContext";
import { withBase } from "../lib/assetPath";
import { toneBackground } from "../lib/tones";
import { certificates, getCertificate } from "../data/certificates";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import Lightbox from "./Lightbox";

export default function Certificates() {
  const { t, lang } = useLanguage();
  const c = t.site.certificates;
  const items = certificates.map((x) => getCertificate(x, lang));
  const [lb, setLb] = useState(null);

  const withImg = items.filter((x) => x.image);
  const lbImages = withImg.map((x) => ({ src: x.image, alt: x.title, caption: `${x.title} · ${x.issuer}` }));

  return (
    <section id="certificates" className="certificates section light-background">
      <SectionTitle title={c.title} sub={c.sub} />
      <div className="container">
        <div className="row gy-4">
          {items.map((x, i) => {
            const idx = withImg.findIndex((y) => y.slug === x.slug);
            return (
              <Reveal className="col-lg-4 col-md-6" delay={(i % 3) * 80} key={`${x.slug}-${i}`}>
                <button
                  type="button"
                  className="cert-card h-100"
                  disabled={idx < 0}
                  onClick={() => idx >= 0 && setLb(idx)}
                  aria-label={x.title}
                >
                  <div className="cert-thumb" style={x.image ? undefined : { background: toneBackground(x.tone) }}>
                    {x.image && (
                      <img
                        src={withBase(x.image)}
                        alt={x.title}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    )}
                  </div>
                  <div className="cert-body">
                    {x.year && <span className="chip">{x.year}</span>}
                    <h4>{x.title}</h4>
                    <p>{x.issuer}</p>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
      <Lightbox images={lbImages} index={lb} onClose={() => setLb(null)} onNavigate={setLb} />
    </section>
  );
}
