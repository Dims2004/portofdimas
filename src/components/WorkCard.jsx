import { Link } from "react-router-dom";
import { withBase } from "../lib/assetPath";
import { toneGradient } from "../lib/tones";

export default function WorkCard({ work, label, className = "" }) {
  return (
    <Link
      to={`/karya/${work.slug}`}
      className={`group glass flex h-full flex-col overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1 hover:border-accent/50 ${className}`}
    >
      <div className="h-56 w-full overflow-hidden lg:h-64">
        {work.cover ? (
          <img
            src={withBase(work.cover)}
            alt={work.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`h-full w-full bg-gradient-to-br ${toneGradient(work.tone)}`}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap gap-2">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-accent-2"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-white">{work.title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">
          {work.summary}
        </p>
        <span className="mt-auto pt-3 text-sm font-semibold text-white/90 transition-colors group-hover:text-accent-2">
          {label} →
        </span>
      </div>
    </Link>
  );
}
