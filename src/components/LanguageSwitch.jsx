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
      data-cursor
      className={`lang ${className}`}
    >
      <b className={!isEn ? "on" : ""}>ID</b>
      <i />
      <b className={isEn ? "on" : ""}>EN</b>
    </button>
  );
}
