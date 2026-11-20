import { useEffect } from "react";
import { createPortal } from "react-dom";
import { withBase } from "../lib/assetPath";
import { useLanguage } from "../lib/LanguageContext";

// ============================================================
// Lightbox gambar (pengganti GLightbox), bisa geser next/prev.
// images   : [{ src, alt, caption }]  (src tanpa garis miring depan)
// index    : index aktif, null/undefined = tertutup
// onClose, onNavigate(newIndex)
// ============================================================
export default function Lightbox({ images = [], index, onClose, onNavigate }) {
  const { t } = useLanguage();
  const total = images.length;
  const current = index !== null && index !== undefined ? images[index] : null;

  const prev = () => total > 1 && onNavigate((index - 1 + total) % total);
  const next = () => total > 1 && onNavigate((index + 1) % total);

  useEffect(() => {
    if (!current) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = old;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, index]);

  if (!current) return null;
  const lb = t.site.lightbox;

  return createPortal(
    <div className="lb" role="dialog" aria-modal="true" onClick={onClose}>
      <button type="button" className="lb-btn lb-close" aria-label={lb.close} onClick={onClose}>
        <i className="bi bi-x-lg" />
      </button>
      {total > 1 && (
        <>
          <button
            type="button"
            className="lb-btn lb-prev"
            aria-label={lb.prev}
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            <i className="bi bi-chevron-left" />
          </button>
          <button
            type="button"
            className="lb-btn lb-next"
            aria-label={lb.next}
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <i className="bi bi-chevron-right" />
          </button>
        </>
      )}
      <figure className="lb-fig" onClick={(e) => e.stopPropagation()}>
        <img src={withBase(current.src)} alt={current.alt || ""} decoding="async" />
        {(current.caption || total > 1) && (
          <figcaption>
            {current.caption && <span>{current.caption}</span>}
            {total > 1 && <small>{index + 1} / {total}</small>}
          </figcaption>
        )}
      </figure>
    </div>,
    document.body
  );
}
