# 🛠️ Developer Guide - Florist Shop

Panduan lengkap untuk developer yang ingin mengembangkan atau melakukan maintenance pada proyek Florist Shop.

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

## 📦 Project Structure

```
Florist/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/
│   │   │   │   ├── AuthenticatedSessionController.php
│   │   │   │   ├── PasswordController.php
│   │   │   │   ├── PasswordResetCodeController.php
│   │   │   │   ├── PasswordResetLinkController.php
│   │   │   │   ├── RegisteredUserController.php
│   │   │   │   └── VerifyCodeController.php
│   │   │   ├── Admin/
│   │   │   │   ├── AdminOrderController.php
│   │   │   │   └── AdminProductController.php
│   │   │   ├── OrderController.php
│   │   │   ├── ProductController.php
│   │   │   └── ProfileController.php
│   │   ├── Middleware/
│   │   └── Requests/
│   ├── Models/
│   │   ├── User.php
│   │   ├── Category.php
│   │   ├── Product.php
│   │   ├── Order.php
│   │   └── OrderItem.php
│   └── Notifications/
│       └── VerificationCodeNotification.php
├── database/
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 2025_11_11_081042_create_buyers_table.php
│   │   ├── 2025_11_11_100001_create_categories_table.php
│   │   ├── 2025_11_11_100002_create_products_table.php
│   │   ├── 2025_11_11_100003_create_cart_items_table.php
│   │   ├── 2025_11_11_100004_create_orders_table.php
│   │   ├── 2025_11_11_100005_create_order_items_table.php
│   │   ├── 2025_11_11_153621_add_address_to_users_table.php
│   │   ├── 2025_11_11_154218_add_is_admin_to_users_table.php
│   │   └── 2025_11_12_142241_add_verification_code_to_users_table.php
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── CategorySeeder.php
│       └── ProductSeeder.php
├── resources/
│   ├── js/
│   │   ├── Components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── Layouts/
│   │   │   ├── ShopLayout.jsx
│   │   │   └── GuestLayout.jsx
│   │   ├── Pages/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   ├── VerifyEmail.jsx
│   │   │   │   ├── VerifyPasswordCode.jsx
│   │   │   │   └── ResetPasswordNew.jsx
│   │   │   ├── Admin/
│   │   │   │   ├── Orders/
│   │   │   │   │   ├── Index.jsx
│   │   │   │   │   └── Show.jsx
│   │   │   │   └── Products/
│   │   │   │       ├── Index.jsx
│   │   │   │       ├── Create.jsx
│   │   │   │       └── Edit.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── OrderForm.jsx
│   │   │   ├── Invoice.jsx
│   │   │   └── Profile/
│   │   │       ├── Edit.jsx
│   │   │       └── Partials/
│   │   │           ├── UpdateProfileInformationForm.jsx
│   │   │           ├── UpdatePasswordForm.jsx
│   │   │           └── DeleteUserForm.jsx
│   │   └── app.jsx
│   ├── css/
│   │   └── app.css
│   └── views/
│       ├── app.blade.php
│       └── vendor/
│           └── mail/
│               └── html/
│                   ├── header.blade.php
│                   ├── footer.blade.php
│                   └── themes/
│                       └── default.css
├── routes/
│   ├── web.php
│   ├── auth.php
│   └── console.php
├── public/
│   ├── build/
│   └── index.php
├── .env
├── composer.json
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🗄️ Database Schema

### **Users Table**
```sql
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    address TEXT,
    city VARCHAR(255),
    postal_code VARCHAR(10),
    is_admin TINYINT(1) DEFAULT 0,
    email_verified_at TIMESTAMP NULL,
    verification_code VARCHAR(6) NULL,
    verification_code_expires_at TIMESTAMP NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### **Categories Table**
```sql
CREATE TABLE categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### **Products Table**
```sql
CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    image VARCHAR(255) NULL,
    is_featured TINYINT(1) DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
```

### **Orders Table**
```sql
CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    order_number VARCHAR(255) UNIQUE NOT NULL,
    shipping_name VARCHAR(255) NOT NULL,
    shipping_email VARCHAR(255) NOT NULL,
    shipping_phone VARCHAR(255) NOT NULL,
    shipping_address TEXT NOT NULL,
    shipping_city VARCHAR(255) NOT NULL,
    shipping_postal_code VARCHAR(10) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    payment_status ENUM('unpaid', 'paid') DEFAULT 'unpaid',
    payment_method VARCHAR(50) NULL,
    notes TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### **Order Items Table**
