import Reveal from "./Reveal";
import { useLanguage } from "../lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border px-6 pb-10 pt-24 sm:px-10">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
        <Reveal>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">{t.footer.heading}</h2>
        </Reveal>

        {/* Ilustrasi dekoratif: sticky note + kartu, murni CSS, boleh dihapus */}
        <Reveal delay={0.1} className="relative hidden h-40 sm:block">
          <div className="absolute left-0 top-2 w-40 -rotate-6 rounded-sm bg-[#f3e08a] p-4 text-xs text-[#4a4222] shadow-xl shadow-black/30">
            <p>✓ Internet of Things</p>
            <p>✓ Artificial Intelligence</p>
            <p>✓ Data Analytics</p>
            <p>✓ Web Development</p>
          </div>
          <div className="absolute left-36 top-0 w-16 rotate-3 rounded-md bg-gradient-to-br from-accent to-accent-2 shadow-xl shadow-black/40" style={{ aspectRatio: "4 / 5" }} />
        </Reveal>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-10 border-t border-border pt-10 sm:grid-cols-2">
        <Reveal>
          <p className="mb-3 text-sm text-accent-2">{t.footer.openFor}</p>
          <a
            href="mailto:febridimas905@gmail.com"
            className="inline-block font-serif text-2xl transition-colors hover:text-accent sm:text-3xl"
          >
            febridimas905@gmail.com
          </a>
        </Reveal>

        <Reveal delay={0.05} className="sm:text-right">
          <p className="mb-3 text-sm text-accent-2">{t.footer.social}</p>
          <div className="flex flex-wrap gap-5 text-sm text-muted sm:justify-end">
            <a href="https://www.linkedin.com/in/dimas-febrianto-38b294342/" target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              LinkedIn
            </a>
            <a href="https://www.instagram.com/dimsbiant_?igsh=MTdtOWs1c2JqdXFjOA==" target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              Instagram
            </a>
            <a href="https://github.com/Dims2004" target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              GitHub
            </a>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row">
        <span>© {new Date().getFullYear()} Dimas Febrianto</span>
        <a href="#top" className="hover:text-ink">
          {t.footer.backToTop}
        </a>
      </div>
    </footer>
  );
}