import { useState } from "react";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import Decor from "../components/Decor";
import ImageLightbox from "../components/ImageLightbox";
import { organizations, getItem } from "../data/experience";
import { useLanguage } from "../lib/LanguageContext";
import { withBase } from "../lib/assetPath";

export default function Organization() {
  const { t, lang } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const items = organizations.map((o) => getItem(o, lang));

  // Gabungkan semua thumbnail dari seluruh baris jadi satu daftar untuk lightbox
  const allThumbs = items.flatMap((o) =>
    o.thumbs.map((th) => ({ src: th.image, alt: th[lang], caption: th[lang] })),
  );
  let counter = -1;

  return (
    <section
      id="organization"
      className="relative scroll-mt-4 overflow-hidden px-6 py-24 sm:px-10"
    >
      <Decor type="target" className="right-[6%] top-12 w-36 sm:w-44" />
      <Decor type="kawung" className="bottom-12 right-[3%] hidden w-56 sm:block" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionTitle no={3}>{t.organization.title}</SectionTitle>

        {/* Lini masa: garis neon vertikal + simpul bercahaya */}
        <ol className="relative ml-2 border-l border-accent/30">
          {items.map((o) => (
            <li key={o.slug} className="relative pb-14 pl-8 last:pb-0 sm:pl-12">
              <span
                aria-hidden="true"
                className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rotate-45 border border-accent-2 bg-[#04050c] shadow-[0_0_14px_rgba(245,185,66,0.7)]"
              />
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
                  {o.period}
                </p>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="glass hud mt-3 rounded-lg p-6 sm:p-8">
                  <h3 className="font-display text-2xl font-bold text-white">{o.title}</h3>
                  <p className="mt-1 text-sm text-accent">{o.org}</p>

                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
                    {o.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rotate-45 bg-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {o.tags && (
                    <div className="mt-4 flex flex-wrap gap-2 pl-4">
                      {o.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-sm border border-accent/25 bg-accent/5 px-3 py-1.5 font-mono text-[11px] text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {o.thumbs.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-4">
                      {o.thumbs.map((th) => {
                        counter += 1;
                        const idx = counter;
                        return (
                          <button
                            key={th.image}
                            type="button"
                            onClick={() => setLightboxIndex(idx)}
                            aria-label={t.organization.zoom}
                            className="glass group w-44 overflow-hidden rounded-md text-left transition hover:-translate-y-1 hover:border-accent/50"
                          >
                            <img
                              src={withBase(th.image)}
                              alt={th[lang]}
                              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <p className="px-3 py-2 text-[11px] leading-snug text-muted">
                              {th[lang]}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <ImageLightbox
        images={allThumbs}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
