<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category')->latest();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhereHas('category', function ($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $products = $query->paginate(20)->withQueryString();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'filters' => [
                'search' => $request->search
            ]
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        $addons = \App\Models\Addon::with('images')
            ->where('is_available', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->map(function ($addon) {
                return [
                    'id' => $addon->id,
                    'name' => $addon->name,
                    'description' => $addon->description,
                    'price' => $addon->price,
                    'stock' => $addon->stock,
                    'has_custom_message' => $addon->has_custom_message,
                    'images' => $addon->images->map(fn($img) => [
                        'id' => $img->id,
                        'url' => $img->image_path,
                    ]),
                ];
            });

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories,
            'availableAddons' => $addons,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|url',
            'additional_images' => 'nullable|array|max:5',
            'additional_images.*' => 'nullable|url',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'selected_addons' => 'nullable|array',
            'selected_addons.*' => 'exists:addons,id',
        ]);

        $product = Product::create([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'image' => $request->image,
            'is_featured' => $request->is_featured ?? false,
            'is_active' => $request->is_active ?? true
        ]);

        // Save additional images
        if ($request->has('additional_images')) {
            $sortOrder = 0;
            foreach ($request->additional_images as $imageUrl) {
                if (!empty($imageUrl)) {
                    \App\Models\ProductImage::create([
                        'product_id' => $product->id,
                        'image_path' => $imageUrl,
                        'sort_order' => $sortOrder++,
                        'is_primary' => false
                    ]);
                }
            }
        }

        // Attach selected global add-ons to product
        if ($request->has('selected_addons') && is_array($request->selected_addons)) {
            $product->addons()->attach($request->selected_addons);
        }

        return redirect()->route('admin.products.index')
            ->with('success', 'Produk berhasil ditambahkan!');
    }

    public function edit(Product $product)
    {
        $categories = Category::all();
        
        // Load product images and addons with their images
        $product->load(['productImages', 'addons.images']);

        // Get all available addons
        $addons = \App\Models\Addon::with('images')
            ->where('is_available', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->map(function ($addon) {
                return [
                    'id' => $addon->id,
                    'name' => $addon->name,
                    'description' => $addon->description,
                    'price' => $addon->price,
                    'stock' => $addon->stock,
                    'has_custom_message' => $addon->has_custom_message,
                    'images' => $addon->images->map(fn($img) => [
                        'id' => $img->id,
                        'url' => $img->image_path,
                    ]),
                ];
            });

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories,
            'availableAddons' => $addons,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|url',
            'additional_images' => 'nullable|array|max:5',
            'additional_images.*' => 'nullable|url',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'selected_addons' => 'nullable|array',
            'selected_addons.*' => 'exists:addons,id',
        ]);

        $product->update([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'image' => $request->image,
            'is_featured' => $request->is_featured ?? false,
            'is_active' => $request->is_active ?? true
        ]);

        // Update additional images (delete old, create new)
        if ($request->has('additional_images')) {
            // Delete existing images
            $product->productImages()->delete();
            
            // Save new images
            $sortOrder = 0;
            foreach ($request->additional_images as $imageUrl) {
                if (!empty($imageUrl)) {
                    \App\Models\ProductImage::create([
                        'product_id' => $product->id,
                        'image_path' => $imageUrl,
                        'sort_order' => $sortOrder++,
                        'is_primary' => false
                    ]);
                }
            }
        }

        // Sync selected addons (many-to-many relationship)
        if ($request->has('selected_addons')) {
            $product->addons()->sync($request->selected_addons);
        } else {
            $product->addons()->detach();
        }

        return redirect()->route('admin.products.index')
            ->with('success', 'Produk berhasil diperbarui!');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return back()->with('success', 'Produk berhasil dihapus');
    }
}
