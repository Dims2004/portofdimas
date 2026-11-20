import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./translations";
import { siteText } from "./siteText";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "id";
    return localStorage.getItem("lang") || "id";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "id" ? "en" : "id"));

  // teks lama + teks tema baru digabung, akses lewat t.site.*
  const t = { ...translations[lang], site: siteText[lang] };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage harus dipakai di dalam LanguageProvider");
  return ctx;
}