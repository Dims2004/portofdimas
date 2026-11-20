import { Link } from "react-router-dom";
import { useLanguage } from "../lib/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <section className="section not-found">
      <div className="container text-center">
        <h2>404</h2>
        <h3>{t.notFound.title}</h3>
        <p>{t.notFound.body}</p>
        <Link to="/" className="btn-site">{t.notFound.back}</Link>
      </div>
    </section>
  );
}
