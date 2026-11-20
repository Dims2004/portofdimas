import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";
import { withBase } from "../lib/assetPath";
import { profile } from "../data/profile";
import useScrollSpy from "../hooks/useScrollSpy";

// id = id section di halaman utama, key = kunci teks di t.site.nav
export const NAV = [
  { id: "hero", icon: "bi-house", key: "home" },
  { id: "about", icon: "bi-person", key: "about" },
  { id: "resume", icon: "bi-file-earmark-text", key: "resume" },
  { id: "portfolio", icon: "bi-images", key: "portfolio" },
  { id: "services", icon: "bi-hdd-stack", key: "services" },
  { id: "certificates", icon: "bi-award", key: "certificates" },
  { id: "contact", icon: "bi-envelope", key: "contact" },
];

export const scrollToId = (id) => {
  if (id === "hero") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Header() {
  const { t, lang, toggleLang } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(NAV.map((n) => n.id), onHome);

  useEffect(() => setOpen(false), [pathname]);

  const goTo = (e, id) => {
    e.preventDefault();
    setOpen(false);
    if (onHome) scrollToId(id);
    else navigate("/", { state: { scrollTo: id } });
  };

  const isEn = lang === "en";

  return (
    <header id="header" className={`topbar ${open ? "open" : ""}`}>
      <div className="topbar-in">
        <a href="#/" className="logo" onClick={(e) => goTo(e, "hero")}>
          <img src={withBase(profile.photo)} alt="" className="logo-photo" />
          <span className="sitename">{profile.name}</span>
        </a>

        <nav id="navmenu" className="topnav" aria-label="Menu utama">
          <ul>
            {NAV.map((n) => (
              <li key={n.id}>
                <a href="#/" className={onHome && active === n.id ? "active" : ""} onClick={(e) => goTo(e, n.id)}>
                  <i className={`bi ${n.icon}`} /> {t.site.nav[n.key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="lang-switch"
          role="switch"
          aria-checked={isEn}
          aria-label="Ganti bahasa / Switch language"
          onClick={toggleLang}
        >
          <b className={!isEn ? "on" : ""}>ID</b>
          <i />
          <b className={isEn ? "on" : ""}>EN</b>
        </button>

        <button
          type="button"
          className="topbar-toggle"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <i className={`bi ${open ? "bi-x-lg" : "bi-list"}`} />
        </button>
      </div>
    </header>
  );
}
