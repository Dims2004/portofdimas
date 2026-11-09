import { Link } from "react-router-dom";
import { withBase } from "../lib/assetPath";
import { toneGradient } from "../lib/tones";

export default function WorkCard({ work, label, no, className = "" }) {
  return (
    <Link
      to={`/karya/${work.slug}`}
      className={`group glass hud flex h-full flex-col overflow-hidden rounded-lg transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_0_40px_rgba(34,229,255,0.15)] ${className}`}
    >
      <div className="relative h-56 w-full overflow-hidden lg:h-64">
        {work.cover ? (
          <img
            src={withBase(work.cover)}
            alt={work.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${toneGradient(work.tone)}`} />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.16)_0,rgba(0,0,0,0.16)_1px,transparent_1px,transparent_3px)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#050818]/90 to-transparent" />
        {no && (
          <span className="absolute right-4 top-4 rounded-sm border border-accent-2/50 bg-black/60 px-2.5 py-1 font-mono text-[11px] tracking-[0.2em] text-accent-2 backdrop-blur">
            PRJ.{String(no).padStart(2, "0")}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap gap-2">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm border border-accent/25 bg-accent/5 px-2.5 py-1 font-mono text-[11px] text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-xl font-bold text-white">{work.title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">{work.summary}</p>
        <span className="mt-auto pt-3 font-mono text-xs font-semibold uppercase tracking-wider text-white/90 transition-colors group-hover:text-accent">
          {label} →
        </span>
      </div>
    </Link>
  );
}
