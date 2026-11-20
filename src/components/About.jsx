import { useLanguage } from "../lib/LanguageContext";
import { profile } from "../data/profile";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import PhotoSlider from "./PhotoSlider";

export default function About() {
  const { t } = useLanguage();
  const a = t.about;
  const s = t.site.about;
  const github = profile.socials.find((x) => /github/i.test(x.label));
  const focus = a.eduFocus.replace(/^[^:]+:\s*/, "");

  const colA = [
    [s.degree, a.eduDegree],
    [s.campus, a.eduSchool],
    [s.period, a.eduPeriod],
    [s.gpa, a.eduGpa.replace(/^\S+\s/, "")],
  ];
  const colB = [
    [s.email, profile.email],
    [s.focus, focus],
    github ? ["GitHub", <a key="gh" href={github.href} target="_blank" rel="noopener noreferrer">{github.href.replace(/^https?:\/\//, "")}</a>] : null,
    [s.status, s.statusValue],
  ].filter(Boolean);

  const Row = ([k, v]) => (
    <li key={k}>
      <i className="bi bi-chevron-right" /> <strong>{k}:</strong> <span>{v}</span>
    </li>
  );

  return (
    <section id="about" className="about section">
      <SectionTitle title={a.title} sub={s.sub} />
      <Reveal className="container" delay={100}>
        <div className="row gy-4 justify-content-center">
          <div className="col-lg-4">
            <PhotoSlider photos={profile.storyPhotos} alt={profile.name} />
          </div>
          <div className="col-lg-8 content">
            <h2>{t.hero.role}</h2>
            <p className="fst-italic py-3">{t.hero.body}</p>
            <div className="row">
              <div className="col-lg-6"><ul>{colA.map(Row)}</ul></div>
              <div className="col-lg-6"><ul>{colB.map(Row)}</ul></div>
            </div>
            <p className="py-3 pb-0">{a.p1}</p>
            <p className="pt-3 pb-0">{a.p2}</p>
            <p className="pt-3 pb-0">{a.standP1} {a.standP2}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
