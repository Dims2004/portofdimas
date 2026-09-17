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
    slug: "Certificate_of_competency_assesment",
    year: "2022",
    tone: 1,
    image: "certificates/Certificate_of_competency_assesment.jpg", // contoh: "certificates/sertifikat-contoh-1.jpg"
    id: {
      title: "Sertifikat Uji Kompetensi",
      issuer: "SMK Telkom Sidoarjo",
    },
    en: {
      title: "Certificate of Competency Assesment",
      issuer: "SMK Telkom Sidoarjo",
    },
  },
  {
    slug: "Coursera Security Operation Center",
    year: "2026",
    tone: 3,
    image: "certificates/Coursera_SOC.jpg",
    id: {
      title: "Sertifikat Pusat Operasi Keamanan",
      issuer: "Coursera",
    },
    en: {
      title: "Certificate Security Operation Center",
      issuer: "Coursera",
    },
  },
  {
    slug: "Fundamental of Associate Network Administrator National",
    year: "2026",
    tone: 5,
    image: "certificates/Fundamental.jpg",
    id: {
      title: "Sertifikat Dasar-dasar Administrator Jaringan Asosiasi Nasional",
      issuer: "Digital Talent Scholarship 2026",
    },
    en: {
      title: "Certificate Fundamental of Associate Network Administrator National",
      issuer: "Digital Talent Scholarship 2026",
    },
  },
    {
    slug: "TEFA",
    year: "2020",
    tone: 7,
    image: "certificates/TEFA.jpeg",
    id: {
      title: "Sertifikat pabrik pembelajaran",
      issuer: "SMK Telkom Sidoarjo",
    },
    en: {
      title: "Certificate Teaching Factory",
      issuer: "SMK Telkom Sidoarjo",
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
