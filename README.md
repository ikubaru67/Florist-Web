# Florist Shop Website

Website florist modern yang dirancang untuk memudahkan pelanggan dalam melihat katalog bunga, melakukan pemesanan dengan verifikasi email, serta mempermudah admin dalam mengelola pesanan dan produk secara efisien.

 **Developer Guide**: Untuk panduan teknis, setup, dan pengembangan, lihat [DEV-README.md](DEV-README.md)

---

## User Features

1. **Authentication**
   - Register dengan verifikasi email (OTP 6 digit)
   - Login dengan email & password
   - Forgot Password dengan verifikasi kode
   - Logout

2. **Profil Management**
   - Edit profil (Nama, Email, Phone, Alamat, Kota, Kode Pos)
   - Ganti password dengan verifikasi OTP
   - Delete account

3. **Katalog & Shopping**
   - Melihat katalog produk bunga
   - Filter by kategori
   - Detail produk dengan multiple images
   - **Product Add-ons** dengan dropdown selection (v1.3.0 🆕)
   - Custom message untuk add-ons tertentu
   - Tambah produk + add-ons ke keranjang
   - Direct Order (beli langsung tanpa keranjang)

4. **Keranjang Belanja**
   - Melihat semua item di keranjang
   - Update jumlah produk
   - Hapus item dari keranjang
   - Checkout semua item sekaligus
   - Cart icon dengan badge count

5. **Pemesanan**
   - Order langsung dari detail produk (Direct Order)
   - Order dari keranjang (Cart Checkout)
   - Form otomatis terisi data user (nama, email, phone, alamat)
   - Input jumlah & catatan khusus
   - Generate invoice otomatis

6. **Riwayat Pesanan**
   - Melihat semua pesanan
   - Detail pesanan dengan add-ons
   - **Status "Menunggu Pembayaran"** untuk pending orders (v1.3.0 🆕)
   - **WhatsApp Button** dengan detailed message template (v1.3.0 🆕):
     - Order number dan tanggal
     - Customer info lengkap
     - List produk + add-ons dengan custom messages
     - Total pembayaran
   - Invoice lengkap untuk customer reference

---

## User Flow

### **1. Register & Verifikasi Email**
```
User membuka web florist
  ↓
User klik "Daftar"
  ↓
User mengisi form register (Nama, Email, Password, Phone, Alamat, Kota, Kode Pos)
  ↓
Sistem generate kode verifikasi 6 digit
  ↓
Kode dikirim ke email user (Gmail SMTP)
  ↓
User cek email → copy kode
  ↓
User input kode di halaman verifikasi
  ↓
Email terverifikasi ✅
  ↓
User login otomatis → redirect ke Home
```

### **2. Login Flow**
```
User buka halaman Login
  ↓
User input Email & Password
  ↓
Klik "Masuk"
  ↓
(Jika email belum diverifikasi)
  ↓
Redirect ke halaman verifikasi email
  ↓
(Jika email sudah diverifikasi)
  ↓
Login berhasil → redirect ke Home
```

### **3. Forgot Password Flow**
```
User klik "Lupa Password?"
  ↓
User input email terdaftar
  ↓
Sistem generate kode verifikasi 6 digit
  ↓
Kode dikirim ke email (berlaku 10 menit)
  ↓
User input kode verifikasi
  ↓
Kode valid → redirect ke form password baru
  ↓
User input password baru (2x)
  ↓
Password berhasil direset ✅
  ↓
Redirect ke Login
```

