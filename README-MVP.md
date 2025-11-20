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

## ✨ Core Features (MVP)

### 🛍️ Customer Features

#### 1. **Product Browsing**
- ✅ Halaman home dengan featured products
- ✅ Halaman shop dengan semua produk
- ✅ Filter produk berdasarkan kategori
- ✅ Search/pencarian produk berdasarkan nama, deskripsi, kategori
- ✅ Detail produk dengan gambar, harga, deskripsi, stok

#### 2. **Shopping Cart**
- ✅ Tambah produk ke keranjang
- ✅ Update quantity di keranjang
- ✅ Hapus item dari keranjang
- ✅ Clear all cart items
- ✅ Cart badge counter di navbar
- ✅ Subtotal calculation per item dan total cart

#### 3. **Checkout & Orders**
- ✅ Direct buy (langsung checkout tanpa cart)
- ✅ Multi-item checkout dari cart
- ✅ Form checkout dengan validasi (nama, email, phone, address)
- ✅ Auto stock reduction setelah order
- ✅ Invoice page setelah checkout berhasil
- ✅ Order history untuk user yang login

#### 4. **Authentication**
- ✅ Register akun baru
- ✅ Login/Logout
- ✅ Email verification dengan kode OTP
- ✅ Forgot password dengan email recovery
- ✅ Profile management (update nama, email, address)
- ✅ Change password

#### 5. **Responsive Design**
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

#### 4. **Admin Dashboard**
- ✅ Statistics overview (total orders, revenue, pending orders)
- ✅ Recent orders table
- ✅ Quick access ke product/order management

#### 5. **Admin UI Improvements**
- ✅ Horizontal scrollable tables untuk mobile/tablet
- ✅ Consistent button styling across pages
- ✅ Unified color scheme (pink primary, blue edit, red delete)
- ✅ Improved layout structure (title → buttons → search)

---

## 🗄️ Database Schema

### Users Table
```
- id (PK)
- name
- email (unique)
- password
- phone
- address
- is_admin (boolean)
- email_verified_at
- verification_code
- verification_code_expires_at
- timestamps
```

### Categories Table
```
- id (PK)
- name
- description
- is_active (boolean)
- timestamps
```

### Products Table
```
- id (PK)
- category_id (FK)
- name
- description
- price (decimal)
- stock (integer)
- image
- is_featured (boolean)
- timestamps
```

### Cart Items Table
```
- id (PK)
- user_id (FK)
- product_id (FK)
- quantity (integer)
- price (decimal)
- timestamps
- UNIQUE(user_id, product_id)
```

### Orders Table
```
- id (PK)
- user_id (FK, nullable)
- order_number (unique)
- customer_name
- customer_email
- customer_phone
- customer_address
- total_amount (decimal)
- status (enum: pending, processing, completed, cancelled)
- payment_status (enum: pending, paid, failed)
- timestamps
```

### Order Items Table
```
- id (PK)
- order_id (FK)
- product_id (FK)
- quantity (integer)
- price (decimal)
- subtotal (decimal)
- timestamps
```

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Laravel 11
- **Language**: PHP 8.3.16
- **Database**: MySQL
- **Authentication**: Laravel Breeze
- **Email**: Laravel Mail (SMTP)

### Frontend
- **Framework**: React 18 (via Inertia.js)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Unicode/Emoji

### Development Environment
- **Server**: Laragon (Apache + MySQL)
- **Package Manager**: Composer (PHP), npm (Node.js)

---

## 📊 User Flows

### Customer Purchase Flow
```
1. Browse Products (Home/Shop)
   ↓
2a. Add to Cart → Continue Shopping → View Cart → Checkout
   OR
2b. Direct Buy → Checkout Form
   ↓
3. Fill Checkout Form (Name, Email, Phone, Address)
   ↓
4. Submit Order
   ↓
5. Stock Reduced, Order Created
   ↓
6. View Invoice
```

### Admin Order Management Flow
```
1. Login as Admin
   ↓
2. Dashboard → View Orders
   ↓
3. Search/Filter Orders
   ↓
4. View Order Details
   ↓
5. Update Order Status (pending → processing → completed)
   ↓
6. Customer receives updated status
```

---

## 🎨 Design Principles

### User Experience
- **Simplicity**: Clean, intuitive interface tanpa clutter
- **Speed**: Fast page loads, optimistic UI updates
- **Clarity**: Clear CTAs (Call-to-Action), informative error messages
- **Accessibility**: Touch-friendly, readable typography, sufficient contrast

