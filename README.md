# DanaRumah — Anggaran Rumah Tangga

DanaRumah adalah ruang tenang untuk mengatur uang keluarga: catat pengeluaran, sesuaikan anggaran, bereskan tagihan, dan tumbuhkan tujuan tabungan. Dibuat dalam Bahasa Indonesia dengan format Rupiah, situs ini memakai keluarga contoh Wijaya (4 orang, Jakarta, November 2026). Semua perhitungan berlangsung di browser; perubahan disimpan di localStorage perangkat, tanpa akun, koneksi layanan, atau pengiriman data.

[![make.fun · best-household-budget-site-20261126-1457](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![rank](https://make.fun/badge/best-household-budget-site-20261126-1457/RINO1975/makefun-budget-site/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![reward](https://make.fun/badge/best-household-budget-site-20261126-1457/RINO1975/makefun-budget-site/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)

## Jalankan

Gunakan Node.js 22.18 atau lebih baru. Jalankan `node serve.ts`, lalu buka http://localhost:8080. Tidak ada instalasi dependensi atau proses build. Berkas statis ada di `app/`; semua modul dan gaya dimuat dari direktori tersebut. Putuskan koneksi internet setelah server lokal berjalan: seluruh fitur tetap bekerja.

## Halaman

- `#/` — Dasbor: penghasilan, aktual, tabungan, grafik kategori dan tren, peringatan, tagihan, dan tujuan.
- `#/anggaran` — Anggaran: delapan kategori, edit batas belanja, dan rencana tabungan.
- `#/transaksi` — Catat & Riwayat: tambah, cari, filter, hapus dengan konfirmasi, dan total berjalan.
- `#/tagihan` — Tagihan Rutin: tujuh tagihan dengan status yang bisa diubah.
- `#/tujuan` — Tujuan Tabungan: empat tujuan dengan tambahan progres.
- `#/laporan` — Laporan: perbandingan bulanan, pangsa kategori, dan tiga wawasan terhitung.
- `#/acuan` — Acuan & Sumber: konteks nasional serta panduan 50/30/20.

## Data dan sumber

Angka keluarga berasal dari paket data tugas. Sumber acuan: BPS Susenas Maret 2025, “Pengeluaran untuk Konsumsi Penduduk Indonesia Maret 2025”; BPS Susenas September 2025; BPS Profil Statistik Kesehatan 2025; UMP DKI Jakarta 2025. Angka acuan dan tahunnya dicantumkan di halaman Acuan & Sumber. Aturan 50/30/20 adalah panduan umum, bukan statistik BPS.

Daftar transaksi yang diberikan berisi **28 transaksi**, meski judul persyaratan menyebut 27. Semua 28 dipertahankan agar kategori tepat menjumlah ke Rp 9.363.000. Sisa aktual adalah penghasilan dikurangi transaksi; rencana tabungan adalah penghasilan dikurangi anggaran. Tagihan dan akumulasi tujuan dicatat terpisah agar tidak menggandakan transaksi.

Reset ke contoh meminta konfirmasi dan mengembalikan seluruh data awal. Status lunas tidak menambah transaksi; tambahan tujuan tidak mendebit sisa bulanan. Tanggal hari ini untuk penanda tagihan ditetapkan ke 26 November 2026, sehingga tidak ada tagihan yang masih akan jatuh tempo dalam lima hari pada bulan ini; Cicilan Motor ditandai terlewat.

## Struktur dan hasil

`data.js` adalah sumber angka; `state.js` mengelola data tersimpan; `format.js`, `charts.js`, `views.js`, `router.js`, dan `main.js` memisahkan format, gambar SVG, halaman, navigasi, dan bootstrap. `shots.js` menyediakan empat pose tangkapan deterministik sesuai `shots.json`. Tangkapan nyata ada di `screenshots/`. Pose `?shot=cover`, `?shot=anggaran`, `?shot=transaksi`, dan `?shot=phone` memakai salinan contoh di memori, tanpa menimpa data pribadi yang sudah disimpan.

`MAKEFUN_OUTPUT_DIR=out node main.ts` menyalin aplikasi dan tangkapan layar, lalu menghasilkan `out/dossier.json` dengan pustaka resmi yang tidak diubah. Jalankan dengan direktori keluaran lain untuk membandingkan determinisme.

DanaRumah merupakan karya asli: nama, rancangan, teks, kode, dan grafik ditulis khusus untuk tugas ini. Lisensi MIT.

Pemeriksaan dapat diulang dengan `node verify-browser.mjs` (Chromium lokal melalui CDP, mode berkas dengan izin modul lokal) dan `node verify-build.mjs` setelah server port 8081 serta kedua direktori hasil tersedia. Tangkapan PNG hasil pengujian ada di `verification/`; JPEG akhir dikonversi dengan PIL pada kualitas 82.
