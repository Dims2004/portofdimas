import { useId } from "react";

// ============================================================
// Siluet & hiasan bertema Jawa (versi garis neon):
//  - Candi    : candi bertingkat dengan stupa (ala Borobudur)
//  - Gunungan : kayon wayang
//  - Bamboo   : rumpun bambu (latar depan)
//  - Aksara   : teks aksara Jawa dekoratif
// Murni hiasan (aria-hidden).
// ============================================================

export function Candi({ className = "" }) {
  const id = useId().replace(/:/g, "");
  const stroke = "#22e5ff";
  return (
    <svg
      viewBox="0 0 640 262"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id={`cf${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1538" />
          <stop offset="1" stopColor="#04050c" />
        </linearGradient>
      </defs>
      <g fill={`url(#cf${id})`} stroke={stroke} strokeOpacity=".6" strokeWidth="1.2" strokeLinejoin="round">
        {/* tingkat dasar → atas */}
        <path d="M6 262V234H634V262Z" />
        <path d="M46 234V206H594V234Z" />
        <path d="M86 206V178H554V206Z" />
        <path d="M126 178V150H514V178Z" />
        <path d="M166 150V126H474V150Z" />
        {/* stupa utama */}
        <path d="M262 126C262 70 378 70 378 126Z" />
        <path d="M306 82V50H334V82Z" />
        <path d="M320 50V24" />
        <circle cx="320" cy="20" r="5" />
        {/* stupa kecil kiri-kanan */}
        {[198, 236, 404, 442].map((x) => (
          <g key={x}>
            <path d={`M${x - 17} 126C${x - 17} 96 ${x + 17} 96 ${x + 17} 126Z`} />
            <path d={`M${x} 104V90`} />
          </g>
        ))}
        {/* gerbang tengah */}
        <path d="M290 262V222C290 206 350 206 350 222V262" />
      </g>
      {/* jendela / lampu neon */}
      <g fill="#f5b942" fillOpacity=".75">
        {[120, 170, 230, 410, 470, 520].map((x) => (
          <rect key={x} x={x} y="214" width="10" height="14" rx="5" />
        ))}
        {[150, 210, 430, 490].map((x) => (
          <rect key={x} x={x} y="186" width="8" height="12" rx="4" />
        ))}
      </g>
      <g fill="#22e5ff" fillOpacity=".7">
        {[198, 236, 404, 442].map((x) => (
          <circle key={x} cx={x} cy="116" r="2.2" />
        ))}
        <circle cx="320" cy="108" r="3" />
      </g>
    </svg>
  );
}

export function Gunungan({ className = "" }) {
  return (
    <svg viewBox="0 0 200 280" className={className} aria-hidden="true" fill="none">
      <g stroke="#f5b942" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M100 6C84 40 64 52 52 84C40 116 22 128 22 172C22 226 58 270 100 274C142 270 178 226 178 172C178 128 160 116 148 84C136 52 116 40 100 6Z" />
        <path d="M100 38V176" />
        <path d="M100 82C82 82 70 94 66 110M100 82C118 82 130 94 134 110" />
        <path d="M100 118C80 118 66 132 62 150M100 118C120 118 134 132 138 150" />
        <path d="M78 274V204C78 178 122 178 122 204V274" />
        <circle cx="100" cy="60" r="4" stroke="#22e5ff" />
        <circle cx="66" cy="110" r="3" stroke="#22e5ff" />
        <circle cx="134" cy="110" r="3" stroke="#22e5ff" />
        <circle cx="62" cy="150" r="3" stroke="#22e5ff" />
        <circle cx="138" cy="150" r="3" stroke="#22e5ff" />
        <path d="M40 200C52 188 64 188 76 200M124 200C136 188 148 188 160 200" strokeOpacity=".6" />
      </g>
    </svg>
  );
}

// Rumpun bambu: tiap batang = [x, lebar, tinggi]
const STALKS = [
  [10, 16, 520],
  [44, 12, 440],
  [72, 18, 590],
  [108, 11, 380],
  [136, 14, 470],
];

export function Bamboo({ className = "", flip = false }) {
  return (
    <svg
      viewBox="0 0 170 600"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <g fill="#050818" stroke="#22e5ff" strokeOpacity=".28" strokeWidth="1">
        {STALKS.map(([x, w, h]) => (
          <g key={x}>
            <rect x={x} y={600 - h} width={w} height={h} rx={w / 2.5} />
            {Array.from({ length: Math.floor(h / 70) }, (_, i) => (
              <path key={i} d={`M${x - 1} ${600 - 60 - i * 70}H${x + w + 1}`} strokeOpacity=".55" />
            ))}
          </g>
        ))}
      </g>
      {/* daun */}
      <g fill="#050818" stroke="#f5b942" strokeOpacity=".4" strokeWidth="1">
        {STALKS.flatMap(([x, w, h]) =>
          [0, 1, 2].map((k) => {
            const y = 600 - h + 30 + k * 62;
            const dir = k % 2 ? -1 : 1;
            return (
              <path
                key={`${x}-${k}`}
                d={`M${x + w / 2} ${y}q${dir * 34} -16 ${dir * 62} 4q${-dir * 30} 10 ${-dir * 62} -4Z`}
              />
            );
          })
        )}
      </g>
    </svg>
  );
}

// Aksara Jawa dekoratif. Contoh: <Aksara className="text-9xl">ꦢꦶꦩꦱ꧀</Aksara>
export function Aksara({ children, className = "" }) {
  return (
    <span aria-hidden="true" className={`font-aksara select-none ${className}`}>
      {children}
    </span>
  );
}

// Angka Jawa (꧐ ꧑ ꧒ …) untuk penomoran bab
const JV = "꧐꧑꧒꧓꧔꧕꧖꧗꧘꧙";
export const jawaNumber = (n) =>
  String(n)
    .padStart(2, "0")
    .split("")
    .map((d) => JV[Number(d)])
    .join("");
