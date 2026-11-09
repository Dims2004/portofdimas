import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { withBase } from "../lib/assetPath";

// ============================================================
// Carousel foto ala polaroid untuk halaman Story.
// Bisa digeser (swipe/drag) di mobile & desktop, ada tombol
// panah kiri-kanan, dan dot indicator di bawah.
//
// Cara pakai:
// <StoryPhotoCarousel
//   photos={["FOTO1.jpeg", "FOTO2.jpeg", "FOTO3.jpeg"]}
//   alt="Foto Dimas Febrianto"
// />
// Tinggal tambah/kurangi item di array `photos`, jumlah foto bebas.
// ============================================================

const SWIPE_THRESHOLD = 60; // jarak (px) minimal drag supaya dianggap swipe
const SWIPE_VELOCITY = 500; // atau kecepatan drag minimal (px/s)

export default function StoryPhotoCarousel({ photos = [], alt = "" }) {
  const [[index, direction], setIndex] = useState([0, 0]);

  if (!photos.length) return null;

  const total = photos.length;
  const current = ((index % total) + total) % total; // biar aman kalau index negatif

  const goTo = (newIndex, dir) => {
    setIndex([newIndex, dir]);
  };

  const goNext = () => goTo(current + 1, 1);
  const goPrev = () => goTo(current - 1, -1);

  const handleDragEnd = (_event, info) => {
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
    <div className="relative mx-auto h-72 w-64 sm:h-80 sm:w-72">
      {/* tumpukan kertas foto di belakang, murni dekorasi */}
      <div className="pointer-events-none absolute inset-0 rotate-6 rounded-sm bg-surface shadow-2xl shadow-black/40" />
      <div className="pointer-events-none absolute inset-0 -rotate-3 rounded-sm bg-surface shadow-2xl shadow-black/40" />

      <div className="absolute inset-0 overflow-hidden rounded-sm shadow-2xl shadow-black/50">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            drag={total > 1 ? "x" : false}
            dragElastic={0.15}
            dragConstraints={{ left: 0, right: 0 }}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.04 }}
            whileHover={{ scale: 1.02 }}
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
            className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/60 sm:flex"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Foto berikutnya"
            className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/60 sm:flex"
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
