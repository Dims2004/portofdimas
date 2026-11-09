import { Link } from "react-router-dom";
import Display from "../components/Display";
import { useLanguage } from "../lib/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <section className="pg flex flex-col justify-center">
      <p className="eyebrow mb-5"><span className="dot" style={{ display: "inline-block", marginRight: 10 }} />404</p>
      <Display as="h1" lines={[t.notFound.title]} className="h-sec max-w-[14ch]" immediate />
      <p className="body-lg mb-8 mt-6 max-w-[46ch]">{t.notFound.body}</p>
      <div><Link to="/" className="btn-primary" data-cursor>{t.notFound.back}</Link></div>
    </section>
  );
}