### **4. Order Flow (Direct Order - No Cart)**
```
User browse katalog di halaman Shop
  ↓
User klik salah satu produk
  ↓
User pilih jumlah produk (quantity selector)
  ↓
User klik tombol "Beli Sekarang"
  ↓
Form order otomatis terisi data user:
  - Nama
  - Email
  - Phone
  - Alamat Pengiriman
  - Kota
  - Kode Pos
  ↓
User input:
  - Jumlah produk (sudah pre-filled dari detail produk)
  - Catatan khusus (opsional)
  ↓
User klik "Checkout"
  ↓
Sistem generate:
  - Order Number (otomatis)
  - Total Amount
  - Status: Pending
  - Payment Status: Belum Lunas
  ↓
Redirect ke Invoice
  ↓
User klik "Hubungi via WhatsApp"
  ↓
WhatsApp terbuka dengan pesan pre-filled:
  - Order Number
  - Nama Produk
  - Total Harga
  - Link Invoice
  ↓
User chat dengan admin untuk konfirmasi & pembayaran
```

### **5. Shopping Cart Flow (Add to Cart)**
```
User browse katalog di halaman Shop
  ↓
User klik salah satu produk
  ↓
User pilih jumlah produk (quantity selector)
  ↓
User klik tombol "🛒 Tambah ke Keranjang"
  ↓
Produk masuk ke keranjang
  ↓
Cart badge di navbar menampilkan jumlah total item
  ↓
User bisa:
  a. Lanjut belanja (tambah produk lain)
  b. Klik icon keranjang untuk view cart
```

### **6. Cart Checkout Flow**
```
User klik icon keranjang di navbar
  ↓
Halaman Keranjang terbuka:
  - List semua produk
  - Quantity control (+/-)
  - Hapus item
  - Total harga
  ↓
User bisa:
  - Update jumlah produk
  - Hapus item yang tidak jadi dibeli
  - Kosongkan keranjang
  ↓
User klik "Lanjut ke Checkout"
  ↓
Form checkout otomatis terisi data user:
  - Nama
  - Email
  - Phone
  - Alamat Pengiriman
  - Kota
  - Kode Pos
  ↓
User input catatan (opsional)
  ↓
User klik "🛒 Buat Pesanan"
  ↓
Sistem generate:
  - Order Number (otomatis)
  - Total Amount (sum semua item)
  - Status: Pending
  - Payment Status: Belum Lunas
  ↓
Semua item di cart menjadi order items
  ↓
Stok produk dikurangi
  ↓
Cart dikosongkan
  ↓
Redirect ke Invoice
  ↓
**STATUS: "Menunggu Pembayaran"** (v1.3.0)
  ↓
User klik tombol **"Hubungi via WhatsApp"** 🆕
  ↓
WhatsApp terbuka dengan template message:
  - Order Number & Tanggal
  - Customer Info (nama, email, phone, alamat lengkap)
  - Detail semua produk dengan quantities
  - Add-ons per produk (jika ada) dengan custom messages
  - Total Pembayaran
  ↓
User chat dengan admin untuk konfirmasi & pembayaran
```

### **7. Ganti Password di Profil**
```
User login → buka Profil
  ↓
Scroll ke section "Update Password"
  ↓
User input "Password Saat Ini"
  ↓
User klik "Kirim Kode"
  ↓
Sistem generate kode OTP 6 digit
  ↓
Kode dikirim ke email user
  ↓
User input kode verifikasi
  ↓
User input password baru (2x)
  ↓
User klik "Simpan"
  ↓
Password berhasil diubah ✅
```

---

## Admin Features

1. **Dashboard**
   - Melihat list semua pesanan
   - Search pesanan by Order ID, Nama Customer, atau Email
   - Filter by status
   - Pagination

2. **Kelola Pesanan**
   - View detail pesanan lengkap
   - Accept pesanan (pilih metode pembayaran)
   - Reject pesanan (stok kembali)
   - Complete pesanan (tandai selesai)
   - Update status pesanan

3. **Kelola Produk**
   - Tambah produk baru
   - **Tambah Global Add-ons** untuk multiple products (v1.3.0 🆕)
   - **Dropdown selection Add-ons** saat create/edit product (v1.3.0 🆕)
   - **Image Editor** untuk add-on images (crop, zoom, rotate) (v1.3.0 🆕)
   - Edit produk
   - Hapus produk
   - Set produk sebagai Featured
   - Aktifkan/Nonaktifkan produk
   - Search produk by nama, deskripsi, atau kategori

