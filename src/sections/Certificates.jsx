import { useState } from "react";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import Decor from "../components/Decor";
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
    <section
      id="certificates"
      className="relative scroll-mt-4 overflow-hidden px-6 py-24 sm:px-10"
    >
      <Decor type="target" className="right-[5%] top-10 w-36" />
      <Decor type="kawung" className="bottom-10 left-[3%] hidden w-40 sm:block" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionTitle no={5}>{t.certificates.title}</SectionTitle>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.08}>
              <button
                type="button"
                onClick={() => setSelected(c)}
                className="group glass hud block w-full overflow-hidden rounded-lg text-left transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(34,229,255,0.14)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {c.image ? (
                    <img
                      src={withBase(c.image)}
                      alt={c.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`h-full w-full bg-gradient-to-br ${toneGradient(c.tone)}`} />
                  )}
                  <span className="absolute left-3 top-3 rounded-sm border border-accent-2/50 bg-black/60 px-2 py-0.5 font-mono text-[10px] tracking-[0.2em] text-accent-2 backdrop-blur">
                    CERT.{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-col gap-1 p-6">
                  <h3 className="font-display font-bold text-white">{c.title}</h3>
                  <p className="text-sm text-accent">{c.issuer}</p>
                  {c.year && <p className="font-mono text-xs text-muted">{c.year}</p>}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <CertificateLightbox
        certificate={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
