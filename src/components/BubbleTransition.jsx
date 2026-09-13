import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Warna gelembung — sesuaikan dengan palet warna Anda di index.css / tailwind config
const BUBBLE_COLORS = ["bg-accent/40", "bg-accent-2/40", "bg-[#7C8B79]/40", "bg-[#8C6E9C]/40"];

function createBubbles(count = 16) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${Date.now()}-${i}`,
    left: Math.random() * 100, // posisi horizontal, dalam persen
    size: 14 + Math.random() * 46, // ukuran gelembung, dalam px
    delay: Math.random() * 0.35,
    duration: 1 + Math.random() * 0.9,
    drift: Math.random() * 60 - 30, // sedikit geser ke kiri/kanan saat naik
    color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
  }));
}

export default function BubbleTransition() {
  const location = useLocation();
  const [bubbles, setBubbles] = useState([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Jangan munculkan gelembung saat pertama kali situs dibuka, hanya saat berpindah halaman
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const batch = createBubbles();
    setBubbles(batch);

    const timeout = setTimeout(() => setBubbles([]), 2000);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {bubbles.map((b) => (
          <motion.span
            key={b.id}
            className={`absolute bottom-0 rounded-full ${b.color} backdrop-blur-sm`}
            style={{ left: `${b.left}%`, width: b.size, height: b.size }}
            initial={{ y: 40, x: 0, opacity: 0, scale: 0.5 }}
            animate={{
              y: "-115vh",
              x: b.drift,
              opacity: [0, 1, 1, 0],
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: b.duration, delay: b.delay, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}