4. **Website Settings** 🆕 (v1.3.0)
   - **Homepage Banner Management**:
     - Upload banner image via URL (Cloudinary/CDN)
     - Auto-resize to 1920x600px (checkbox option)
     - Real-time preview
     - 4 suggested banner images dari Unsplash
   - Access via button "Settings" di Admin Orders page

5. **Metode Pembayaran**
   - DANA
   - GOPAY
   - OVO
   - ShopeePay
   - SeaBank
   - BANK Transfer
   - QRIS

---

## Admin Flow

### **1. Admin Login Flow**
```
Admin buka halaman Login (http://127.0.0.1:8000/login)
  ↓
Admin input email & password
  (Akun admin: is_admin = 1)
  ↓
Klik "Masuk"
  ↓
Login berhasil
  ↓
Navbar menampilkan link "Admin Panel"
  ↓
Klik "Admin Panel"
  ↓
Redirect ke Admin Dashboard (list pesanan)
```

### **2. Admin Accept Order Flow**
```
Admin di Dashboard → List Pesanan
  ↓
Admin klik salah satu pesanan (Status: Pending)
  ↓
Halaman Detail Pesanan terbuka
  (Menampilkan: Order info, Customer info, Items, Total)
  ↓
Admin klik tombol "Terima Pesanan"
  ↓
Modal "Pilih Metode Pembayaran" muncul
  ↓
Admin pilih salah satu metode:
  - DANA
  - GOPAY
  - OVO
  - ShopeePay
  - SeaBank
  - BANK
  - QRIS
  ↓
Admin klik "Terima"
  ↓
Sistem update:
  - Status: Pending → Processing
  - Payment Status: Belum Lunas → Lunas
  - Payment Method: [Metode yang dipilih]
  ↓
Pesanan berhasil diterima ✅
```

### **3. Admin Reject Order Flow**
```
Admin di halaman Detail Pesanan
  ↓
Admin klik tombol "Tolak Pesanan"
  ↓
Konfirmasi: "Apakah yakin ingin menolak pesanan ini?"
  ↓
Admin klik "OK"
  ↓
Sistem update:
  - Status: Pending → Cancelled
  - Stok produk dikembalikan (+quantity)
  ↓
Pesanan ditolak ✅
```

### **4. Admin Complete Order Flow**
```
Admin di halaman Detail Pesanan (Status: Processing)
  ↓
Admin klik tombol "Selesaikan Pesanan"
  ↓
Sistem update:
  - Status: Processing → Completed
  ↓
Pesanan selesai ✅
```

### **5. Admin Kelola Produk - Tambah Produk**
```
Admin klik "Admin Panel" → "Kelola Produk"
  ↓
Admin klik tombol "+ Tambah Produk"
  ↓
Admin mengisi form:
  - Kategori (dropdown)
  - Nama Produk
  - Deskripsi
  - Harga (Rp)
  - Stok
  - URL Gambar (opsional)
  - ☑ Featured
  - ☑ Aktif
  ↓
Admin klik "Simpan Produk"
  ↓
Sistem auto-generate slug dari nama produk
  ↓
Produk berhasil ditambahkan ✅
  ↓
Redirect ke List Produk
```

### **6. Admin Kelola Produk - Edit Produk**
```
Admin di List Produk
  ↓
Admin klik "Edit" pada salah satu produk
  ↓
Form edit terbuka (data sudah terisi)
  ↓
Admin ubah data yang diperlukan
  ↓
Admin klik "Update Produk"
  ↓
Produk berhasil diupdate ✅
  ↓
Redirect ke List Produk
```

### **7. Admin Kelola Produk - Hapus Produk**
```
Admin di List Produk
  ↓
Admin klik "Hapus" pada salah satu produk
  ↓
Konfirmasi: "Apakah Anda yakin ingin menghapus produk [Nama]?"
  ↓
Admin klik "OK"
  ↓
Produk dihapus dari database ✅
```

