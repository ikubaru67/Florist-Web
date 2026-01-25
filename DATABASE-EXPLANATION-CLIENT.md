# 🌸 Florist Shop - Penjelasan Database untuk Client

**Dokumen ini menjelaskan struktur database sistem Florist Shop secara sederhana**  
**Versi:** 1.3.0  
**Tanggal:** 1 Januari 2026  
**Total Tabel:** 19 tabel

---

## 📊 Ringkasan Database

Database Florist Shop dirancang untuk mengelola:
- ✅ **Manajemen User** (Customer & Admin)
- ✅ **Katalog Produk Bunga** dengan kategori
- ✅ **Sistem Keranjang Belanja**
- ✅ **Pemesanan & Pembayaran**
- ✅ **Review & Rating Produk**
- ✅ **Add-ons Global** (Greeting Card, Coklat, dll)
- ✅ **Pengaturan Website** (Banner, konfigurasi)

---

## 🗂️ Daftar Tabel Database

| No | Nama Tabel | Fungsi Utama |
|----|------------|--------------|
| 1 | **users** | Data pelanggan dan admin |
| 2 | **categories** | Kategori produk bunga |
| 3 | **products** | Katalog produk bunga |
| 4 | **addons** | Add-ons global (greeting card, coklat) |
| 5 | **addon_product** | Penghubung add-ons dengan produk |
| 6 | **addon_images** | Foto-foto add-ons |
| 7 | **product_images** | Galeri foto produk |
| 8 | **product_reviews** | Review & rating dari customer |
| 9 | **settings** | Pengaturan website (banner, dll) |
| 10 | **cart_items** | Keranjang belanja |
| 11 | **orders** | Data pesanan customer |
| 12 | **order_items** | Detail produk dalam pesanan |
| 13-19 | **System Tables** | Tabel teknis Laravel |

---

## 📖 Penjelasan Detail Setiap Tabel

### 1. 👥 **USERS** - Data Pengguna

**Fungsi:** Menyimpan informasi pelanggan dan admin yang terdaftar di website.

**Data yang Disimpan:**
- Informasi dasar: Nama, Email, Password (terenkripsi)
- Alamat lengkap: Jalan, Kota, Kode Pos, No. Telepon
- Status: Admin atau Customer biasa
- Verifikasi email dengan kode OTP 6 digit

**Kapan Digunakan:**
- Saat registrasi pengguna baru
- Login ke sistem
- Verifikasi email dengan OTP
- Menyimpan alamat pengiriman
- Histori pembelian customer

**Hubungan dengan Tabel Lain:**
- Satu user bisa punya banyak pesanan (orders)
- Satu user bisa punya banyak item di keranjang (cart_items)
- Satu user bisa menulis banyak review (product_reviews)

---

### 2. 🏷️ **CATEGORIES** - Kategori Produk

**Fungsi:** Mengelompokkan produk bunga berdasarkan jenisnya.

**Data yang Disimpan:**
- Nama kategori (contoh: "Bunga Papan", "Hand Bouquet")
- Slug URL (untuk link website)
- Deskripsi kategori
- Gambar kategori

**Contoh Kategori:**
- 🎯 Bunga Papan (untuk ucapan selamat)
- 💐 Hand Bouquet (buket tangan)
- 🌺 Standing Flowers (bunga berdiri)
- 🌹 Table Flowers (bunga meja)
- ⚰️ Bunga Duka Cita

**Kapan Digunakan:**
- Customer memilih kategori saat browsing
- Admin mengelola kategori produk
- Filter produk di halaman katalog

**Hubungan dengan Tabel Lain:**
- Satu kategori bisa punya banyak produk (products)

---

### 3. 🌺 **PRODUCTS** - Katalog Produk Bunga

**Fungsi:** Menyimpan semua informasi produk bunga yang dijual.

**Data yang Disimpan:**
- Informasi produk: Nama, Deskripsi, Harga
- Stok tersedia
- Kategori produk (link ke tabel categories)
- Gambar utama + galeri foto
- Status: Aktif/Nonaktif, Featured/Biasa

