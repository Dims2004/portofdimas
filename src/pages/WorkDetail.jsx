import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Reveal from "../components/Reveal";
import ImageLightbox from "../components/ImageLightbox";
import { works, getWork, getWorkBySlug } from "../data/works";
import { useLanguage } from "../lib/LanguageContext";
import { withBase } from "../lib/assetPath";

const toneGradients = {
  1: "from-[#4B4238] to-[#C9A24B]",
  2: "from-[#31353A] to-[#7C8B79]",
  3: "from-[#2E2733] to-[#8C6E9C]",
  4: "from-[#3A2E28] to-[#B7754A]",
  5: "from-[#242B2C] to-[#5C8B8A]",
  6: "from-[#332A2A] to-[#A65C4E]",
};

export default function WorkDetail() {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const work = getWorkBySlug(slug, lang);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!work) return <Navigate to="/karya" replace />;

  const index = works.findIndex((w) => w.slug === slug);
  const next = getWork(works[(index + 1) % works.length], lang);

  // Gabungkan cover + semua foto galeri jadi satu daftar, biar bisa
  // saling geser (next/prev) di dalam lightbox yang sama.
  // Foto yang belum ada gambarnya (kosong) tidak dimasukkan, supaya
  // tidak ada slot kosong yang ikut kebuka di lightbox.
  const lightboxImages = [
    work.cover ? { src: work.cover, alt: work.title, caption: work.title } : null,
    ...work.gallery.map((caption, i) => {
      const imgSrc = work.galleryImages?.[i];
      return imgSrc ? { src: imgSrc, alt: caption, caption } : null;
    }),
  ].filter(Boolean);

  // Karena cover bisa saja kosong, cari index cover & tiap galeri di
  // dalam lightboxImages secara dinamis, bukan diasumsikan tetap 0, 1, 2, 3.
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
      {/* Cover asimetris: teks di kiri, blok warna besar meluber ke kanan */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-20 sm:px-10 sm:pt-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <Reveal>
          <Link to="/karya" className="mb-8 inline-block text-sm text-muted hover:text-ink">
            {t.workDetail.back}
          </Link>
          <p className="mb-3 text-sm text-accent-2">{work.tags.join(" · ")}</p>
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">{work.title}</h1>
          <dl className="mt-10 grid grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="text-muted">{t.workDetail.role}</dt>
              <dd className="mt-1">{work.role}</dd>
            </div>
            <div>
              <dt className="text-muted">{t.workDetail.year}</dt>
              <dd className="mt-1">{work.year}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="lg:-mb-24">
          <button
            type="button"
            onClick={() => coverLightboxIndex !== -1 && setLightboxIndex(coverLightboxIndex)}
            disabled={coverLightboxIndex === -1}
            aria-label={work.cover ? `Lihat gambar penuh ${work.title}` : undefined}
            className={`aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/40 ${
              work.cover ? "cursor-zoom-in" : `cursor-default bg-gradient-to-br ${toneGradients[work.tone]}`
            }`}
          >
            {work.cover && (
              <img src={withBase(work.cover)} alt={work.title} className="h-full w-full object-cover" />
            )}
          </button>
        </Reveal>
      </section>

      {/* Deskripsi panjang, kolom sempit agar mudah dibaca */}
      <section className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
        <Reveal>
          <p className="whitespace-pre-line text-lg leading-relaxed text-muted">{work.description}</p>
        </Reveal>
      </section>

      {/* Galeri — kolom tidak seragam tingginya */}
      <section className="mx-auto max-w-6xl px-6 pb-24 sm:px-10">
        <div className="grid gap-6 sm:grid-cols-3">
          {work.gallery.map((caption, i) => {
            const imgSrc = work.galleryImages?.[i];
            const targetIndex = galleryLightboxIndex(i);
            return (
              <Reveal
                key={caption}
                delay={i * 0.08}
                className={i === 1 ? "sm:mt-10" : ""}
              >
                <button
                  type="button"
                  onClick={() => targetIndex !== -1 && setLightboxIndex(targetIndex)}
                  disabled={targetIndex === -1}
                  aria-label={imgSrc ? `Lihat gambar penuh ${caption}` : undefined}
                  className={`w-full overflow-hidden rounded-2xl ${
                    imgSrc ? "cursor-zoom-in" : `cursor-default bg-gradient-to-br ${toneGradients[work.tone]} opacity-80`
                  }`}
                  style={{ aspectRatio: i === 1 ? "3 / 4" : "4 / 3" }}
                >
                  {imgSrc && <img src={withBase(imgSrc)} alt={caption} className="h-full w-full object-cover" />}
                </button>
                <p className="mt-3 text-sm text-muted">{caption}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <ImageLightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />

      {/* Proyek berikutnya */}
      <section className="border-t border-border px-6 py-16 sm:px-10">
        <Reveal className="mx-auto max-w-6xl">
          <Link to={`/karya/${next.slug}`} className="group flex items-center justify-between gap-6">
            <div>
              <p className="mb-2 text-sm text-muted">{t.workDetail.nextProject}</p>
              <h2 className="font-serif text-3xl transition-colors group-hover:text-accent sm:text-4xl">
                {next.title}
              </h2>
            </div>
            <span className="text-2xl text-muted transition-transform group-hover:translate-x-2 group-hover:text-accent">
              →
            </span>
          </Link>
        </Reveal>
      </section>
    </article>
  );
}
