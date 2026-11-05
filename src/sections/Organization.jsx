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
      <Decor
        type="network"
        className="bottom-12 right-[3%] hidden w-56 sm:block"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionTitle>{t.organization.title}</SectionTitle>

        <ol className="divide-y divide-white/10 border-y border-white/10">
          {items.map((o) => (
            <li
              key={o.slug}
              className="grid gap-4 py-10 md:grid-cols-[200px_1fr] md:gap-10"
            >
              <Reveal>
                <p className="text-sm text-muted">{o.period}</p>
              </Reveal>

              <Reveal delay={0.06}>
                <h3 className="text-2xl font-bold text-white">{o.title}</h3>
                <p className="mt-1 text-sm text-white/70">{o.org}</p>

                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
                  {o.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent-2" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {o.tags && (
                  <div className="mt-3 flex flex-wrap gap-2 pl-4">
                    {o.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs text-white"
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
                          className="glass group w-44 overflow-hidden rounded-xl text-left transition-transform hover:-translate-y-1"
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
