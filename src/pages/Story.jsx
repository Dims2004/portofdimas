import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { useLanguage } from "../lib/LanguageContext";

export default function Story() {
  const { t } = useLanguage();
  const experience = t.story.experience;
  const tones = [
    "from-[#7C8B79] to-[#4B5A48]",
    "from-[#C9A24B] to-[#8A6E2E]",
    "from-[#8C6E9C] to-[#5A4566]",
    "from-[#5C8B8A] to-[#345251]",
  ];

  return (
    <div>
      {/* ===== Intro ===== */}
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-20 sm:px-10 sm:pt-28">
        <Reveal className="max-w-2xl">
          <p className="mb-4 text-sm text-accent-2">{t.story.eyebrow}</p>
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">{t.story.heading}</h1>
          <a
            href="mailto:febridimas905@gmail.com"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            {t.story.ctaChat}
          </a>
        </Reveal>
      </section>

      {/* ===== Bagaimana saya sampai di sini + foto ===== */}
      <section className="mx-auto grid max-w-6xl gap-12 border-t border-border px-6 py-20 sm:px-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="mb-4 font-serif italic text-accent-2">{t.story.journeyLabel}</p>
          <p className="mb-4 text-muted">{t.story.journeyP1}</p>
          <p className="text-muted">{t.story.journeyP2}</p>
        </Reveal>

        {/* Mockup foto bertumpuk ala polaroid — foto paling atas bisa digeser (drag) */}
        <Reveal delay={0.1} className="relative mx-auto h-72 w-64 sm:h-80 sm:w-72">
          <div className="pointer-events-none absolute inset-0 rotate-6 rounded-sm bg-surface shadow-2xl shadow-black/40" />
          <div className="pointer-events-none absolute inset-0 -rotate-3 rounded-sm bg-surface shadow-2xl shadow-black/40" />
          <motion.div
            className="absolute inset-0 cursor-grab overflow-hidden rounded-sm shadow-2xl shadow-black/50 active:cursor-grabbing"
            drag
            dragElastic={0.15}
            dragSnapToOrigin
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            whileDrag={{ scale: 1.06, boxShadow: "0 25px 45px rgba(0,0,0,0.55)" }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="/fotoaim.png"
              alt="Foto Dimas Febrianto"
              draggable={false}
              className="h-full w-full select-none object-cover"
            />
          </motion.div>
        </Reveal>
      </section>

      {/* ===== Pengalaman kerja + di mana saya berdiri ===== */}
      <section className="border-t border-border px-6 py-20 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2">
          {/* Timeline pengalaman */}
          <Reveal>
            <h2 className="mb-8 font-serif text-2xl sm:text-3xl">{t.story.experienceTitle}</h2>
            <ul className="space-y-1">
              {experience.map((exp, i) => (
                <li
                  key={exp.role + exp.company}
                  className="flex items-center justify-between gap-4 border-t border-border py-4 last:border-b"
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-9 w-9 flex-none rounded-full bg-gradient-to-br ${tones[i % tones.length]}`} />
                    <div>
                      <p className="text-sm text-ink">{exp.role}</p>
                      <p className="text-sm text-muted">{exp.company}</p>
                    </div>
                  </div>
                  <span className="whitespace-nowrap text-xs text-muted">{exp.period}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Filosofi kerja + unduh CV */}
          <Reveal delay={0.1} className="lg:pt-16">
            <p className="mb-4 font-serif italic text-accent-2">{t.story.standTitle}</p>
            <p className="mb-4 text-muted">{t.story.standP1}</p>
            <p className="mb-8 text-muted">{t.story.standP2}</p>
            <a
              href="/CV DIMAS FEBRIANTO 2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              {t.story.downloadCv}
            </a>
          </Reveal>
        </div>
      </section>

      {/* ===== Tools ===== */}
      <section className="border-t border-border px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal className="ml-auto max-w-md text-right">
            <h2 className="mb-6 font-serif text-2xl sm:text-3xl">{t.story.toolsTitle}</h2>
            <div className="flex flex-wrap justify-end gap-2">
              {["Python", "JavaScript", "ESP32 / Arduino", "Firebase", "React", "Figma"].map((tool) => (
                <span key={tool} className="rounded-full border border-border px-4 py-2 text-sm text-ink">
                  {tool}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}