```sql
CREATE TABLE order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

---

## 🔧 Setup & Installation

### **Requirements**
- **PHP:** 8.3 atau lebih tinggi
- **Composer:** 2.x
- **Node.js:** 18.x atau lebih tinggi
- **NPM:** 9.x atau lebih tinggi
- **MySQL:** 8.x
- **Web Server:** Laragon, XAMPP, WAMP, atau Nginx/Apache

### **Installation Steps**

#### **1. Clone Repository**
```bash
git clone [repository-url]
cd Florist
```

#### **2. Install PHP Dependencies**
```bash
composer install
```

#### **3. Install JavaScript Dependencies**
```bash
npm install
```

#### **4. Environment Configuration**
```bash
# Copy .env.example ke .env
cp .env.example .env

# Generate application key
php artisan key:generate
```

#### **5. Configure .env File**

Edit file `.env` dan sesuaikan konfigurasi:

```env
# Application
APP_NAME="Florist Shop"
APP_ENV=local
APP_KEY=base64:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
APP_DEBUG=true
APP_TIMEZONE=Asia/Jakarta
APP_URL=http://127.0.0.1:8000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=florist
DB_USERNAME=root
DB_PASSWORD=

# Mail Configuration (Gmail SMTP)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-16-digit-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="your-email@gmail.com"
MAIL_FROM_NAME="${APP_NAME}"

# Session & Cache
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

#### **6. Create Database**
```sql
CREATE DATABASE florist CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### **7. Run Database Migrations**
```bash
# Migrate all tables
php artisan migrate

# Optional: Run with fresh (drop all tables and re-migrate)
php artisan migrate:fresh
```

#### **8. Seed Database**
```bash
# Seed categories and sample products
php artisan db:seed

# Or seed specific seeder
php artisan db:seed --class=CategorySeeder
php artisan db:seed --class=ProductSeeder
```

#### **9. Publish Mail Templates (Optional)**
```bash
php artisan vendor:publish --tag=laravel-mail
```

#### **10. Clear Cache**
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

#### **11. Build Frontend Assets**

**Development Mode (dengan hot reload):**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
```

#### **12. Start Development Server**
```bash
php artisan serve
```

#### **13. Access Application**
- **Frontend:** http://127.0.0.1:8000
- **Admin Panel:** http://127.0.0.1:8000/admin

---

## 🔑 Creating Admin Account

### **Method 1: Via Tinker**
```bash
php artisan tinker
```

```php
// Set existing user as admin
$user = User::where('email', 'user@example.com')->first();
$user->is_admin = true;
$user->save();

// Or create new admin user
User::create([
    'name' => 'Admin',
    'email' => 'admin@example.com',
    'password' => Hash::make('password'),
    'phone' => '081234567890',
    'address' => 'Jl. Admin No. 1',
    'city' => 'Jakarta',
    'postal_code' => '12345',
    'is_admin' => true,
    'email_verified_at' => now(),
]);
```

### **Method 2: Direct Database Query**
```sql
UPDATE users SET is_admin = 1 WHERE email = 'user@example.com';
```

---

## 📧 Email Configuration (Gmail SMTP)

### **Setup Gmail App Password**

1. Buka **Google Account Settings**: https://myaccount.google.com/
2. Pilih **Security** → **2-Step Verification** (aktifkan jika belum)
3. Scroll ke bawah, klik **App passwords**
4. Pilih **Mail** dan **Other (Custom name)**
5. Masukkan nama: "Florist Shop"
6. Klik **Generate**
7. Copy **16-digit password** (contoh: `abcd efgh ijkl mnop`)
8. Paste ke `.env` **tanpa spasi**: `MAIL_PASSWORD=abcdefghijklmnop`

### **Test Email**

```bash
php artisan tinker
```

```php
use App\Notifications\VerificationCodeNotification;
use App\Models\User;

$user = User::first();
$user->verification_code = '123456';
$user->notify(new VerificationCodeNotification());
```

---

## 🎨 Design System

### **Color Palette**
```css
/* Primary Colors */
--pink-50: #FDF2F8;
--pink-100: #FCE7F3;
--pink-500: #EC4899;
--pink-600: #DB2777;

/* Secondary Colors */
--purple-50: #FAF5FF;
--purple-500: #A855F7;
--purple-600: #9333EA;

/* Neutral Colors */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-300: #D1D5DB;
--gray-600: #4B5563;
--gray-900: #111827;

/* Status Colors */
--green-500: #10B981; /* Success */
--yellow-500: #F59E0B; /* Warning */
--red-500: #EF4444; /* Danger */
--blue-500: #3B82F6; /* Info */
```

