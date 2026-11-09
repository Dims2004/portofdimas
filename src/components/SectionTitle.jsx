import Reveal from "./Reveal";
import { Aksara, jawaNumber } from "./Ornaments";
import { useLanguage } from "../lib/LanguageContext";

// Kepala bab: "01 — Nama bab ———— aksara"
export default function SectionTitle({ no, label, className = "" }) {
  const { t } = useLanguage();
  return (
    <Reveal y={0} className={`sec-head ${className}`}>
      <span className="k">
        <b>{String(no).padStart(2, "0")}</b> — {t.ui.chapter} · {label}
      </span>
      <span className="rule" />
      <Aksara className="k">{jawaNumber(no)}</Aksara>
    </Reveal>
  );
}
