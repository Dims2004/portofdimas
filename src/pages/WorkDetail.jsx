import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Reveal from "../components/Reveal";
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
    work.cover
      ? { src: work.cover, alt: work.title, caption: work.title }
      : null,
    ...gallery.map((caption, i) => {
      const imgSrc = work.galleryImages?.[i];
      return imgSrc ? { src: imgSrc, alt: caption, caption } : null;
    }),
  ].filter(Boolean);

  const coverLightboxIndex = work.cover
    ? lightboxImages.findIndex((img) => img.src === work.cover)
    : -1;

  const galleryLightboxIndex = (galleryIdx) => {
    const imgSrc = work.galleryImages?.[galleryIdx];
    if (!imgSrc) return -1;
    return lightboxImages.findIndex((img) => img.src === imgSrc);
  };

  return (
    <article>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-32 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <Link
            to="/"
            className="mb-8 inline-block text-sm text-white/60 transition-colors hover:text-white"
          >
            {t.workDetail.back}
          </Link>
          <div className="mb-4 flex flex-wrap gap-2">
            {work.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-accent-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            {work.title}
          </h1>
          <span className="mt-5 block h-[3px] w-14 rounded-full bg-white" />

          <dl className="mt-8 grid grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="text-muted">{t.workDetail.role}</dt>
              <dd className="mt-1 font-medium text-white">{work.role}</dd>
            </div>
            <div>
              <dt className="text-muted">{t.workDetail.year}</dt>
              <dd className="mt-1 font-medium text-white">{work.year}</dd>
            </div>
          </dl>

          {work.link && (
            <a
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              {t.workDetail.github}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <button
            type="button"
            onClick={() =>
              coverLightboxIndex !== -1 && setLightboxIndex(coverLightboxIndex)
            }
            disabled={coverLightboxIndex === -1}
            aria-label={
              work.cover ? `Lihat gambar penuh ${work.title}` : undefined
            }
            className={`glass block aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl shadow-black/40 ${
              work.cover ? "" : `bg-gradient-to-br ${toneGradient(work.tone)}`
            }`}
          >
            {work.cover && (
              <img
                src={withBase(work.cover)}
                alt={work.title}
                className="h-full w-full object-cover"
              />
            )}
          </button>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
        <Reveal>
          <div className="glass space-y-6 rounded-3xl p-8 text-justify text-base leading-relaxed text-white/80 [hyphens:auto] sm:p-10 sm:text-lg">
            {work.description.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-6 sm:px-10">
          <div className="grid gap-6 sm:grid-cols-3">
            {gallery.map((caption, i) => {
              const imgSrc = work.galleryImages?.[i];
              const targetIndex = galleryLightboxIndex(i);
              return (
                <Reveal
                  key={caption}
                  delay={i * 0.08}
                  className={i % 3 === 1 ? "sm:mt-10" : ""}
                >
                  <button
                    type="button"
                    onClick={() =>
                      targetIndex !== -1 && setLightboxIndex(targetIndex)
                    }
                    disabled={targetIndex === -1}
                    aria-label={
                      imgSrc ? `Lihat gambar penuh ${caption}` : undefined
                    }
                    className={`glass block w-full overflow-hidden rounded-2xl ${
                      imgSrc
                        ? ""
                        : `bg-gradient-to-br ${toneGradient(work.tone)} opacity-80`
                    }`}
                    style={{ aspectRatio: i % 3 === 1 ? "3 / 4" : "4 / 3" }}
                  >
                    {imgSrc && (
                      <img
                        src={withBase(imgSrc)}
                        alt={caption}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </button>
                  <p className="mt-3 text-sm text-muted">{caption}</p>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      <ImageLightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />

      <section className="border-t border-white/10 px-6 py-16 sm:px-10">
        <Reveal className="mx-auto max-w-6xl">
          <Link
            to={`/karya/${next.slug}`}
            className="group flex items-center justify-between gap-6"
          >
            <div>
              <p className="mb-2 text-sm text-muted">
                {t.workDetail.nextProject}
              </p>
              <h2 className="text-3xl font-extrabold text-white transition-colors group-hover:text-accent-2 sm:text-4xl">
                {next.title}
              </h2>
            </div>
            <span className="text-2xl text-white/60 transition-transform group-hover:translate-x-2 group-hover:text-accent-2">
              →
            </span>
          </Link>
        </Reveal>
      </section>
    </article>
  );
}
