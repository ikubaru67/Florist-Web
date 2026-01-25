# Multi-Language Feature Implementation Guide

## Overview
Fitur multi-language telah ditambahkan ke Florist Shop untuk mendukung customer internasional. Sistem ini mendukung 2 bahasa:
- 🇮🇩 **Indonesia (ID)** - Bahasa default
- 🇬🇧 **English (EN)**

## Files Created/Modified

### 1. **Translation Files**
- `lang/en/messages.php` - English translations
- `lang/id/messages.php` - Indonesian translations

### 2. **Backend Components**
- `app/Http/Controllers/LanguageController.php` - Handle language switching
- `app/Http/Middleware/SetLocale.php` - Set locale for each request

### 3. **Frontend Components**
- `resources/js/Components/LanguageSwitcher.jsx` - Language dropdown component
- `resources/js/Layouts/ShopLayout.jsx` - Updated with language switcher

### 4. **Configuration**
- `config/app.php` - Updated default locale to 'id', added available_locales
- `bootstrap/app.php` - Registered SetLocale middleware
- `routes/web.php` - Added language switch route
- `app/Http/Middleware/HandleInertiaRequests.php` - Share locale & translations to frontend

## How It Works

### Backend Flow:
1. **SetLocale Middleware** runs on every request
2. Checks session for saved locale preference
3. If no preference, detects browser language
4. Falls back to default locale (Indonesian)
5. Sets Laravel locale for the request

### Frontend Flow:
1. **LanguageSwitcher** component displays current language
2. User clicks dropdown to select language
3. POST request to `/language/switch` endpoint
4. Backend saves preference to session
5. Page reloads with new language

### Translation Usage:
```jsx
// In React components
import { usePage } from '@inertiajs/react';

const { translations } = usePage().props;
const t = (key) => translations?.[key] || key;

// Usage
<button>{t('add_to_cart')}</button>
```

## Setup Instructions

### 1. Update .env file:
```env
APP_LOCALE=id
APP_FALLBACK_LOCALE=en
```

### 2. Clear cache:
```bash
php artisan config:clear
php artisan cache:clear
php artisan view:clear
```

### 3. Build frontend:
```bash
npm run build
# or for development
npm run dev
```

## Language Switcher Location

The language switcher appears in:
- ✅ Desktop navbar (top right)
- ✅ Mobile menu (below catalog link)

## Adding New Translations

To add more translations:

1. Edit `lang/en/messages.php`:
```php
'new_key' => 'English Text',
```

2. Edit `lang/id/messages.php`:
```php
'new_key' => 'Teks Indonesia',
```

3. Use in components:
```jsx
{t('new_key')}
```

## Translation Keys Available

**Navigation:**
- home, catalog, cart, orders, profile, admin_panel
- login, register, logout

**General:**
- language, welcome, search, filter, sort_by
- add_to_cart, buy_now, price, stock, category
- description, reviews, rating, quantity
- subtotal, total, checkout, order_number
- status, date, view_details, back, save, cancel
- edit, delete, confirm

**Order Status:**
- processing, completed, cancelled, pending

**Auth:**
- email, password, password_confirmation, remember_me
- forgot_password, reset_password, verify_email
- verification_code, send_code, resend_code

**Cart & Checkout:**
- shopping_cart, cart_empty, continue_shopping
- proceed_to_checkout, shipping_information
- payment_method, place_order, order_summary

**Orders:**
- order_history, order_details, no_orders
- start_shopping, order_status, payment_status
- contact_via_whatsapp

**Product:**
- product_details, related_products, no_products_found
- out_of_stock, in_stock, add_ons
- select_add_on, custom_message

**Admin:**
- manage_products, manage_orders, manage_addons
- settings, dashboard, add_product, edit_product
- accept_order, reject_order, complete_order

**Profile:**
- update_profile, update_password, delete_account
- name, phone, address, city, postal_code
- current_password, new_password

**Messages:**
- success, error, added_to_cart, order_placed
- profile_updated, password_updated

## Browser Language Detection

The system automatically detects browser language on first visit:
- If browser is set to Indonesian → Shows Indonesian
- If browser is set to English → Shows English
- Otherwise → Uses default (Indonesian)

User's choice is saved in session and persists across visits.

## Testing

1. Visit website: http://localhost:8000
2. Look for language switcher in navbar (🇮🇩 ID or 🇬🇧 EN)
3. Click dropdown and select language
4. Page should reload with new language
5. Navigate through pages - language should persist

## Notes

- Language preference is stored in **session** (not database)
- Session expires based on `SESSION_LIFETIME` in .env
- Default language is **Indonesian (ID)**
- All static text in ShopLayout has been translated
- To translate other pages, follow the same pattern

## Future Enhancements

Possible additions:
- Store language preference in user profile (database)
- Add more languages (Chinese, Japanese, etc)
- Auto-translate product descriptions
- RTL language support (Arabic, Hebrew)
