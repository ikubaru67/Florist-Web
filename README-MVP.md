# MVP - Florist E-Commerce Platform

## 🎯 Product Vision
Platform e-commerce toko bunga yang memungkinkan pelanggan untuk membeli produk bunga secara online dengan fitur keranjang belanja dan checkout yang mudah, serta panel admin untuk mengelola produk dan pesanan.

## 👥 Target Users
1. **Customer (Pembeli)**
   - Individu yang ingin membeli bunga untuk berbagai keperluan (hadiah, dekorasi, acara)
   - Mencari kemudahan dalam berbelanja online dengan antarmuka yang user-friendly
   - Membutuhkan informasi lengkap produk sebelum membeli

2. **Admin (Pengelola Toko)**
   - Pemilik toko bunga yang ingin mengelola bisnis secara digital
   - Membutuhkan sistem manajemen produk dan pesanan yang efisien
   - Ingin tracking stok dan status pesanan secara real-time

---

## ✨ Core Features (MVP Scope)

### 🛍️ Customer Features

#### 1. **Product Browsing**
- ✅ Halaman home dengan featured products
- ✅ Halaman shop dengan semua produk
- ✅ Filter produk berdasarkan kategori
- ✅ Search/pencarian produk berdasarkan nama, deskripsi, kategori
- ✅ Detail produk dengan gambar, harga, deskripsi, stok
- ✅ **Product ratings & reviews** (NEW: Dec 2025)
- ✅ **Multiple product images gallery** (NEW: Dec 2025)
- ✅ Average rating display di katalog
- ✅ Review count per produk

#### 2. **Product Reviews & Ratings** (NEW FEATURE - Dec 2025)
- ✅ User bisa memberikan rating (1-5 bintang) setelah order completed
- ✅ User bisa menulis komentar/review
- ✅ **Beri rating dari 2 tempat**:
  - Halaman detail produk (untuk produk yang sudah dibeli)
  - Halaman "Pesanan Saya" dengan tab filtering
- ✅ **Tab Navigation di Order History**:
  - Tab "Semua" - Semua pesanan
  - Tab "Diproses" - Pesanan pending/processing
  - Tab "Selesai" - Pesanan completed
  - Tab "Perlu Rating" - Item yang belum di-review
- ✅ Verified purchase badge untuk review
- ✅ Display average rating & total reviews per produk
- ✅ Review list di halaman detail produk
- ✅ User hanya bisa review produk yang sudah dibeli
- ✅ One review per product per order (prevent duplicate)
- ✅ **Auto-detect order_item_id** untuk link review ke item spesifik
- ✅ Display rating di order history
- ✅ Redirect kembali ke halaman asal setelah submit review

#### 3. **Shopping Cart**
- ✅ Tambah produk ke keranjang
- ✅ Update quantity di keranjang
- ✅ Hapus item dari keranjang
- ✅ Clear all cart items
- ✅ Cart badge counter di navbar
- ✅ Subtotal calculation per item dan total cart

#### 4. **Checkout & Orders**
- ✅ Direct buy (langsung checkout tanpa cart)
- ✅ Multi-item checkout dari cart
- ✅ Form checkout dengan validasi (nama, email, phone, address)
- ✅ Auto stock reduction setelah order
- ✅ Invoice page setelah checkout berhasil
- ✅ **Order history dengan tab navigation** (Semua, Diproses, Selesai, Perlu Rating)
- ✅ **Review produk langsung dari order history**
- ✅ Display rating yang sudah diberikan di order history

#### 5. **Authentication**
- ✅ Register akun baru
- ✅ Login/Logout
- ✅ Email verification dengan kode OTP
- ✅ Forgot password dengan email recovery
- ✅ Profile management (update nama, email, address)
- ✅ Change password

#### 6. **Responsive Design**
- ✅ Mobile-first approach
- ✅ Hamburger menu untuk mobile
- ✅ Responsive product grid (1 col mobile → 4 cols desktop)
- ✅ Touch-friendly buttons dan controls
- ✅ Optimized forms untuk mobile input

---

### 🔧 Admin Features

#### 1. **Product Management**
- ✅ CRUD produk (Create, Read, Update, Delete)
- ✅ Upload gambar produk
- ✅ **Multiple images upload** (NEW: Dec 2025)
- ✅ Set harga, stok, kategori
- ✅ Featured product flag
- ✅ Search/filter produk
- ✅ Pagination
- ✅ Stock status indicator (available/low stock/out of stock)

#### 2. **Order Management**
- ✅ View semua orders dengan detail
- ✅ Search orders (by ID, customer name, email)
- ✅ Filter by order status (pending, processing, completed, cancelled)
- ✅ Update order status
- ✅ View order details (items, customer info, total)
- ✅ Payment status tracking
- ✅ Pagination

#### 3. **Category Management**
- ✅ CRUD kategori
- ✅ Assign kategori ke produk
- ✅ Active/inactive category status

---

## 🏁 MVP Status: **ENHANCED** ✅

**Version**: 1.1.0  
**Release Date**: December 2025  
**Status**: Production Ready with Enhanced Features

### Fitur yang Sudah Berfungsi:
- ✅ Complete e-commerce flow (browse → cart → checkout → invoice)
- ✅ Full admin panel (products, orders, categories management)
- ✅ Responsive design untuk customer pages
- ✅ Authentication & authorization (email verification, password recovery)
- ✅ Email notifications
- ✅ Stock management dengan auto reduction
- ✅ Search & filter functionality
- ✅ Shopping cart dengan CRUD operations
- ✅ Dual purchase options (direct buy + cart checkout)
- ✅ **Product ratings & reviews system dengan dual entry point** (v1.1.0)
- ✅ **Order history dengan 4-tab navigation & review integration** (v1.1.0)
- ✅ **Multiple product images gallery** (v1.1.0)
- ✅ **Average rating display** di katalog dan detail
- ✅ **Verified purchase reviews** untuk kredibilitas
- ✅ **Auto-detection order_item_id** untuk review linking

### Limitasi yang Diketahui:
- ⚠️ Payment integration belum ada (manual confirmation)
- ⚠️ Admin panel belum fully responsive
- ⚠️ Shipping cost belum terintegrasi
- ⚠️ No real-time notifications (harus refresh page)

---

## 🔜 Post-MVP Roadmap (Tidak Termasuk MVP)

### Priority 1 (Next Sprint)
- [ ] Payment gateway integration (Midtrans/Xendit)
- [ ] Admin dashboard responsive design
- [ ] Email order confirmation templates
- [ ] Production deployment & server setup

### Priority 2 (Future Enhancements)
- [ ] Wishlist/Favorites
- [ ] ~~Product reviews & ratings~~ ✅ DONE (v1.1.0)
- [ ] ~~Multiple product images~~ ✅ DONE (v1.1.0)
- [ ] Order tracking timeline
- [ ] Promo codes/discount system
- [ ] Sales analytics & reports
- [ ] Inventory alerts

### Priority 3 (Long-term)
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] PWA support
- [ ] Advanced SEO optimization
- [ ] API for third-party integration

---

**Last Updated**: December 10, 2025  
**Documentation Version**: 1.1  
**Major Changes**: Added product reviews & ratings + multiple images feature

