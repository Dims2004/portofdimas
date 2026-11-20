import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";
import { withBase } from "../lib/assetPath";
import { toneBackground } from "../lib/tones";
import { works, getWork, getWorkBySlug } from "../data/works";
import Lightbox from "../components/Lightbox";
import Reveal from "../components/Reveal";

export default function WorkDetail() {
  const { slug } = useParams();
  const { t, lang } = useLanguage();
  const d = t.site.detail;
  const work = getWorkBySlug(slug, lang);
  const [slide, setSlide] = useState(0);
  const [lb, setLb] = useState(null);

  if (!work) return <Navigate to="/" replace />;

  const index = works.findIndex((w) => w.slug === slug);
  const next = getWork(works[(index + 1) % works.length], lang);

  // Cover + foto galeri jadi satu daftar (slider & lightbox)
  const gallery = work.gallery || [];
  const images = [
    work.cover ? { src: work.cover, alt: work.title, caption: work.title } : null,
    ...gallery.map((caption, i) => {
      const src = work.galleryImages?.[i];
      return src ? { src, alt: caption, caption } : null;
    }),
  ].filter(Boolean);
  const galleryImages = images.filter((im) => im.src !== work.cover);
  const cur = ((slide % images.length) + images.length) % (images.length || 1);

  return (
    <>
      <div className="page-title dark-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">{work.title}</h1>
          <nav className="breadcrumbs">
            <ol>
              <li><Link to="/" state={{ scrollTo: "hero" }}>{t.site.nav.home}</Link></li>
              <li><Link to="/" state={{ scrollTo: "portfolio" }}>{t.site.nav.portfolio}</Link></li>
              <li className="current">{d.pageTitle}</li>
            </ol>
          </nav>
        </div>
      </div>

      <section id="portfolio-details" className="portfolio-details section">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-8">
              <div className="detail-slider">
                {images.length ? (
                  <>
                    <button type="button" className="detail-frame" onClick={() => setLb(cur)} aria-label={d.gallery}>
                      <img
                        key={images[cur].src}
                        src={withBase(images[cur].src)}
                        alt={images[cur].alt}
                        onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                      />
                    </button>
                    {images.length > 1 && (
                      <>
                        <button type="button" className="ps-arrow ps-prev" aria-label={t.site.lightbox.prev} onClick={() => setSlide(cur - 1)}>
                          <i className="bi bi-chevron-left" />
                        </button>
                        <button type="button" className="ps-arrow ps-next" aria-label={t.site.lightbox.next} onClick={() => setSlide(cur + 1)}>
                          <i className="bi bi-chevron-right" />
                        </button>
                        <div className="ps-dots">
                          {images.map((im, i) => (
                            <button key={im.src} type="button" className={i === cur ? "on" : ""} aria-label={`${i + 1}`} onClick={() => setSlide(i)} />
                          ))}
                        </div>
                      </>
                    )}
                    {images[cur].caption && <p className="detail-caption">{images[cur].caption}</p>}
                  </>
                ) : (
                  <div className="detail-frame ph" style={{ background: toneBackground(work.tone) }}><span>{work.title}</span></div>
                )}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="portfolio-info">
                <h3>{d.info}</h3>
                <ul>
                  <li><strong>{d.category}</strong>: {work.tags.join(", ")}</li>
                  <li><strong>{d.role}</strong>: {work.role}</li>
                  <li><strong>{d.year}</strong>: {work.year}</li>
                  {work.link && (
                    <li>
                      <strong>{d.code}</strong>:{" "}
                      <a href={work.link} target="_blank" rel="noopener noreferrer">{d.codeBtn} <i className="bi bi-box-arrow-up-right" /></a>
                    </li>
                  )}
                </ul>
              </div>
              <div className="portfolio-description">
                <h2>{work.title}</h2>
                {work.description.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </div>
          </div>

          {galleryImages.length > 0 && (
            <div className="detail-gallery-wrap">
              <h3 className="resume-title">{d.gallery}</h3>
              <div className="row gy-4">
                {galleryImages.map((im) => (
                  <Reveal className="col-lg-4 col-md-6" key={im.src}>
                    <button type="button" className="detail-thumb" onClick={() => setLb(images.findIndex((x) => x.src === im.src))}>
                      <span className="frame"><img src={withBase(im.src)} alt={im.alt} loading="lazy" /></span>
                      <span className="cap">{im.caption}</span>
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          <Link to={`/karya/${next.slug}`} className="next-project">
            <div>
              <small>{d.next}</small>
              <h4>{next.title}</h4>
            </div>
            <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </section>

      <Lightbox images={images} index={lb} onClose={() => setLb(null)} onNavigate={setLb} />
    </>
  );
}
