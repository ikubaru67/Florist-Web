# Florist Website

Proyek website florist ini dirancang untuk memudahkan pelanggan dalam melihat katalog bunga, melakukan pemesanan, serta mempermudah admin dalam mengelola pesanan secara efisien.

---

## Tech Stack

| Bagian     | Teknologi        |
|-------------|------------------|
| **Backend** | Laravel *(rencana)* |
| **Frontend**| React.js         |
| **Hosting** | Hostinger        |

---

## User Features

1. Login / Register  
2. Profil Detail (bisa edit)  
3. Melihat Katalog Menu  
4. Keranjang  
5. Order Pesanan  
6. Melihat Status Pesanan  
7. Sortir Menu berdasarkan pilihan (Harga, Jenis, dll)

---

## User Flow

1. User membuka web florist  
2. User login atau register  
3. User membuka salah satu bouquet di katalog  
4. User klik **Order**  
5. User mengisi form pembelian (deskripsi, catatan, atau permintaan custom)  
6. Setelah selesai, user klik **Checkout**  
7. User menerima **Invoice**, lalu melanjutkan pembayaran via **WhatsApp chat**

---

## Admin Features

1. Melihat List Pesanan  
2. Update Status Pesanan  
3. Menerima Pesanan (jika customer sudah bayar & kirim bukti via WhatsApp)  
4. Menolak Pesanan  

---

## Admin Login Flow

1. Buka halaman login admin web florist  
2. Masuk ke dashboard (menampilkan list pesanan)

---

## Admin Accept Order Flow

1. Klik **Detail** pada salah satu pesanan di list  
2. Klik tombol **"Proses Pesanan"**  
   - Status Pesanan akan berubah menjadi: `Proses`

---

## Admin Reject Order Flow

1. Klik **Detail** pada salah satu pesanan di list  
2. Klik tombol **"Tolak"**  
   - Status Pesanan akan berubah menjadi: `Cancel`

---

## Admin Update Order Flow

1. Klik tombol **"Edit"** di salah satu pesanan  
2. Ubah kolom atau status pesanan  
3. Klik **"Update"** untuk menyimpan perubahan

---

## Catatan

- Proses pembayaran dilakukan melalui **chat WhatsApp**, bukan langsung di website.  
- Website berfungsi sebagai katalog, sistem pemesanan, dan pengelolaan data pesanan.

---