### **Typography Scale**
```css
/* Headings */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }

/* Body Text */
.text-base { font-size: 1rem; line-height: 1.5rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-xs { font-size: 0.75rem; line-height: 1rem; }
```

### **Spacing System**
```css
/* Padding & Margin */
px-2  { padding: 0.5rem; }  /* 8px */
px-4  { padding: 1rem; }    /* 16px */
px-6  { padding: 1.5rem; }  /* 24px */
px-8  { padding: 2rem; }    /* 32px */
px-12 { padding: 3rem; }    /* 48px */
```

### **Border Radius**
```css
rounded-lg   { border-radius: 0.5rem; }   /* 8px */
rounded-xl   { border-radius: 0.75rem; }  /* 12px */
rounded-2xl  { border-radius: 1rem; }     /* 16px */
rounded-full { border-radius: 9999px; }
```

---

## 📁 Important Files & Directories

### **Backend Controllers**

| File | Deskripsi |
|------|-----------|
| `RegisteredUserController.php` | Handle register + send OTP email |
| `VerifyCodeController.php` | Verify OTP code after register |
| `PasswordResetLinkController.php` | Send OTP for forgot password |
| `PasswordResetCodeController.php` | Verify & reset password |
| `PasswordController.php` | Change password with OTP in profile |
| `AdminOrderController.php` | Admin CRUD orders |
| `AdminProductController.php` | Admin CRUD products |
| `OrderController.php` | User order creation |
| `ProductController.php` | Product listing & detail |

### **Frontend Pages**

| File | Route | Deskripsi |
|------|-------|-----------|
| `Login.jsx` | `/login` | Login page |
| `Register.jsx` | `/register` | Register page |
| `VerifyEmail.jsx` | `/verify-email` | Email verification after register |
| `ForgotPassword.jsx` | `/forgot-password` | Request password reset |
| `VerifyPasswordCode.jsx` | `/verify-password-code` | Verify OTP for password reset |
| `ResetPasswordNew.jsx` | `/reset-password-new` | Set new password |
| `Home.jsx` | `/` | Homepage with featured products |
| `Shop.jsx` | `/shop` | All products with filter |
| `ProductDetail.jsx` | `/products/{slug}` | Product detail |
| `OrderForm.jsx` | `/order/{slug}` | Order form |
| `Invoice.jsx` | `/invoice/{orderNumber}` | Invoice with WhatsApp button |
| `Admin/Orders/Index.jsx` | `/admin` | Admin dashboard (orders list) |
| `Admin/Orders/Show.jsx` | `/admin/orders/{id}` | Order detail |
| `Admin/Products/Index.jsx` | `/admin/products` | Products management |

### **Models**

| Model | Relationships |
|-------|---------------|
| **User** | hasMany(Order) |
| **Category** | hasMany(Product) |
| **Product** | belongsTo(Category), hasMany(OrderItem) |
| **Order** | belongsTo(User), hasMany(OrderItem) |
| **OrderItem** | belongsTo(Order), belongsTo(Product) |

---

## 🔄 Common Development Tasks

### **Create New Migration**
```bash
php artisan make:migration create_table_name_table
php artisan make:migration add_column_to_table_name --table=table_name
```

### **Create New Controller**
```bash
php artisan make:controller ControllerName
php artisan make:controller Admin/ControllerName
```

### **Create New Model**
```bash
php artisan make:model ModelName -m  # with migration
php artisan make:model ModelName -mfs # with migration, factory, seeder
```

### **Create New Seeder**
```bash
php artisan make:seeder SeederName
```

### **Rollback Migration**
```bash
php artisan migrate:rollback          # Rollback last batch
php artisan migrate:rollback --step=1 # Rollback 1 migration
php artisan migrate:fresh             # Drop all & re-migrate
```

### **Clear All Cache**
```bash
php artisan optimize:clear
```

### **Generate Slugs for Existing Products**
```bash
php artisan tinker
```
```php
use Illuminate\Support\Str;
use App\Models\Product;

Product::all()->each(function ($product) {
    $product->slug = Str::slug($product->name);
    $product->save();
});
```

---

## 📊 Status & Constants

### **Order Status**
```php
// In Order model or config
const STATUS_PENDING = 'pending';
const STATUS_PROCESSING = 'processing';
const STATUS_COMPLETED = 'completed';
const STATUS_CANCELLED = 'cancelled';
```

