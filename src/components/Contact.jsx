import { useLanguage } from "../lib/LanguageContext";
import { withBase } from "../lib/assetPath";
import { profile } from "../data/profile";
import { socialIcon, shortUrl } from "../lib/icons";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import EmailChooser from "./EmailChooser";
import PortfolioDownload from "./PortfolioDownload";

export default function Contact() {
  const { t } = useLanguage();
  const c = t.site.contact;

  return (
    <section id="contact" className="contact section">
      <SectionTitle title={c.title} sub={c.sub} />
      <Reveal className="container" delay={100}>
        <div className="row gy-4">
          <div className="col-lg-5">
            <div className="info-wrap">
              <div className="info-item d-flex">
                <i className="bi bi-envelope flex-shrink-0" />
                <div>
                  <h3>{c.email}</h3>
                  <p>{profile.email}</p>
                </div>
              </div>
              {profile.socials.map((s) => (
                <div className="info-item d-flex" key={s.label}>
                  <i className={`bi ${socialIcon(s.label)} flex-shrink-0`} />
                  <div>
                    <h3>{s.label}</h3>
                    <p>
                      <a href={s.href} target="_blank" rel="noopener noreferrer">{shortUrl(s.href)}</a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-7">
            <div className="php-email-form contact-cta">
              <p className="eyebrow"><span className="live-dot" aria-hidden="true" /> {t.footer.openFor}</p>
              <h3>{t.footer.heading}</h3>
              <p>{t.hero.body}</p>
              <div className="hero-actions">
                <EmailChooser className="btn-site">
                  <i className="bi bi-send" /> {t.footer.ctaEmail}
                </EmailChooser>
                <a className="btn-site btn-site-outline" href={withBase(profile.cv)} target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-file-earmark-person" /> {t.hero.ctaCv}
                </a>
                <PortfolioDownload />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