### **8. Admin Search Pesanan**
```
Admin di Dashboard
  ↓
Admin input keyword di search bar:
  - Order Number (contoh: ORD-20250112-001)
  - Nama Customer
  - Email Customer
  ↓
Admin klik "🔍 Cari"
  ↓
Sistem filter pesanan berdasarkan keyword
  ↓
Hasil pencarian ditampilkan
  ↓
(Jika ingin clear filter)
  ↓
Admin klik tombol "Clear"
  ↓
Kembali ke semua pesanan
```

### **9. Admin Search Produk**
```
Admin di Kelola Produk
  ↓
Admin input keyword di search bar:
  - Nama Produk
  - Deskripsi
  - Nama Kategori
  ↓
Admin klik "🔍 Cari"
  ↓
Sistem filter produk berdasarkan keyword
  ↓
Hasil pencarian ditampilkan
```

---

## Status Reference

### **Order Status**
| Status       | Deskripsi                          | Badge Color |
|--------------|------------------------------------|-------------|
| `pending`    | Pesanan baru, menunggu konfirmasi  | Yellow      |
| `processing` | Pesanan diterima, sedang diproses  | Blue        |
| `completed`  | Pesanan selesai                    | Green       |
| `cancelled`  | Pesanan dibatalkan                 | Red         |

### **Payment Status**
| Status   | Deskripsi      | Badge Color |
|----------|----------------|-------------|
| `unpaid` | Belum Lunas    | Red         |
| `paid`   | Lunas          | Green       |

### **Payment Methods**
- DANA
- GOPAY
- OVO
- ShopeePay
- SeaBank
- BANK Transfer
- QRIS

---

## Important Notes

### **Payment Flow**
- **Pembayaran dilakukan via WhatsApp**, bukan di website
- Website berfungsi sebagai katalog & sistem pemesanan
- Admin konfirmasi pembayaran manual via chat WhatsApp
- Setelah customer transfer → kirim bukti via WA → Admin accept order

### **Email Verification**
- Setiap register user baru akan menerima kode OTP 6 digit via email
- Kode berlaku selama 10 menit
- Forgot password juga menggunakan sistem OTP yang sama
- Ganti password di profil memerlukan verifikasi OTP

---

## � Flowcharts

### 1. User Registration & Email Verification Flow

```mermaid
flowchart TD
    A[User Buka Halaman Register] --> B[Isi Form: Nama, Email, Password, Phone, Alamat]
    B --> C{Form Valid?}
    C -->|No| B
    C -->|Yes| D[Submit Form]
    D --> E[Sistem Generate OTP 6 Digit]
    E --> F[Kirim OTP ke Email via Gmail SMTP]
    F --> G[Redirect ke Halaman Verifikasi Email]
    G --> H[User Input Kode OTP]
    H --> I{OTP Valid & Belum Expired?}
    I -->|No| J[Error: Kode Salah/Expired]
    J --> K{Resend OTP?}
    K -->|Yes| E
    K -->|No| G
    I -->|Yes| L[Email Verified ✅]
    L --> M[Auto Login]
    M --> N[Redirect ke Home Page]
```

---

### 2. Shopping & Add to Cart Flow

```mermaid
flowchart TD
    A[User Browse Katalog] --> B[Klik Product]
    B --> C[Lihat Detail Produk]
    C --> D{Pilih Add-ons?}
    D -->|No| E[Set Quantity]
    D -->|Yes| F[Dropdown Select Add-on]
    F --> G[Set Quantity Add-on]
    G --> H{Custom Message Required?}
    H -->|Yes| I[Input Custom Message max 500 char]
    H -->|No| J{Add More Add-ons?}
    I --> J
    J -->|Yes| F
    J -->|No| E
    E --> K{Action?}
    K -->|Add to Cart| L[Tambah ke Cart]
    K -->|Buy Now| M[Add to Cart + Redirect ke Checkout]
    L --> N[Cart Badge Counter Update]
    N --> O[Tampil Success Notification]
    O --> P[User Bisa Lanjut Belanja atau Checkout]
```

