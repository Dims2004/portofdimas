import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { withBase } from "../lib/assetPath";

// ============================================================
// Carousel foto Story yang menyatu dengan latar belakang.
// - Tepi foto memudar (degradasi) ke transparan, tanpa kotak/bayangan
// - Slide OTOMATIS tiap AUTOPLAY_MS (berhenti saat hover/drag)
// - Bisa digeser (swipe/drag), ada tombol panah dan dot indicator
//
// Cara pakai:
// <StoryPhotoCarousel photos={["FOTO1.jpeg", "FOTO2.jpeg"]} alt="Foto Dimas" />
// ============================================================

const AUTOPLAY_MS = 4000; // jeda antar slide (ms)
const SWIPE_THRESHOLD = 60; // jarak (px) minimal drag supaya dianggap swipe
const SWIPE_VELOCITY = 500; // atau kecepatan drag minimal (px/s)

// Seberapa lebar pinggiran yang memudar (0%-50%). Makin besar = makin lembut.
const FADE = "24%";

// Pudar di 4 sisi: gradien horizontal digabung (intersect) dengan gradien vertikal
const FADE_MASK = {
  WebkitMaskImage: `linear-gradient(to right, transparent 0%, #000 ${FADE}, #000 calc(100% - ${FADE}), transparent 100%), linear-gradient(to bottom, transparent 0%, #000 ${FADE}, #000 calc(100% - ${FADE}), transparent 100%)`,
  maskImage: `linear-gradient(to right, transparent 0%, #000 ${FADE}, #000 calc(100% - ${FADE}), transparent 100%), linear-gradient(to bottom, transparent 0%, #000 ${FADE}, #000 calc(100% - ${FADE}), transparent 100%)`,
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

export default function StoryPhotoCarousel({ photos = [], alt = "" }) {
  const [[index, direction], setIndex] = useState([0, 0]);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const reduceMotion = useReducedMotion();

  const total = photos.length;
  const current = total ? ((index % total) + total) % total : 0; // aman kalau index negatif

  const goTo = (newIndex, dir) => setIndex([newIndex, dir]);
  const goNext = () => goTo(current + 1, 1);
  const goPrev = () => goTo(current - 1, -1);

  // Slide otomatis: timer baru setiap foto berganti, jeda saat hover/drag
  useEffect(() => {
    if (total < 2 || hovered || dragging || reduceMotion) return;
    const timer = setTimeout(() => {
      if (!document.hidden) setIndex(([i]) => [i + 1, 1]);
      else setIndex(([i, d]) => [i, d]); // tab tidak aktif: lewati, timer diulang oleh efek ini
    }, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, total, hovered, dragging, reduceMotion]);

  if (!total) return null;

  const handleDragEnd = (_event, info) => {
    setDragging(false);
    const { offset, velocity } = info;
    if (offset.x < -SWIPE_THRESHOLD || velocity.x < -SWIPE_VELOCITY) {
      goNext();
    } else if (offset.x > SWIPE_THRESHOLD || velocity.x > SWIPE_VELOCITY) {
      goPrev();
    }
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div
      className="relative mx-auto h-80 w-72 sm:h-[26rem] sm:w-[22rem]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Foto dengan tepi memudar ke latar belakang (mask tetap, foto yang bergeser di dalamnya) */}
      <div className="absolute inset-0" style={FADE_MASK}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.25 } }}
            drag={total > 1 ? "x" : false}
            dragElastic={0.15}
            dragConstraints={{ left: 0, right: 0 }}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            onDragStart={() => setDragging(true)}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab select-none active:cursor-grabbing"
          >
            <img
              src={withBase(photos[current])}
              alt={total > 1 ? `${alt} ${current + 1}/${total}` : alt}
              draggable={false}
              className="h-full w-full select-none object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {total > 1 && (
        <>
          {/* Tombol panah kiri-kanan, disembunyikan di layar sangat kecil supaya tidak menutupi foto */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Foto sebelumnya"
            className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/60 sm:flex"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Foto berikutnya"
            className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/60 sm:flex"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dot indicator */}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i, i > current ? 1 : -1)}
                aria-label={`Ke foto ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? "w-5 bg-accent" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