**Contoh Data Produk:**
```
Nama: "Bunga Papan Congratulations"
Harga: Rp 750.000
Stok: 15
Kategori: Bunga Papan
Status: Aktif, Featured
```

**Kapan Digunakan:**
- Customer browsing katalog produk
- Customer search produk
- Customer melihat detail produk
- Admin mengelola produk (tambah/edit/hapus)
- Menampilkan produk featured di homepage

**Hubungan dengan Tabel Lain:**
- Setiap produk punya 1 kategori (categories)
- Produk bisa punya banyak foto (product_images)
- Produk bisa punya banyak review (product_reviews)
- Produk bisa ditambahkan ke keranjang (cart_items)
- Produk bisa dipesan (order_items)
- Produk bisa punya banyak add-ons pilihan (addon_product)

---

### 4. 🎁 **ADDONS** - Add-ons Global (Fitur Baru v1.3.0)

**Fungsi:** Menyimpan produk tambahan (add-ons) yang bisa dipilih customer saat membeli bunga.

**Data yang Disimpan:**
- Nama add-on (contoh: "Greeting Card", "Coklat Ferrero")
- Deskripsi add-on
- Harga tambahan
- Stok tersedia
- Apakah bisa tulis pesan custom?
- Urutan tampilan

**Contoh Add-ons:**
```
1. Greeting Card - Rp 5.000
   → Customer bisa tulis pesan ucapan

2. Coklat Ferrero Rocher - Rp 35.000
   → Box berisi 16 pcs

3. Boneka Teddy Bear - Rp 50.000
   → Boneka lucu ukuran sedang

4. Lilin Ulang Tahun - Rp 10.000
   → Set lilin + holder
```

**Kapan Digunakan:**
- Customer memilih add-ons saat checkout
- Admin mengelola add-ons (tambah/edit/hapus)
- Admin menentukan add-ons mana yang tersedia untuk produk tertentu

**Keuntungan Sistem Global:**
- Admin tidak perlu buat add-ons berulang untuk setiap produk
- Satu add-ons bisa digunakan untuk banyak produk
- Mudah update harga/stok add-ons secara terpusat

**Hubungan dengan Tabel Lain:**
- Add-ons bisa dipasang ke banyak produk (addon_product)
- Add-ons punya banyak foto (addon_images)

---

### 5. 🔗 **ADDON_PRODUCT** - Penghubung Add-ons & Produk (Fitur Baru v1.3.0)

**Fungsi:** Menghubungkan add-ons mana saja yang tersedia untuk produk tertentu.

**Cara Kerja:**
Admin memilih add-ons mana yang bisa dipasang ke produk tertentu. Misalnya:

**Contoh:**
```
Produk: "Bunga Papan Congratulations"
└─ Add-ons yang tersedia:
   ✅ Greeting Card
   ✅ Coklat Ferrero
   ❌ Lilin Ulang Tahun (tidak cocok)

Produk: "Hand Bouquet Romantic"
└─ Add-ons yang tersedia:
   ✅ Greeting Card
   ✅ Boneka Teddy Bear
   ✅ Coklat Ferrero
   ❌ Lilin Ulang Tahun (tidak cocok)
```

**Kapan Digunakan:**
- Admin mengatur add-ons yang tersedia per produk
- Website menampilkan pilihan add-ons saat customer checkout
- Sistem mengecek add-ons apa saja yang bisa dipilih

**Hubungan dengan Tabel Lain:**
- Menghubungkan 1 add-on dengan 1 produk
- Satu produk bisa punya banyak add-ons
- Satu add-on bisa dipasang ke banyak produk

---

### 6. 📸 **ADDON_IMAGES** - Foto Add-ons (Fitur Baru v1.3.0)

**Fungsi:** Menyimpan galeri foto untuk setiap add-on.

**Data yang Disimpan:**
- Link/URL foto add-on
- Urutan tampilan foto
- Foto yang sudah diedit (crop/zoom/rotate)

**Fitur Image Editor:**
- Admin bisa crop foto
- Admin bisa zoom in/out
- Admin bisa rotate foto
- Hasil edit disimpan otomatis
- Maksimal 5 foto per add-on

