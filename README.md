# 🌸 Florist Shop Website

Website florist modern yang dirancang untuk memudahkan pelanggan dalam melihat katalog bunga, melakukan pemesanan dengan verifikasi email, serta mempermudah admin dalam mengelola pesanan dan produk secara efisien.

---

## 🚀 Tech Stack

| Bagian       | Teknologi                          |
|--------------|-------------------------------------|
| **Backend**  | Laravel 11 (PHP 8.3)               |
| **Frontend** | React.js + Inertia.js              |
| **Database** | MySQL                              |
| **Styling**  | Tailwind CSS                       |
| **Build**    | Vite                               |
| **Email**    | Gmail SMTP (Verification Code OTP) |

---

## ✨ User Features

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
   - Detail produk
   - Direct Order (tanpa keranjang)

4. **Pemesanan**
   - Order langsung dari detail produk
   - Form otomatis terisi data user (nama, email, phone, alamat)
   - Input jumlah & catatan khusus
   - Generate invoice otomatis

5. **Riwayat Pesanan**
   - Melihat semua pesanan
   - Detail pesanan
   - Status pesanan real-time
   - Invoice dengan tombol WhatsApp

---

## 📱 User Flow

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
User klik tombol "Pesan Sekarang"
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
  - Jumlah produk
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

### **5. Ganti Password di Profil**
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

## 🔐 Admin Features

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
   - Edit produk
   - Hapus produk
   - Set produk sebagai Featured
   - Aktifkan/Nonaktifkan produk
   - Search produk by nama, deskripsi, atau kategori

4. **Metode Pembayaran**
   - DANA
   - GOPAY
   - OVO
   - ShopeePay
   - SeaBank
   - BANK Transfer
   - QRIS

---

## 👨‍💼 Admin Flow

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

## 🗄️ Database Schema

### **Users Table**
```sql
- id
- name
- email (unique)
- password (hashed)
- phone
- address
- city
- postal_code
- is_admin (boolean, default: 0)
- email_verified_at
- verification_code (6 digit OTP)
- verification_code_expires_at
- remember_token
- timestamps
```

### **Categories Table**
```sql
- id
- name
- slug (unique, auto-generated)
- description (nullable)
- timestamps
```

### **Products Table**
```sql
- id
- category_id (foreign key)
- name
- slug (unique, auto-generated)
- description
- price (decimal)
- stock (integer)
- image (nullable)
- is_featured (boolean, default: 0)
- is_active (boolean, default: 1)
- timestamps
```

### **Orders Table**
```sql
- id
- user_id (foreign key)
- order_number (unique, auto: ORD-YYYYMMDD-XXX)
- shipping_name
- shipping_email
- shipping_phone
- shipping_address
- shipping_city
- shipping_postal_code
- total_amount (decimal)
- status (pending/processing/completed/cancelled)
- payment_status (unpaid/paid)
- payment_method (nullable: DANA/GOPAY/OVO/ShopeePay/SeaBank/BANK/QRIS)
- notes (nullable)
- timestamps
```

### **Order Items Table**
```sql
- id
- order_id (foreign key)
- product_id (foreign key)
- product_name (snapshot)
- product_price (snapshot, decimal)
- quantity
- subtotal (decimal)
- timestamps
```

---

## 📧 Email Verification System

### **Kode Verifikasi OTP**
- **Format:** 6 digit angka (contoh: 123456)
- **Expired:** 10 menit
- **Template:** Custom dengan emoji dan styling
- **Penggunaan:**
  1. Register user baru
  2. Forgot password
  3. Ganti password di profil

### **Email Template**
```
Subject: 🌸 Kode Verifikasi - Florist Shop

Halo [Nama]! 👋

Terima kasih telah bergabung dengan Florist Shop.
Untuk melanjutkan, silakan masukkan kode verifikasi berikut:

## 123456

⏰ Kode ini berlaku selama 10 menit.

Jika Anda tidak merasa mendaftar atau meminta kode ini, 
abaikan email ini.

---

🌺 Butuh bantuan? Hubungi kami di support@floristshop.com

Salam hangat,
Tim Florist Shop 🌹
```

---

## 🎨 Design Theme

