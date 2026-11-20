import { Link } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";
import { withBase } from "../lib/assetPath";
import { profile } from "../data/profile";
import { internships, organizations, getItem } from "../data/experience";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

export default function Resume() {
  const { t, lang } = useLanguage();
  const r = t.site.resume;
  const a = t.about;
  const interns = internships.map((i) => getItem(i, lang));
  const orgs = organizations.map((o) => getItem(o, lang));

  return (
    <section id="resume" className="resume section">
      <SectionTitle title={r.title} sub={r.sub} />
      <div className="container">
        <div className="row">
          <Reveal className="col-lg-6" delay={100}>
            <h3 className="resume-title">{r.summary}</h3>
            <div className="resume-item pb-0">
              <h4>{profile.name}</h4>
              <p><em>{t.hero.body}</em></p>
              <ul>
                <li>{profile.email}</li>
                <li>{t.hero.badgeMeta}</li>
              </ul>
            </div>

            <h3 className="resume-title">{r.education}</h3>
            <div className="resume-item">
              <h4>{a.eduDegree}</h4>
              <h5>{a.eduPeriod}</h5>
              <p><em>{a.eduSchool}</em></p>
              <ul>
                <li>{a.eduGpa}</li>
                <li>{a.eduFocus}</li>
              </ul>
            </div>

            <a className="btn-site mt-2" href={withBase(profile.cv)} target="_blank" rel="noopener noreferrer">
              <i className="bi bi-download" /> {t.hero.ctaCv}
            </a>
          </Reveal>

          <Reveal className="col-lg-6 mt-5 mt-lg-0" delay={200}>
            <h3 className="resume-title">{r.internship}</h3>
            {interns.map((i) => (
              <div className="resume-item" key={i.slug}>
                <h4>{i.role}</h4>
                {i.period && <h5>{i.period}</h5>}
                <p><em>{i.org}</em></p>
                <ul>
                  <li>{i.summary}</li>
                  {i.detailTo && (
                    <li>
                      <Link to={i.detailTo}>{t.experience.detail} <i className="bi bi-arrow-right-short" /></Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}

            <h3 className="resume-title">{r.organization}</h3>
            {orgs.map((o) => (
              <div className="resume-item" key={o.slug}>
                <h4>{o.title}</h4>
                {o.period && <h5>{o.period}</h5>}
                <p><em>{o.org}</em></p>
                <ul>
                  {o.bullets.map((b) => <li key={b}>{b}</li>)}
                  {o.tags && (
                    <li className="tag-row">
                      {o.tags.map((x) => <span className="chip" key={x}>{x}</span>)}
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
