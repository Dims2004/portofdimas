import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { scrollToSection } from "../lib/scrollTo";
import LanguageSwitch from "./LanguageSwitch";

// Urutan harus sama dengan urutan section di halaman (atas → bawah)
const ITEMS = [
  "home",
  "about",
  "experience",
  "organization",
  "projects",
  "certificates",
  "contact",
];

// Menu desktop dengan efek "dock" ala macOS:
// item yang dekat kursor membesar & sedikit terangkat, tetangganya ikut membesar lebih kecil.
function DockItem({ mouseX, active, onClick, children }) {
  const ref = useRef(null);

  // Jarak horizontal kursor ke titik tengah item ini
  const distance = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return Infinity;
    return x - (r.left + r.width / 2);
  });

  // Ubah angka-angka ini untuk mengatur kekuatan efek:
  //  - 1.45 = skala maksimum item di bawah kursor
  //  - 120  = jangkauan efek (px) ke kiri/kanan
  const scaleRaw = useTransform(
    distance,
    [-120, -60, 0, 60, 120],
    [1, 1.18, 1.45, 1.18, 1]
  );
  const scale = useSpring(scaleRaw, { mass: 0.1, stiffness: 170, damping: 14 });
  const y = useTransform(scale, [1, 1.45], [0, -3]);

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      style={{ scale, y }}
      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "bg-white/15 text-white"
          : "text-white/65 hover:text-white"
      }`}
    >
      {children}
    </motion.button>
  );
}

export default function Navbar() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(Infinity);

  // Scroll-spy: tandai menu sesuai section yang sedang terlihat
  useEffect(() => {
    if (pathname !== "/") {
      setActive(null);
      return;
    }
    let raf;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const line = window.innerHeight * 0.35;
        let current = "home";
        for (const id of ITEMS) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = id;
        }
        setActive(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const goTo = (id) => {
    setOpen(false);
    if (pathname === "/") {
      if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
      else scrollToSection(id);
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between rounded-full border border-white/15 bg-white/[0.07] py-2 pl-6 pr-3 shadow-lg shadow-black/30 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => goTo("home")}
            className="text-lg font-extrabold tracking-tight text-white"
          >
            Dimas
            <span className="text-accent">.</span>
          </button>

          <nav
            className="hidden items-center gap-2 lg:flex"
            onMouseMove={(e) => !reduceMotion && mouseX.set(e.clientX)}
            onMouseLeave={() => mouseX.set(Infinity)}
          >
            {ITEMS.map((id) => (
              <DockItem
                key={id}
                mouseX={mouseX}
                active={active === id}
                onClick={() => goTo(id)}
              >
                {t.nav[id]}
              </DockItem>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <button
              type="button"
              className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] rounded-full lg:hidden"
              aria-label={t.nav.menu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`h-px w-5 bg-white transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-5 bg-white transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-2 flex flex-col rounded-3xl border border-white/15 bg-[#12061f]/90 p-3 shadow-xl shadow-black/40 backdrop-blur-xl lg:hidden"
            >
              {ITEMS.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => goTo(id)}
                  className={`rounded-2xl px-4 py-3 text-left text-sm transition-colors ${
                    active === id
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {t.nav[id]}
                </button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
