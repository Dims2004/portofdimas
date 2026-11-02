export const works = [
  {
    slug: "aiot-cat-feeder",
    tone: 1,
    size: "lg",
    year: "2025",
    cover: "projects/iot_pakankucing.jpeg",
    galleryImages: ["projects/prototipe.jpg", "projects/Catfeed1.jpg", "projects/Catfeed2.png"],
    id: {
      title: "AIoT Cat Feeder",
      tags: ["IoT", "Artificial Intelligence"],
      summary:
        "Sistem pemberi makan kucing otomatis berbasis AI dan IoT dengan pemantauan serta kontrol pemberian pakan secara real-time.",
      role: "IoT & AI Developer",
      description:
        "AIoT Cat Feeder adalah alat pemberi makan kucing otomatis yang menggabungkan Artificial Intelligence dan Internet of Things. Sistem ini dibangun menggunakan mikrokontroler ESP32 yang terhubung ke Firebase, sehingga pemilik kucing dapat memantau jadwal makan, sisa pakan, dan riwayat pemberian pakan dari mana saja secara real-time.\n\nModel AI digunakan untuk membantu mengatur porsi pemberian pakan secara lebih adaptif, sementara sistem IoT memastikan data sensor dan status alat selalu tersinkronisasi ke cloud. Proyek ini dikembangkan untuk menjawab kebutuhan pemilik hewan peliharaan yang memiliki mobilitas tinggi namun tetap ingin memastikan kucing mereka mendapatkan pakan tepat waktu.",
      gallery: ["Prototipe IoT", "Gambar kucing yang sudah di boundingbox", "hasil visualisasi dari proses pelatihan model YOLOv8 selama 10 epoch"],
    },
    en: {
      title: "AIoT Cat Feeder",
      tags: ["IoT", "Artificial Intelligence"],
      summary:
        "An automatic AI- and IoT-based cat feeder with real-time feeding monitoring and control.",
      role: "IoT & AI Developer",
      description:
        "AIoT Cat Feeder is an automatic cat feeding device that combines Artificial Intelligence and Internet of Things. It's built on an ESP32 microcontroller connected to Firebase, letting cat owners monitor feeding schedules, remaining food, and feeding history from anywhere in real time.\n\nAn AI model helps adjust portion sizes more adaptively, while the IoT system keeps sensor data and device status always synced to the cloud. The project was built for pet owners with busy schedules who still want to make sure their cat gets fed on time.",
      gallery: ["Prototipe IoT", "Image of a cat with a bounding box applied", "visualization of the YOLOv8 model training process over 10 epochs"],
    },
  },
  {
    slug: "iot-smartwatch",
    tone: 3,
    size: "sm",
    year: "2025 - 2026",
    link: "https://github.com/Dims2004/iot_activity.git",
    cover: "projects/jamiot3d.png",
    galleryImages: [
      "projects/jam1.jpeg",
      "projects/jam2.jpg",
      "projects/jam3.jpg",
      "projects/bpmimputation.png",
      "projects/matrix.jpg",
      "projects/optimal_k.png",
    ],
    id: {
      title: "IoT Smartwatch",
      tags: ["IoT", "Wearable Device"],
      summary:
        "Smartwatch berbasis IoT untuk memantau aktivitas pengguna dan detak jantung secara real-time menggunakan ESP32, MPU6050, dan Pulse Sensor.",
      role: "IoT Developer",
      description:
        "IoT Smartwatch adalah perangkat wearable yang dirancang untuk mengklasifikasikan aktivitas fisik pengguna (duduk, berjalan, dan berlari) sekaligus mengukur detak jantung (BPM) secara real-time. Perangkat ini menggunakan mikrokontroler ESP32 sebagai otak sistem, sensor MPU6050 untuk mendeteksi gerakan, Pulse Sensor untuk membaca detak jantung, dan layar OLED untuk menampilkan hasil pembacaan.\n\nData sensor dikirim melalui protokol MQTT ke website monitoring sehingga aktivitas pengguna dapat dipantau secara langsung. Klasifikasi aktivitas dilakukan dengan algoritma K-Nearest Neighbor (KNN) menggunakan dataset 13.410 data dari 15 partisipan. Nilai K optimal yang diperoleh adalah 18, dengan data BPM yang hilang ditangani melalui proses imputasi. Hasil akhirnya, model mencapai akurasi 83,69%.\n\nProyek ini merupakan eksplorasi penerapan IoT dan machine learning pada bidang kesehatan dan gaya hidup aktif, dengan fokus pada efisiensi daya dan akurasi pembacaan sensor.",
      gallery: [
        "Skema Rangkaian ESP32 dan Sensor",
        "Monitoring Website",
        "Tampilan pengambilan Data pada partisipan",
        "Hasil imputasi data BPM",
        "Confusion matrix model KNN",
        "Nilai K optimal",
      ],
    },
    en: {
      title: "IoT Smartwatch",
      tags: ["IoT", "Wearable Device"],
      summary:
        "An IoT-based smartwatch that tracks user activity and heart rate in real time using ESP32, MPU6050, and a Pulse Sensor.",
      role: "IoT Developer",
      description:
        "IoT Smartwatch is a wearable device designed to classify the user's physical activity (sitting, walking, and running) while also measuring heart rate (BPM) in real time. It uses an ESP32 microcontroller as the system's brain, an MPU6050 sensor for motion detection, a Pulse Sensor for heart rate readings, and an OLED display to show the readings.\n\nSensor data is sent over the MQTT protocol to a monitoring website so user activity can be tracked live. Activity classification uses the K-Nearest Neighbor (KNN) algorithm on a dataset of 13,410 samples collected from 15 participants. The optimal K value is 18, and missing BPM values are handled through imputation. The final model reaches an accuracy of 83.69%.\n\nThis project explores IoT and machine learning applied to health and active lifestyles, with a focus on power efficiency and sensor accuracy.",
      gallery: [
        "ESP32 and Sensor Circuit Schematic",
        "Monitoring Website",
        "Data Acquisition Interface for Participants",
        "BPM data imputation result",
        "KNN model confusion matrix",
        "Optimal K value",
      ],
    },
  },
  {
    slug: "sosialisasi-pembelajaran-era-digital",
    tone: 5,
    size: "sm",
    year: "2025",
    cover: "projects/sosialisasi.jpeg",
    id: {
      title: "Sosialisasi Pembelajaran Era Digital",
      tags: ["Pengabdian Masyarakat", "Edukasi"],
      summary:
        "Berpartisipasi dalam sosialisasi pembelajaran era digital di SMP Widya Darma bersama Telkom University Surabaya untuk meningkatkan literasi digital siswa.",
      role: "Volunteer & Public Speaker",
      description:
        "Proyek ini merupakan kegiatan pengabdian masyarakat yang diselenggarakan bersama Telkom University Surabaya di SMP Widya Darma. Kegiatan bertujuan untuk meningkatkan literasi digital para siswa serta memperkenalkan pemanfaatan teknologi dalam proses belajar mengajar di era digital.\n\nDalam kegiatan ini, saya berperan aktif sebagai pembicara sekaligus fasilitator diskusi, berbagi pengetahuan dasar mengenai teknologi digital dan bagaimana menggunakannya secara bijak dan produktif. Pengalaman ini melatih kemampuan public speaking dan kerja sama tim dalam menyampaikan materi edukatif kepada audiens pelajar.",
    },
    en: {
      title: "Digital Era Learning Outreach",
      tags: ["Community Service", "Education"],
      summary:
        "Took part in a digital-era learning outreach program at SMP Widya Darma with Telkom University Surabaya to boost students' digital literacy.",
      role: "Volunteer & Public Speaker",
      description:
        "This project was a community service activity held together with Telkom University Surabaya at SMP Widya Darma. It aimed to improve students' digital literacy and introduce the use of technology in teaching and learning during the digital era.\n\nIn this activity, I actively served as a speaker and discussion facilitator, sharing basic knowledge about digital technology and how to use it wisely and productively. The experience helped sharpen my public speaking and teamwork skills in delivering educational material to a student audience.",
    },
  },
  {
    slug: "sistem-inventory-gudang",
    tone: 7,
    size: "sm",
    year: "2025",
    cover: "",
    galleryImages: [
      "projects/inventory-home.png",
      "projects/inventory-dashboard-admin.png",
    ],
    id: {
      title: "Sistem Inventory Gudang",
      tags: ["Web Development", "Information System"],
      summary:
        "Sistem informasi manajemen persediaan barang berbasis web untuk mencatat barang masuk, barang keluar, retur, dan memantau stok gudang di PT. Graha Sarana Gresik.",
      role: "Web Developer",
      description:
        "Sistem Inventory Gudang adalah aplikasi web yang dibuat saat kerja praktik di PT. Graha Sarana Gresik pada 17 Juli sampai 27 Agustus 2025. Latar belakangnya adalah pencatatan stok di gudang yang masih semi-manual, sehingga sering muncul salah catat, selisih antara data dan fisik barang, serta laporan stok yang terlambat.\n\nSistem dibangun dengan PHP sebagai bahasa sisi server, MySQL/MariaDB sebagai basis data, dan Bootstrap untuk tampilan yang responsif. Selama pengembangan, seluruh sistem dijalankan dan diuji di server lokal menggunakan XAMPP (Apache dan MariaDB) sebelum diterapkan ke server perusahaan. Ada dua peran pengguna. Admin mengelola data master seperti barang, supplier, customer, rak penyimpanan, dan kondisi barang. Petugas gudang mencatat transaksi harian dengan hak akses yang dibatasi.\n\nFokus saya ada di modul petugas gudang, yaitu login, dashboard, input barang masuk, input barang keluar, retur (awal dan akhir), serta update stok. Setiap transaksi otomatis menambah atau mengurangi saldo stok, dan laporan bisa dicetak ke PDF atau diekspor ke Excel. Pengujian dilakukan dengan functional testing pada seluruh fitur modul petugas.",
      gallery: [
        "Halaman beranda Sistem Inventory Gudang",
        "Dashboard admin",
        "Flowchart alur kerja petugas gudang",
        "Halaman laporan barang masuk",
        "Halaman laporan barang keluar",
        "Halaman update stok dengan opsi export Excel",
      ],
    },
    en: {
      title: "Warehouse Inventory System",
      tags: ["Web Development", "Information System"],
      summary:
        "A web-based inventory management system for recording incoming goods, outgoing goods, and returns, and for monitoring warehouse stock at PT. Graha Sarana Gresik.",
      role: "Web Developer",
      description:
        "Warehouse Inventory System is a web application built during an internship at PT. Graha Sarana Gresik from 17 July to 27 August 2025. It was motivated by semi-manual stock recording, which often led to input mistakes, gaps between system data and physical stock, and late stock reports.\n\nThe system uses PHP on the server side, MySQL/MariaDB as the database, and Bootstrap for a responsive interface. During development, everything was run and tested on a local server using XAMPP (Apache and MariaDB) before being deployed to the company server. There are two user roles. The admin manages master data such as items, suppliers, customers, storage racks, and item conditions. The warehouse officer records daily transactions with restricted access rights.\n\nMy focus was the warehouse officer module, covering login, dashboard, incoming goods, outgoing goods, returns (initial and final), and stock updates. Every transaction automatically adds to or reduces the stock balance, and reports can be printed to PDF or exported to Excel. Testing was done through functional testing on all features of the officer module.",
      gallery: [
        "Warehouse Inventory System home page",
        "Admin dashboard",
        "Warehouse officer workflow flowchart",
        "Incoming goods report page",
        "Outgoing goods report page",
        "Stock update page with Excel export option",
      ],
    },
  },
];

export const getWork = (work, lang) => ({
  slug: work.slug,
  tone: work.tone,
  size: work.size,
  year: work.year,
  link: work.link,
  cover: work.cover,
  galleryImages: work.galleryImages,
  ...work[lang],
});

export const getWorkBySlug = (slug, lang) => {
  const work = works.find((w) => w.slug === slug);
  return work ? getWork(work, lang) : null;
};
