import { useEffect, useState } from "react";
import { useLanguage } from "../lib/LanguageContext";

// ============================================================
// Penghitung pengunjung harian (ikon mata + angka).
// - 1 perangkat/browser dihitung 1x per hari (ditandai di localStorage)
// - Reset otomatis jadi 0 setiap pergantian hari (00.00 WIB),
//   karena nama counter di server memakai tanggal hari itu.
// - Memakai layanan gratis counterapi.dev (v1, tanpa login).
// ============================================================

const NAMESPACE = "portofdimas-my-id"; // boleh diganti, harus unik
const API = "https://api.counterapi.dev/v1";
const STORAGE_KEY = "pf_visit_day";

// Tanggal hari ini di zona WIB, format YYYY-MM-DD
const todayWIB = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });

const readCount = (data) => {
  const n = Number(data?.count ?? data?.value);
  return Number.isFinite(n) ? n : 0;
};

// Cegah hit ganda (mis. React StrictMode menjalankan effect 2x saat dev)
let inflight = null;

async function loadCount() {
  const day = todayWIB();
  const name = `visitors-${day}`;

  let alreadyCounted = false;
  try {
    alreadyCounted = localStorage.getItem(STORAGE_KEY) === day;
  } catch {
    /* localStorage tidak tersedia -> anggap belum dihitung */
  }

  // Hari ini sudah dihitung dari perangkat ini -> cukup baca angkanya
  // Belum -> tambah 1, lalu tandai di localStorage
  const url = `${API}/${NAMESPACE}/${name}/${alreadyCounted ? "" : "up"}`;
  const res = await fetch(url);
  if (!res.ok) return 0; // counter hari ini belum ada -> tampilkan 0

  if (!alreadyCounted) {
    try {
      localStorage.setItem(STORAGE_KEY, day);
    } catch {
      /* abaikan */
    }
  }
  return readCount(await res.json());
}

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
    if (!inflight) {
      inflight = loadCount().finally(() => {
        // lepas setelah selesai agar bisa dipakai lagi bila komponen dimuat ulang
        setTimeout(() => (inflight = null), 1000);
      });
    }
    inflight.then((n) => alive && setCount(n)).catch(() => alive && setCount(null));
    return () => {
      alive = false;
    };
  }, []);

  // Gagal memuat (offline / diblokir adblock) -> sembunyikan saja
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
    </span>
  );
}
