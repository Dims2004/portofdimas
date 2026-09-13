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
      className={`relative inline-flex h-9 w-[76px] flex-none items-center rounded-full border border-border bg-surface px-1 text-[11px] font-medium transition-colors hover:border-accent ${className}`}
    >
      <span
        className={`absolute top-1 h-7 w-[34px] rounded-full bg-accent transition-transform duration-300 ease-out ${
          isEn ? "translate-x-[38px]" : "translate-x-0"
        }`}
      />
      <span
        className={`z-10 flex-1 text-center transition-colors ${!isEn ? "text-[#17140F]" : "text-muted"}`}
      >
        ID
      </span>
      <span
        className={`z-10 flex-1 text-center transition-colors ${isEn ? "text-[#17140F]" : "text-muted"}`}
      >
        EN
      </span>
    </button>
  );
}