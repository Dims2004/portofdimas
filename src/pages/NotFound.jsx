import { Link } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-start justify-center px-6 pt-28 sm:px-10">
      <p className="mb-4 label-mono">
        404
      </p>
      <h1 className="title-glow mb-6 font-display text-5xl font-bold text-white sm:text-7xl">
        {t.notFound.title}
      </h1>
      <p className="mb-8 max-w-[46ch] text-white/70">{t.notFound.body}</p>
      <Link
        to="/"
        className="btn-primary"
      >
        {t.notFound.back}
      </Link>
    </section>
  );
}
