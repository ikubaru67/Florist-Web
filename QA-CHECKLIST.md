# ✅ QA Testing Checklist - Florist Shop

**Date:** _______________  
**Tested By:** _______________  
**Environment:** ☐ Local ☐ Staging ☐ Production  
**Browser:** ☐ Chrome ☐ Firefox ☐ Safari ☐ Edge  
**Device:** ☐ Desktop ☐ Tablet ☐ Mobile  

---

## 🔴 CRITICAL (P0) - Must Pass Before Launch

### Authentication & Authorization

- [ ] **Register new user**
  - [ ] Form validation works (required fields, email format, password min length)
  - [ ] Email sent with OTP code
  - [ ] OTP received in inbox (not spam)
  - [ ] Verify OTP → Account activated
  - [ ] Redirect to home after verification
  - [ ] User data saved in database

- [ ] **Login**
  - [ ] Login with correct credentials → Success
  - [ ] Login with wrong password → Error message
  - [ ] Login with unregistered email → Error message
  - [ ] Session persists after page reload
  - [ ] Rate limiting works (max 5 attempts per minute)

- [ ] **Logout**
  - [ ] Logout clears session
  - [ ] Redirect to login page
  - [ ] Cannot access protected pages after logout

- [ ] **Authorization**
  - [ ] Admin can access admin panel
  - [ ] Regular user CANNOT access admin routes (403 error)
  - [ ] Guest redirected to login for protected routes

### Shopping Cart & Checkout

- [ ] **Add to Cart**
  - [ ] Click "Add to Cart" → Item added
  - [ ] Success message displayed
  - [ ] Cart badge count increases
  - [ ] Cart persists after page reload
  - [ ] Adding same product increases quantity (no duplicate)
  - [ ] Stock validation (cannot add more than available)
  - [ ] **CRITICAL: Race condition test**
    - [ ] Open 2 tabs, add same product from both → Stock correct
    - [ ] Two users checkout last item simultaneously → Only one succeeds

- [ ] **View Cart**
  - [ ] All cart items displayed correctly
  - [ ] Product images, names, prices show
  - [ ] Quantity can be updated
  - [ ] Subtotal calculates correctly
  - [ ] Total amount correct
  - [ ] Remove item works
  - [ ] Clear cart works
  - [ ] **CRITICAL: Deleted product handling**
    - [ ] Admin deletes product in cart → Cart shows message/removes item gracefully

- [ ] **Checkout Process**
  - [ ] Click "Checkout" → Form displayed
  - [ ] Form pre-filled with user data
  - [ ] Required field validation works
  - [ ] **CRITICAL: Stock validation during checkout**
    - [ ] Stock insufficient → Error message, order NOT created
    - [ ] Stock exactly matches quantity → Order succeeds
  - [ ] Order created in database
  - [ ] **CRITICAL: Stock decreases correctly**
    - [ ] Order 3 items → Stock decreases by 3
    - [ ] Stock NEVER goes negative
  - [ ] Cart cleared after successful checkout
  - [ ] Redirect to invoice page
  - [ ] Invoice displays all order details
  - [ ] WhatsApp button works (pre-filled message)

### Admin Panel

- [ ] **Product Management**
  - [ ] Admin can create product
  - [ ] Image upload works (jpg, png, max 2MB)
  - [ ] Product appears in shop
  - [ ] Admin can edit product
  - [ ] Image can be replaced
  - [ ] Admin can delete product
  - [ ] **CRITICAL: Product in cart handling**
    - [ ] Delete product that's in user's cart → User cart handles gracefully

- [ ] **Order Management**
  - [ ] Admin can view all orders
  - [ ] Search orders by name/email/order number works
  - [ ] Filter by status works
  - [ ] Admin can view order details
  - [ ] Admin can update order status
  - [ ] Status change reflects immediately

### Security

- [ ] **Rate Limiting**
  - [ ] Login: Max 5 attempts per minute
  - [ ] Register: Max 5 attempts per minute
  - [ ] Password reset: Max 3 attempts per minute
  - [ ] Exceeded limit → 429 error page shown

- [ ] **Data Protection**
  - [ ] Passwords hashed (not visible in database)
  - [ ] CSRF protection enabled (forms have token)
  - [ ] SQL injection prevented (test with `' OR '1'='1`)
  - [ ] XSS prevented (test with `<script>alert('XSS')</script>`)

- [ ] **File Upload Security**
  - [ ] Only images accepted (jpg, png)
  - [ ] Files over 2MB rejected
  - [ ] Malicious files rejected (.exe, .php, .sh)

---

## 🟠 HIGH PRIORITY (P1)

### Email System

- [ ] **OTP Email**
  - [ ] Email delivered to inbox (not spam)
  - [ ] OTP code visible and copyable
  - [ ] Email template looks good (HTML formatted)
  - [ ] Sender name: "Florist Shop"
  - [ ] Email readable on mobile

- [ ] **Email Validation**
  - [ ] OTP correct → Verification succeeds
  - [ ] OTP incorrect → Error message
  - [ ] OTP expired (>10 min) → Error message
  - [ ] Resend OTP → New code sent

### Product Features

- [ ] **Product Display**
  - [ ] Product grid loads correctly
  - [ ] Images display properly
  - [ ] Prices formatted correctly (Rupiah)
  - [ ] Category tags show
  - [ ] Featured badge shows for featured products
  - [ ] Out of stock badge for stock = 0

- [ ] **Product Detail**
  - [ ] All product info displayed
  - [ ] Quantity selector works (+/-)
  - [ ] Cannot select quantity > stock
  - [ ] "Add to Cart" button works
  - [ ] "Buy Now" button works (direct checkout)

