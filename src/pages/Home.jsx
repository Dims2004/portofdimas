import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Display from "../components/Display";
import { Aksara } from "../components/Ornaments";
import { useLanguage } from "../lib/LanguageContext";
import { useScene, sceneStore } from "../lib/sceneStore";
import { CHAPTERS } from "../lib/routes";
import { profile } from "../data/profile";

const ease = [0.16, 1, 0.3, 1];

export default function Home() {
  const { t } = useLanguage();
  const ready = useScene((s) => s.ready);
  const go = ready ? "show" : "hide";
  const fade = (d) => ({ initial: { opacity: 0, y: 22 }, animate: ready ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.9, delay: d, ease } });

  return (
    <section className="hero" id="home">
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-top">
        <motion.div className="eyebrow" {...fade(0.1)}>
          <span className="dot" /> {t.hero.eyebrow}
        </motion.div>
        <Display as="h1" lines={t.hero.titleLines} className="h-hero" immediate={ready} delay={0.2} />
        <motion.p className="eyebrow mb-3" style={{ marginBottom: 12 }} {...fade(0.55)}>
          {profile.name} — {t.hero.role}
        </motion.p>
        <motion.p className="body hero-sub" {...fade(0.65)}>{t.hero.body}</motion.p>
        <motion.div className="mt-4 flex flex-wrap gap-2" {...fade(0.75)}>
          {t.hero.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </motion.div>
        <motion.div className="hero-cta" {...fade(0.85)}>
          <Link to="/kontak" className="btn-primary" data-cursor>{t.hero.ctaContact}</Link>
          <Link to="/proyek" className="btn-ghost" data-cursor>{t.nav.projects}</Link>
        </motion.div>
      </div>

      <div className="hero-spacer" />

      <motion.div
        className="hero-word"
        aria-hidden="true"
        initial={{ opacity: 0, y: "18%" }}
        animate={ready ? { opacity: 0.55, y: 0 } : {}}
        transition={{ duration: 1.5, delay: 0.5, ease }}
      >
        DIMAS
      </motion.div>

      <div className="hero-foot">
        <motion.div className="hero-cue" {...fade(1)}>
          <span>{t.hero.cue}</span>
          <span className="track"><i /></span>
        </motion.div>
        <nav className="chapters" aria-label="Bab">
          {CHAPTERS.filter((c) => c.id !== "contact").map((c, i) => (
            <motion.div key={c.id} {...fade(1 + i * 0.08)}>
              <Link
                to={c.to}
                className="chip"
                data-cursor
                title={t.hero.chapters[c.id]}
                onMouseEnter={() => sceneStore.world?.setFocus(c.cam)}
                onMouseLeave={() => sceneStore.world?.setFocus(-1)}
              >
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <b>{t.nav[c.id]}</b>
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>

      <div className="hero-side" aria-hidden="true">
        <Aksara className="v jp">ꦢꦶꦩꦱ꧀</Aksara>
      </div>
    </section>
  );
}