### Visual Design
- **Color Scheme**: 
  - Primary: Pink (#DB2777 - pink-600)
  - Secondary: Blue (#2563EB - blue-600)
  - Danger: Red (#DC2626 - red-600)
  - Success: Green (#16A34A - green-600)
- **Typography**: System fonts (sans-serif)
- **Spacing**: Consistent padding/margins (Tailwind scale)
- **Components**: Rounded corners (rounded-lg), subtle shadows

---

## 🚀 Key Accomplishments

### Technical Achievements
✅ **Shopping Cart System**: Fully functional cart dengan CRUD operations
✅ **Dual Purchase Options**: Direct buy + cart-based checkout
✅ **Stock Management**: Auto stock reduction, low stock warnings
✅ **Responsive Design**: Mobile-optimized untuk semua halaman customer
✅ **Admin Panel**: Complete CRUD untuk products, orders, categories
✅ **Authentication**: Secure email verification, password recovery
✅ **Data Persistence**: Proper database relations, migrations, seeders

### Bug Fixes & Improvements
✅ Fixed Inertia.js form submission issues (cart add/checkout)
✅ Fixed database ENUM constraints (payment_status)
✅ Fixed column naming inconsistencies (order_items.price)
✅ Implemented horizontal scroll untuk admin tables (mobile UX)
✅ Standardized button styling across admin pages
✅ Improved admin page layout structure

---

## 🔜 Future Enhancements (Post-MVP)

### Customer Features
- [ ] Wishlist/Favorites
- [ ] Product reviews & ratings
- [ ] Multiple product images (gallery)
- [ ] Product variations (size, color)
- [ ] Shipping cost calculation
- [ ] Payment gateway integration (Midtrans, etc.)
- [ ] Order tracking dengan timeline
- [ ] Notifications (email/push untuk order updates)
- [ ] Promo codes/discount system
- [ ] Guest checkout (without registration)

### Admin Features
- [ ] Sales analytics & reports (charts, export PDF/Excel)
- [ ] Inventory alerts (low stock notifications)
- [ ] Bulk product operations (import CSV, bulk edit)
- [ ] Customer management (view all customers, order history)
- [ ] Admin roles & permissions
- [ ] Activity logs (audit trail)
- [ ] Dashboard widgets customization
- [ ] Advanced filtering (date range, price range, etc.)

### Technical Improvements
- [ ] Performance optimization (caching, lazy loading)
- [ ] Image optimization (compression, WebP format)
- [ ] SEO optimization (meta tags, sitemap)
- [ ] PWA support (offline mode, install prompt)
- [ ] WebSocket untuk real-time updates
- [ ] API documentation (for mobile app integration)
- [ ] Automated testing (unit, integration, E2E)
- [ ] CI/CD pipeline setup

### UX Enhancements
- [ ] Loading skeletons instead of spinners
- [ ] Toast notifications instead of alerts
- [ ] Optimistic UI updates (instant feedback)
- [ ] Drag-and-drop untuk admin image upload
- [ ] Dark mode support
- [ ] Multi-language support (i18n)
- [ ] Keyboard shortcuts untuk admin
- [ ] Accessibility improvements (ARIA labels, screen reader)

---

## 📈 Success Metrics

### Customer Metrics
- Cart abandonment rate < 30%
- Average order value (AOV)
- Conversion rate (visitors → buyers)
- Customer retention rate
- Time to checkout (target: < 3 minutes)

### Admin Metrics
- Order processing time (target: < 24 hours)
- Product catalog size (number of SKUs)
- Stock accuracy (inventory vs actual)
- Admin task completion time

### Technical Metrics
- Page load time < 2 seconds
- Mobile responsiveness score > 95%
- Uptime > 99.5%
- Zero critical bugs in production

---

## 🏁 MVP Status: **COMPLETED** ✅

**Version**: 1.0.0  
**Release Date**: November 2025  
**Status**: Production Ready

### What's Working:
- ✅ Complete e-commerce flow (browse → cart → checkout → invoice)
- ✅ Full admin panel (products, orders, categories management)
- ✅ Responsive design untuk customer pages
- ✅ Authentication & authorization
- ✅ Email notifications
- ✅ Stock management
- ✅ Search & filter functionality

### Known Limitations:
- ⚠️ Payment integration belum ada (manual confirmation)
- ⚠️ Admin panel belum fully responsive (Dashboard pending)
- ⚠️ Shipping cost belum terintegrasi
- ⚠️ No real-time notifications (harus refresh page)

### Next Sprint Priority:
1. Payment gateway integration (Midtrans/Stripe)
2. Admin dashboard responsive design
3. Email order confirmation templates
4. Production deployment setup

---

## 📝 Notes

### Development Best Practices
- Follow Laravel conventions (PSR-12, naming)
- Use Inertia.js router for navigation (not useForm untuk data submission)
- Leverage Tailwind utility classes
- Keep components small and reusable
- Add comprehensive logging for debugging
- Clear cache after config/route changes

### Lessons Learned
1. **Inertia.js Data Submission**: Use `router.post()` with explicit data object, not `useForm().post()` untuk complex forms
2. **Database Design**: Pastikan ENUM values match exactly, avoid column naming ambiguity
3. **Responsive Tables**: Always wrap tables in `overflow-x-auto` untuk mobile
4. **Consistent UI**: Define design system early (colors, spacing, components)
5. **Progressive Enhancement**: Build mobile-first, enhance untuk desktop

---

**Last Updated**: November 13, 2025  
**Maintained By**: Development Team  
**Documentation Version**: 1.0
