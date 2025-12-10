<?php

namespace App\Http\Controllers;

use App\Models\ProductReview;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductReviewController extends Controller
{
    /**
     * Display reviews for a specific product
     */
    public function index($productId)
    {
        $product = Product::with(['reviews.user'])->findOrFail($productId);
        
        $reviews = $product->reviews()
            ->with('user')
            ->latest()
            ->paginate(10);

        return response()->json([
            'reviews' => $reviews,
            'average_rating' => round($product->average_rating, 1),
            'total_reviews' => $product->reviews_count
        ]);
    }

    /**
     * Show form to create review (check if user can review)
     */
    public function create($productId)
    {
        if (!Auth::check()) {
            return redirect()->route('login')
                ->with('error', 'Silakan login terlebih dahulu untuk memberikan review.');
        }

        $product = Product::findOrFail($productId);
        
        // Check if user has purchased this product
        $hasPurchased = Order::where('user_id', Auth::id())
            ->where('status', 'completed')
            ->whereHas('items', function($query) use ($productId) {
                $query->where('product_id', $productId);
            })
            ->exists();

        if (!$hasPurchased) {
            return redirect()->back()
                ->with('error', 'Anda hanya bisa memberikan review untuk produk yang sudah dibeli.');
        }

        // Check if already reviewed
        $existingReview = ProductReview::where('user_id', Auth::id())
            ->where('product_id', $productId)
            ->first();

        if ($existingReview) {
            return redirect()->back()
                ->with('info', 'Anda sudah memberikan review untuk produk ini.');
        }

        return Inertia::render('Product/Review', [
            'product' => $product
        ]);
    }

    /**
     * Store a new review
     */
    public function store(Request $request, $productId)
    {
        if (!Auth::check()) {
            return redirect()->route('login')
                ->with('error', 'Silakan login terlebih dahulu.');
        }

        \Log::info('Review submission started', [
            'product_id' => $productId,
            'user_id' => Auth::id(),
            'request_data' => $request->all()
        ]);

        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'order_item_id' => 'nullable|exists:order_items,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000'
        ]);

        \Log::info('Validation passed', ['validated' => $validated]);

        $product = Product::findOrFail($productId);

        // Verify order belongs to user and contains the product
        $order = Order::where('id', $validated['order_id'])
            ->where('user_id', Auth::id())
            ->where('status', 'completed')
            ->whereHas('items', function($query) use ($productId) {
                $query->where('product_id', $productId);
            })
            ->firstOrFail();

        // If order_item_id not provided (from product page), find it automatically
        if (!isset($validated['order_item_id'])) {
            $orderItem = $order->items()
                ->where('product_id', $productId)
                ->first();
            
            if ($orderItem) {
                $validated['order_item_id'] = $orderItem->id;
                \Log::info('Auto-detected order_item_id', ['order_item_id' => $orderItem->id]);
            }
        }

        // Check if already reviewed for this order+product combination
        // Need to check both: review with specific order_item_id OR review without order_item_id (from product page)
        $existingReview = ProductReview::where('user_id', Auth::id())
            ->where('product_id', $productId)
            ->where('order_id', $order->id)
            ->where(function($query) use ($validated) {
                if (isset($validated['order_item_id'])) {
                    // Check if this specific item was reviewed OR if product was reviewed from product page
                    $query->where('order_item_id', $validated['order_item_id'])
                          ->orWhereNull('order_item_id');
                } else {
                    // Reviewing from product page - check if any review exists for this order+product
                    $query->whereNull('order_item_id')
                          ->orWhereNotNull('order_item_id');
                }
            })
            ->exists();
        
        if ($existingReview) {
            \Log::warning('Review already exists', [
                'product_id' => $productId,
                'user_id' => Auth::id(),
                'order_id' => $order->id,
                'order_item_id' => $validated['order_item_id'] ?? null
            ]);
            return back()->with('error', 'Anda sudah memberikan review untuk produk ini dari pesanan tersebut.');
        }

        $review = ProductReview::create([
            'product_id' => $productId,
            'user_id' => Auth::id(),
            'order_id' => $order->id,
            'order_item_id' => $validated['order_item_id'] ?? null,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'is_verified_purchase' => true
        ]);

        \Log::info('Review created successfully', ['review_id' => $review->id]);

        // Return redirect back to previous page (product page or orders page)
        return back()->with('success', 'Review berhasil ditambahkan. Terima kasih!');
    }

    /**
     * Update existing review
     */
    public function update(Request $request, $reviewId)
    {
        $review = ProductReview::where('id', $reviewId)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000'
        ]);

        $review->update($validated);

        return redirect()->back()
            ->with('success', 'Review berhasil diupdate.');
    }

    /**
     * Delete review
     */
    public function destroy($reviewId)
    {
        $review = ProductReview::where('id', $reviewId)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $review->delete();

        return redirect()->back()
            ->with('success', 'Review berhasil dihapus.');
    }
}
