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
      className={`relative inline-flex h-8 w-[72px] flex-none items-center rounded-full border border-white/20 bg-white/10 px-1 text-[11px] font-semibold transition-colors hover:border-white/40 ${className}`}
    >
      <span
        className={`absolute top-1 h-6 w-8 rounded-full bg-white transition-transform duration-300 ease-out ${
          isEn ? "translate-x-[32px]" : "translate-x-0"
        }`}
      />
      <span
        className={`z-10 flex-1 text-center transition-colors ${!isEn ? "text-[#1b0d33]" : "text-white/70"}`}
      >
        ID
      </span>
      <span
        className={`z-10 flex-1 text-center transition-colors ${isEn ? "text-[#1b0d33]" : "text-white/70"}`}
      >
        EN
      </span>
    </button>
  );
}
