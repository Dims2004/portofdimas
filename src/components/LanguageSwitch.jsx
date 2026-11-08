import { useLanguage } from "../lib/LanguageContext";

export default function LanguageSwitch({ className = "" }) {
  const { lang, toggleLang } = useLanguage();
  const isEn = lang === "en";

  return (
    <button
      type="button"
      onClick={toggleLang}
      role="switch"
      aria-checked={isEn}
      aria-label="Ganti bahasa / Switch language"
      className={`relative inline-flex h-8 w-[72px] flex-none items-center rounded-full border border-accent/40 bg-accent/5 px-1 font-mono text-[11px] font-semibold transition-colors hover:border-accent ${className}`}
    >
      <span
        className={`absolute top-1 h-6 w-8 rounded-full bg-accent shadow-[0_0_12px_rgba(34,229,255,0.6)] transition-transform duration-300 ease-out ${
          isEn ? "translate-x-[32px]" : "translate-x-0"
        }`}
      />
      <span
        className={`z-10 flex-1 text-center transition-colors ${!isEn ? "text-[#021218]" : "text-white/60"}`}
      >
        ID
      </span>
      <span
        className={`z-10 flex-1 text-center transition-colors ${isEn ? "text-[#021218]" : "text-white/60"}`}
      >
        EN
      </span>
    </button>
  );
}
