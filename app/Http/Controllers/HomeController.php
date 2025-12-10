<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $featuredProducts = Product::with('category')
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->where('is_featured', true)
            ->where('is_active', true)
            ->limit(8)
            ->get();

        $categories = Category::withCount('products')
            ->take(6)
            ->get();

        $latestProducts = Product::with('category')
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->where('is_active', true)
            ->latest()
            ->limit(8)
            ->get();

        return Inertia::render('Home', [
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'latestProducts' => $latestProducts
        ]);
    }
}