### **Color Palette**
- **Primary:** Pink (#E91E63)
- **Secondary:** Purple (#9C27B0)
- **Background:** Gradient Pink-Purple-Blue
- **Success:** Green (#10B981)
- **Warning:** Yellow (#F59E0B)
- **Danger:** Red (#EF4444)

### **Typography**
- **Headings:** Font Bold, text-3xl
- **Body:** Font Regular, text-base
- **Labels:** Font Medium, text-sm

### **Components**
- **Buttons:** Gradient Pink-Purple, rounded-lg, with emoji icons
- **Cards:** White background, shadow-xl, rounded-2xl
- **Inputs:** Border gray-300, focus:ring-pink-500, rounded-lg
- **Badges:** Rounded-full, colored by status

---

## 🔧 Setup & Installation

### **Requirements**
- PHP 8.3+
- Composer
- Node.js & NPM
- MySQL
- Laragon (or XAMPP/WAMP)

### **Installation Steps**

1. **Clone Repository**
   ```bash
   git clone [repository-url]
   cd Florist
   ```

2. **Install Dependencies**
   ```bash
   composer install
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure .env**
   ```env
   APP_NAME="Florist Shop"
   APP_URL=http://127.0.0.1:8000

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=florist
   DB_USERNAME=root
   DB_PASSWORD=

   MAIL_MAILER=smtp
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=your-16-digit-app-password
   MAIL_ENCRYPTION=tls
   MAIL_FROM_ADDRESS="your-email@gmail.com"
   MAIL_FROM_NAME="${APP_NAME}"
   ```

5. **Database Migration & Seeding**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

6. **Clear Cache**
   ```bash
   php artisan config:clear
   php artisan cache:clear
   php artisan route:clear
   php artisan view:clear
   ```

7. **Build Frontend**
   ```bash
   npm run dev
   ```

8. **Start Server**
   ```bash
   php artisan serve
   ```

9. **Access Application**
   - Frontend: http://127.0.0.1:8000
   - Admin Panel: http://127.0.0.1:8000/admin

---

## 🔑 Default Credentials

### **Admin Account**
```
Email: test@example.com
Password: password
```

### **Create New Admin**
```bash
php artisan tinker
```
```php
$user = User::where('email', 'EMAIL')->first();
$user->is_admin = true;
$user->save();
```

---

## 📊 Status Reference

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

---

## 📝 Important Notes

### **Payment Flow**
- ⚠️ **Pembayaran dilakukan via WhatsApp**, bukan di website
- Website berfungsi sebagai katalog & sistem pemesanan
- Admin konfirmasi pembayaran manual via chat WhatsApp
- Setelah customer transfer → kirim bukti via WA → Admin accept order

### **WhatsApp Integration**
- Invoice page memiliki tombol "Hubungi via WhatsApp"
- Pesan otomatis ter-generate dengan detail pesanan
- Nomor WhatsApp admin bisa diubah di:
  - File: `app/Http/Controllers/OrderController.php`
  - Line: ~172
  - Variable: `$whatsappNumber`

### **Email Configuration**
- Gunakan Gmail App Password (bukan password Gmail biasa)
- Cara membuat App Password:
  1. Buka: https://myaccount.google.com/apppasswords
  2. Aktifkan 2-Step Verification
  3. Generate App Password untuk "Mail"
  4. Copy 16 digit password
  5. Paste ke `.env` (tanpa spasi)

### **Cache Management**
- Setiap edit `.env` → jalankan: `php artisan config:clear`
- Setelah update routes → jalankan: `php artisan route:clear`
- Setelah update views → jalankan: `php artisan view:clear`

---

## 🐛 Troubleshooting

### **Error: "The environment file is invalid"**
**Solusi:** Pastikan nilai dengan spasi menggunakan tanda kutip
```env
✅ APP_NAME="Florist Shop"
❌ APP_NAME=Florist Shop
```

### **Email tidak terkirim**
**Solusi:** 
1. Pastikan menggunakan App Password (bukan password Gmail)
2. Cek port 587 tidak diblok firewall
3. Pastikan `MAIL_PASSWORD` tidak ada spasi
4. Jalankan: `php artisan config:clear`

### **Verifikasi code expired**
**Solusi:** Klik "Kirim Ulang Kode" untuk generate kode baru

### **Admin tidak bisa akses panel**
**Solusi:** Pastikan `is_admin = 1` di database users table

---

## 📞 Contact & Support

- **Email:** support@floristshop.com
- **WhatsApp:** +62 812-3456-7890
- **Developer:** [Your Name]

---

## 📜 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

---

**Made with 💖 by Florist Shop Team** 🌸
