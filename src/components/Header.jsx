import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";
import { withBase } from "../lib/assetPath";
import { socialIcon } from "../lib/icons";
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
    <>
      <button
        type="button"
        className="side-toggle"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <i className={`bi ${open ? "bi-x-lg" : "bi-list"}`} />
      </button>

      <aside id="header" className={`sidebar ${open ? "open" : ""}`}>
        <img src={withBase(profile.photo)} alt={profile.name} className="side-photo" />

        <a href="#/" className="side-name" onClick={(e) => goTo(e, "hero")}>
          {profile.name}
        </a>

        <div className="side-social">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
              <i className={`bi ${socialIcon(s.label)}`} />
            </a>
          ))}
        </div>

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

        <nav id="navmenu" className="sidenav" aria-label="Menu utama">
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
      </aside>
    </>
  );
}
