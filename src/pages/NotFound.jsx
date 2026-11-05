import { Link } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-start justify-center px-6 pt-28 sm:px-10">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-2">
        404
      </p>
      <h1 className="mb-6 text-4xl font-extrabold text-white sm:text-5xl">
        {t.notFound.title}
      </h1>
      <p className="mb-8 max-w-[46ch] text-white/70">{t.notFound.body}</p>
      <Link
        to="/"
        className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#1b0d33] transition-transform hover:-translate-y-0.5"
      >
        {t.notFound.back}
      </Link>
    </section>
  );
}
