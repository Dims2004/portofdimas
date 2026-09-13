// ============================================================
// Helper path aset (gambar, PDF, dll di folder public/)
// Dipakai supaya path tetap benar walau situs di-host di sub-folder
// seperti GitHub Pages (https://user.github.io/nama-repo/).
//
// Cara pakai: withBase("logo.png")  -> BUKAN withBase("/logo.png")
// ============================================================
export const withBase = (path) => `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, "")}`;