**Kapan Digunakan:**
- Admin upload foto add-ons
- Admin edit foto dengan image editor
- Customer melihat foto add-ons saat pilih tambahan

**Hubungan dengan Tabel Lain:**
- Setiap foto punya 1 add-on (addons)

---

### 7. 📸 **PRODUCT_IMAGES** - Galeri Foto Produk

**Fungsi:** Menyimpan multiple foto untuk setiap produk bunga.

**Data yang Disimpan:**
- Link/URL foto produk
- Urutan tampilan (foto pertama = thumbnail)
- Foto utama/primary untuk katalog

**Cara Kerja:**
- Setiap produk minimal punya 1 foto utama
- Bisa upload maksimal 5 foto per produk
- Foto pertama (primary) muncul di katalog
- Foto lainnya muncul di detail produk

**Kapan Digunakan:**
- Admin upload foto produk
- Customer melihat galeri foto di detail produk
- Thumbnail produk di halaman katalog

**Hubungan dengan Tabel Lain:**
- Setiap foto punya 1 produk (products)

---

### 8. ⭐ **PRODUCT_REVIEWS** - Review & Rating Produk

**Fungsi:** Customer bisa memberikan rating (bintang 1-5) dan komentar untuk produk yang sudah dibeli.

**Data yang Disimpan:**
- Rating bintang: 1-5 ⭐
- Komentar/review text
- Info customer yang review
- Info produk yang direview
- Info pesanan (verified purchase)

**Aturan Review:**
- Customer **hanya bisa review** produk yang **sudah dibeli**
- Setiap customer hanya bisa review **1 kali per produk per pesanan**
- Customer bisa edit/hapus review miliknya
- Admin bisa hapus review tidak pantas

**Contoh Review:**
```
⭐⭐⭐⭐⭐ (5 bintang)
"Bunganya fresh dan pengiriman cepat! Sangat recommended!"
- Verified Purchase ✅
- Reviewed 2 hari yang lalu
```

**Kapan Digunakan:**
- Customer menulis review setelah order selesai
- Customer melihat review produk sebelum beli
- Menghitung average rating produk
- Filter produk berdasarkan rating

**Hubungan dengan Tabel Lain:**
- Setiap review punya 1 customer (users)
- Setiap review untuk 1 produk (products)
- Setiap review untuk 1 pesanan (orders)

---

### 9. ⚙️ **SETTINGS** - Pengaturan Website (Fitur Baru v1.3.0)

**Fungsi:** Menyimpan konfigurasi dan pengaturan website secara fleksibel.

**Data yang Disimpan:**
- Key (nama setting): contoh "home_banner_image"
- Value (nilai setting): contoh URL banner

**Pengaturan Saat Ini:**
```
✅ Banner Homepage
   - Admin bisa upload banner custom
   - Ukuran rekomendasi: 1920x600px
   - Ganti banner kapan saja

🔜 Pengaturan Masa Depan:
   - WhatsApp contact number
   - Alamat toko
   - Biaya ongkir
   - Batas gratis ongkir
   - Maintenance mode
```

**Keuntungan:**
- Admin bisa update setting tanpa edit code
- Fleksibel untuk berbagai jenis konfigurasi
- Mudah tambah setting baru

**Kapan Digunakan:**
- Admin update banner homepage
- Website load konfigurasi dinamis
- Setup kontak & informasi toko

**Hubungan dengan Tabel Lain:**
- Standalone (tidak berhubungan dengan tabel lain)

---

### 10. 🛒 **CART_ITEMS** - Keranjang Belanja

**Fungsi:** Menyimpan produk yang ditambahkan customer ke keranjang sebelum checkout.

**Data yang Disimpan:**
- Customer mana yang punya keranjang ini
- Produk apa yang ditambahkan
- Jumlah/quantity
- Harga saat ditambahkan (snapshot)