- [ ] **Search & Filter**
  - [ ] Search by product name works
  - [ ] Filter by category works
  - [ ] Search + filter combination works
  - [ ] Clear filters works
  - [ ] No results → Empty state message

### Order System

- [ ] **My Orders**
  - [ ] User can view order history
  - [ ] Orders sorted by date (newest first)
  - [ ] Filter by status works
  - [ ] Click order → View details
  - [ ] Order details correct (items, total, shipping info)

- [ ] **Invoice**
  - [ ] Invoice displays all order info
  - [ ] Order number correct
  - [ ] Items list correct
  - [ ] Prices and total correct
  - [ ] Shipping information correct
  - [ ] WhatsApp contact button works

---

## 🟡 MEDIUM PRIORITY (P2)

### UI/UX

- [ ] **Responsive Design**
  - [ ] Mobile (320px-480px)
    - [ ] Layout single column
    - [ ] Text readable
    - [ ] Buttons finger-friendly
    - [ ] Images scale properly
    - [ ] Hamburger menu works
  - [ ] Tablet (481px-768px)
    - [ ] Layout 2 columns
    - [ ] Touch-friendly
    - [ ] Navigation proper
  - [ ] Desktop (769px+)
    - [ ] Layout 4 columns (products)
    - [ ] Hover effects work
    - [ ] Full navigation visible

- [ ] **Visual Consistency**
  - [ ] Colors consistent (pink theme)
  - [ ] Fonts readable
  - [ ] Buttons same style
  - [ ] Forms aligned
  - [ ] Icons display correctly

- [ ] **Loading States**
  - [ ] Loading indicators show when processing
  - [ ] Buttons disabled during submission
  - [ ] No double-submit possible

- [ ] **Empty States**
  - [ ] Empty cart → Message with icon
  - [ ] No orders → Message with link to shop
  - [ ] No search results → Helpful message
  - [ ] No products in category → Message

### Error Handling

- [ ] **Error Pages**
  - [ ] 403 page displays correctly
  - [ ] 404 page displays correctly
  - [ ] 429 page displays correctly (rate limit)
  - [ ] 500 page displays correctly
  - [ ] 503 page displays correctly (maintenance)
  - [ ] All error pages have "Back to Home" button

- [ ] **Form Errors**
  - [ ] Validation errors user-friendly
  - [ ] Error messages specific (not generic)
  - [ ] Errors highlighted (red text/border)
  - [ ] Success messages show (green)

### Performance

- [ ] **Page Load Speed**
  - [ ] Home page loads < 3 seconds
  - [ ] Shop page loads < 3 seconds
  - [ ] Product detail < 2 seconds
  - [ ] Cart page < 2 seconds
  - [ ] Admin panel < 3 seconds

- [ ] **Database Performance**
  - [ ] No N+1 queries (check logs)
  - [ ] Pagination works efficiently
  - [ ] Search is fast (< 1 second)

---

## 🟢 NICE TO HAVE (P3)

### Additional Features

- [ ] **Pagination**
  - [ ] Products paginated (20 per page)
  - [ ] Orders paginated (admin panel)
  - [ ] Page numbers clickable
  - [ ] "Previous" and "Next" work

- [ ] **Notifications**
  - [ ] Success messages appear
  - [ ] Error messages appear
  - [ ] Messages auto-dismiss (or closeable)

- [ ] **Admin UX**
  - [ ] Tables scrollable horizontally on mobile
  - [ ] Buttons consistent styling
  - [ ] Search instant (or with "Search" button)
  - [ ] Bulk actions (future feature)

---

## 🔍 Cross-Browser Testing

- [ ] **Chrome** (latest)
  - [ ] All features work
  - [ ] Layout correct
  - [ ] No console errors

- [ ] **Firefox** (latest)
  - [ ] All features work
  - [ ] Layout correct
  - [ ] No console errors

- [ ] **Safari** (latest)
  - [ ] All features work
  - [ ] Layout correct
  - [ ] No console errors

- [ ] **Edge** (latest)
  - [ ] All features work
  - [ ] Layout correct
  - [ ] No console errors

---

## 🧪 Edge Cases & Stress Tests

### Concurrent Operations

- [ ] **Race Conditions**
  - [ ] 2 users buy last item → Only 1 succeeds
  - [ ] Admin deletes product while user adds to cart → Handled gracefully
  - [ ] Admin updates stock during checkout → Order validates current stock

### Data Integrity

- [ ] **Database Constraints**
  - [ ] Cannot create duplicate email
  - [ ] Foreign keys enforced
  - [ ] Order number unique

### Boundary Tests

- [ ] **Quantity Limits**
  - [ ] Cannot add 0 quantity
  - [ ] Cannot add negative quantity
  - [ ] Cannot exceed stock (validated)

- [ ] **File Upload**
  - [ ] Files exactly 2MB accepted
  - [ ] Files > 2MB rejected
  - [ ] Multiple file uploads (future)

---

## 📊 QA Summary

**Total Tests:** _____ / _____  
**Pass Rate:** _____ %  
**Critical Failures:** _____  
**High Priority Failures:** _____  
**Medium Priority Failures:** _____  

### Blocker Issues (Cannot Launch):
1. _________________________________
2. _________________________________
3. _________________________________

### High Priority Issues (Should Fix):
1. _________________________________
2. _________________________________
3. _________________________________

### Notes:
_________________________________
_________________________________
_________________________________

---

## ✅ QA Sign-Off

**QA Engineer:** _______________  
**Date:** _______________  
**Signature:** _______________  

**Product Owner:** _______________  
**Date:** _______________  
**Signature:** _______________  

---

**Ready for Production?** ☐ YES ☐ NO (with conditions) ☐ NO

**Conditions (if any):**
_________________________________
_________________________________
