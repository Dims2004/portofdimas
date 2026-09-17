// ============================================================
// DATA SERTIFIKAT (bilingual: id / en)
// - slug   : identifier unik untuk tiap sertifikat
// - year   : tahun sertifikat diperoleh, ditampilkan di kartu
// - tone   : angka 1-6, menentukan warna gradasi thumbnail
//            (dipakai kalau field "image" masih kosong)
// - image  : path gambar sertifikat. Taruh file di folder
//            public/certificates/, lalu isi TANPA garis miring
//            di depan, contoh: "certificates/sertifikat-1.jpg"
//            (bukan "/certificates/sertifikat-1.jpg").
//            Kosongkan ("") kalau belum ada gambarnya.
// - id/en  : versi konten per bahasa (title, issuer)
//
// Cara tambah sertifikat baru: copy salah satu object di bawah,
// tempel di dalam array, lalu ganti isinya sesuai sertifikat kamu.
// ============================================================

export const certificates = [
  {
    slug: "sertifikat-contoh-1",
    year: "2025",
    tone: 1,
    image: "", // contoh: "certificates/sertifikat-contoh-1.jpg"
    id: {
      title: "Nama Sertifikat",
      issuer: "Nama Penyelenggara",
    },
    en: {
      title: "Certificate Name",
      issuer: "Issuer Name",
    },
  },
  {
    slug: "sertifikat-contoh-2",
    year: "2025",
    tone: 3,
    image: "",
    id: {
      title: "Nama Sertifikat",
      issuer: "Nama Penyelenggara",
    },
    en: {
      title: "Certificate Name",
      issuer: "Issuer Name",
    },
  },
  {
    slug: "sertifikat-contoh-3",
    year: "2024",
    tone: 5,
    image: "",
    id: {
      title: "Nama Sertifikat",
      issuer: "Nama Penyelenggara",
    },
    en: {
      title: "Certificate Name",
      issuer: "Issuer Name",
    },
  },
];

export const getCertificate = (cert, lang) => ({
  slug: cert.slug,
  year: cert.year,
  tone: cert.tone,
  image: cert.image,
  ...cert[lang],
});
