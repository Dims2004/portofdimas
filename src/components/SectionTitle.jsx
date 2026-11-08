import Reveal from "./Reveal";
import { jawaNumber } from "./Ornaments";

// Judul bab: nomor (Latin + angka Jawa) • judul besar • garis tumpal emas
export default function SectionTitle({ no, children, className = "" }) {
  return (
    <Reveal className={`mb-12 ${className}`}>
      {no && (
        <p className="mb-3 flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-accent">
          <span>{String(no).padStart(2, "0")}</span>
          <span className="h-px w-8 bg-accent/60" />
          <span className="font-aksara text-base tracking-normal text-accent-2">
            {jawaNumber(no)}
          </span>
        </p>
      )}
      <h2 className="title-glow font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {children}
      </h2>
      <span className="tumpal-line mt-5" />
    </Reveal>
  );
}
