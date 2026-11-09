import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { sceneStore } from "../lib/sceneStore";
import { withBase } from "../lib/assetPath";

// ============================================================
// Lightbox / modal untuk menampilkan gambar sertifikat secara
// penuh (fullscreen) saat kartu sertifikat diklik.
// - Tutup dengan klik area gelap di luar gambar, klik tombol ×,
//   atau menekan tombol Escape di keyboard.
// ============================================================
export default function CertificateLightbox({ certificate, onClose }) {
  const open = !!certificate;
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(false), [certificate]);
  useEffect(() => {
    if (!open) return;
    sceneStore.world?.setPaused(true);
    return () => sceneStore.world?.setPaused(false);
  }, [open]);

  useEffect(() => {
    if (!certificate) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    // Kunci scroll body selagi lightbox terbuka
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [certificate, onClose]);

  /* Dirender ke <body> (portal): kalau tidak, aturan CSS `.pg > *` memaksa
     position:relative sehingga kotak ini jatuh ke bawah halaman, tidak menutupi layar. */
  return createPortal(
    <AnimatePresence>
      {certificate && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 sm:p-8"
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
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/60 text-xl text-ink transition-colors hover:border-accent hover:text-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            ×
          </motion.button>

          <motion.div
            className="flex max-h-full max-w-4xl flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {certificate.image ? (
              <div className="relative flex min-h-[40vh] min-w-[60vw] items-center justify-center sm:min-w-[40vw]">
                {!loaded && (
                  <span className="absolute h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-accent" aria-label="Memuat" />
                )}
                <img
                  key={certificate.slug}
                  src={withBase(certificate.image)}
                  alt={certificate.title}
                  decoding="async"
                  onLoad={() => setLoaded(true)}
                  onError={() => setLoaded(true)}
                  className={`max-h-[75vh] w-auto rounded-xl border border-white/20 object-contain shadow-2xl transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
                />
              </div>
            ) : (
              <div className="flex h-[50vh] w-full max-w-2xl items-center justify-center rounded-xl border border-border bg-surface text-sm text-muted">
                Gambar sertifikat belum tersedia
              </div>
            )}

            <div className="text-center">
              <h3 className="font-serif text-lg text-ink sm:text-xl">{certificate.title}</h3>
              <p className="text-sm text-muted">
                {certificate.issuer}
                {certificate.year ? ` · ${certificate.year}` : ""}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
