import Reveal from "../components/Reveal";
import Display from "../components/Display";
import SectionTitle from "../components/SectionTitle";
import StoryPhotoCarousel from "../components/StoryPhotoCarousel";
import IdBadge from "../components/IdBadge";
import { useLanguage } from "../lib/LanguageContext";
import { profile } from "../data/profile";

export default function About() {
  const { t } = useLanguage();
  const a = t.about;
  const stats = [
    ["3+", a.statProjects],
    ["4", a.statFields],
    [a.eduGpa.replace(/^\D+/, ""), a.statGpa],
    [a.eduPeriod.split("—").pop().trim(), a.statYear],
  ];

  return (
    <section className="pg">
      <SectionTitle no={1} label={a.title} />

      <div className="spread">
        <Display lines={[a.title]} className="h-sec" immediate />
        <Reveal className="copy">
          <p className="lead">{a.p1}</p>
          <p className="body">{a.p2}</p>
        </Reveal>
        <Reveal className="media" delay={0.1}>
          <StoryPhotoCarousel photos={profile.storyPhotos} alt={`Foto ${profile.name}`} />
          <div className="pt-16 lg:pt-10"><IdBadge /></div>
        </Reveal>
      </div>

      <Reveal className="stats">
        {stats.map(([n, l]) => (
          <div key={l}><b>{n}</b><span>{l}</span></div>
        ))}
      </Reveal>

      <Reveal className="sub-head"><h3>{a.eduTitle} · {a.standTitle}</h3><span className="rule" /></Reveal>
      <div className="two">
        <Reveal className="panel">
          <span className="eyebrow">{a.eduTitle}</span>
          <h3>{a.eduDegree}</h3>
          <p className="body mt-2">{a.eduSchool}</p>
          <p className="eyebrow mt-4" style={{ color: "var(--vermilion)" }}>{a.eduPeriod} · {a.eduGpa}</p>
          <p className="body mt-4">{a.eduFocus}</p>
        </Reveal>
        <Reveal className="panel" delay={0.08}>
          <span className="eyebrow">{a.standTitle}</span>
          <p className="body">{a.standP1}</p>
          <p className="body mt-3">{a.standP2}</p>
        </Reveal>
      </div>

      <Reveal className="sub-head"><h3>{a.skillsTitle}</h3><span className="rule" /></Reveal>
      <div className="atlas">
        {a.services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06} className="plate s3">
            <span className="k">MOD.{String(i + 1).padStart(2, "0")}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <i className="bar" />
          </Reveal>
        ))}
      </div>

      <Reveal className="sub-head"><h3>{a.toolsTitle}</h3><span className="rule" /></Reveal>
      <Reveal className="flex flex-wrap gap-2">
        {profile.tools.map((tool) => <span key={tool} className="tag" style={{ padding: "9px 18px", color: "var(--bone)" }}>{tool}</span>)}
      </Reveal>
    </section>
  );
}
