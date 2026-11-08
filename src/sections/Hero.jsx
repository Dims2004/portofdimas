import { useRef } from "react";
import { motion } from "framer-motion";
import HeroScene from "../components/HeroScene";
import IdBadge from "../components/IdBadge";
import { Aksara } from "../components/Ornaments";
import { useLanguage } from "../lib/LanguageContext";
import { scrollToSection } from "../lib/scrollTo";
import { profile } from "../data/profile";

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
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-24 pt-32 sm:px-10"
    >
      <HeroScene targetRef={ref} />

      {/* watermark aksara Jawa: "Dimas" */}
      <Aksara className="pointer-events-none absolute left-[2%] top-[14%] z-0 text-[9rem] leading-none text-accent-2/[0.07] sm:text-[16rem]">
        ꦢꦶꦩꦱ꧀
      </Aksara>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-20 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="mb-6 flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent"
          >
            <span className="h-px w-8 bg-accent" />
            {t.hero.eyebrow}
            <span className="animate-blink">▍</span>
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            {t.hero.greeting}
            <span className="title-glow block bg-gradient-to-r from-white via-cyan-100 to-accent-2 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 font-display text-xl font-medium text-white"
          >
            {t.hero.role}
          </motion.p>
          <motion.div variants={item} className="mt-3 flex flex-wrap gap-2">
            {t.hero.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-accent/30 bg-accent/5 px-2.5 py-1 font-mono text-[11px] text-accent/90"
              >
                {tag}
              </span>
            ))}
          </motion.div>
          <motion.p
            variants={item}
            className="mt-6 max-w-[52ch] text-base leading-relaxed text-white/80"
          >
            {t.hero.body}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="btn-primary"
            >
              {t.hero.ctaContact}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("experience")}
              className="btn-ghost"
            >
              {t.hero.ctaExperience}
            </button>
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

      {/* petunjuk scroll */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
          scroll
        </span>
        <span className="relative block h-10 w-px overflow-hidden bg-white/15">
          <span
            className="absolute inset-x-0 top-0 h-full bg-accent"
            style={{ animation: "scroll-hint 1.8s ease-in-out infinite" }}
          />
        </span>
      </div>
    </section>
  );
}
