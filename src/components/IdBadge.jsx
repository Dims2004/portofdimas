import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { profile } from "../data/profile";
import { withBase } from "../lib/assetPath";

// ============================================================
// ID card yang tergantung di tali lanyard dan berayun pelan.
// Foto diambil dari profile.photo (src/data/profile.js).
// ============================================================
export default function IdBadge() {
  const { t } = useLanguage();

  return (
    <div className="relative mx-auto w-[250px] sm:w-[280px]">
      <motion.div
        animate={{ rotate: [-1.6, 1.6, -1.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50% -260px" }}
        className="relative"
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
              className="absolute inset-0 h-full w-full object-cover object-top"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d0719] to-transparent" />
          </div>

          <div className="space-y-1.5 px-5 pb-5 pt-2">
            <p className="text-2xl font-extrabold text-white">
              {profile.shortName}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
              {t.hero.badgeRole}
            </p>
            <p className="text-[11px] text-white/60">{t.hero.badgeMeta}</p>
            <div className="flex items-center justify-between pt-3">
              <a
                href={withBase(profile.cv)}
                target="_blank"
                rel="noopener noreferrer"
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
