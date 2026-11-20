import { useEffect, useState } from "react";
import { withBase } from "../lib/assetPath";
import { useLanguage } from "../lib/LanguageContext";

const AUTOPLAY_MS = 4000;

// Slider foto sederhana untuk bagian "Tentang" (ganti storyPhotos di data/profile.js)
export default function PhotoSlider({ photos = [], alt = "" }) {
  const { t } = useLanguage();
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const total = photos.length;

  useEffect(() => {
    if (total < 2 || hover) return;
    const timer = setTimeout(() => setI((x) => (x + 1) % total), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [i, total, hover]);

  if (!total) return null;
  const go = (n) => setI(((n % total) + total) % total);

  return (
    <div className="photo-slider" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {photos.map((p, idx) => (
        <img
          key={p}
          src={withBase(p)}
          alt={total > 1 ? `${alt} ${idx + 1}/${total}` : alt}
          className={idx === i ? "on" : ""}
          loading={idx === 0 ? "eager" : "lazy"}
          draggable={false}
          onError={(e) => (e.currentTarget.style.visibility = "hidden")}
        />
      ))}
      {total > 1 && (
        <>
          <button type="button" className="ps-arrow ps-prev" aria-label={t.site.about.photoPrev} onClick={() => go(i - 1)}>
            <i className="bi bi-chevron-left" />
          </button>
          <button type="button" className="ps-arrow ps-next" aria-label={t.site.about.photoNext} onClick={() => go(i + 1)}>
            <i className="bi bi-chevron-right" />
          </button>
          <div className="ps-dots">
            {photos.map((p, idx) => (
              <button key={p} type="button" aria-label={`${idx + 1}`} className={idx === i ? "on" : ""} onClick={() => go(idx)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