---

### 3. Checkout & Order Flow dengan WhatsApp Integration

```mermaid
flowchart TD
    A[User di Cart atau Buy Now] --> B[Klik Checkout/Lanjut ke Checkout]
    B --> C[Form Checkout Auto-filled dari Profile]
    C --> D[Review Order Summary]
    D --> E[Product + Add-ons dengan Quantities]
    E --> F[Total Amount Calculation]
    F --> G[Klik 'Buat Pesanan']
    G --> H[Validasi Stock Produk & Add-ons]
    H --> I{Stock Available?}
    I -->|No| J[Error: Stock Tidak Cukup]
    J --> D
    I -->|Yes| K[Create Order]
    K --> L[Generate Order Number: ORD-YYYYMMDD-XXX]
    L --> M[Stock Reduction Produk & Add-ons]
    M --> N[Cart Dikosongkan]
    N --> O[Order Status: Pending]
    O --> P[Payment Status: Menunggu Pembayaran]
    P --> Q[Redirect ke Invoice Page]
    Q --> R[Tampil Invoice Lengkap]
    R --> S[Tampil WhatsApp Button]
    S --> T{User Klik WhatsApp Button?}
    T -->|Yes| U[Generate Template Message]
    U --> V[Message Include: Order No, Date, Customer Info, Products, Add-ons, Custom Messages, Total]
    V --> W[Redirect ke WhatsApp Admin]
    W --> X[User Chat dengan Admin untuk Konfirmasi & Pembayaran]
    T -->|No| Y[User Bisa Copy Order Number]
```

---

### 4. Admin Product & Add-ons Management Flow

```mermaid
flowchart TD
    A[Admin Login] --> B[Admin Dashboard]
    B --> C{Pilih Menu}
    C -->|Products| D[Product Management]
    C -->|Add-ons| E[Global Add-ons Management]
    C -->|Orders| F[Order Management]
    C -->|Settings| G[Website Settings]
    
    D --> D1[Create/Edit Product]
    D1 --> D2[Input: Nama, Kategori, Harga, Stok, Deskripsi]
    D2 --> D3[Upload Multiple Images via URL]
    D3 --> D4{Attach Add-ons?}
    D4 -->|Yes| D5[Dropdown Select dari Global Add-ons]
    D5 --> D6[Add Multiple Add-ons]
    D6 --> D7[Save Product]
    D4 -->|No| D7
    D7 --> D8[Product Tersimpan ✅]
    
    E --> E1[Create/Edit Global Add-on]
    E1 --> E2[Input: Nama, Deskripsi, Harga, Stok]
    E2 --> E3[Upload Images via URL max 5]
    E3 --> E4{Edit Image?}
    E4 -->|Yes| E5[Open Image Editor Modal]
    E5 --> E6[Crop/Zoom/Rotate Image]
    E6 --> E7[Auto Compress: 800px, 80% quality]
    E7 --> E8[Save as Base64 Data URL]
    E8 --> E9[Update Image]
    E4 -->|No| E10[Set Custom Message Flag]
    E9 --> E10
    E10 --> E11[Set Availability Status]
    E11 --> E12[Save Add-on]
    E12 --> E13[Add-on Tersimpan & Bisa Digunakan untuk Multiple Products ✅]
    
    F --> F1[View All Orders]
    F1 --> F2[Search/Filter by Status]
    F2 --> F3[Klik Order untuk Detail]
    F3 --> F4[View Order dengan Add-ons & Custom Messages]
    F4 --> F5[Update Order Status]
    F5 --> F6{Status Changed?}
    F6 -->|Completed| F7[Order Selesai]
    F6 -->|Processing| F8[Order Diproses]
    F6 -->|Cancelled| F9[Stock Dikembalikan]
    
    G --> G1[Homepage Banner Settings]
    G1 --> G2[Input Banner Image URL]
    G2 --> G3{Auto-resize?}
    G3 -->|Yes| G4[Canvas Resize to 1920x600px]
    G4 --> G5[90% JPEG Quality]
    G5 --> G6[Save Setting]
    G3 -->|No| G6
    G6 --> G7[Banner Updated di Homepage ✅]
```

