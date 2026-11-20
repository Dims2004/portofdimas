import { useLanguage } from "../lib/LanguageContext";
import { profile } from "../data/profile";
import { works } from "../data/works";
import { certificates } from "../data/certificates";
import { internships } from "../data/experience";
import Reveal from "./Reveal";
import Counter from "./Counter";

export default function Stats() {
  const { t } = useLanguage();
  const s = t.site.stats;
  const items = [
    { icon: "bi-journal-richtext", end: works.length, ...s.projects },
    { icon: "bi-award", end: certificates.length, ...s.certificates },
    { icon: "bi-briefcase", end: internships.length, ...s.internships },
    { icon: "bi-mortarboard", end: profile.gpa, decimals: 2, ...s.gpa },
  ];
  return (
    <section id="stats" className="stats section">
      <div className="container">
        <div className="row gy-4">
          {items.map((it, i) => (
            <Reveal key={it.label} className="col-lg-3 col-md-6" delay={i * 80}>
              <div className="stats-item">
                <i className={`bi ${it.icon}`} />
                <Counter end={it.end} decimals={it.decimals || 0} />
                <p>
                  <strong>{it.label}</strong> <span>{it.sub}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
