import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import WorkCard from "../components/WorkCard";
import { works, getWork } from "../data/works";
import { useLanguage } from "../lib/LanguageContext";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] } },
};

export default function Home() {
  const { t, lang } = useLanguage();
  const localizedWorks = works.map((w) => getWork(w, lang));

  return (
    <>
      {/* ============ HERO — dua kolom asimetris ============ */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 pt-20 sm:px-10 sm:pt-32 lg:grid-cols-[1.3fr_0.7fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="mb-6 text-sm text-accent-2">
            {t.home.openBadge}
          </motion.p>
          <h1 className="font-serif text-4xl leading-[1.12] sm:text-5xl lg:text-6xl">
            {t.home.heroLines.map((line) => (
              <motion.span key={line} variants={item} className="block">
                {line}
              </motion.span>
            ))}
          </h1>
          <motion.div variants={item} className="mt-10 flex flex-wrap items-end gap-8">
            <a
              href="mailto:febridimas905@gmail.com"
              className="rounded-full bg-accent px-7 py-4 text-sm font-medium text-[#17140F] transition-transform hover:-translate-y-0.5"
            >
              {t.home.ctaChat}
            </a>
            <p className="max-w-[30ch] text-sm text-muted">{t.home.heroCaption}</p>
          </motion.div>
        </motion.div>

        {/* Kartu statistik kecil di sisi kanan, sedikit diturunkan agar tidak lurus sejajar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col gap-4 self-end lg:translate-y-10"
        >
          <div className="rounded-2xl border border-border bg-surface p-6">
            <p className="font-serif text-3xl text-accent">3+</p>
            <p className="mt-1 text-sm text-muted">{t.home.statProjects}</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <p className="font-serif text-3xl text-accent">4</p>
            <p className="mt-1 text-sm text-muted">{t.home.statTools}</p>
          </div>
        </motion.div>
      </section>

      {/* ============ KARYA — grid bento, ukuran kartu tidak seragam ============ */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-[18ch] font-serif text-3xl sm:text-4xl">{t.home.workTitle}</h2>
          <Link
            to="/karya"
            className="text-sm text-muted underline decoration-border underline-offset-4 transition-colors hover:text-accent"
          >
            {t.home.seeAll}
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {localizedWorks.slice(0, 5).map((w, i) => (
            <Reveal
              key={w.slug}
              delay={(i % 3) * 0.08}
              className={w.size === "lg" ? "sm:col-span-2" : ""}
            >
              <WorkCard work={w} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ LAYANAN — daftar bertingkat, indentasi berselang ============ */}
      <section className="border-t border-border bg-bg-alt px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="mb-16 max-w-[16ch] font-serif text-3xl sm:text-4xl">{t.home.servicesTitle}</h2>
          </Reveal>

          <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2">
            {t.home.services.map((s, i) => (
              <Reveal
                key={s.title}
                delay={(i % 2) * 0.1}
                className={i % 2 === 1 ? "sm:mt-16" : ""}
              >
                <h3 className="mb-3 font-serif text-xl">{s.title}</h3>
                <p className="max-w-[48ch] text-muted">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}