// ============================================================
// Daftar halaman. `cam` = waypoint kamera 3D yang dipakai halaman itu
// (indeks array CAM di world/createWorld.js).
// ============================================================
export const PAGES = [
  { id: "home", to: "/", cam: 0 },
  { id: "about", to: "/tentang", cam: 1 },
  { id: "experience", to: "/pengalaman", cam: 2 },
  { id: "organization", to: "/organisasi", cam: 3 },
  { id: "projects", to: "/proyek", cam: 4 },
  { id: "certificates", to: "/sertifikat", cam: 5 },
  { id: "contact", to: "/kontak", cam: 6 },
];

// Halaman konten (tanpa beranda)
export const CHAPTERS = PAGES.filter((p) => p.id !== "home");

/** Pathname -> indeks kamera */
export function camFor(pathname) {
  if (pathname.startsWith("/karya/")) return 4;
  const hit = PAGES.find((p) => p.to === pathname);
  return hit ? hit.cam : 0;
}
