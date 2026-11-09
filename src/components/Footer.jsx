import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { useLanguage } from "../lib/LanguageContext";
import { profile } from "../data/profile";
import { works, getWork } from "../data/works";
import { PAGES } from "../lib/routes";
import { Aksara } from "./Ornaments";
import VisitorCounter from "./VisitorCounter";

// Footer bergaya "manifesto": pernyataan di atas, indeks halaman di bawahnya
export default function Footer() {
  const { t, lang } = useLanguage();
  const items = works.map((w) => getWork(w, lang));

  return (
    <footer className="foot">
      <Reveal y={16} className="foot-grid">
        <div className="foot-brand">
          <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
            <circle cx="22" cy="25" r="8.6" fill="#e0231c" fillOpacity=".9" />
            <path d="M5 13h34M9 18.4h26M22 8.5v27" stroke="#dfe7e0" strokeWidth="1.5" />
          </svg>
          <p>{t.hero.body}</p>
        </div>
        <div>
          <h4>{t.ui.page}</h4>
          <ul>
            {PAGES.map((p) => (
              <li key={p.id}><Link to={p.to} data-cursor>{t.nav[p.id]}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{t.projects.title}</h4>
          <ul>
            {items.map((w) => (
              <li key={w.slug}><Link to={`/karya/${w.slug}`} data-cursor>{w.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{t.ui.elsewhere}</h4>
          <ul>
            {profile.socials.map((s) => (
              <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" data-cursor>{s.label}</a></li>
            ))}
            <li><a href={`mailto:${profile.email}`} data-cursor>Email</a></li>
          </ul>
        </div>
      </Reveal>
      <div className="foot-base">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span><Aksara className="jp">ꦢꦶꦩꦱ꧀</Aksara></span>
        <span className="flex items-center gap-4">
          <VisitorCounter />
          <button type="button" data-cursor onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="uppercase tracking-[0.16em] transition-colors hover:text-[var(--bone)]">
            {t.footer.backToTop} ↑
          </button>
        </span>
      </div>
    </footer>
  );
}
