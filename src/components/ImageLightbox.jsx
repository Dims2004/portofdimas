import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { withBase } from "../lib/assetPath";

// ============================================================
// Lightbox / modal generik untuk menampilkan gambar secara penuh
// (fullscreen) saat sebuah gambar diklik. Bisa dipakai untuk satu
// gambar saja, atau untuk galeri (bisa geser next/prev).
//
// Props:
// - images   : array of { src, alt, caption } — path gambar TANPA
//              garis miring di depan, sama seperti pemakaian withBase
//              di tempat lain (contoh: "projects/foto.jpg")
// - index    : index gambar yang sedang aktif/terbuka (null/undefined
//              kalau lightbox lagi tertutup)
// - onClose  : dipanggil saat user menutup lightbox
// - onNavigate: dipanggil dengan index baru saat user pindah gambar
//               (lewat tombol panah atau tombol keyboard kiri/kanan)
//
// Cara pakai singkat:
// const [activeIndex, setActiveIndex] = useState(null);
// <ImageLightbox images={items} index={activeIndex} onClose={() => setActiveIndex(null)} onNavigate={setActiveIndex} />
// ============================================================
export default function ImageLightbox({ images = [], index, onClose, onNavigate }) {
  const isOpen = index !== null && index !== undefined && images[index];
  const total = images.length;

  const goPrev = () => {
    if (total <= 1) return;
    onNavigate((index - 1 + total) % total);
  };

  const goNext = () => {
    if (total <= 1) return;
    onNavigate((index + 1) % total);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handleKeyDown);

    // Kunci scroll body selagi lightbox terbuka
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, index]);

  const current = isOpen ? images[index] : null;

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.button
            type="button"
            aria-label="Tutup"
            onClick={onClose}
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/80 text-xl text-ink transition-colors hover:border-accent hover:text-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            ×
          </motion.button>

          {total > 1 && (
            <>
              <button
                type="button"
                aria-label="Gambar sebelumnya"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/80 text-ink transition-colors hover:border-accent hover:text-accent sm:left-6"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Gambar berikutnya"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/80 text-ink transition-colors hover:border-accent hover:text-accent sm:right-6"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          <motion.div
            key={index}
            className="flex max-h-full max-w-4xl flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={withBase(current.src)}
              alt={current.alt || ""}
              className="max-h-[75vh] w-auto rounded-xl border border-border object-contain shadow-2xl"
            />

            {(current.caption || total > 1) && (
              <div className="text-center">
                {current.caption && <p className="text-sm text-muted">{current.caption}</p>}
                {total > 1 && (
                  <p className="mt-1 text-xs text-muted">
                    {index + 1} / {total}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
