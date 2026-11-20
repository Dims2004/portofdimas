import { useEffect, useState } from "react";

// Spinner template iPortfolio, hilang setelah halaman selesai dimuat
export default function Preloader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const hide = () => setTimeout(() => setGone(true), 300);
    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide, { once: true });
    const fallback = setTimeout(() => setGone(true), 3000);
    return () => clearTimeout(fallback);
  }, []);
  if (gone) return null;
  return <div id="preloader" aria-hidden="true" />;
}
