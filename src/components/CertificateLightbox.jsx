import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { withBase } from "../lib/assetPath";

// ============================================================
// Lightbox / modal untuk menampilkan gambar sertifikat secara
// penuh (fullscreen) saat kartu sertifikat diklik.
// - Tutup dengan klik area gelap di luar gambar, klik tombol ×,
//   atau menekan tombol Escape di keyboard.
// ============================================================
export default function CertificateLightbox({ certificate, onClose }) {
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

  return (
    <AnimatePresence>
      {certificate && (
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
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/80 text-xl text-ink transition-colors hover:border-accent hover:text-accent"
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
              <img
                src={withBase(certificate.image)}
                alt={certificate.title}
                className="max-h-[75vh] w-auto rounded-xl border border-border object-contain shadow-2xl"
              />
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
    </AnimatePresence>
  );
}
