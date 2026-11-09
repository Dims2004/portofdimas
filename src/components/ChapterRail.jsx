import { Link, useLocation } from "react-router-dom";
import { useScene, sceneStore } from "../lib/sceneStore";
import { useLanguage } from "../lib/LanguageContext";
import { PAGES, camFor } from "../lib/routes";

// Titik indeks halaman di sisi kanan (layar lebar) — rail ala halaman referensi
export default function ChapterRail() {
  const ready = useScene((s) => s.ready);
  const { t } = useLanguage();
  const { pathname } = useLocation();
  if (!ready) return null;
  const cur = camFor(pathname);
  return (
    <nav className="rail" aria-label="Halaman">
      {PAGES.map((p) => (
        <Link
          key={p.id}
          to={p.to}
          aria-label={t.nav[p.id]}
          className={cur === p.cam ? "on" : ""}
          onMouseEnter={() => sceneStore.world?.setFocus(p.cam)}
          onMouseLeave={() => sceneStore.world?.setFocus(-1)}
        >
          <span>{t.nav[p.id]}</span>
          <i />
        </Link>
      ))}
    </nav>
  );
}
