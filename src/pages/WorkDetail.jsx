import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Reveal from "../components/Reveal";
import Display from "../components/Display";
import ImageLightbox from "../components/ImageLightbox";
import { works, getWork, getWorkBySlug } from "../data/works";
import { useLanguage } from "../lib/LanguageContext";
import { withBase } from "../lib/assetPath";
import { toneGradient } from "../lib/tones";

export default function WorkDetail() {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const work = getWorkBySlug(slug, lang);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!work) return <Navigate to="/" replace />;

  const index = works.findIndex((w) => w.slug === slug);
  const next = getWork(works[(index + 1) % works.length], lang);

  // gallery bersifat opsional
  const gallery = work.gallery || [];

  // Gabungkan cover + foto galeri jadi satu daftar untuk lightbox (next/prev)
  const lightboxImages = [
    work.cover ? { src: work.cover, alt: work.title, caption: work.title } : null,
    ...gallery.map((caption, i) => {
      const imgSrc = work.galleryImages?.[i];
      return imgSrc ? { src: imgSrc, alt: caption, caption } : null;
    }),
  ].filter(Boolean);

  const coverLightboxIndex = work.cover ? lightboxImages.findIndex((img) => img.src === work.cover) : -1;

  const galleryLightboxIndex = (galleryIdx) => {
    const imgSrc = work.galleryImages?.[galleryIdx];
    if (!imgSrc) return -1;
    return lightboxImages.findIndex((img) => img.src === imgSrc);
  };

  return (
    <article className="pg">
      <Reveal y={0} className="sec-head">
        <Link to="/proyek" className="k" data-cursor>{t.workDetail.back}</Link>
        <span className="rule" />
        <span className="k"><b>{String(index + 1).padStart(2, "0")}</b> / {String(works.length).padStart(2, "0")}</span>
      </Reveal>

      <div className="wd">
        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            {work.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
          </div>
          <Display as="h1" lines={[work.title]} className="h-sec" immediate />
          <Reveal>
            <dl className="dl">
              <div><dt>{t.workDetail.role}</dt><dd>{work.role}</dd></div>
              <div><dt>{t.workDetail.year}</dt><dd>{work.year}</dd></div>
            </dl>
            {work.link && (
              <a href={work.link} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-8" data-cursor>
                {t.workDetail.github}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            )}
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <button
            type="button"
            data-cursor
            onClick={() => coverLightboxIndex !== -1 && setLightboxIndex(coverLightboxIndex)}
            disabled={coverLightboxIndex === -1}
            aria-label={work.cover ? `Lihat gambar penuh ${work.title}` : undefined}
            className={`block aspect-[4/3] w-full overflow-hidden outline outline-1 -outline-offset-1 outline-[var(--line)] ${work.cover ? "" : `bg-gradient-to-br ${toneGradient(work.tone)}`}`}
          >
            {work.cover && <img src={withBase(work.cover)} alt={work.title} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />}
          </button>
        </Reveal>
      </div>

      <Reveal className="prose mt-16 max-w-[78ch]">
        {work.description.split("\n\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)}
      </Reveal>

      {gallery.length > 0 && (
        <>
          <div className="sub-head"><h3>Galeri</h3><span className="rule" /></div>
          <div className="gal">
            {gallery.map((caption, i) => {
              const imgSrc = work.galleryImages?.[i];
              const targetIndex = galleryLightboxIndex(i);
              return (
                <Reveal key={caption} delay={(i % 3) * 0.08} as="figure">
                  <button
                    type="button"
                    data-cursor
                    onClick={() => targetIndex !== -1 && setLightboxIndex(targetIndex)}
                    disabled={targetIndex === -1}
                    aria-label={imgSrc ? `Lihat gambar penuh ${caption}` : undefined}
                    className={imgSrc ? "" : `bg-gradient-to-br ${toneGradient(work.tone)}`}
                  >
                    {imgSrc && <img src={withBase(imgSrc)} alt={caption} loading="lazy" />}
                  </button>
                  <figcaption>{caption}</figcaption>
                </Reveal>
              );
            })}
          </div>
        </>
      )}

      <ImageLightbox images={lightboxImages} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />

      <Reveal className="mt-20">
        <Link to={`/karya/${next.slug}`} className="next" data-cursor>
          <div>
            <p className="eyebrow mb-3">{t.workDetail.nextProject}</p>
            <h2>{next.title}</h2>
          </div>
          <span className="arrowlink"><span className="ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.3" /></svg></span></span>
        </Link>
      </Reveal>
    </article>
  );
}
