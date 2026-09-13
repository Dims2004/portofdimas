# Portofolio Anda — React + Vite + Tailwind CSS

Versi React dari portofolio Anda, lengkap dengan halaman **Karya** (daftar & detail tiap proyek),
halaman **Cerita** (tentang Anda), layout asimetris (bento grid, bukan tumpukan lurus), dan animasi
(scroll reveal, hero fade bertahap, tilt 3D di kartu proyek, cursor kustom, transisi antar halaman).

## Struktur proyek

```
src/
  main.jsx            -> titik masuk aplikasi (bungkus Router)
  App.jsx              -> routing halaman + transisi antar halaman
  index.css            -> Tailwind + token warna/font kustom
  data/works.js         -> SEMUA DATA PROYEK, edit di sini
  components/
    Navbar.jsx          -> navigasi atas
    Footer.jsx           -> bagian kontak di bawah
    CustomCursor.jsx      -> cursor bulat yang mengikuti mouse
    Reveal.jsx             -> wrapper animasi "muncul saat di-scroll"
    WorkCard.jsx            -> kartu proyek dengan efek tilt 3D
  pages/
    Home.jsx             -> beranda (hero + karya pilihan + layanan)
    Works.jsx              -> /karya, semua proyek
    WorkDetail.jsx           -> /karya/:slug, halaman studi kasus per proyek
    Story.jsx                 -> /cerita, tentang Anda + timeline
    NotFound.jsx               -> halaman 404
```

## Yang perlu diganti

1. **Nama & email** - cari `Nama Anda` dan `nama@email.com` di `Navbar.jsx`, `Home.jsx`, dan `Footer.jsx`.
2. **Data proyek** - edit array di `src/data/works.js`. Setiap objek berisi judul, tag, warna (`tone` 1-6),
   ukuran kartu (`size: "lg"` untuk 2 kolom, `"sm"` untuk 1 kolom), ringkasan, deskripsi panjang, dan galeri.
   Halaman `/karya` dan `/karya/:slug` otomatis mengikuti data ini, tambah atau hapus proyek tanpa
   menyentuh komponen lain.
3. **Cerita** - edit `src/pages/Story.jsx`: paragraf intro, `timeline`, dan daftar `tools`.
4. **Layanan** - edit array `services` di `src/pages/Home.jsx`.
5. **Foto asli** - saat ini thumbnail proyek memakai gradasi warna (`tone`) sebagai placeholder.
   Untuk pakai foto sungguhan: taruh gambar di folder `public/`, lalu di `WorkCard.jsx` dan
   `WorkDetail.jsx` ganti div gradasi dengan tag `<img src="/nama-file.jpg" className="aspect-[4/3] w-full object-cover" />`.

## Ubah warna/tema

Buka `src/index.css`, di bagian `@theme` ada token warna dan font:

```css
@theme {
  --color-bg: #121014;      /* warna latar utama */
  --color-ink: #ece8e1;     /* warna teks */
  --color-accent: #c9a24b;  /* warna aksen */
}
```
Ganti nilai hex-nya, seluruh halaman (termasuk kelas Tailwind seperti `bg-accent`, `text-ink`)
otomatis ikut berubah.

## Menjalankan secara lokal

Butuh Node.js 18 ke atas terpasang.

```bash
npm install
npm run dev
```
Buka `http://localhost:5173`.

Untuk build versi produksi:
```bash
npm run build
npm run preview
```

## Menjalankan lewat Docker

```bash
docker compose up --build
```
Buka `http://localhost:8080`. Docker akan build aplikasi lalu menyajikannya lewat Nginx,
cocok untuk mengetes seperti kondisi hosting sungguhan sebelum deploy.

## Hosting gratis ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `portofolio-saya`.
2. Upload seluruh isi folder ini ke repository tersebut.
3. Install dependency tambahan untuk deploy:
   ```bash
   npm install -D gh-pages
   ```
4. Di `package.json`, tambahkan di bagian `"scripts"`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
5. Di `vite.config.js`, pastikan `base: './'` sudah ada (sudah disiapkan di file ini) supaya
   path aset benar saat di-hosting di subfolder GitHub Pages.
6. Jalankan:
   ```bash
   npm run deploy
   ```
7. Di GitHub, buka repository -> **Settings** -> **Pages** -> pastikan **Source** diatur ke
   branch `gh-pages`.
8. Situs akan tersedia di `https://USERNAME.github.io/portofolio-saya/`.

> Alternatif lebih mudah tanpa `gh-pages`: hosting gratis di **Vercel** atau **Netlify**,
> tinggal hubungkan repository GitHub Anda, keduanya otomatis mendeteksi proyek Vite dan
> men-deploy setiap kali Anda push perubahan baru.

## Catatan tentang animasi

- **Scroll reveal** - komponen `Reveal.jsx`, pakai `framer-motion` (`whileInView`).
- **Hero fade bertahap** - di `Home.jsx`, pakai `staggerChildren` dari `framer-motion`.
- **Tilt 3D kartu proyek** - di `WorkCard.jsx`, mengikuti posisi mouse dengan `useMotionValue`.
- **Cursor kustom** - `CustomCursor.jsx`, otomatis nonaktif di HP/tablet dan saat mode
  "kurangi gerak" (accessibility) aktif di sistem operasi pengguna.
- **Transisi antar halaman** - di `App.jsx`, pakai `AnimatePresence` saat berpindah rute.
