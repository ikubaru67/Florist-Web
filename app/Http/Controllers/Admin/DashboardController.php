<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Calculate statistics
        $totalProducts = Product::count();
        $totalCategories = Category::count();
        $totalOrders = Order::count();
        $averagePrice = Product::avg('price') ?? 0;

        // Get latest products (top 5)
        $latestProducts = Product::with('category')
            ->latest()
            ->limit(5)
            ->get();

        // Get category distribution
        $categoryDistribution = Category::withCount('products')
            ->having('products_count', '>', 0)
            ->get();

        // Get recent orders (top 5)
        $recentOrders = Order::with('user')
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalProducts' => $totalProducts,
                'totalCategories' => $totalCategories,
                'totalOrders' => $totalOrders,
                'averagePrice' => $averagePrice,
            ],
            'latestProducts' => $latestProducts,
            'categoryDistribution' => $categoryDistribution,
            'recentOrders' => $recentOrders,
        ]);
    }
}
