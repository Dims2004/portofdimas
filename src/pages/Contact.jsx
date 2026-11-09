import Reveal from "../components/Reveal";
import Display from "../components/Display";
import SectionTitle from "../components/SectionTitle";
import EmailChooser from "../components/EmailChooser";
import PortfolioDownload from "../components/PortfolioDownload";
import { useLanguage } from "../lib/LanguageContext";
import { profile } from "../data/profile";
import { withBase } from "../lib/assetPath";

export default function Contact() {
  const { t } = useLanguage();
  return (
    <section className="pg">
      <SectionTitle no={6} label={t.nav.contact} />
      <div className="fin">
        <p className="eyebrow" style={{ margin: 0 }}><span className="dot" style={{ display: "inline-block", marginRight: 10 }} />{t.footer.openFor}</p>
        <Display lines={t.footer.heading.split(" ")} className="" immediate />
        <img src={withBase("dimas.png")} alt="Dimas Febrianto" className="fin-photo" draggable="false" />
        <Reveal className="contents">
          <EmailChooser className="mail" >{profile.email}</EmailChooser>
        </Reveal>
        <Reveal className="contents"><p className="body-lg">{t.hero.body}</p></Reveal>
        <Reveal className="acts">
          <EmailChooser className="btn-primary">{t.footer.ctaEmail}</EmailChooser>
          <a href={withBase(profile.cv)} target="_blank" rel="noopener noreferrer" className="btn-ghost" data-cursor>{t.hero.ctaCv}</a>
          <PortfolioDownload />
        </Reveal>
      </div>
      <Reveal className="socials">
        {profile.socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="tag" data-cursor style={{ padding: "9px 18px", color: "var(--bone)" }}>{s.label}</a>
        ))}
      </Reveal>
    </section>
  );
}