### **Payment Status**
```php
const PAYMENT_UNPAID = 'unpaid';
const PAYMENT_PAID = 'paid';
```

### **Payment Methods**
```php
const PAYMENT_METHODS = [
    'DANA',
    'GOPAY',
    'OVO',
    'ShopeePay',
    'SeaBank',
    'BANK',
    'QRIS'
];
```

---

## 🐛 Debugging & Troubleshooting

### **Enable Debug Mode**
```env
APP_DEBUG=true
APP_ENV=local
```

### **Check Logs**
```bash
# View latest 50 lines
tail -n 50 storage/logs/laravel.log

# Watch logs in real-time
tail -f storage/logs/laravel.log

# Windows PowerShell
Get-Content "storage\logs\laravel.log" -Tail 50
```

### **Clear All Cache**
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan optimize:clear
```

### **Fix Storage Permissions (Linux/Mac)**
```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### **Common Errors**

#### **1. SQLSTATE Connection Refused**
**Solusi:**
- Check MySQL service is running
- Verify DB credentials in `.env`
- Test connection: `php artisan migrate:status`

#### **2. The environment file is invalid**
**Solusi:**
- Check for values with spaces → use quotes
- Example: `APP_NAME="Florist Shop"`

#### **3. Vite Manifest Not Found**
**Solusi:**
```bash
npm run build
```

#### **4. Class Not Found**
**Solusi:**
```bash
composer dump-autoload
```

#### **5. Email Not Sending**
**Solusi:**
- Use Gmail App Password (not regular password)
- Check port 587 is not blocked
- Verify `MAIL_PASSWORD` has no spaces
- Run: `php artisan config:clear`

---

## 🧪 Testing

### **Run Tests**
```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/AuthTest.php

# Run with coverage
php artisan test --coverage
```

### **Create New Test**
```bash
php artisan make:test FeatureNameTest
php artisan make:test UnitNameTest --unit
```

---

## 🚀 Deployment

### **Production Checklist**

- [ ] Set `APP_ENV=production`
- [ ] Set `APP_DEBUG=false`
- [ ] Generate new `APP_KEY`
- [ ] Configure production database
- [ ] Set up proper `.env` file
- [ ] Run `composer install --optimize-autoloader --no-dev`
- [ ] Run `npm run build`
- [ ] Run `php artisan migrate --force`
- [ ] Run `php artisan config:cache`
- [ ] Run `php artisan route:cache`
- [ ] Run `php artisan view:cache`
- [ ] Set proper file permissions
- [ ] Configure web server (Nginx/Apache)
- [ ] Set up SSL certificate
- [ ] Configure CORS if needed
- [ ] Set up queue worker (if using queues)
- [ ] Configure backup system

### **Optimization Commands**
```bash
# Cache configuration
php artisan config:cache

# Cache routes
php artisan route:cache

# Cache views
php artisan view:cache

# Optimize autoloader
composer install --optimize-autoloader --no-dev

# Build production assets
npm run build
```

---

## 📝 API Documentation (Future Enhancement)

Saat ini project menggunakan Inertia.js (server-side rendering), bukan REST API. Jika ingin menambahkan API untuk mobile app:

### **Install Laravel Sanctum**
```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

### **Example API Routes**
```php
// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/products', [ApiProductController::class, 'index']);
    Route::get('/products/{id}', [ApiProductController::class, 'show']);
    Route::post('/orders', [ApiOrderController::class, 'store']);
});
```

---

## 🔐 Security Best Practices

1. **Never commit `.env` file**
   ```gitignore
   .env
   .env.backup
   ```

2. **Use CSRF protection** (already enabled by default)

3. **Hash passwords** (already using Laravel Hash)

4. **Validate all inputs** (use Form Requests)

5. **Use prepared statements** (Eloquent does this automatically)

6. **Rate limiting** (applied on login, register, password reset)

7. **Use HTTPS** in production

8. **Keep dependencies updated**
   ```bash
   composer update
   npm update
   ```

---

## 📞 Support & Resources

### **Official Documentation**
- [Laravel Documentation](https://laravel.com/docs)
- [Inertia.js Documentation](https://inertiajs.com)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### **Community Resources**
- [Laravel Forum](https://laracasts.com/discuss)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/laravel)
- [GitHub Issues](https://github.com/laravel/framework/issues)

### **Tools & Extensions**
- **VS Code Extensions:**
  - Laravel Extension Pack
  - Intelephense
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Laravel Blade Snippets

---

## 📜 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

---

**Happy Coding! 💻🌸**
