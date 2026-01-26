<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductReviewController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

// Language Switcher
Route::post('/locale', function () {
    $locale = request()->input('locale');
    if (in_array($locale, ['id', 'en'])) {
        session(['locale' => $locale]);
    }
    return back();
})->name('locale.switch');

// Debug route untuk test translations
Route::get('/test-translation', function () {
    return Inertia::render('TestTranslation');
});

// Health Check Endpoint (for monitoring)
Route::get('/health', function () {
    try {
        // Check database connection
        DB::connection()->getPdo();
        $dbStatus = 'connected';
    } catch (\Exception $e) {
        $dbStatus = 'disconnected';
    }
    
    return response()->json([
        'status' => $dbStatus === 'connected' ? 'ok' : 'error',
        'database' => $dbStatus,
        'timestamp' => now()->toIso8601String(),
    ], $dbStatus === 'connected' ? 200 : 503);
})->name('health.check');

// Home Page
Route::get('/', [HomeController::class, 'index'])->name('home');

// Shop/Products (Katalog)
Route::get('/shop', [ProductController::class, 'index'])->name('shop.index');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');

// Product Reviews (Public can view, auth required for create)
Route::get('/products/{product}/reviews', [ProductReviewController::class, 'index'])->name('reviews.index');
Route::middleware('auth')->group(function () {
    Route::post('/products/{product}/reviews', [ProductReviewController::class, 'store'])->name('reviews.store');
    Route::put('/reviews/{review}', [ProductReviewController::class, 'update'])->name('reviews.update');
    Route::delete('/reviews/{review}', [ProductReviewController::class, 'destroy'])->name('reviews.destroy');
});

// Orders (Authentication Required)
Route::middleware('auth')->group(function () {
    // Cart
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::patch('/cart/{cartItem}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{cartItem}', [CartController::class, 'destroy'])->name('cart.destroy');
    Route::delete('/cart', [CartController::class, 'clear'])->name('cart.clear');
    Route::get('/cart/count', [CartController::class, 'count'])->name('cart.count');
    Route::get('/cart/checkout', [CartController::class, 'checkout'])->name('cart.checkout');
    Route::post('/cart/checkout', [CartController::class, 'processCheckout'])->name('cart.processCheckout');
    
    // Direct Order from Product
    Route::get('/order/{product:slug}', [OrderController::class, 'create'])->name('order.create');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    
    // My Orders
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
    Route::get('/orders/{order}/invoice', [OrderController::class, 'invoice'])->name('orders.invoice');
    
    // Invoice by order number
    Route::get('/invoice/{orderNumber}', [OrderController::class, 'showInvoice'])->name('invoice.show');
});

// Profile Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Admin Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    
    // Manage Orders
    Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [AdminOrderController::class, 'show'])->name('orders.show');
    Route::patch('/orders/{order}/accept', [AdminOrderController::class, 'accept'])->name('orders.accept');
    Route::patch('/orders/{order}/reject', [AdminOrderController::class, 'reject'])->name('orders.reject');
    Route::patch('/orders/{order}/complete', [AdminOrderController::class, 'complete'])->name('orders.complete');
    Route::patch('/orders/{order}', [AdminOrderController::class, 'update'])->name('orders.update');
    
    // Manage Products
    Route::resource('products', AdminProductController::class);
    
    // Manage Add-ons (Global)
    Route::resource('addons', \App\Http\Controllers\Admin\AddonController::class);
    
    // Settings
    Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
    Route::post('/settings/categories', [\App\Http\Controllers\Admin\SettingController::class, 'storeCategory'])->name('settings.categories.store');
    Route::put('/settings/categories/{id}', [\App\Http\Controllers\Admin\SettingController::class, 'updateCategory'])->name('settings.categories.update');
    Route::delete('/settings/categories/{id}', [\App\Http\Controllers\Admin\SettingController::class, 'deleteCategory'])->name('settings.categories.delete');
    Route::post('/settings/occasions', [\App\Http\Controllers\Admin\SettingController::class, 'storeOccasion'])->name('settings.occasions.store');
    Route::put('/settings/occasions/{id}', [\App\Http\Controllers\Admin\SettingController::class, 'updateOccasion'])->name('settings.occasions.update');
    Route::delete('/settings/occasions/{id}', [\App\Http\Controllers\Admin\SettingController::class, 'deleteOccasion'])->name('settings.occasions.delete');
});

require __DIR__.'/auth.php';

// Debug route - REMOVE IN PRODUCTION
Route::get('/debug-cart', function () {
    $userId = \Illuminate\Support\Facades\Auth::id();
    $cartItems = \App\Models\CartItem::where('user_id', $userId)->get();
    
    return response()->json([
        'user_id' => $userId,
        'cart_count' => $cartItems->count(),
        'cart_items' => $cartItems->toArray(),
        'all_cart_items' => \App\Models\CartItem::all()->toArray(),
    ]);
})->middleware('auth');