**Aturan Bisnis:**
- Quantity tidak boleh lebih dari stok
- Satu customer tidak bisa tambah produk yang sama 2x (auto-update quantity)
- Keranjang dikosongkan setelah checkout berhasil
- Jika produk dihapus admin, keranjang item ikut terhapus

**Contoh Data Keranjang:**
```
Customer: John Doe
├─ Bunga Papan Congratulations x2 - Rp 1.500.000
├─ Hand Bouquet Romantic x1 - Rp 350.000
└─ Total: Rp 1.850.000
```

**Kapan Digunakan:**
- Customer add to cart
- Customer update quantity
- Customer hapus item dari cart
- Customer checkout (cart dipindah ke order)

**Hubungan dengan Tabel Lain:**
- Setiap cart item punya 1 customer (users)
- Setiap cart item punya 1 produk (products)

---

### 11. 📦 **ORDERS** - Pesanan Customer

**Fungsi:** Menyimpan semua pesanan yang dilakukan customer.

**Data yang Disimpan:**
- Informasi customer (nama, email, telepon)
- Alamat pengiriman lengkap
- Tanggal & waktu pengiriman
- Pesan ucapan untuk penerima
- Total harga pesanan
- Status pesanan (pending → processed → shipped → completed)
- Bukti pembayaran (foto upload)

**Status Pesanan:**
```
1. 🟡 PENDING - Menunggu pembayaran
2. 🔵 PROCESSING - Sedang diproses
3. 🚚 SHIPPED - Dalam pengiriman
4. ✅ COMPLETED - Pesanan selesai
5. ❌ CANCELLED - Dibatalkan
```

**Data Alamat Pengiriman:**
- Nama penerima
- Alamat lengkap
- Kota
- Kode pos
- No. telepon penerima

**Kapan Digunakan:**
- Customer checkout dari keranjang
- Customer upload bukti transfer
- Admin update status pesanan
- Customer melihat histori pesanan
- Notifikasi WhatsApp otomatis

**Hubungan dengan Tabel Lain:**
- Setiap order punya 1 customer (users)
- Setiap order punya banyak item produk (order_items)
- Setiap order bisa punya banyak review (product_reviews)

---

### 12. 📋 **ORDER_ITEMS** - Detail Produk dalam Pesanan

**Fungsi:** Menyimpan detail produk-produk apa saja yang ada dalam 1 pesanan.

**Data yang Disimpan:**
- Order mana (link ke orders)
- Produk apa yang dibeli
- Jumlah/quantity
- Harga saat beli (snapshot)
- Add-ons yang dipilih (JSON format)
- Pesan custom untuk add-on (jika ada)

**Contoh Order Item:**
```
Order #12345
├─ Item 1:
│  ├─ Produk: Bunga Papan Congratulations
│  ├─ Quantity: 2
│  ├─ Harga: Rp 750.000/pcs
│  └─ Add-ons:
│     ├─ Greeting Card + Rp 5.000
│     │  └─ Pesan: "Selamat dan Sukses!"
│     └─ Coklat Ferrero + Rp 35.000
│
└─ Item 2:
   ├─ Produk: Hand Bouquet Romantic
   ├─ Quantity: 1
   ├─ Harga: Rp 350.000
   └─ No Add-ons

Total: Rp 1.890.000
```

**Mengapa Disimpan Terpisah?**
- Satu pesanan bisa punya banyak produk berbeda
- Masing-masing produk bisa punya quantity berbeda
- Masing-masing produk bisa punya add-ons berbeda
- Memudahkan tracking per item
- Customer bisa review per item

**Kapan Digunakan:**
- Saat customer checkout (cart items → order items)
- Menampilkan detail pesanan
- Cetak invoice/struk
- Customer review produk per item

**Hubungan dengan Tabel Lain:**
- Setiap order item punya 1 order (orders)
- Setiap order item punya 1 produk (products)
- Setiap order item bisa punya 1 review (product_reviews)

---

### 13-19. 🔧 **TABEL SISTEM LARAVEL**

Tabel-tabel teknis untuk mendukung framework Laravel:

| Tabel | Fungsi |
|-------|--------|
| **password_reset_tokens** | Token untuk reset password |
| **sessions** | Menyimpan session user yang sedang login |
| **jobs** | Antrian background jobs (email, notifikasi) |
| **job_batches** | Batch processing jobs |
| **failed_jobs** | Log jobs yang gagal |
| **cache** | Cache aplikasi untuk performa |
| **cache_locks** | Lock mechanism untuk cache |

**Catatan:** Tabel-tabel ini dikelola otomatis oleh Laravel framework dan tidak perlu dikelola manual.

---

## 🔄 Alur Data Utama

### 1️⃣ **Alur Registrasi Customer**
```
Customer Daftar
    ↓
Data disimpan ke tabel: USERS
    ↓
Kirim kode OTP ke email (6 digit)
    ↓
Customer input OTP
    ↓
Verifikasi berhasil → Email verified ✅
```

### 2️⃣ **Alur Belanja Customer**
```
Customer Browsing
    ↓
Lihat CATEGORIES → Lihat PRODUCTS
    ↓
Lihat detail produk + PRODUCT_IMAGES
    ↓
Baca PRODUCT_REVIEWS dari customer lain
    ↓
Add to Cart → Data masuk CART_ITEMS
    ↓
Pilih ADDONS (optional) dari daftar ADDON_PRODUCT
    ↓
Checkout
    ↓
Data pindah ke ORDERS + ORDER_ITEMS
    ↓
CART_ITEMS dikosongkan
```

### 3️⃣ **Alur Setelah Checkout**
```
Customer Upload Bukti Transfer
    ↓
Data bukti disimpan di ORDERS
    ↓
Notifikasi WhatsApp ke Admin (auto)
    ↓
Admin Update Status: PROCESSING
    ↓
Admin Update Status: SHIPPED
    ↓
Admin Update Status: COMPLETED ✅
    ↓
Customer Bisa Tulis Review → PRODUCT_REVIEWS
```

### 4️⃣ **Alur Admin Kelola Add-ons**
```
Admin Buat Add-on Baru
    ↓
Data disimpan ke ADDONS
    ↓
Upload Foto → ADDON_IMAGES
    ↓
Edit Foto (Crop/Zoom) → Update ADDON_IMAGES
    ↓
Pilih Produk untuk Add-on
    ↓
Data relasi disimpan ke ADDON_PRODUCT
    ↓
Add-on Muncul di Customer Checkout ✅
```

### 5️⃣ **Alur Admin Kelola Banner**
```
Admin Upload Banner Baru
    ↓
Crop/Resize Gambar (1920x600px)
    ↓
Data disimpan ke SETTINGS
    Key: "home_banner_image"
    Value: URL gambar
    ↓
Homepage Load Banner dari SETTINGS ✅
```

---

## 📊 Hubungan Antar Tabel (Relationship)

### **USERS (Customer)**
- → CART_ITEMS (Punya banyak item di keranjang)
- → ORDERS (Buat banyak pesanan)
- → PRODUCT_REVIEWS (Tulis banyak review)

### **CATEGORIES (Kategori)**
- → PRODUCTS (Punya banyak produk)

### **PRODUCTS (Produk)**
- → PRODUCT_IMAGES (Punya banyak foto)
- → PRODUCT_REVIEWS (Dapat banyak review)
- → CART_ITEMS (Bisa ditambah ke banyak keranjang)
- → ORDER_ITEMS (Bisa dipesan berkali-kali)
- ↔ ADDONS (Many-to-many via ADDON_PRODUCT)

### **ADDONS (Add-ons Global)**
- → ADDON_IMAGES (Punya banyak foto)
- ↔ PRODUCTS (Many-to-many via ADDON_PRODUCT)

### **ORDERS (Pesanan)**
- → ORDER_ITEMS (Punya banyak item produk)
- → PRODUCT_REVIEWS (Bisa dapat banyak review)

---

## 💡 Keunggulan Sistem Database v1.3.0

### ✅ **1. Global Add-ons System**
**Sebelumnya (v1.2.0):**
- Add-ons spesifik per produk
- Admin harus buat add-on "Greeting Card" berulang-ulang untuk setiap produk
- Susah update harga/stok add-on

