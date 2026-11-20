// ============================================================
// Gradasi berwarna untuk gambar placeholder (proyek / sertifikat
// yang belum punya gambar). Nilai `tone` di works.js &
// certificates.js dipetakan otomatis, angka berapa pun aman.
// ============================================================
const TONES = [
  ["#0a84ff", "#bf5af2"],
  ["#19c3b4", "#0a84ff"],
  ["#ff9f0a", "#ff4f8b"],
  ["#bf5af2", "#ff4f8b"],
  ["#30d158", "#19c3b4"],
  ["#5e5ce6", "#0a84ff"],
];

export const toneBackground = (tone) => {
  const [a, b] = TONES[Math.abs(Number(tone) || 0) % TONES.length];
  return `linear-gradient(135deg, ${a}, ${b})`;
};
