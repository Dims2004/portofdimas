import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../lib/LanguageContext";
import PortfolioSlides from "./PortfolioSlides";

// Tombol "Unduh Portofolio": membuat slide A4 landscape lalu membuka dialog
// cetak browser. Pilih "Simpan sebagai PDF" (Save as PDF) untuk mengunduh.
export default function PortfolioDownload({ className = "" }) {
  const { lang, t } = useLanguage();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!busy) return;
    let cancelled = false;
    const prevTitle = document.title;

    const done = () => {
      document.title = prevTitle;
      setBusy(false);
    };

    const waitImages = async () => {
      const root = document.getElementById("portfolio-print");
      const imgs = root ? Array.from(root.querySelectorAll("img")) : [];
      await Promise.race([
        Promise.all(
          imgs.map((img) =>
            img.complete
              ? Promise.resolve()
              : new Promise((res) => {
                  img.onload = img.onerror = res;
                })
          )
        ),
        new Promise((res) => setTimeout(res, 8000)),
      ]);
      if (document.fonts?.ready) await document.fonts.ready;
    };

    (async () => {
      await waitImages();
      if (cancelled) return;
      document.title = "Portofolio_Dimas_Febrianto";
      window.addEventListener("afterprint", done, { once: true });
      setTimeout(() => window.print(), 100);
    })();

    return () => {
      cancelled = true;
      window.removeEventListener("afterprint", done);
    };
  }, [busy]);

  return (
    <>
      <button
        type="button"
        onClick={() => setBusy(true)}
        disabled={busy}
        className={
          className || "btn-ghost"
        }
      >
        {busy ? t.footer.preparing : t.footer.ctaPortfolio}
      </button>
      {busy &&
        createPortal(<PortfolioSlides lang={lang} t={t} />, document.body)}
    </>
  );
}
