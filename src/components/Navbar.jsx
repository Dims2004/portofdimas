import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";
import { PAGES } from "../lib/routes";
import { Aksara, jawaNumber } from "./Ornaments";
import LanguageSwitch from "./LanguageSwitch";

export default function Navbar() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [hide, setHide] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setStuck(y > 40);
      setHide(y > last.current + 4 && y > innerHeight * 0.8);
      if (y < last.current - 4) setHide(false);
      last.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // tutup menu saat pindah halaman / tekan Esc / layar melebar
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setOpen(false);
    const rs = () => innerWidth > 960 && setOpen(false);
    window.addEventListener("keydown", esc);
    window.addEventListener("resize", rs, { passive: true });
    return () => { window.removeEventListener("keydown", esc); window.removeEventListener("resize", rs); };
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("nav-open", open);
    return () => document.documentElement.classList.remove("nav-open");
  }, [open]);

  const cls = ["nav", stuck ? "stuck" : "", hide && !open ? "hide" : "", open ? "menu-open" : ""].join(" ");

  return (
    <header className={cls} id="nav">
      <Link to="/" className="brand" data-cursor aria-label="Dimas Febrianto — beranda">
        <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
          <circle cx="22" cy="25" r="8.6" fill="#e0231c" fillOpacity=".9" />
          <path d="M5 13h34M9 18.4h26M22 8.5v27" stroke="#dfe7e0" strokeWidth="1.5" />
          <path d="M14 35.5h16" stroke="#dfe7e0" strokeWidth="1.2" strokeOpacity=".6" />
        </svg>
        <span className="brand-tx">
          <b>DIMAS</b>
          <i>FEBRIANTO</i>
        </span>
      </Link>

      <nav className="nav-links" id="navlinks" aria-label="Utama">
        {PAGES.filter((p) => p.id !== "home").map((p, i) => (
          <NavLink key={p.id} to={p.to} data-cursor className={({ isActive }) => `nav-link ${isActive || (p.id === "projects" && pathname.startsWith("/karya/")) ? "on" : ""}`}>
            <span>{t.nav[p.id]}</span>
            <span className="alt"><Aksara>{jawaNumber(i + 1)}</Aksara></span>
          </NavLink>
        ))}
      </nav>

      <div className="nav-tools">
        <LanguageSwitch />
        <button
          type="button"
          className={`nav-burger ${open ? "active" : ""}`}
          aria-label={t.nav.menu}
          aria-expanded={open}
          aria-controls="navlinks"
          onClick={() => setOpen((v) => !v)}
        >
          <i />
          <i />
        </button>
      </div>
    </header>
  );
}
