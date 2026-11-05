// ============================================================
// Ikon garis dekoratif transparan di latar (grafik batang, topologi
// jaringan, target, chip IoT). Murni hiasan — boleh dihapus/diatur.
//
// <Decor type="chart" className="right-6 top-24 w-56" />
// type: "chart" | "network" | "target" | "chip"
// ============================================================
const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const shapes = {
  chart: (
    <svg viewBox="0 0 200 140" {...common}>
      <rect x="10" y="92" width="22" height="38" />
      <rect x="44" y="72" width="22" height="58" />
      <rect x="78" y="82" width="22" height="48" />
      <rect x="112" y="52" width="22" height="78" />
      <rect x="146" y="34" width="22" height="96" />
      <polyline points="8,96 42,76 76,84 110,54 144,38 180,14" />
      <polyline points="166,12 181,13 180,28" />
    </svg>
  ),
  network: (
    <svg viewBox="0 0 220 140" {...common}>
      <rect x="80" y="6" width="60" height="26" rx="5" />
      <path d="M110 32V58M36 58H184M36 58V84M110 58V84M184 58V84" />
      <rect x="8" y="84" width="56" height="26" rx="5" />
      <rect x="82" y="84" width="56" height="26" rx="5" />
      <rect x="156" y="84" width="56" height="26" rx="5" />
      <circle cx="110" cy="19" r="3" />
      <circle cx="36" cy="97" r="3" />
      <circle cx="110" cy="97" r="3" />
      <circle cx="184" cy="97" r="3" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 120 120" {...common}>
      <circle cx="60" cy="60" r="52" />
      <circle cx="60" cy="60" r="34" />
      <circle cx="60" cy="60" r="16" />
      <path d="M60 2V16M60 104V118M2 60H16M104 60H118" />
      <path d="M60 60L100 20M90 20H100V30" />
    </svg>
  ),
  chip: (
    <svg viewBox="0 0 120 120" {...common}>
      <rect x="32" y="32" width="56" height="56" rx="6" />
      <rect x="46" y="46" width="28" height="28" rx="3" />
      <path d="M44 32V16M60 32V16M76 32V16M44 104V88M60 104V88M76 104V88" />
      <path d="M32 44H16M32 60H16M32 76H16M104 44H88M104 60H88M104 76H88" />
    </svg>
  ),
};

export default function Decor({ type = "chart", className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 text-violet-200/[0.13] ${className}`}
    >
      {shapes[type]}
    </div>
  );
}
