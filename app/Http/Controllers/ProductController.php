<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category')
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->where('is_active', true);

        // Filter by category
        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Search
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Sort
        $sortBy = $request->get('sort', 'latest');
        switch ($sortBy) {
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'name':
                $query->orderBy('name', 'asc');
                break;
            default:
                $query->latest();
        }

        $products = $query->paginate(12);
        $categories = Category::withCount('products')->get();

        return Inertia::render('Shop/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'category' => $request->category,
                'search' => $request->search,
                'sort' => $sortBy
            ]
        ]);
    }

    public function show($slug)
    {
        $product = Product::with([
                'category',
                'productImages' => function($query) {
                    $query->orderBy('sort_order');
                },
                'reviews' => function($query) {
                    $query->with('user')->latest()->limit(10);
                }
            ])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        // Get related products from same category
        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->limit(4)
            ->get();

        // Check if current user can review this product
        $canReview = false;
        $userOrder = null;
        
        if (auth()->check()) {
            // Cek apakah user punya order completed dengan produk ini
            $completedOrder = \App\Models\Order::where('user_id', auth()->id())
                ->where('status', 'completed')
                ->whereHas('items', function($query) use ($product) {
                    $query->where('product_id', $product->id);
                })
                ->first();
            
            if ($completedOrder) {
                // Cek apakah user sudah pernah review produk ini dari order tersebut
                $existingReview = \App\Models\ProductReview::where('product_id', $product->id)
                    ->where('user_id', auth()->id())
                    ->where('order_id', $completedOrder->id)
                    ->exists();
                
                if (!$existingReview) {
                    $canReview = true;
                    $userOrder = $completedOrder;
                }
            }
        }

        return Inertia::render('Shop/ProductDetail', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
            'canReview' => $canReview,
            'userOrder' => $userOrder
        ]);
    }
}
