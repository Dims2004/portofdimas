import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";
import { withBase } from "../lib/assetPath";
import LanguageSwitch from "./LanguageSwitch";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const links = [
    { to: "/karya", label: t.nav.works },
    { to: "/sertifikasi", label: t.nav.certificates },
    { to: "/cerita", label: t.nav.story },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <Link
          to="/"
          className="flex items-center gap-3 font-serif text-lg tracking-tight"
          onClick={() => setOpen(false)}
        >
          {/* Ganti logo.png dengan file logo Anda di folder public/ */}
          <img src={withBase("logo.png")} alt="Logo Dimas Febrianto" className="h-8 w-8 rounded-full object-cover" />
          Dimas Febrianto
        </Link>

        <nav className="hidden items-center gap-8 text-sm sm:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `transition-colors hover:text-ink ${isActive ? "text-ink" : "text-muted"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={withBase("CV DIMAS FEBRIANTO 2026.pdf")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-ink"
          >
            {t.nav.cv}
          </a>
          <a
            href="mailto:febridimas905@gmail.com"
            className="rounded-full border border-border px-4 py-2 text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {t.nav.contact}
          </a>
          <LanguageSwitch />
        </nav>

        <div className="flex items-center gap-3 sm:hidden">
          <LanguageSwitch />
          <button
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5"
            aria-label="Buka menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-px w-6 bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-6 bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 pb-6 sm:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="py-3 text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={withBase("CV DIMAS FEBRIANTO 2026.pdf")}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 text-muted transition-colors hover:text-ink"
          >
            {t.nav.cv}
          </a>
          <a
            href="mailto:febridimas905@gmail.com"
            className="py-3 text-ink"
            onClick={() => setOpen(false)}
          >
            {t.nav.contact}
          </a>
        </nav>
      )}
    </header>
  );
}
