import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { profile } from "../data/profile";
import { withBase } from "../lib/assetPath";

// ============================================================
// ID card yang tergantung di tali lanyard.
// - Berayun pelan sendiri (idle)
// - Bisa ditarik kiri/kanan dengan kursor/jari, lepas → berayun seperti bandul
// Foto diambil dari profile.photo (src/data/profile.js).
// ============================================================
const MAX_ANGLE = 40; // batas sudut tarik (derajat)
const SENSITIVITY = 6; // makin kecil = makin sensitif (px per derajat)

export default function IdBadge() {
  const { t } = useLanguage();
  const angle = useMotionValue(0);
  const controls = useRef(null);

  const startIdle = () => {
    controls.current = animate(angle, [-1.6, 1.6, -1.6], {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    });
  };

  useEffect(() => {
    startIdle();
    return () => controls.current?.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePanStart = () => controls.current?.stop();

  const handlePan = (_e, info) => {
    const a = info.offset.x / SENSITIVITY;
    angle.set(Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, a)));
  };

  const handlePanEnd = (_e, info) => {
    controls.current = animate(angle, 0, {
      type: "spring",
      stiffness: 40,
      damping: 3.5,
      velocity: info.velocity.x / SENSITIVITY,
      onComplete: startIdle,
    });
  };

  return (
    <div className="relative mx-auto w-[250px] sm:w-[280px]">
      <motion.div
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        style={{ rotate: angle, transformOrigin: "50% -260px", touchAction: "pan-y" }}
        className="relative cursor-grab select-none active:cursor-grabbing"
      >
        {/* tali lanyard: pendek di HP, menjulang ke atas di layar besar (PC) */}
        <div
          aria-hidden="true"
          className="absolute bottom-full left-1/2 -mb-5 h-14 w-3 -translate-x-1/2 rounded-t-full bg-gradient-to-b from-black/0 to-zinc-900 lg:h-[120vh] lg:rounded-none lg:from-black"
        />
        {/* cincin + klip */}
        <div
          aria-hidden="true"
          className="absolute -top-[34px] left-1/2 z-20 h-11 w-11 -translate-x-1/2 rounded-full border-[5px] border-zinc-900"
        />
        <div
          aria-hidden="true"
          className="absolute -top-2 left-1/2 z-20 h-6 w-12 -translate-x-1/2 rounded-md bg-gradient-to-b from-zinc-200 to-zinc-500 shadow-md"
        />

        <div className="overflow-hidden rounded-[22px] border border-white/20 bg-[#0d0719] shadow-2xl shadow-violet-950/70">
          <div className="relative aspect-[4/4.4] w-full bg-gradient-to-b from-violet-500 via-violet-700 to-[#1a0b38]">
            <img
              src={withBase(profile.photo)}
              alt={profile.name}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover object-top"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d0719] to-transparent" />
          </div>

          <div className="space-y-1.5 px-5 pb-5 pt-2">
            <p className="text-2xl font-extrabold text-white">{profile.shortName}</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">{t.hero.badgeRole}</p>
            <p className="text-[11px] text-white/60">{t.hero.badgeMeta}</p>
            <div className="flex items-center justify-between pt-3">
              <a
                href={withBase(profile.cv)}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                className="rounded-md border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white transition-colors hover:bg-white/20"
              >
                {t.hero.badgeCv}
              </a>
              <span className="text-[10px] text-white/50">2022 — 2026</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
