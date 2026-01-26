<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Setting;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $featuredProducts = Product::with(['category', 'images'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->where('is_featured', true)
            ->where('is_active', true)
            ->limit(8)
            ->get();

        $categories = Category::withCount('products')
            ->take(6)
            ->get();

        $latestProducts = Product::with(['category', 'images'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->where('is_active', true)
            ->latest()
            ->limit(8)
            ->get();
        
        $bannerImage = Setting::get('home_banner_image', 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&h=600&fit=crop');

        return Inertia::render('Welcome', [
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'latestProducts' => $latestProducts,
            'bannerImage' => $bannerImage
        ]);
    }
}
