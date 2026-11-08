import Reveal from "./Reveal";
import Decor from "./Decor";
import { Aksara, Candi, Gunungan } from "./Ornaments";
import { useLanguage } from "../lib/LanguageContext";
import { profile } from "../data/profile";
import { withBase } from "../lib/assetPath";
import PortfolioDownload from "./PortfolioDownload";
import EmailChooser from "./EmailChooser";
import VisitorCounter from "./VisitorCounter";

// Footer sekaligus section "Kontak" (id="contact")
export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      id="contact"
      className="relative scroll-mt-4 overflow-hidden px-6 pb-10 pt-24 sm:px-10"
    >
      {/* siluet candi + aksara di latar */}
      <Candi className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-[min(1000px,140%)] opacity-[0.22]" />
      <Aksara className="pointer-events-none absolute right-[3%] top-10 z-0 text-[8rem] leading-none text-accent-2/[0.07] sm:text-[14rem]">
        ꦢꦶꦩꦱ꧀
      </Aksara>
      <Gunungan className="pointer-events-none absolute left-[3%] top-16 hidden w-32 opacity-[0.14] sm:block" />
      <Decor type="network" className="bottom-40 right-[4%] hidden w-64 sm:block" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-accent">
            <span>06</span>
            <span className="h-px w-8 bg-accent/60" />
            <span className="font-aksara text-base tracking-normal text-accent-2">꧖</span>
          </p>
          <h2 className="title-glow font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {t.footer.heading}
          </h2>
          <span className="tumpal-line mt-5" />
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-accent-2">
            {t.footer.openFor}
          </p>
          <EmailChooser className="mt-3 inline-block break-all text-left font-display text-2xl font-bold text-white transition-colors hover:text-accent sm:text-4xl">
            {profile.email}
          </EmailChooser>
          <div className="mt-8 flex flex-wrap gap-4">
            <EmailChooser className="btn-primary">{t.footer.ctaEmail}</EmailChooser>
            <a
              href={withBase(profile.cv)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              {t.hero.ctaCv}
            </a>
            <PortfolioDownload />
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-16 border-t border-accent/15 pt-8">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {t.footer.social}
          </p>
          <div className="flex flex-wrap gap-3">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-accent/25 bg-accent/5 px-5 py-2 font-mono text-xs text-white transition-colors hover:border-accent hover:bg-accent/15 hover:text-accent"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-accent/15 pt-6 font-mono text-xs text-muted sm:flex-row">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <VisitorCounter />
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="uppercase tracking-wider transition-colors hover:text-accent"
          >
            {t.footer.backToTop} ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