---

### 5. Order Status Flow (Admin)

```mermaid
flowchart LR
    A[Pending<br/>Menunggu Pembayaran] --> B{Admin Action?}
    B -->|Customer Transfer & Kirim Bukti via WA| C[Processing<br/>Pesanan Diproses]
    B -->|Customer Tidak Bayar| D[Cancelled<br/>Pesanan Dibatalkan]
    C --> E{Admin Action?}
    E -->|Pesanan Dikirim/Selesai| F[Completed<br/>Pesanan Selesai ✅]
    E -->|Ada Masalah| D
    D --> G[Stock Dikembalikan]
    F --> H[Customer Bisa Review Produk ⭐]
```

---

### 6. Forgot Password Flow

```mermaid
flowchart TD
    A[User Klik 'Lupa Password?'] --> B[Input Email Terdaftar]
    B --> C{Email Valid & Terdaftar?}
    C -->|No| D[Error: Email Tidak Ditemukan]
    D --> B
    C -->|Yes| E[Generate OTP 6 Digit]
    E --> F[Kirim OTP ke Email]
    F --> G[OTP Expires dalam 10 Menit]
    G --> H[Redirect ke Verify Code Page]
    H --> I[User Input OTP]
    I --> J{OTP Valid & Belum Expired?}
    J -->|No| K[Error: Kode Salah/Expired]
    K --> L{Resend Code?}
    L -->|Yes| E
    L -->|No| H
    J -->|Yes| M[Redirect ke Reset Password Form]
    M --> N[User Input Password Baru 2x]
    N --> O{Password Match & Valid?}
    O -->|No| N
    O -->|Yes| P[Update Password]
    P --> Q[Password Berhasil Direset ✅]
    Q --> R[Redirect ke Login Page]
```

---

### 7. Complete Shopping Journey (End-to-End)

```mermaid
flowchart TD
    A[🏠 User Buka Website] --> B[Browse Katalog Produk]
    B --> C{User Action?}
    C -->|Search| D[Search by Nama/Kategori]
    C -->|Filter| E[Filter by Kategori]
    D --> F[View Products]
    E --> F
    C -->|Browse| F
    F --> G[Klik Product Detail]
    G --> H[Lihat Gambar, Harga, Deskripsi, Reviews]
    H --> I{Add Add-ons?}
    I -->|Yes| J[Select Add-ons dari Dropdown]
    J --> K[Set Quantity & Custom Message]
    I -->|No| L[Set Product Quantity]
    K --> L
    L --> M{Purchase Method?}
    M -->|Add to Cart| N[🛒 Tambah ke Cart]
    M -->|Buy Now| O[➡️ Direct to Checkout]
    N --> P[Lanjut Belanja atau Checkout]
    P --> Q{Continue Shopping?}
    Q -->|Yes| B
    Q -->|No| O
    O --> R[📋 Checkout Page]
    R --> S[Review Order + Total]
    S --> T[Submit Order]
    T --> U[📧 Order Created]
    U --> V[📄 Invoice Generated]
    V --> W[💬 WhatsApp Admin untuk Pembayaran]
    W --> X[💰 Transfer Pembayaran]
    X --> Y[📱 Kirim Bukti Transfer via WA]
    Y --> Z[👨‍💼 Admin Konfirmasi]
    Z --> AA[✅ Order Status: Processing → Completed]
    AA --> AB[⭐ Customer Bisa Review Produk]
```

---
