import Reveal from "./Reveal";
import Decor from "./Decor";
import { useLanguage } from "../lib/LanguageContext";
import { profile } from "../data/profile";
import { withBase } from "../lib/assetPath";
import PortfolioDownload from "./PortfolioDownload";

// Footer sekaligus section "Kontak" (id="contact")
export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      id="contact"
      className="relative scroll-mt-4 overflow-hidden px-6 pb-10 pt-24 sm:px-10"
    >
      <Decor
        type="network"
        className="bottom-24 right-[4%] hidden w-64 sm:block"
      />
      <Decor type="target" className="left-[3%] top-12 hidden w-32 sm:block" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {t.footer.heading}
          </h2>
          <span className="mt-4 block h-[3px] w-14 rounded-full bg-white" />
          <p className="mt-8 text-sm text-accent-2">{t.footer.openFor}</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-3 inline-block break-all text-2xl font-bold text-white transition-colors hover:text-accent-2 sm:text-4xl"
          >
            {profile.email}
          </a>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#1b0d33] transition-transform hover:-translate-y-0.5"
            >
              {t.footer.ctaEmail}
            </a>
            <a
              href={withBase(profile.cv)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/40 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              {t.hero.ctaCv}
            </a>
            <PortfolioDownload />
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-16 border-t border-white/10 pt-8">
          <p className="mb-4 text-sm text-muted">{t.footer.social}</p>
          <div className="flex flex-wrap gap-3">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm text-white transition-colors hover:border-white/50 hover:bg-white/10"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-muted sm:flex-row">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="transition-colors hover:text-white"
          >
            {t.footer.backToTop}
          </button>
        </div>
      </div>
    </footer>
  );
}
