# Setup E-commerce Florist

## Database Migration & Seeding

Untuk menjalankan sistem e-commerce, ikuti langkah-langkah berikut:

### 1. Jalankan Migration
```bash
php artisan migrate
```

Migration yang akan dibuat:
- `categories` - Tabel kategori produk
- `products` - Tabel produk bunga
- `cart_items` - Tabel keranjang belanja
- `orders` - Tabel pesanan
- `order_items` - Tabel detail item pesanan

### 2. Jalankan Seeder
```bash
php artisan db:seed
```

Atau jika ingin seeding spesifik:
```bash
php artisan db:seed --class=CategorySeeder
php artisan db:seed --class=ProductSeeder
```

### 3. Build Frontend Assets
```bash
npm install
npm run dev
```

Untuk production:
```bash
npm run build
```

## Fitur E-commerce

### 1. **Home Page** (`/`)
- Hero section dengan banner
- Kategori produk
- Produk unggulan
- Produk terbaru

### 2. **Shop Page** (`/shop`)
- Daftar semua produk
- Filter berdasarkan kategori
- Pencarian produk
- Sorting (terbaru, nama, harga)
- Pagination

### 3. **Product Detail** (`/products/{slug}`)
- Detail produk lengkap
- Gambar produk
- Deskripsi
- Harga
- Stok
- Form tambah ke keranjang
- Produk terkait

### 4. **Cart** (`/cart`) - *Login Required*
- Daftar item di keranjang
- Update quantity
- Hapus item
- Ringkasan total
- Tombol checkout

### 5. **Checkout** (`/checkout`) - *Login Required*
- Form informasi pengiriman
- Pilih metode pembayaran (COD/Transfer)
- Ringkasan pesanan
- Konfirmasi pemesanan

### 6. **Orders** (`/orders`) - *Login Required*
- Daftar semua pesanan
- Status pesanan (pending, processing, completed, cancelled)
- Detail setiap pesanan

### 7. **Order Detail** (`/orders/{id}`) - *Login Required*
- Detail lengkap pesanan
- Informasi pengiriman
- Status pembayaran
- List produk yang dipesan

## Models & Relationships

### Category
- Has many Products

### Product
- Belongs to Category
- Has many CartItems
- Has many OrderItems

### CartItem
- Belongs to User
- Belongs to Product

### Order
- Belongs to User
- Has many OrderItems

### OrderItem
- Belongs to Order
- Belongs to Product

## Routes

```php
// Public Routes
GET  /                          // Home page
GET  /shop                      // Shop/Product listing
GET  /products/{slug}           // Product detail

// Authenticated Routes
GET  /cart                      // View cart
POST /cart                      // Add to cart
PATCH /cart/{cartItem}          // Update cart quantity
DELETE /cart/{cartItem}         // Remove from cart
DELETE /cart                    // Clear cart

GET  /checkout                  // Checkout page
POST /orders                    // Create order
GET  /orders                    // Order history
GET  /orders/{order}            // Order detail
```

## Test User Credentials

```
Email: test@example.com
Password: password
```

## Sample Data

Seeder sudah menyediakan:
- 6 Kategori bunga (Mawar, Tulip, Lily, Anggrek, Matahari, Bouquet)
- 16 Produk dengan variasi harga Rp 120.000 - Rp 450.000
- Stok bervariasi untuk setiap produk

## Catatan Penting

1. **Authentication**: Fitur cart, checkout, dan orders memerlukan user login
2. **Stock Management**: Stok otomatis berkurang saat order dibuat
3. **Price Lock**: Harga produk di cart dan order di-lock saat ditambahkan
4. **Unique Cart**: User tidak bisa menambahkan produk yang sama 2x (quantity akan bertambah)
5. **Order Number**: Otomatis generated dengan format `ORD-{UNIQUE_ID}`

## Cara Menjalankan Aplikasi

1. **Pastikan database sudah dibuat** di Laragon/XAMPP
2. **Update .env** dengan konfigurasi database
3. Jalankan migration: `php artisan migrate`
4. Jalankan seeder: `php artisan db:seed`
5. Install dependencies: `npm install`
6. Build frontend: `npm run dev`
7. Jalankan server: `php artisan serve`
8. Buka browser: `http://localhost:8000`

Selamat mencoba! 🌸