**Sekarang (v1.3.0):**
- Add-ons global bisa digunakan untuk banyak produk
- Admin buat 1x, bisa dipasang ke banyak produk
- Update harga/stok add-on langsung berlaku ke semua produk

### ✅ **2. Flexible Settings System**
- Admin bisa update banner homepage tanpa edit code
- Mudah tambah konfigurasi baru di masa depan
- Fleksibel untuk berbagai jenis pengaturan

### ✅ **3. Image Editor Integration**
- Admin bisa crop/zoom/rotate foto
- Otomatis compress dan optimize gambar
- Hasil edit langsung disimpan ke database

### ✅ **4. Verified Purchase Reviews**
- Review hanya dari customer yang benar-benar beli
- Mengurangi fake reviews
- Meningkatkan trust customer lain

### ✅ **5. WhatsApp Integration**
- Notifikasi otomatis ke admin saat ada order baru
- Customer bisa langsung chat WhatsApp
- Template pesan terstandar

---

## 📈 Estimasi Data Production

| Tabel | Estimasi Jumlah Data |
|-------|----------------------|
| users | 100-500 customer |
| categories | 5-10 kategori |
| products | 50-200 produk |
| addons | 10-50 add-ons global |
| product_images | 200-1000 foto (avg 4-5/produk) |
| addon_images | 50-200 foto (avg 4-5/addon) |
| product_reviews | 100-1000 review |
| cart_items | 50-200 active carts |
| orders | 500-5000 orders |
| order_items | 1000-10000 items |
| settings | 5-20 configs |

---

## 🔒 Keamanan Data

### **Password Security**
- Password di-hash menggunakan bcrypt
- Tidak pernah disimpan dalam bentuk plain text
- Reset password menggunakan token expires

### **Email Verification**
- Kode OTP 6 digit
- Expires dalam 10 menit
- Satu kode hanya bisa digunakan 1x

### **Payment Proof**
- Bukti transfer disimpan secure
- Hanya admin yang bisa akses
- Auto-delete setelah 30 hari (optional)

### **User Data Protection**
- Alamat & telepon dienkripsi
- Privacy mode untuk customer
- GDPR compliant (bisa request delete data)

---

## 📝 Catatan Penting untuk Client

### ✅ **Yang Perlu Dipahami:**
1. **Database dirancang scalable** - Bisa handle ribuan transaksi
2. **Struktur normalized** - Menghindari duplikasi data
3. **Performa optimal** - Index pada kolom yang sering dicari
4. **Backup otomatis** - Data aman dari kehilangan
5. **Migration system** - Update database tanpa kehilangan data existing

### 🔄 **Update System:**
- Setiap perubahan struktur database tercatat di migration files
- Bisa rollback jika ada masalah
- Version control untuk tracking perubahan

### 📊 **Reporting Capability:**
- Laporan penjualan per produk
- Laporan penjualan per kategori
- Customer terfavorit
- Produk terlaris
- Revenue per bulan
- Average order value
- Customer satisfaction (dari reviews)

---

## ❓ FAQ untuk Client

**Q: Apakah data customer aman?**  
A: Ya, password di-hash, email harus verified, dan data pribadi dienkripsi.

**Q: Berapa maksimal foto per produk?**  
A: Maksimal 5 foto per produk dan 5 foto per add-on.

**Q: Apakah bisa backup database?**  
A: Ya, backup otomatis setiap hari dan bisa restore kapan saja.

**Q: Apakah bisa export data ke Excel?**  
A: Ya, semua data bisa di-export ke Excel/CSV untuk reporting.

**Q: Apakah database bisa di-scale up?**  
A: Ya, struktur dirancang untuk handle pertumbuhan data yang signifikan.

---

## 📞 Kontak Tim Development

Untuk pertanyaan teknis lebih lanjut mengenai database, silakan hubungi tim development.

---

**Dokumen ini dibuat untuk memudahkan client memahami struktur database Florist Shop tanpa perlu background teknis.**

*Last Updated: 1 Januari 2026*
