import { useEffect, useState } from "react";
import { useLanguage } from "../lib/LanguageContext";

export default function ScrollTop() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 100);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <a
      href="#/"
      className={`scroll-top d-flex align-items-center justify-content-center ${show ? "active" : ""}`}
      aria-label={t.site.scrollTop}
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <i className="bi bi-arrow-up-short" />
    </a>
  );
}
