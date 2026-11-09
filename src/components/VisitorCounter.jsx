import { useEffect, useState } from "react";
import { useLanguage } from "../lib/LanguageContext";

// ============================================================
// Penghitung pengunjung harian (ikon mata + angka).
// - 1 perangkat/browser dihitung 1x per hari (ditandai di localStorage)
// - Reset otomatis jadi 0 setiap pergantian hari (00.00 WIB),
//   karena nama counter di server memakai tanggal hari itu.
// - Angka diperbarui otomatis tiap 20 detik (dan saat tab dibuka lagi)
// - Layanan gratis tanpa login: Abacus (utama), CounterAPI (cadangan)
// ============================================================

const NAMESPACE = "portofdimas-my-id"; // boleh diganti, harus unik
const STORAGE_KEY = "pf_visit_day_v2";
const REFRESH_MS = 20000;

const PROVIDERS = [
  {
    name: "abacus",
    hit: (ns, k) => `https://abacus.jasoncameron.dev/hit/${ns}/${k}`,
    get: (ns, k) => `https://abacus.jasoncameron.dev/get/${ns}/${k}`,
    read: (d) => d?.value,
  },
  {
    name: "counterapi",
    hit: (ns, k) => `https://api.counterapi.dev/v1/${ns}/${k}/up`,
    get: (ns, k) => `https://api.counterapi.dev/v1/${ns}/${k}/`,
    read: (d) => d?.count ?? d?.Count ?? d?.value,
  },
];

// Tanggal hari ini di zona WIB, format YYYY-MM-DD
const todayWIB = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });

async function request(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(url, { cache: "no-store", signal: ctrl.signal });
    let data = null;
    try {
      data = await res.json();
    } catch {
      /* bukan JSON */
    }
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, data: null, err };
  } finally {
    clearTimeout(timer);
  }
}

// kind: "hit" (tambah 1) atau "get" (baca saja). Mengembalikan angka atau null jika gagal.
async function callProviders(kind, key) {
  for (const p of PROVIDERS) {
    const url = p[kind](NAMESPACE, key);
    const r = await request(url);
    const n = Number(p.read(r.data));
    if (r.ok && Number.isFinite(n)) return n;
    // Baca counter yang belum pernah dibuat = belum ada pengunjung hari ini
    if (kind === "get" && r.status === 404) return 0;
    console.warn(`[VisitorCounter] ${p.name} ${kind} gagal`, r.status, r.data ?? r.err);
  }
  return null;
}

const readFlag = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};
const writeFlag = (day) => {
  try {
    localStorage.setItem(STORAGE_KEY, day);
  } catch {
    /* abaikan */
  }
};

// Dipanggil sekali saat halaman dibuka
let initial = null;
function loadInitial() {
  if (initial) return initial;
  const day = todayWIB();
  const key = `visitors-${day}`;
  initial = (async () => {
    if (readFlag() !== day) {
      const n = await callProviders("hit", key);
      if (n !== null) {
        writeFlag(day); // tandai: perangkat ini sudah dihitung hari ini
        return n;
      }
    }
    return callProviders("get", key);
  })();
  // izinkan dipanggil ulang bila komponen dimuat ulang nanti
  initial.finally(() => setTimeout(() => (initial = null), 2000));
  return initial;
}

const refresh = () => callProviders("get", `visitors-${todayWIB()}`);

function EyeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function VisitorCounter() {
  const { t } = useLanguage();
  const [count, setCount] = useState(null);

  useEffect(() => {
    let alive = true;
    const set = (n) => alive && n !== null && setCount(n);

    loadInitial().then(set);

    const tick = () => {
      if (!document.hidden) refresh().then(set);
    };
    const timer = setInterval(tick, REFRESH_MS);
    document.addEventListener("visibilitychange", tick);

    return () => {
      alive = false;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);

  // Belum berhasil memuat (offline / diblokir) -> sembunyikan
  if (count === null) return null;

  return (
    <span
      title={t.footer.visitorsToday ?? "Visitors today"}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
    >
      <EyeIcon />
      <span className="font-semibold tabular-nums text-white">
        {count.toLocaleString("id-ID")}
      </span>
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
    </span>
  );
}
