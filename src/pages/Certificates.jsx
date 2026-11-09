import { useState } from "react";
import Reveal from "../components/Reveal";
import Display from "../components/Display";
import SectionTitle from "../components/SectionTitle";
import CertificateLightbox from "../components/CertificateLightbox";
import { certificates, getCertificate } from "../data/certificates";
import { useLanguage } from "../lib/LanguageContext";
import { withBase } from "../lib/assetPath";
import { toneGradient } from "../lib/tones";

export default function Certificates() {
  const { t, lang } = useLanguage();
  const [selected, setSelected] = useState(null);
  const items = certificates.map((c) => getCertificate(c, lang));
  return (
    <section className="pg">
      <SectionTitle no={5} label={t.certificates.title} />
      <Display lines={[t.certificates.title]} className="h-sec mb-12" immediate />
      <div className="certs">
        {items.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 3) * 0.06} y={18} className="contents">
            <button type="button" className="cert" data-cursor onClick={() => setSelected(c)}>
              <div className={`ph ${c.image ? "" : `bg-gradient-to-br ${toneGradient(c.tone)}`}`}>
                {c.image && <img src={withBase(c.image)} alt={c.title} loading="lazy" decoding="async" onError={(e) => { e.currentTarget.style.display = "none"; }} />}
              </div>
              <span className="k">{String(i + 1).padStart(2, "0")}{c.year ? ` · ${c.year}` : ""}</span>
              <h3>{c.title}</h3>
              <span className="iss">{c.issuer}</span>
            </button>
          </Reveal>
        ))}
      </div>
      <CertificateLightbox certificate={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
