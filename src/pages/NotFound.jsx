import { Link } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-6 sm:px-10">
      <p className="mb-4 text-sm text-accent-2">404</p>
      <h1 className="mb-6 font-serif text-4xl">{t.notFound.title}</h1>
      <p className="mb-8 max-w-[46ch] text-muted">{t.notFound.body}</p>
      <Link
        to="/"
        className="rounded-full border border-border px-6 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
      >
        {t.notFound.back}
      </Link>
    </section>
  );
}