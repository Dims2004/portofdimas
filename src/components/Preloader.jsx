import { useEffect, useState } from "react";
import { useScene } from "../lib/sceneStore";
import { useLanguage } from "../lib/LanguageContext";
import { Aksara } from "./Ornaments";

// Layar pemuatan: tanda candi + aksara + garis progres. Memudar saat dunia 3D siap.
export default function Preloader() {
  const loading = useScene((s) => s.loading);
  const ready = useScene((s) => s.ready);
  const { lang } = useLanguage();
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = ready ? "" : "hidden";
    if (!ready) return;
    const t = setTimeout(() => setGone(true), 900);
    return () => clearTimeout(t);
  }, [ready]);

  // Pengaman: jangan pernah mengunci layar lebih dari 12 detik
  useEffect(() => {
    const t = setTimeout(() => {
      document.documentElement.style.overflow = "";
      setGone(true);
    }, 12000);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;
  const pct = Math.round(loading * 100);

  return (
    <div
      aria-hidden={ready}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#05070a] transition-all duration-[800ms] ${
        ready ? "pointer-events-none invisible opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-[min(420px,74vw)] text-center">
        <svg viewBox="0 0 44 44" fill="none" aria-hidden="true" className="mx-auto mb-6 h-11 w-11 opacity-90">
          <circle cx="22" cy="24" r="9.5" stroke="#e0231c" strokeWidth="1.2" />
          <path d="M6 12h32M9.5 17h25M22 8v28" stroke="#dfe7e0" strokeWidth="1.2" />
        </svg>
        <Aksara className="mb-5 block text-xl tracking-[0.4em] text-[#aab4ad]">ꦢꦶꦩꦱ꧀</Aksara>
        <div className="relative h-px overflow-hidden bg-[rgba(223,231,224,0.14)]">
          <i className="absolute inset-y-0 left-0 bg-[#dfe7e0] transition-[width] duration-300" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.2em] text-[#78837c]">
          <span>{lang === "en" ? "Raising the temple" : "Membangun candi"}</span>
          <b className="font-medium tabular-nums text-[#aab4ad]">{pct}%</b>
        </div>
      </div>
    </div>
  );
}
