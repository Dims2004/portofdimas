// ============================================================
// Gradasi gelap untuk gambar placeholder (dipakai kalau sebuah proyek /
// sertifikat belum punya gambar). Angka `tone` di works.js &
// certificates.js dipetakan otomatis, jadi nilai tone berapa pun aman.
// ============================================================
const TONES = [
  "from-[#0c1d22] to-[#2a1210]",
  "from-[#10161e] to-[#1e0f14]",
  "from-[#0d1a18] to-[#241a0c]",
  "from-[#14121c] to-[#220e12]",
  "from-[#0b1a1d] to-[#122018]",
  "from-[#121a1a] to-[#1c1408]",
];

export const toneGradient = (tone) => TONES[Math.abs(Number(tone) || 0) % TONES.length];
