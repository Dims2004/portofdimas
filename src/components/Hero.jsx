import { useLanguage } from "../lib/LanguageContext";
import { withBase } from "../lib/assetPath";
import { socialIcon } from "../lib/icons";
import { profile } from "../data/profile";
import useTyped from "../hooks/useTyped";
import EmailChooser from "./EmailChooser";
import { scrollToId } from "./Header";

export default function Hero() {
  const { t } = useLanguage();
  const typed = useTyped(t.hero.tags);

  return (
    <section id="hero" className="hero section">
      <div className="container">
        <div className="hero-win reveal in">
          <div className="win-bar" aria-hidden="true">
            <span /><span /><span />
            <small>~/portofolio/{profile.shortName.toLowerCase()}.jsx</small>
          </div>
          <div className="hero-body">
            <div>
              <h2>{profile.name}</h2>
              <p>
                {t.site.hero.iAm} <span className="typed">{typed}</span>
                <span className="typed-cursor" aria-hidden="true" />
              </p>
              <div className="social-links">
                {profile.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
                    <i className={`bi ${socialIcon(s.label)}`} />
                  </a>
                ))}
              </div>
              <div className="hero-actions">
                <button type="button" className="btn-site" onClick={() => scrollToId("contact")}>
                  {t.hero.ctaContact}
                </button>
                <a className="btn-site btn-site-outline" href={withBase(profile.cv)} target="_blank" rel="noopener noreferrer">
                  {t.hero.ctaCv}
                </a>
                <EmailChooser className="btn-site btn-site-outline">{t.footer.ctaEmail}</EmailChooser>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
