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

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionTitle>{t.certificates.title}</SectionTitle>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.08}>
              <button
                type="button"
                onClick={() => setSelected(c)}
                className="group glass block w-full overflow-hidden rounded-3xl text-left transition duration-300 hover:-translate-y-1 hover:border-accent/50"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  {c.image ? (
                    <img
                      src={withBase(c.image)}
                      alt={c.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className={`h-full w-full bg-gradient-to-br ${toneGradient(c.tone)}`}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-1 p-6">
                  <h3 className="font-bold text-white">{c.title}</h3>
                  <p className="text-sm text-accent-2">{c.issuer}</p>
                  {c.year && <p className="text-sm text-muted">{c.year}</p>}
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
