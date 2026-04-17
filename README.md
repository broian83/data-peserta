# Aplikasi Pencarian Peserta Webinar

Aplikasi mobile berbasis web yang modern dan interaktif untuk memudahkan peserta mencari data kehadiran mereka berdasarkan alamat email.

## Fitur Utama
- **Pencarian Cepat**: Cari data berdasarkan email dengan hasil instan.
- **Navigasi Mobile**: Menu bawah (bottom nav) untuk akses cepat ke:
  - Link Zoom
  - Grup WhatsApp
  - LMS Kemkes
- **Desain Premium**: Menggunakan Glassmorphism, animasi halus, dan tema Dark Mode yang modern.
- **Responsif**: Dioptimalkan untuk tampilan smartphone.

## Cara Menggunakan
1. Masukkan data peserta ke dalam file `data.json` dalam format array JSON. Contoh:
   ```json
   [
     {
       "Nama": "Nama Peserta",
       "Email": "email@example.com",
       "Instansi": "Instansi/RS",
       "Provinsi": "Provinsi"
     }
   ]
   ```
2. Buka file `index.html` di browser Anda (disarankan menggunakan browser mobile atau mode inspeksi mobile).

## Teknologi
- HTML5 & CSS3 (Custom Glassmorphism)
- JavaScript (Vanilla)
- Lucide Icons (CDN)
- Google Fonts (Inter)
