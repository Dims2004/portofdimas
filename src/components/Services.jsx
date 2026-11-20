import { useLanguage } from "../lib/LanguageContext";
import { profile } from "../data/profile";
import { serviceIcons, toolIcon } from "../lib/icons";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

// Bidang keahlian (isi dari t.about.services) + tools harian (profile.tools)
export default function Services() {
  const { t } = useLanguage();
  const s = t.site.services;
  return (
    <section id="services" className="services section">
      <SectionTitle title={s.title} sub={s.sub} />
      <div className="container">
        <div className="row gy-4">
          {t.about.services.map((it, i) => (
            <Reveal className="col-lg-4 col-md-6" delay={(i % 3) * 100 + 100} key={it.title}>
              <div className="service-item d-flex">
                <div className="icon flex-shrink-0"><i className={`bi ${serviceIcons[i % serviceIcons.length]}`} /></div>
                <div>
                  <h4 className="title">{it.title}</h4>
                  <p className="description">{it.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="tools" delay={150}>
          <h3>{t.about.toolsTitle}</h3>
          <ul>
            {profile.tools.map((tool) => (
              <li key={tool}>
                <i className={`bi ${toolIcon(tool)}`} /> {tool}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
