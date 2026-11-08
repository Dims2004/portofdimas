import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import Decor from "../components/Decor";
import StoryPhotoCarousel from "../components/StoryPhotoCarousel";
import { Gunungan } from "../components/Ornaments";
import { useLanguage } from "../lib/LanguageContext";
import { profile } from "../data/profile";

const eyebrow =
  "mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-2";

export default function About() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section
      id="about"
      className="relative scroll-mt-4 overflow-hidden px-6 py-24 sm:px-10"
    >
      <Decor type="kawung" className="right-[4%] top-16 w-32 sm:w-44" />
      <Gunungan className="pointer-events-none absolute -left-6 bottom-24 hidden w-44 opacity-[0.12] lg:block" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionTitle no={1}>{a.title}</SectionTitle>

        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="mb-5 leading-relaxed text-white/80">{a.p1}</p>
            <p className="leading-relaxed text-white/80">{a.p2}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="glass hud rounded-md px-6 py-4">
                <p className="font-display text-4xl font-bold text-accent">3+</p>
                <p className="mt-1 text-xs text-muted">{a.statProjects}</p>
              </div>
              <div className="glass hud rounded-md px-6 py-4">
                <p className="font-display text-4xl font-bold text-accent-2">4</p>
                <p className="mt-1 text-xs text-muted">{a.statFields}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="pb-8">
            <StoryPhotoCarousel
              photos={profile.storyPhotos}
              alt={`Foto ${profile.name}`}
            />
          </Reveal>
        </div>

        {/* Pendidikan + filosofi */}
        <div className="mt-20 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="glass hud h-full rounded-lg p-8">
              <p className={eyebrow}>{a.eduTitle}</p>
              <h3 className="font-display text-xl font-bold text-white">{a.eduDegree}</h3>
              <p className="mt-1 text-sm text-white/80">{a.eduSchool}</p>
              <p className="mt-3 font-mono text-xs text-accent">
                {a.eduPeriod} · {a.eduGpa}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{a.eduFocus}</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass hud h-full rounded-lg p-8">
              <p className={eyebrow}>{a.standTitle}</p>
              <p className="mb-3 text-sm leading-relaxed text-muted">{a.standP1}</p>
              <p className="text-sm leading-relaxed text-muted">{a.standP2}</p>
            </div>
          </Reveal>
        </div>

        {/* Bidang keahlian */}
        <Reveal className="mt-16">
          <h3 className="font-display text-2xl font-bold text-white">{a.skillsTitle}</h3>
          <span className="tumpal-line mb-6 mt-3" style={{ width: "6rem" }} />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {a.services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="glass hud h-full rounded-md p-6 transition-colors hover:border-accent/50">
                <p className="mb-3 font-mono text-[10px] tracking-[0.25em] text-accent-2/80">
                  MOD.{String(i + 1).padStart(2, "0")}
                </p>
                <h4 className="mb-2 font-display font-bold text-white">{s.title}</h4>
                <p className="text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Tools */}
        <Reveal className="mt-12">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {a.toolsTitle}
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-sm border border-accent/25 bg-accent/5 px-4 py-2 font-mono text-xs text-white transition-colors hover:border-accent hover:bg-accent/10"
              >
                {tool}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
