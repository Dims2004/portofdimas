// ============================================================
// DATA PENGALAMAN MAGANG & ORGANISASI (dua bahasa: id / en)
//
// - period      : isi sendiri periodenya, contoh "Agustus 2025 – Oktober 2025".
//                 Kosongkan ("") kalau belum mau ditampilkan.
// - image       : (opsional) foto kegiatan magang, path di folder public/
//                 contoh: "projects/magang-graha.jpg". Kosong = gradasi ungu.
// - detailTo    : (opsional) link "Lihat detail" ke halaman proyek, contoh "/karya/slug"
// ============================================================

export const internships = [
  {
    slug: "graha-sarana-gresik",
    period: "",
    image: "",
    detailTo: "/karya/sistem-inventory-gudang",
    id: {
      chip: "Web Development",
      role: "Magang — Pengembangan Web",
      org: "PT Graha Sarana Gresik · Gudang Pupuk",
      summary:
        "Ditempatkan di gudang pupuk dan membangun sistem informasi pergudangan berbasis web untuk membantu pencatatan barang dan stok.",
    },
    en: {
      chip: "Web Development",
      role: "Intern — Web Development",
      org: "PT Graha Sarana Gresik · Fertilizer Warehouse",
      summary:
        "Placed at the fertilizer warehouse and built a web-based warehouse information system to help record goods and stock.",
    },
  },
  {
    slug: "digipreneur",
    period: "",
    image: "",
    detailTo: "",
    id: {
      chip: "WordPress",
      role: "Magang — Web Developer WordPress",
      org: "PT Digipreneur",
      summary:
        "Mengembangkan dan mengelola website berbasis WordPress sebagai Web Developer magang.",
    },
    en: {
      chip: "WordPress",
      role: "Intern — WordPress Web Developer",
      org: "PT Digipreneur",
      summary:
        "Developed and maintained WordPress-based websites as an intern Web Developer.",
    },
  },
];

export const organizations = [
  {
    slug: "ekwu-hima",
    period: "2024 – 2025",
    thumbs: [
      {
        image: "certificates/EKWU.jpg",
        id: "Sertifikat Anggota Departemen EKWU",
        en: "EKWU Department Member Certificate",
      },
    ],
    id: {
      title: "Anggota Departemen Kewirausahaan (EKWU)",
      org: "HIMA Informatika · Universitas Telkom Surabaya",
      bullets: [
        "Aktif di Departemen Ekonomi Kewirausahaan HIMA Informatika.",
        "Saat ada acara, bertugas di seksi keamanan atau perkab.",
      ],
    },
    en: {
      title: "Member, Entrepreneurship Department (EKWU)",
      org: "HIMA Informatics · Telkom University Surabaya",
      bullets: [
        "Active in the Entrepreneurial Economics Department of HIMA Informatics.",
        "During events, assigned to the security or perkab division.",
      ],
    },
  },
  {
    slug: "ketua-keamanan",
    period: "2024 – 2025",
    thumbs: [],
    tags: ["Funsportika", "Webinar Kampus", "Welcome Party Informatika"],
    id: {
      title: "Ketua Keamanan Acara",
      org: "HIMA Informatika · Universitas Telkom Surabaya",
      bullets: [
        "Memimpin dan mengoordinasi 2 anggota tim keamanan.",
        "Menjalankan peran ini di 5 acara atau lebih, di antaranya:",
      ],
    },
    en: {
      title: "Event Security Lead",
      org: "HIMA Informatics · Telkom University Surabaya",
      bullets: [
        "Led and coordinated a security team of 2 members.",
        "Held this role at 5 or more events, including:",
      ],
    },
  },
];

export const getItem = (item, lang) => ({ ...item, ...item[lang] });
