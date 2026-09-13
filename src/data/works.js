// ============================================================
// DATA PROYEK (bilingual: id / en)
// - slug     : dipakai di URL, contoh "/work/nama-proyek"
// - tone     : angka 1-6, menentukan warna gradasi thumbnail (dipakai kalau cover/galleryImages kosong)
// - size     : "lg" (2 kolom) atau "sm" (1 kolom) di grid bento
// - cover    : path gambar sampul proyek. Taruh file gambar di folder public/,
//              lalu isi "/nama-file.jpg". Kosongkan ("") kalau belum ada gambar.
// - id / en  : versi konten per bahasa (tags, summary, role, description, gallery)
//              gallery.images (opsional): path gambar untuk tiap item galeri, urutannya
//              harus sama dengan gallery caption
// ============================================================

export const works = [
  {
    slug: "aiot-cat-feeder",
    tone: 1,
    size: "lg",
    year: "2025",
    cover: "/projects/iot_pakankucing.jpeg", // contoh: "/projects/aiot-cat-feeder.jpg"
    galleryImages: ["", "", ""], // isi path gambar untuk masing-masing item galeri di bawah
    id: {
      title: "AIoT Cat Feeder",
      tags: ["IoT", "Artificial Intelligence"],
      summary:
        "Sistem pemberi makan kucing otomatis berbasis AI dan IoT dengan pemantauan serta kontrol pemberian pakan secara real-time.",
      role: "IoT & AI Developer",
      description:
        "AIoT Cat Feeder adalah alat pemberi makan kucing otomatis yang menggabungkan Artificial Intelligence dan Internet of Things. Sistem ini dibangun menggunakan mikrokontroler ESP32 yang terhubung ke Firebase, sehingga pemilik kucing dapat memantau jadwal makan, sisa pakan, dan riwayat pemberian pakan dari mana saja secara real-time.\n\nModel AI digunakan untuk membantu mengatur porsi pemberian pakan secara lebih adaptif, sementara sistem IoT memastikan data sensor dan status alat selalu tersinkronisasi ke cloud. Proyek ini dikembangkan untuk menjawab kebutuhan pemilik hewan peliharaan yang memiliki mobilitas tinggi namun tetap ingin memastikan kucing mereka mendapatkan pakan tepat waktu.",
      gallery: ["Perangkat AIoT Cat Feeder", "Dashboard pemantauan real-time", "Integrasi ESP32 dan Firebase"],
    },
    en: {
      title: "AIoT Cat Feeder",
      tags: ["IoT", "Artificial Intelligence"],
      summary:
        "An automatic AI- and IoT-based cat feeder with real-time feeding monitoring and control.",
      role: "IoT & AI Developer",
      description:
        "AIoT Cat Feeder is an automatic cat feeding device that combines Artificial Intelligence and Internet of Things. It's built on an ESP32 microcontroller connected to Firebase, letting cat owners monitor feeding schedules, remaining food, and feeding history from anywhere in real time.\n\nAn AI model helps adjust portion sizes more adaptively, while the IoT system keeps sensor data and device status always synced to the cloud. The project was built for pet owners with busy schedules who still want to make sure their cat gets fed on time.",
      gallery: ["AIoT Cat Feeder device", "Real-time monitoring dashboard", "ESP32 and Firebase integration"],
    },
  },
  {
    slug: "iot-smartwatch",
    tone: 3,
    size: "sm",
    year: "2025",
    cover: "",
    galleryImages: ["", "", ""],
    id: {
      title: "IoT Smartwatch",
      tags: ["IoT", "Wearable Device"],
      summary:
        "Smartwatch berbasis IoT untuk memantau aktivitas pengguna dan detak jantung secara real-time menggunakan ESP32, MPU6050, dan Pulse Sensor.",
      role: "IoT Developer",
      description:
        "IoT Smartwatch adalah perangkat wearable yang dirancang untuk memantau aktivitas fisik pengguna seperti duduk, berjalan, dan berlari, sekaligus mengukur detak jantung (BPM) secara real-time. Perangkat ini menggunakan mikrokontroler ESP32 sebagai otak sistem, sensor MPU6050 untuk mendeteksi gerakan, dan Pulse Sensor untuk membaca detak jantung.\n\nData dari sensor dikirim melalui protokol MQTT sehingga aktivitas pengguna dapat dipantau secara langsung dari aplikasi pemantauan. Proyek ini merupakan eksplorasi penerapan teknologi IoT pada bidang kesehatan dan gaya hidup aktif, dengan fokus pada efisiensi daya dan akurasi pembacaan sensor.",
      gallery: ["Prototipe smartwatch", "Skema rangkaian ESP32 dan sensor", "Tampilan data aktivitas real-time"],
    },
    en: {
      title: "IoT Smartwatch",
      tags: ["IoT", "Wearable Device"],
      summary:
        "An IoT-based smartwatch that tracks user activity and heart rate in real time using ESP32, MPU6050, and a Pulse Sensor.",
      role: "IoT Developer",
      description:
        "IoT Smartwatch is a wearable device designed to track physical activity such as sitting, walking, and running, while also measuring heart rate (BPM) in real time. It uses an ESP32 microcontroller as the system's brain, an MPU6050 sensor for motion detection, and a Pulse Sensor for heart rate readings.\n\nSensor data is sent over the MQTT protocol so user activity can be monitored directly from a companion app. This project explores IoT technology applied to health and active lifestyles, with a focus on power efficiency and sensor accuracy.",
      gallery: ["Smartwatch prototype", "ESP32 and sensor circuit diagram", "Real-time activity data view"],
    },
  },
  {
    slug: "sosialisasi-pembelajaran-era-digital",
    tone: 5,
    size: "sm",
    year: "2024",
    cover: "",
    galleryImages: ["", "", ""],
    id: {
      title: "Sosialisasi Pembelajaran Era Digital",
      tags: ["Pengabdian Masyarakat", "Edukasi"],
      summary:
        "Berpartisipasi dalam sosialisasi pembelajaran era digital di SMP Widya Darma bersama Telkom University Surabaya untuk meningkatkan literasi digital siswa.",
      role: "Volunteer & Public Speaker",
      description:
        "Proyek ini merupakan kegiatan pengabdian masyarakat yang diselenggarakan bersama Telkom University Surabaya di SMP Widya Darma. Kegiatan bertujuan untuk meningkatkan literasi digital para siswa serta memperkenalkan pemanfaatan teknologi dalam proses belajar mengajar di era digital.\n\nDalam kegiatan ini, saya berperan aktif sebagai pembicara sekaligus fasilitator diskusi, berbagi pengetahuan dasar mengenai teknologi digital dan bagaimana menggunakannya secara bijak dan produktif. Pengalaman ini melatih kemampuan public speaking dan kerja sama tim dalam menyampaikan materi edukatif kepada audiens pelajar.",
      gallery: ["Sesi sosialisasi di kelas", "Diskusi interaktif bersama siswa", "Dokumentasi bersama tim Telkom University"],
    },
    en: {
      title: "Digital Era Learning Outreach",
      tags: ["Community Service", "Education"],
      summary:
        "Took part in a digital-era learning outreach program at SMP Widya Darma with Telkom University Surabaya to boost students' digital literacy.",
      role: "Volunteer & Public Speaker",
      description:
        "This project was a community service activity held together with Telkom University Surabaya at SMP Widya Darma. It aimed to improve students' digital literacy and introduce the use of technology in teaching and learning during the digital era.\n\nIn this activity, I actively served as a speaker and discussion facilitator, sharing basic knowledge about digital technology and how to use it wisely and productively. The experience helped sharpen my public speaking and teamwork skills in delivering educational material to a student audience.",
      gallery: ["Classroom outreach session", "Interactive discussion with students", "Documentation with the Telkom University team"],
    },
  },
];

export const getWork = (work, lang) => ({
  slug: work.slug,
  tone: work.tone,
  size: work.size,
  year: work.year,
  cover: work.cover,
  galleryImages: work.galleryImages,
  ...work[lang],
});

export const getWorkBySlug = (slug, lang) => {
  const work = works.find((w) => w.slug === slug);
  return work ? getWork(work, lang) : null;
};