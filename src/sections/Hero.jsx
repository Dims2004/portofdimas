import { motion } from "framer-motion";
import Decor from "../components/Decor";
import IdBadge from "../components/IdBadge";
import { useLanguage } from "../lib/LanguageContext";
import { scrollToSection } from "../lib/scrollTo";
import { profile } from "../data/profile";
import { withBase } from "../lib/assetPath";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
  },
};

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32 sm:px-10"
    >
      <Decor type="target" className="left-[46%] top-28 hidden w-28 lg:block" />
      <Decor type="chart" className="bottom-14 right-[5%] w-52 sm:w-72" />
      <Decor type="network" className="bottom-8 left-[3%] w-52 sm:w-64" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-20 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="mb-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-200/80"
          >
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            className="text-5xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            {t.hero.greeting}
            <span className="block">{profile.name}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-lg font-medium text-white"
          >
            {t.hero.role}
          </motion.p>
          <motion.p variants={item} className="mt-1 text-xs text-violet-200/70">
            {t.hero.tags.join(" | ")}
          </motion.p>
          <motion.p
            variants={item}
            className="mt-6 max-w-[52ch] text-base leading-relaxed text-white/80"
          >
            {t.hero.body}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#1b0d33] transition-transform hover:-translate-y-0.5"
            >
              {t.hero.ctaContact}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("experience")}
              className="rounded-full border border-white/40 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              {t.hero.ctaExperience}
            </button>
            <a
              href={withBase(profile.cv)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/40 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              {t.hero.ctaCv}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.35,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          <IdBadge />
        </motion.div>
      </div>
    </section>
  );
}
