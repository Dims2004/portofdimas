// ============================================================
// Gradasi ungu untuk gambar placeholder (dipakai kalau sebuah
// proyek / sertifikat belum punya gambar). Angka `tone` di
// works.js & certificates.js otomatis dipetakan ke salah satu
// gradasi di bawah, jadi nilai tone berapa pun tetap aman.
// ============================================================
const TONES = [
  "from-[#2e1065] to-[#8b5cf6]",
  "from-[#1e1b4b] to-[#7c3aed]",
  "from-[#3b0764] to-[#c084fc]",
  "from-[#1a0b2e] to-[#6d28d9]",
  "from-[#2a0a4a] to-[#a855f7]",
  "from-[#170a2c] to-[#9333ea]",
];

export const toneGradient = (tone) =>
  TONES[Math.abs(Number(tone) || 0) % TONES.length];
