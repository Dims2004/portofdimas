import { useLanguage } from "../lib/LanguageContext";
import { profile } from "../data/profile";
import VisitorCounter from "./VisitorCounter";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="copyright text-center">
          <p>
            © {new Date().getFullYear()} <strong className="px-1 sitename">{profile.name}</strong> {t.site.footer.rights}
          </p>
        </div>
        <div className="footer-visitors">
          <VisitorCounter />
        </div>
      </div>
    </footer>
  );
}