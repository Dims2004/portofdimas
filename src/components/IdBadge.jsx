import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { profile } from "../data/profile";
import { withBase } from "../lib/assetPath";

// ============================================================
// ID card holografik yang tergantung di tali lanyard.
// - Berayun pelan sendiri (idle)
// - Bisa ditarik kiri/kanan dengan kursor/jari, lepas → berayun seperti bandul
// Foto diambil dari profile.photo (src/data/profile.js).
// ============================================================
const MAX_ANGLE = 40; // batas sudut tarik (derajat)
const SENSITIVITY = 6; // makin kecil = makin sensitif (px per derajat)

export default function IdBadge({ longRope = false }) {
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
          className={`absolute bottom-full left-1/2 -mb-5 h-14 w-3 -translate-x-1/2 rounded-t-full bg-gradient-to-b from-transparent to-[#26302e] shadow-[0_0_12px_rgba(223,231,224,0.35)] ${longRope ? "lg:h-[120vh] lg:rounded-none lg:from-[#05070a]" : ""}`}
        />
        {/* cincin + klip */}
        <div
          aria-hidden="true"
          className="absolute -top-[34px] left-1/2 z-20 h-11 w-11 -translate-x-1/2 rounded-full border-[5px] border-[#26302e]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-2 left-1/2 z-20 h-6 w-12 -translate-x-1/2 rounded-sm bg-gradient-to-b from-amber-200 to-amber-600 shadow-md"
        />

        <div className="hud overflow-hidden rounded-lg border border-accent/35 bg-[#05070a] shadow-[0_0_50px_rgba(223,231,224,0.2)]">
          <div className="relative aspect-[4/4.4] w-full bg-gradient-to-b from-[#2b4a4f] via-[#16262c] to-[#05070a]">
            <img
              src={withBase(profile.photo)}
              alt={profile.name}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover object-top"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            {/* kilau holografik + garis pindai */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(223,231,224,0.16)_48%,transparent_62%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_3px)]" />
            <span className="absolute left-3 top-3 rounded-sm border border-accent/50 bg-black/50 px-2 py-0.5 font-mono text-[9px] tracking-[0.2em] text-accent">
              ID · 2026
            </span>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#05070a] to-transparent" />
          </div>

          <div className="space-y-1.5 px-5 pb-5 pt-2">
            <p className="font-display text-2xl font-bold text-white">{profile.shortName}</p>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-2">
              {t.hero.badgeRole}
            </p>
            <p className="text-[11px] text-white/60">{t.hero.badgeMeta}</p>
            <div className="flex items-center justify-between pt-3">
              <a
                href={withBase(profile.cv)}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                className="rounded-sm border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent transition-colors hover:bg-accent/25"
              >
                {t.hero.badgeCv}
              </a>
              <span className="font-mono text-[10px] text-white/50">2022 — 2026</span>
            </div>
            {/* barcode hias */}
            <div
              aria-hidden="true"
              className="mt-3 h-4 w-full opacity-60"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg,#dfe7e0 0 2px,transparent 2px 5px,#dfe7e0 5px 6px,transparent 6px 10px,#c9a24a 10px 11px,transparent 11px 14px)",
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
