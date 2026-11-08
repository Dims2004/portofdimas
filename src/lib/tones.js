// ============================================================
// Gradasi cyber untuk gambar placeholder (dipakai kalau sebuah
// proyek / sertifikat belum punya gambar). Angka `tone` di
// works.js & certificates.js otomatis dipetakan ke salah satu
// gradasi di bawah, jadi nilai tone berapa pun tetap aman.
// ============================================================
const TONES = [
  "from-[#04202e] to-[#0e7490]",
  "from-[#1a0a24] to-[#be123c]",
  "from-[#0b1236] to-[#2563eb]",
  "from-[#241606] to-[#d97706]",
  "from-[#05161a] to-[#0d9488]",
  "from-[#150a2e] to-[#6d28d9]",
];

export const toneGradient = (tone) =>
  TONES[Math.abs(Number(tone) || 0) % TONES.length];
