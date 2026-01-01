# 🌸 Florist E-Commerce - MVP & ERD Documentation

**Project Name:** Florist Shop  
**Version:** 1.3.0  
**Last Updated:** December 17, 2025  
**Tech Stack:** Laravel 11 + React 18 + Inertia.js + Tailwind CSS

---

## 📋 Table of Contents
1. [MVP (Minimum Viable Product)](#mvp)
2. [Target Users](#target-users)
3. [Core Features](#core-features)
4. [ERD (Entity Relationship Diagram)](#erd)
5. [Database Schema](#database-schema)
6. [Technical Specifications](#technical-specifications)

---

# MVP

## 🎯 Product Vision
Memungkinkan pelanggan untuk membeli produk bunga secara online dengan fitur keranjang belanja dan checkout yang mudah, serta panel admin untuk mengelola produk dan pesanan.

**Key Value Propositions:**
- ✅ Kemudahan berbelanja online 24/7
- ✅ Katalog produk lengkap dengan gambar dan deskripsi
- ✅ Sistem rating & review untuk membantu keputusan pembelian
- ✅ Checkout yang simple dan cepat
- ✅ Admin panel yang powerful untuk pengelolaan bisnis

---

## 👥 Target Users

### 1. Customer (Pembeli)

#### Karakteristik:
- **Individu yang ingin membeli bunga** untuk berbagai keperluan:
  - 💐 Hadiah untuk orang tersayang
  - 🎉 Dekorasi acara (pernikahan, ulang tahun, dll)
  - 🏢 Kebutuhan korporat
  - 💝 Ucapan belasungkawa/simpati

#### Kebutuhan:
- ✅ **Kemudahan dalam berbelanja online** dengan antarmuka yang user-friendly
- ✅ **Informasi lengkap produk** sebelum membeli (gambar, harga, deskripsi, rating)
- ✅ **Proses checkout yang cepat** tanpa ribet
- ✅ **Tracking pesanan** untuk monitor status
- ✅ **Review produk** untuk membantu keputusan

---

### 2. Admin (Pengelola Toko)

#### Karakteristik:
- **Pemilik toko bunga** yang ingin mengelola bisnis secara digital
- **Staff toko** yang handle operasional sehari-hari

#### Kebutuhan:
- ✅ **Mengelola bisnis secara digital** dengan sistem modern
- ✅ **Sistem manajemen produk dan pesanan** yang efisien
- ✅ **Tracking stok dan status pesanan** secara real-time
- ✅ **Dashboard analytics** untuk monitor penjualan
- ✅ **Update status pesanan** dengan mudah

---

## ✨ Core Features

### 🛍️ Customer Features

#### 1. Product Browsing
**Halaman Home:**
- ✅ Hero section dengan CTA (Call to Action)
- ✅ Featured products (produk unggulan)
- ✅ Latest products (produk terbaru)
- ✅ Kategori produk dengan icon

**Halaman Shop:**
- ✅ Grid layout produk dengan pagination
- ✅ Filter produk berdasarkan kategori
- ✅ Search/pencarian produk (nama, deskripsi, kategori)
- ✅ Sort by: Latest, Name A-Z, Price (Low-High, High-Low)
- ✅ Responsive design (1 col mobile → 4 cols desktop)

**Detail Produk:**
- ✅ **Multiple images gallery** dengan smooth transitions (v1.2.0)
- ✅ Thumbnail gallery dengan selection
- ✅ Lightbox image viewer dengan navigation arrows
- ✅ Gambar produk (support URL dari Cloudinary/CDN)
- ✅ Nama, kategori, harga, stok
- ✅ Deskripsi lengkap
- ✅ **Rating & reviews** dengan star rating (1-5)
- ✅ Average rating + total reviews
- ✅ **Product Add-ons selection** (v1.2.0 → v1.3.0 UPGRADED)
  - **GLOBAL Add-ons** (tidak per-produk, bisa digunakan untuk multiple products)
  - Dropdown selection dari add-ons yang tersedia
  - Independent quantity per add-on
  - Custom message field untuk add-ons tertentu (greeting cards)
  - Multiple images per add-on (max 5)
  - **Admin Image Editor**: Crop, zoom, rotate add-on images in-page
  - Total price breakdown (product + add-ons)
- ✅ Quantity selector
- ✅ Button: Add to Cart + Buy Now
- ✅ Produk terkait (related products)

---

#### 2. Product Reviews & Ratings ⭐ NEW!
**Features:**
- ✅ User bisa memberikan **rating (1-5 bintang)** setelah order completed
- ✅ User bisa menulis **komentar/review**
- ✅ **Verified purchase badge** untuk kredibilitas
- ✅ Display **average rating & total reviews** per produk
- ✅ Review list di halaman detail produk
- ✅ **Dual entry point** untuk review:
  - Dari halaman detail produk (jika sudah pernah beli)
  - Dari halaman "Pesanan Saya" per item

**Business Rules:**
- ✅ Hanya user yang sudah membeli (order completed) yang bisa review
- ✅ One review per product per order (prevent duplicate)
- ✅ Auto-detect order_item_id untuk tracking spesifik
- ✅ Rating wajib (1-5), comment optional

---

#### 3. **Product Add-ons** ➕ (v1.2.0 → v1.3.0 UPGRADED)
**MAJOR UPGRADE: Global Add-ons System**

**Customer Features:**
- ✅ User dapat memilih **add-ons** untuk produk (kartu ucapan, coklat, boneka, dll)
- ✅ **Dropdown selection** dari add-ons yang tersedia (bukan checkboxes)
- ✅ Button "Tambah Add-on" selalu terlihat (disabled jika semua add-on sudah dipilih)
- ✅ **Independent quantity** untuk setiap add-on (tidak terikat quantity produk utama)
- ✅ **Custom message field** untuk add-on tertentu (contoh: pesan di kartu ucapan)
- ✅ **Multiple images per add-on** dengan gallery (max 5)
- ✅ Lightbox viewer untuk preview add-on images
- ✅ Add-ons terintegrasi dengan cart dan checkout
- ✅ Total price otomatis termasuk harga add-ons
- ✅ Add-ons tersimpan di order history (snapshot)

**Admin Features:**
- ✅ **Global Add-ons Management** (1 add-on bisa digunakan untuk multiple products)
- ✅ CRUD global add-ons dengan section khusus di admin panel
- ✅ **Dropdown selection** untuk attach add-ons ke product (bukan create ulang)
- ✅ **URL-based images** (Cloudinary/CDN integration)
- ✅ **In-page Image Editor** untuk add-on images:
  - Crop dengan aspect ratio bebas
  - Zoom (1x-3x)
  - Rotate (0°-360°)
  - Auto-compress: max 800px, 80% quality
  - Save as base64 data URL (support TEXT column)
- ✅ Manage harga, stok, dan ketersediaan add-ons
- ✅ Enable/disable custom message per add-on
- ✅ Available/unavailable status per add-on

**Technical Improvements:**
- ✅ **Many-to-Many relationship**: `products ↔ addons` (via `addon_product` pivot)
- ✅ **Database Tables**:
  - `addons` - Global add-ons storage
  - `addon_product` - Pivot table for products ↔ addons
  - `addon_images` - Images dengan TEXT column (support base64)
- ✅ **Validation**: `exists:addons,id` untuk cart/checkout
- ✅ **Image Storage**: URL (primary) + base64 data URLs (cropped images)

**Business Rules:**
- ✅ Add-ons optional (customer bisa skip)
- ✅ Quantity add-on independent dari quantity produk
- ✅ Stock validation untuk setiap add-on
- ✅ Custom message max 500 karakter
- ✅ Add-ons data tersimpan sebagai snapshot di order
- ✅ Admin tidak perlu create ulang add-on untuk setiap produk

**Upgrade Path (Dec 2025):**
- **Before (v1.2.0)**: Product-specific add-ons (tabel `product_addons`)
- **After (v1.3.0)**: Global add-ons dengan many-to-many relationship
- **Migration**: `create_addons_table`, `create_addon_product_table`, `add_addon_id_to_addon_images_table`

---

#### 4. Shopping Cart
**Fitur Keranjang:**
- ✅ Tambah produk ke keranjang dengan quantity
- ✅ **Tambah produk dengan add-ons** ke keranjang (NEW: v1.2.0)
- ✅ Display add-ons di cart dengan quantities dan custom messages
- ✅ Update quantity di keranjang (+/-)
- ✅ Hapus item individual dari keranjang
- ✅ Clear all cart items sekaligus
- ✅ **Cart badge counter** di navbar (real-time update)
- ✅ Subtotal calculation per item (termasuk add-ons)
- ✅ Total cart calculation
- ✅ Empty cart state dengan CTA

**Validasi:**
- ✅ Stock validation (tidak bisa tambah melebihi stok)
- ✅ Unique constraint (1 user, 1 product = 1 cart item)
- ✅ Auto-update quantity jika produk sudah ada di cart

---

#### 5. Checkout & Orders
**Checkout Process:**
- ✅ **Buy Now button** - add to cart with add-ons lalu redirect ke checkout (NEW: v1.2.0)
- ✅ **Multi-item checkout** dari cart
- ✅ **Display add-ons di checkout summary** dengan custom messages
- ✅ Form checkout dengan validasi:
  - Nama lengkap (required)
  - Email (required, email format)
  - Phone (required, numeric)
  - Full address (required)
- ✅ **Auto stock reduction** untuk produk dan add-ons setelah order berhasil
- ✅ **Invoice page** dengan detail add-ons dan custom messages
- ✅ Order items detail dengan subtotal (termasuk add-ons)

**Order History (Pesanan Saya):**
- ✅ **5-tab navigation** untuk filter pesanan:
  - 📦 **Semua** - Semua pesanan
  - ⏳ **Diproses** - Status pending/processing
  - ✅ **Selesai** - Status completed
  - ❌ **Dibatalkan** - Status cancelled
  - ⭐ **Perlu Rating** - Items yang belum di-review
- ✅ Display order number, date, status
- ✅ List items per order dengan harga
- ✅ **Display add-ons per item** dengan quantities dan custom messages (NEW: v1.2.0)
- ✅ Total amount per order (termasuk add-ons)
- ✅ **Rating button** untuk completed orders
- ✅ **Display rating** yang sudah diberikan dengan bintang
- ✅ Status badge (color-coded)

---

#### 6. Authentication
**Registration:**
- ✅ Register dengan nama, email, nomor telepon, alamat lengkap, password, kode pos.
- ✅ Email verification dengan **kode OTP 6 digit**
- ✅ OTP expires setelah 15 menit
- ✅ Resend OTP functionality

**Login/Logout:**
- ✅ Login dengan email & password
- ✅ Remember me functionality
- ✅ Logout dengan session cleanup

**Password Recovery:**
- ✅ Forgot password dengan email
- ✅ Reset password dengan OTP verification
- ✅ New password dengan confirmation

**Profile Management:**
- ✅ Update profile information (nama, email, phone)
- ✅ Update address (alamat lengkap, kota, kode pos)
- ✅ Change password dengan old password validation
- ✅ Email verification status indicator

---

#### 7. Responsive Design
**Mobile-First Approach:**
- ✅ Breakpoints: 320px (mobile) → 480px (xs) → 640px (sm) → 1024px (lg) → 1280px (xl)
- ✅ **Hamburger menu** untuk mobile navigation
- ✅ **Product grid responsiveness:**
  - 320px: 1 column
  - 480px+: 2 columns
  - 1024px+: 4 columns
- ✅ Touch-friendly buttons dan controls
- ✅ Optimized forms untuk mobile input
- ✅ Responsive images dengan object-cover
- ✅ Mobile-optimized cart dan checkout flow

---

### 🔧 Admin Features

#### 1. Product Management
**CRUD Operations:**
- ✅ **Create** produk baru dengan form lengkap
- ✅ **Read/View** semua produk dengan pagination
- ✅ **Update** produk existing
- ✅ **Delete** produk dengan confirmation

**Product Fields:**
- ✅ Nama produk (required)
- ✅ Kategori (dropdown, required)
- ✅ Deskripsi (textarea, required)
- ✅ Harga (numeric, required)
- ✅ Stok (integer, required)
- ✅ **URL Gambar Utama** (paste dari Cloudinary/CDN)
  - 💡 Helper text dengan link ke Cloudinary
  - 👁️ Real-time preview image
- ✅ **Multiple Additional Images** (max 5) (v1.2.0)
- ✅ **Global Add-ons Selection** (v1.3.0 UPGRADED)
  - **Dropdown selection** dari global add-ons pool
  - Button "Tambah Add-on" (always visible, disabled when all added)
  - Tidak perlu create add-on baru untuk setiap produk
  - Remove add-on per product dengan confirmation
- ✅ Featured product flag (boolean)
- ✅ Active/inactive status (boolean)

**Additional Features:**
- ✅ Search/filter produk by name
- ✅ Pagination (10 items per page)
- ✅ **Stock status indicator:**
  - 🟢 Available (stock > 10)
  - 🟡 Low Stock (stock ≤ 10)
  - 🔴 Out of Stock (stock = 0)
- ✅ Quick actions: View, Edit, Delete

---

#### 2. Order Management
**View & Filter:**
- ✅ **View semua orders** dengan pagination
- ✅ **Search orders** by:
  - Order number
  - Customer name
  - Customer email
- ✅ **Filter by order status:**
  - Pending (⏳)
  - Processing (📦)
  - Completed (✅)
  - Cancelled (❌)

**Order Details:**
- ✅ Order number (unique)
- ✅ Customer information (name, email, phone, address)
- ✅ Order items dengan quantity dan harga
- ✅ **Add-ons per item** dengan quantities dan custom messages (v1.2.0)
- ✅ Total amount (termasuk add-ons)
- ✅ Order date & time
- ✅ Payment status
- ✅ **Order status display:** "Menunggu Pembayaran" untuk pending orders (v1.3.0)
- ✅ Current status

**Order Actions:**
- ✅ **Update order status** via dropdown
- ✅ Status options: pending → processing → completed / cancelled
- ✅ View detailed order information
- ✅ Print/export invoice (future enhancement)

**Customer Order View (Invoice):**
- ✅ **WhatsApp Integration** (v1.3.0 NEW):
  - WhatsApp button untuk pending orders
  - Template message dengan:
    - Order number dan tanggal
    - Customer info lengkap (nama, email, phone, alamat)
    - List produk dengan add-ons dan quantities
    - Custom messages dari add-ons
    - Total pembayaran
  - Auto-redirect ke WhatsApp admin
- ✅ Invoice detail lengkap untuk customer reference

---

#### 3. **Global Add-ons Management** 🆕 (v1.3.0)
**Independent Add-ons Section** di Admin Panel

**CRUD Operations:**
- ✅ **Create** global add-on baru
- ✅ **Read/View** semua add-ons dengan list view
- ✅ **Update** add-on existing
- ✅ **Delete** add-on dengan validation

**Add-on Fields:**
- ✅ Nama add-on (required) - "Greeting Card", "Coklat", dll
- ✅ Deskripsi (textarea, required)
- ✅ Harga (numeric, required)
- ✅ Stok (integer, required)
- ✅ **URL-based Images** (max 5):
  - Paste URL dari Cloudinary/CDN
  - Real-time preview untuk setiap image
  - **In-page Image Editor:**
    - Crop dengan aspect ratio bebas
    - Zoom control (1x-3x)
    - Rotate control (0°-360°)
    - Auto-compress: max 800px, 80% quality
    - Save edited image as base64 data URL
  - Delete individual images
- ✅ **Has Custom Message** (boolean)
  - Enable field untuk customer input pesan (max 500 char)
  - Example: Greeting card membutuhkan pesan ucapan
- ✅ **Available/Unavailable** status (boolean)
- ✅ Sort order (auto-set, future enhancement)

**List View Features:**
- ✅ Table dengan columns: Name, Price, Stock, Status, Actions
- ✅ Quick view first image (thumbnail)
- ✅ **Stock status indicator**:
  - 🟢 Available (stock > 10)
  - 🟡 Low Stock (stock ≤ 10)
  - 🔴 Out of Stock (stock = 0)
- ✅ Availability badge (Available/Unavailable)
- ✅ Quick actions: Edit, Delete

**Business Rules:**
- ✅ Global add-ons dapat digunakan untuk multiple products
- ✅ Delete add-on akan remove dari semua products (cascade)
- ✅ Stock reduction saat customer checkout
- ✅ Admin bisa temporarily disable add-on (is_available = false)

---

#### 4. **Website Settings Management** 🆕 (v1.3.0)
**Dynamic Configuration System**

**Homepage Banner Settings:**
- ✅ **URL-based banner image** (recommended: 1920x600px)
- ✅ **Auto-resize checkbox:**
  - When checked: Auto resize image to 1920x600px
  - Canvas-based client-side resize
  - 90% JPEG quality
  - Processing indicator: "Resize gambar..." → "Menyimpan..."
- ✅ **Real-time preview** sebelum save
- ✅ **4 suggested banner images** dari Unsplash untuk quick selection
- ✅ Fallback banner jika setting kosong

**Settings Data:**
- ✅ **Key-value store** di database (table: `settings`)
- ✅ Current setting: `home_banner_image`
- ✅ Model helper methods:
  - `Setting::get('key', 'default')`
  - `Setting::set('key', 'value')`

**Future Settings (Planned):**
- ⚠️ Contact information (WhatsApp, email, address)
- ⚠️ Payment methods configuration
- ⚠️ Shipping cost calculator
- ⚠️ Site maintenance mode
- ⚠️ SEO metadata

**Access:**
- ✅ Settings button di Admin Orders page (top navigation)
- ✅ Direct route: `/admin/settings`

---

#### 5. Category Management
**CRUD Categories:**
- ✅ **Create** kategori baru
- ✅ **Read/View** semua kategori
- ✅ **Update** kategori existing
- ✅ **Delete** kategori (with validation)

**Category Fields:**
- ✅ Nama kategori (unique, required)
- ✅ Slug (auto-generated from name)
- ✅ Deskripsi (optional)
- ✅ Active/inactive status

**Features:**
- ✅ **Assign kategori ke produk** via product form
- ✅ Product count per category
- ✅ Cannot delete category if has products

---

#### 4. Dashboard (Admin Home)
**Statistics & Metrics:**
- ✅ Total products
- ✅ Total orders (with status breakdown)
- ✅ Total customers
- ✅ Revenue summary
- ✅ Recent orders table
- ✅ Low stock alerts
- ✅ Quick actions/shortcuts

---

## 🏁 MVP Status: **PRODUCTION READY** ✅

**Current Version:** 1.2.0  
**Release Date:** December 2025  
**Status:** Enhanced with Product Add-ons System

### ✅ Completed Features:
- ✅ Complete e-commerce flow (browse → cart → checkout → invoice)
- ✅ Full admin panel (products, orders, categories management)
- ✅ Responsive design untuk semua devices (320px - 1920px+)
- ✅ Authentication & authorization (email verification, password recovery)
- ✅ Email notifications (OTP, password reset)
- ✅ Stock management dengan auto reduction (products & add-ons)
- ✅ Search & filter functionality
- ✅ Shopping cart dengan CRUD operations
- ✅ Buy Now flow (add to cart → checkout)
- ✅ **Product ratings & reviews system** (v1.1.0)
- ✅ **Order history dengan 5-tab navigation** (v1.1.1)
- ✅ **Mobile responsiveness optimization** (v1.1.1)
- ✅ **Product Add-ons System** (v1.2.0)
  - Multiple add-ons per product
  - Independent quantity management
  - Custom message field for specific add-ons
  - Multiple images per add-on
  - Full integration with cart, checkout, and orders
- ✅ **Multiple product images gallery** (v1.2.0)
- ✅ **Cloudinary integration** (paste URL method)

### ⚠️ Known Limitations:
- Payment integration belum ada (manual confirmation)
- Admin panel belum fully responsive (desktop-first)
- Shipping cost belum terintegrasi
- No real-time notifications (harus refresh page)

---

# ERD

## 🗄️ Entity Relationship Diagram

### Overview
**Database Name:** `florist`  
**Engine:** InnoDB  
**Charset:** utf8mb4_unicode_ci  
**Total Tables:** 19 tables  
**Laravel Version:** 11.x

---

## 📊 Core Tables

### 1. **users** (Customer & Admin Accounts)
Menyimpan data user (customer dan admin)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary Key |
| `name` | VARCHAR(255) | NOT NULL | Nama lengkap user |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Email (untuk login) |
| `password` | VARCHAR(255) | NOT NULL | Password (hashed) |
| `phone` | VARCHAR(20) | NULLABLE | Nomor telepon |
| `address` | TEXT | NULLABLE | Alamat lengkap |
| `city` | VARCHAR(100) | NULLABLE | Kota |
| `postal_code` | VARCHAR(10) | NULLABLE | Kode pos |
| `is_admin` | BOOLEAN | DEFAULT FALSE | Flag admin |
| `email_verified_at` | TIMESTAMP | NULLABLE | Waktu email verified |
| `verification_code` | VARCHAR(6) | NULLABLE | Kode OTP (6 digit) |
| `verification_code_expires_at` | TIMESTAMP | NULLABLE | Expiry OTP (15 menit) |
| `remember_token` | VARCHAR(100) | NULLABLE | Remember me token |
| `created_at` | TIMESTAMP | NOT NULL | Waktu registrasi |
| `updated_at` | TIMESTAMP | NOT NULL | Waktu update terakhir |

**Relationships:**
- Has Many `cart_items` (1:N)
- Has Many `orders` (1:N)
- Has Many `product_reviews` (1:N)

**Indexes:**
- PRIMARY KEY (`id`)
- UNIQUE KEY (`email`)

---

### 2. **categories** (Product Categories)
Kategori produk (misalnya: Bunga Mawar, Bunga Tulip, dll)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary Key |
| `name` | VARCHAR(255) | NOT NULL | Nama kategori |
| `slug` | VARCHAR(255) | UNIQUE, NOT NULL | URL-friendly name |
| `description` | TEXT | NULLABLE | Deskripsi kategori |
| `image` | VARCHAR(255) | NULLABLE | URL gambar kategori |
| `is_active` | BOOLEAN | DEFAULT TRUE | Status aktif/nonaktif |
| `created_at` | TIMESTAMP | NOT NULL | Waktu dibuat |
| `updated_at` | TIMESTAMP | NOT NULL | Waktu update |

**Relationships:**
- Has Many `products` (1:N)

**Indexes:**
- PRIMARY KEY (`id`)
- UNIQUE KEY (`slug`)

---

### 3. **products** (Product Catalog)
Katalog produk bunga

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary Key |
| `category_id` | BIGINT UNSIGNED | FK → categories.id, NOT NULL | Reference kategori |
| `name` | VARCHAR(255) | NOT NULL | Nama produk |
| `slug` | VARCHAR(255) | UNIQUE, NOT NULL | URL-friendly name |
| `description` | TEXT | NOT NULL | Deskripsi produk |
| `price` | DECIMAL(10,2) | NOT NULL | Harga (Rupiah) |
| `stock` | INTEGER | DEFAULT 0 | Jumlah stok |
| `image` | VARCHAR(255) | NULLABLE | URL gambar utama |
| `is_featured` | BOOLEAN | DEFAULT FALSE | Produk unggulan |
| `is_active` | BOOLEAN | DEFAULT TRUE | Status aktif |
| `created_at` | TIMESTAMP | NOT NULL | Waktu dibuat |
| `updated_at` | TIMESTAMP | NOT NULL | Waktu update |

**Relationships:**
- Belongs To `categories` (N:1)
- Has Many `cart_items` (1:N)
- Has Many `order_items` (1:N)
- Has Many `product_reviews` (1:N)

**Virtual Attributes (Accessors):**
- `reviews_avg_rating` - Average rating dari reviews
- `reviews_count` - Total reviews count

**Indexes:**
- PRIMARY KEY (`id`)
- UNIQUE KEY (`slug`)
- INDEX (`category_id`)
- INDEX (`is_featured`)
- INDEX (`is_active`)

---

### 4. **product_images** (Product Image Gallery) 🖼️ (v1.2.0)
Multiple images untuk satu produk (gallery)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary Key |
| `product_id` | BIGINT UNSIGNED | FK → products.id, NOT NULL | Product reference |
| `image_path` | VARCHAR(255) | NOT NULL | URL gambar (Cloudinary) |
| `sort_order` | INTEGER | DEFAULT 0 | Urutan tampilan |
| `is_primary` | BOOLEAN | DEFAULT FALSE | Gambar utama |
| `created_at` | TIMESTAMP | NOT NULL | Waktu dibuat |
| `updated_at` | TIMESTAMP | NOT NULL | Waktu update |

**Relationships:**
- Belongs To `products` (N:1)

**Foreign Keys:**
- `product_id` → `products(id)` ON DELETE CASCADE

**Indexes:**
- PRIMARY KEY (`id`)
- INDEX (`product_id`)
- INDEX (`sort_order`)

---

### 5. **addons** (Global Add-ons) 🆕 (v1.3.0 UPGRADED)
**Global add-ons** yang dapat digunakan untuk berbagai produk (bukan per-product)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary Key |
| `name` | VARCHAR(255) | NOT NULL | Nama add-on (Greeting Card, Coklat, dll) |
| `description` | TEXT | NULLABLE | Deskripsi add-on |
| `price` | DECIMAL(10,2) | NOT NULL | Harga add-on (Rupiah) |
| `stock` | INTEGER | DEFAULT 0 | Stok add-on |
| `is_available` | BOOLEAN | DEFAULT TRUE | Status ketersediaan |
| `has_custom_message` | BOOLEAN | DEFAULT FALSE | Apakah bisa input pesan custom |
| `sort_order` | INTEGER | DEFAULT 0 | Urutan tampilan |
| `created_at` | TIMESTAMP | NOT NULL | Waktu dibuat |
| `updated_at` | TIMESTAMP | NOT NULL | Waktu update |

**Relationships:**
- Belongs To Many `products` (M:N via `addon_product`)
- Has Many `addon_images` (1:N)

**Indexes:**
- PRIMARY KEY (`id`)
- INDEX (`is_available`)

**Upgrade Note:**
- **Before (v1.2.0)**: Table `product_addons` (product-specific, redundant data)
- **After (v1.3.0)**: Table `addons` (global, many-to-many dengan products)
- **Benefit**: Admin create add-on sekali, attach ke multiple products

---

### 6. **addon_product** (Addon-Product Pivot) 🆕 (v1.3.0)
Pivot table untuk many-to-many relationship antara addons dan products

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary Key |
| `addon_id` | BIGINT UNSIGNED | FK → addons.id, NOT NULL | Addon reference |
| `product_id` | BIGINT UNSIGNED | FK → products.id, NOT NULL | Product reference |
| `created_at` | TIMESTAMP | NOT NULL | Waktu attached |
| `updated_at` | TIMESTAMP | NOT NULL | Waktu update |

**Relationships:**
- Belongs To `addons` (N:1)
- Belongs To `products` (N:1)

**Foreign Keys:**
- `addon_id` → `addons(id)` ON DELETE CASCADE
- `product_id` → `products(id)` ON DELETE CASCADE

**Unique Constraints:**
- UNIQUE KEY (`addon_id`, `product_id`)

**Indexes:**
- PRIMARY KEY (`id`)
- UNIQUE KEY (`addon_id`, `product_id`)

---

### 7. **addon_images** (Addon Image Gallery) 🆕 (v1.3.0)
Images untuk global add-ons (support URL dan base64 data URLs)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary Key |
| `addon_id` | BIGINT UNSIGNED | FK → addons.id, NULLABLE | Addon reference (global addons) |
| `product_addon_id` | BIGINT UNSIGNED | NULLABLE | Legacy reference (deprecated) |
| `image_path` | TEXT | NOT NULL | URL or base64 data URL |
| `sort_order` | INTEGER | DEFAULT 0 | Urutan tampilan |
| `created_at` | TIMESTAMP | NOT NULL | Waktu dibuat |
| `updated_at` | TIMESTAMP | NOT NULL | Waktu update |

**Relationships:**
- Belongs To `addons` (N:1)

**Foreign Keys:**
- `addon_id` → `addons(id)` ON DELETE CASCADE

**Indexes:**
- PRIMARY KEY (`id`)
- INDEX (`addon_id`, `sort_order`)

**Technical Note:**
- `image_path` uses **TEXT** (not VARCHAR) untuk support base64 data URLs from cropped images
- Migration: `change_image_path_to_text_in_addon_images_table` (Dec 17, 2025)
- Max 5 images per add-on

---

### 8. **product_addons** (Legacy - DEPRECATED) ⚠️
**Note:** Tabel ini masih ada di database untuk backward compatibility, tetapi **tidak digunakan** di v1.3.0.
Diganti dengan sistem global add-ons (`addons` + `addon_product` + `addon_images`).

Untuk cleanup di production:
```sql
-- Drop old product-specific addon tables (jika sudah migrate data)
DROP TABLE IF EXISTS product_addons;
```

---

### 9. **settings** (Website Settings) 🆕 (v1.3.0)
Key-value store untuk website configurations

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary Key |
| `key` | VARCHAR(255) | UNIQUE, NOT NULL | Setting key |
| `value` | TEXT | NULLABLE | Setting value (URL, JSON, text) |
| `created_at` | TIMESTAMP | NOT NULL | Waktu dibuat |
| `updated_at` | TIMESTAMP | NOT NULL | Waktu update |

**Indexes:**
- PRIMARY KEY (`id`)
- UNIQUE KEY (`key`)

**Current Settings:**
- `home_banner_image` - Homepage banner URL (default: Unsplash image)

**Model Helpers:**
```php
// Get setting
$banner = Setting::get('home_banner_image', 'default-url.jpg');

// Set setting
Setting::set('home_banner_image', 'new-banner-url.jpg');
```

---

### 10. **product_reviews** (Product Reviews & Ratings) ⭐ (v1.1.0)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary Key |
| `product_id` | BIGINT UNSIGNED | FK → products.id, NOT NULL | Product reference |
| `name` | VARCHAR(255) | NOT NULL | Nama add-on |
| `description` | TEXT | NULLABLE | Deskripsi add-on |
| `price` | DECIMAL(10,2) | NOT NULL | Harga add-on |
| `stock` | INTEGER | DEFAULT 0 | Stok add-on |
| `is_available` | BOOLEAN | DEFAULT TRUE | Status ketersediaan |
| `has_custom_message` | BOOLEAN | DEFAULT FALSE | Apakah butuh custom message |
| `sort_order` | INTEGER | DEFAULT 0 | Urutan tampilan |
| `created_at` | TIMESTAMP | NOT NULL | Waktu dibuat |
| `updated_at` | TIMESTAMP | NOT NULL | Waktu update |

**Relationships:**
- Belongs To `products` (N:1)
- Has Many `addon_images` (1:N)

**Foreign Keys:**
- `product_id` → `products(id)` ON DELETE CASCADE

**Indexes:**
- PRIMARY KEY (`id`)
- INDEX (`product_id`)
- INDEX (`is_available`)
- INDEX (`sort_order`)

**Business Rules:**
- `has_custom_message` = TRUE untuk add-on seperti kartu ucapan yang butuh pesan dari customer
- Stock independent dari product stock
- Price independent dari product price

---

### 6. **addon_images** (Add-on Image Gallery) 🖼️ NEW! (v1.2.0)
Multiple images untuk satu add-on

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary Key |
| `product_addon_id` | BIGINT UNSIGNED | FK → product_addons.id, NOT NULL | Add-on reference |
| `image_path` | VARCHAR(255) | NOT NULL | URL gambar (Cloudinary) |
| `sort_order` | INTEGER | DEFAULT 0 | Urutan tampilan |
| `created_at` | TIMESTAMP | NOT NULL | Waktu dibuat |
| `updated_at` | TIMESTAMP | NOT NULL | Waktu update |

**Relationships:**
- Belongs To `product_addons` (N:1)

**Foreign Keys:**
- `product_addon_id` → `product_addons(id)` ON DELETE CASCADE

**Indexes:**
- PRIMARY KEY (`id`)
- INDEX (`product_addon_id`)
- INDEX (`sort_order`)

---

### 7. **product_reviews** (Product Ratings & Reviews) ⭐ NEW! (v1.1.0)
Review dan rating produk dari customer

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary Key |
| `product_id` | BIGINT UNSIGNED | FK → products.id, NOT NULL | Product reference |
| `user_id` | BIGINT UNSIGNED | FK → users.id, NOT NULL | User reference |
| `order_id` | BIGINT UNSIGNED | FK → orders.id, NOT NULL | Order reference (verified purchase) |
| `order_item_id` | BIGINT UNSIGNED | FK → order_items.id, NULLABLE | Specific item reference (auto-detected) |
| `rating` | TINYINT UNSIGNED | NOT NULL, 1-5 | Rating bintang (1-5) |
| `comment` | TEXT | NULLABLE | Komentar/review text |
| `is_verified_purchase` | BOOLEAN | DEFAULT TRUE | Verified purchase badge |
| `created_at` | TIMESTAMP | NOT NULL | Waktu review dibuat |
| `updated_at` | TIMESTAMP | NOT NULL | Waktu review diupdate |

**Relationships:**
- Belongs To `products` (N:1)
- Belongs To `users` (N:1)
- Belongs To `orders` (N:1)
- Belongs To `order_items` (N:1)

**Foreign Keys:**
- `product_id` → `products(id)` ON DELETE CASCADE
- `user_id` → `users(id)` ON DELETE CASCADE
- `order_id` → `orders(id)` ON DELETE CASCADE
- `order_item_id` → `order_items(id)` ON DELETE CASCADE

**Unique Constraints:**
- UNIQUE KEY (`product_id`, `user_id`, `order_id`, `order_item_id`)
  - Satu user hanya bisa review 1x per item per order

**Business Rules:**
- Hanya user yang sudah membeli (order completed) yang bisa review
- Rating wajib 1-5 (integer)
- Comment optional (max 1000 chars)
- Auto-detect order_item_id jika tidak dikirim dari frontend

---

### 8. **cart_items** (Shopping Cart)
Keranjang belanja user (temporary storage sebelum checkout)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary Key |
| `user_id` | BIGINT UNSIGNED | FK → users.id, NOT NULL | User reference |
| `product_id` | BIGINT UNSIGNED | FK → products.id, NOT NULL | Product reference |
| `quantity` | INTEGER | DEFAULT 1 | Jumlah item |
| `price` | DECIMAL(10,2) | NOT NULL | Harga produk saat add to cart |
| `addon_ids` | JSON | NULLABLE | Selected add-ons dengan quantities (NEW: v1.2.0) |
| `created_at` | TIMESTAMP | NOT NULL | Waktu ditambahkan |
| `updated_at` | TIMESTAMP | NOT NULL | Waktu update |

**addon_ids JSON Structure:**
```json
[
  {
    "addon_id": 1,
    "quantity": 2,
    "custom_message": "Happy Birthday!"
  },
  {
    "addon_id": 3,
    "quantity": 1,
    "custom_message": null
  }
]
```

**Relationships:**
- Belongs To `users` (N:1)
- Belongs To `products` (N:1)

**Foreign Keys:**
- `user_id` → `users(id)` ON DELETE CASCADE
- `product_id` → `products(id)` ON DELETE CASCADE

**Unique Constraints:**
- UNIQUE KEY (`user_id`, `product_id`)
  - User tidak bisa tambah produk sama 2x di cart

---

### 9. **orders** (Customer Orders)
Pesanan customer (setelah checkout)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary Key |
| `user_id` | BIGINT UNSIGNED | FK → users.id, NOT NULL | Customer reference |
| `order_number` | VARCHAR(255) | UNIQUE, NOT NULL | Nomor pesanan (unique) |
| `customer_name` | VARCHAR(255) | NOT NULL | Nama customer |
| `customer_email` | VARCHAR(255) | NOT NULL | Email customer |
| `customer_phone` | VARCHAR(20) | NOT NULL | Phone customer |
| `customer_address` | TEXT | NOT NULL | Alamat lengkap |
| `total_amount` | DECIMAL(10,2) | NOT NULL | Total pembayaran |
| `status` | ENUM | DEFAULT 'pending' | Status pesanan |
| `payment_status` | ENUM | DEFAULT 'unpaid' | Status pembayaran |
| `created_at` | TIMESTAMP | NOT NULL | Waktu order dibuat |
| `updated_at` | TIMESTAMP | NOT NULL | Waktu update status |

**Status ENUM Values:**
- `pending` - Pesanan baru
- `processing` - Sedang diproses
- `completed` - Selesai
- `cancelled` - Dibatalkan

**Payment Status ENUM Values:**
- `unpaid` - Belum bayar
- `paid` - Sudah bayar

**Relationships:**
- Belongs To `users` (N:1)
- Has Many `order_items` (1:N)
- Has Many `product_reviews` (1:N)

**Foreign Keys:**
- `user_id` → `users(id)` ON DELETE CASCADE

**Indexes:**
- PRIMARY KEY (`id`)
- UNIQUE KEY (`order_number`)
- INDEX (`status`)
- INDEX (`payment_status`)

---

### 10. **order_items** (Order Item Details)
Detail item dalam order (snapshot produk saat checkout)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT UNSIGNED | PK, AUTO_INCREMENT | Primary Key |
| `order_id` | BIGINT UNSIGNED | FK → orders.id, NOT NULL | Order reference |
| `product_id` | BIGINT UNSIGNED | FK → products.id, NOT NULL | Product reference |
| `product_name` | VARCHAR(255) | NOT NULL | Nama produk (snapshot) |
| `quantity` | INTEGER | NOT NULL | Jumlah item |
| `price` | DECIMAL(10,2) | NOT NULL | Harga satuan (snapshot) |
| `subtotal` | DECIMAL(10,2) | NOT NULL | Subtotal (qty × price + addons) |
| `addon_data` | JSON | NULLABLE | Snapshot add-ons saat checkout (NEW: v1.2.0) |
| `created_at` | TIMESTAMP | NOT NULL | Waktu dibuat |
| `updated_at` | TIMESTAMP | NOT NULL | Waktu update |

**addon_data JSON Structure:**
```json
[
  {
    "addon_id": 1,
    "name": "Kartu Ucapan Premium",
    "price": 15000,
    "quantity": 2,
    "custom_message": "Happy Birthday!"
  },
  {
    "addon_id": 3,
    "name": "Coklat Ferrero",
    "price": 50000,
    "quantity": 1,
    "custom_message": null
  }
]
```

**Relationships:**
- Belongs To `orders` (N:1)
- Belongs To `products` (N:1)
- Has One `product_reviews` (1:1) - via order_item_id

**Foreign Keys:**
- `order_id` → `orders(id)` ON DELETE CASCADE
- `product_id` → `products(id)` ON DELETE CASCADE

**Why Snapshot?**
- `product_name` dan `price` disimpan untuk historical data
- Jika produk dihapus/harga berubah, order history tetap akurat

---

## 🔗 Relationships Summary

```
users (1) ←→ (N) cart_items
users (1) ←→ (N) orders
users (1) ←→ (N) product_reviews

categories (1) ←→ (N) products

products (1) ←→ (N) cart_items
products (1) ←→ (N) order_items
products (1) ←→ (N) product_reviews
products (1) ←→ (N) product_images        ⭐ NEW v1.2.0
products (1) ←→ (N) product_addons        ⭐ NEW v1.2.0

product_addons (1) ←→ (N) addon_images   ⭐ NEW v1.2.0

orders (1) ←→ (N) order_items
orders (1) ←→ (N) product_reviews

order_items (1) ←→ (1) product_reviews
```

---

## 🔑 Foreign Key Constraints

| Child Table | Child Column | Parent Table | Parent Column | On Delete |
|-------------|--------------|--------------|---------------|-----------|
| `products` | `category_id` | `categories` | `id` | CASCADE |
| `product_images` | `product_id` | `products` | `id` | CASCADE |
| `product_addons` | `product_id` | `products` | `id` | CASCADE |
| `addon_images` | `product_addon_id` | `product_addons` | `id` | CASCADE |
| `product_reviews` | `product_id` | `products` | `id` | CASCADE |
| `product_reviews` | `user_id` | `users` | `id` | CASCADE |
| `product_reviews` | `order_id` | `orders` | `id` | CASCADE |
| `product_reviews` | `order_item_id` | `order_items` | `id` | CASCADE |
| `cart_items` | `user_id` | `users` | `id` | CASCADE |
| `cart_items` | `product_id` | `products` | `id` | CASCADE |
| `orders` | `user_id` | `users` | `id` | CASCADE |
| `order_items` | `order_id` | `orders` | `id` | CASCADE |
| `order_items` | `product_id` | `products` | `id` | CASCADE |

---

## 🎯 Unique Constraints

| Table | Columns | Purpose |
|-------|---------|---------|
| `users` | `email` | Email harus unik |
| `categories` | `slug` | Category slug unik |
| `products` | `slug` | Product slug unik |
| `product_reviews` | `product_id, user_id, order_id, order_item_id` | 1 user = 1 review per item per order |
| `cart_items` | `user_id, product_id` | 1 user tidak bisa tambah produk sama 2x |
| `orders` | `order_number` | Order number unik |

---

## 📊 Database Statistics

**Estimated Data Volume (Production):**
- Users: 500-5,000 (mix customer & admin)
- Categories: 5-20 (relatif stabil)
- Products: 50-500 (growing)
- Product Images: 150-2,500 (3-5 images per product)
- Product Add-ons: 100-1,500 (2-3 add-ons per product)
- Addon Images: 200-7,500 (2-5 images per add-on)
- Cart Items: 100-1,000 (temporary, fluctuating)
- Orders: 500-10,000 (growing)
- Order Items: 1,000-30,000 (growing)
- Product Reviews: 200-5,000 (40-50% conversion dari completed orders)

**Storage Estimate:**
- Total: ~50MB - 500MB (tanpa gambar)
- Images: Hosted di Cloudinary (external CDN)

---

# Technical Specifications

## 🛠️ Tech Stack

### Backend:
- **Framework:** Laravel 11.x
- **Language:** PHP 8.2+
- **Database:** MySQL 8.0 / MariaDB 10.x
- **ORM:** Eloquent
- **API Style:** Server-Side Rendering (SSR) via Inertia.js

### Frontend:
- **Library:** React 18.x
- **Router:** Inertia.js 1.x (SPA-like behavior)
- **Styling:** Tailwind CSS 3.x
- **Build Tool:** Vite 5.x
- **Icons:** Heroicons (SVG inline)

### Infrastructure:
- **Web Server:** Apache / Nginx
- **PHP Server:** Laravel built-in / PHP-FPM
- **Image Hosting:** Cloudinary (CDN)
- **Email:** SMTP (Gmail)
- **Session:** Database-driven
- **Cache:** Database / File

---

## 📁 Project Structure

```
florist/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/
│   │   │   │   ├── CategoryController.php
│   │   │   │   ├── OrderController.php
│   │   │   │   └── ProductController.php
│   │   │   ├── CartController.php
│   │   │   ├── HomeController.php
│   │   │   ├── OrderController.php
│   │   │   ├── ProductController.php
│   │   │   ├── ProductReviewController.php
│   │   │   └── ProfileController.php
│   │   ├── Middleware/
│   │   └── Requests/
│   ├── Models/
│   │   ├── AddonImage.php
│   │   ├── CartItem.php
│   │   ├── Category.php
│   │   ├── Order.php
│   │   ├── OrderItem.php
│   │   ├── Product.php
│   │   ├── ProductAddon.php
│   │   ├── ProductImage.php
│   │   ├── ProductReview.php
│   │   └── User.php
│   └── Notifications/
│       └── VerificationCodeNotification.php
├── database/
│   ├── migrations/
│   └── seeders/
├── resources/
│   ├── js/
│   │   ├── Components/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ReviewList.jsx
│   │   │   ├── StarRating.jsx
│   │   │   └── ...
│   │   ├── Layouts/
│   │   │   └── ShopLayout.jsx
│   │   └── Pages/
│   │       ├── Admin/
│   │       │   ├── Categories/
│   │       │   ├── Orders/
│   │       │   └── Products/
│   │       ├── Auth/
│   │       ├── Orders/
│   │       ├── Shop/
│   │       └── Home.jsx
│   └── views/
├── routes/
│   ├── web.php
│   └── auth.php
└── public/
    └── build/
```

---

## 🔐 Security Features

- ✅ **Password Hashing:** Bcrypt (Laravel default)
- ✅ **CSRF Protection:** Token-based untuk form submissions
- ✅ **Email Verification:** OTP 6-digit dengan expiry
- ✅ **SQL Injection Prevention:** Eloquent ORM dengan prepared statements
- ✅ **XSS Protection:** React auto-escaping + Laravel sanitization
- ✅ **Authorization:** Middleware-based (guest, auth, admin)
- ✅ **Session Security:** HttpOnly cookies, SameSite policy

---

## 📈 Performance Optimizations

- ✅ **Eager Loading:** Prevent N+1 queries (`with()` pada relationships)
- ✅ **Pagination:** 10-20 items per page untuk large datasets
- ✅ **Image CDN:** Cloudinary untuk fast global delivery
- ✅ **Database Indexes:** Pada foreign keys, unique columns, frequently queried fields
- ✅ **Asset Bundling:** Vite untuk optimized CSS/JS bundles
- ✅ **Lazy Loading:** Component-based code splitting (future enhancement)

---

## 🚀 Deployment Considerations

**Requirements:**
- PHP 8.2+
- MySQL 8.0+ / MariaDB 10.3+
- Composer 2.x
- Node.js 18+ & NPM
- Apache/Nginx with mod_rewrite

**Environment:**
- Development: Local (Laragon/XAMPP/Laravel Valet)
- Staging: Shared hosting / VPS
- Production: VPS / Cloud (AWS, DigitalOcean, etc)

**Post-MVP Enhancements:**
- [ ] Payment gateway integration (Midtrans/Xendit)
- [ ] WhatsApp notifications
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Progressive Web App (PWA)
- [ ] Real-time order tracking

---

**Document Version:** 2.1  
**Last Updated:** December 11, 2025  
**Prepared For:** Client Presentation  
**Contact:** Development Team

---

## 📝 Changelog

### Version 2.1 (December 11, 2025)
- ➕ Added **Product Add-ons System** documentation
- ➕ Added `product_images` table (multiple images per product)
- ➕ Added `product_addons` table (add-ons management)
- ➕ Added `addon_images` table (multiple images per add-on)
- 🔄 Updated `cart_items` table (added `addon_ids` JSON column)
- 🔄 Updated `order_items` table (added `addon_data` JSON column)
- 📊 Updated total tables from 15 to 19
- 📈 Updated database statistics
- ✨ Enhanced product detail features (gallery, lightbox, add-ons selection)
- ✨ Enhanced cart and checkout flow (add-ons display)
- ✨ Enhanced order management (add-ons tracking)

### Version 2.0 (December 10, 2025)
- ⭐ Added Product Reviews & Ratings system
- 📱 Enhanced mobile responsiveness
- 🔢 Added 5-tab navigation for order history

### Version 1.0 (November 2025)
- 🎉 Initial MVP documentation
- 📋 Core e-commerce features
- 🛍️ Shopping cart & checkout
- 🔐 Authentication & authorization