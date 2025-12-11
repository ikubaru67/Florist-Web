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

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories
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
            'addons' => 'nullable|array',
            'addons.*.name' => 'required_with:addons|string|max:255',
            'addons.*.description' => 'nullable|string',
            'addons.*.price' => 'required_with:addons|numeric|min:0',
            'addons.*.stock' => 'required_with:addons|integer|min:0',
            'addons.*.is_available' => 'boolean',
            'addons.*.has_custom_message' => 'boolean',
            'addons.*.images' => 'nullable|array|max:5',
            'addons.*.images.*' => 'nullable|url',
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

        // Save add-ons
        if ($request->has('addons')) {
            foreach ($request->addons as $index => $addonData) {
                $addon = \App\Models\ProductAddon::create([
                    'product_id' => $product->id,
                    'name' => $addonData['name'],
                    'description' => $addonData['description'] ?? null,
                    'price' => $addonData['price'],
                    'stock' => $addonData['stock'],
                    'is_available' => $addonData['is_available'] ?? true,
                    'has_custom_message' => $addonData['has_custom_message'] ?? false,
                    'sort_order' => $index,
                ]);

                // Save addon images
                if (isset($addonData['images']) && is_array($addonData['images'])) {
                    $imageSortOrder = 0;
                    foreach ($addonData['images'] as $imageUrl) {
                        if (!empty($imageUrl)) {
                            \App\Models\AddonImage::create([
                                'product_addon_id' => $addon->id,
                                'image_path' => $imageUrl,
                                'sort_order' => $imageSortOrder++,
                            ]);
                        }
                    }
                }
            }
        }

        return redirect()->route('admin.products.index')
            ->with('success', 'Produk berhasil ditambahkan');
    }

    public function edit(Product $product)
    {
        $categories = Category::all();

        // Load product images and addons with their images
        $product->load(['productImages', 'addons.images']);

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories
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
            'addons' => 'nullable|array',
            'addons.*.name' => 'required_with:addons|string|max:255',
            'addons.*.description' => 'nullable|string',
            'addons.*.price' => 'required_with:addons|numeric|min:0',
            'addons.*.stock' => 'required_with:addons|integer|min:0',
            'addons.*.is_available' => 'boolean',
            'addons.*.has_custom_message' => 'boolean',
            'addons.*.images' => 'nullable|array|max:5',
            'addons.*.images.*' => 'nullable|url',
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

        // Update add-ons (delete old, create new)
        if ($request->has('addons')) {
            // Delete existing addons (will cascade delete images)
            $product->addons()->delete();
            
            // Create new addons
            foreach ($request->addons as $index => $addonData) {
                $addon = \App\Models\ProductAddon::create([
                    'product_id' => $product->id,
                    'name' => $addonData['name'],
                    'description' => $addonData['description'] ?? null,
                    'price' => $addonData['price'],
                    'stock' => $addonData['stock'],
                    'is_available' => $addonData['is_available'] ?? true,
                    'has_custom_message' => $addonData['has_custom_message'] ?? false,
                    'sort_order' => $index,
                ]);

                // Save addon images
                if (isset($addonData['images']) && is_array($addonData['images'])) {
                    $imageSortOrder = 0;
                    foreach ($addonData['images'] as $imageUrl) {
                        if (!empty($imageUrl)) {
                            \App\Models\AddonImage::create([
                                'product_addon_id' => $addon->id,
                                'image_path' => $imageUrl,
                                'sort_order' => $imageSortOrder++,
                            ]);
                        }
                    }
                }
            }
        }

        return redirect()->route('admin.products.index')
            ->with('success', 'Produk berhasil diupdate');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return back()->with('success', 'Produk berhasil dihapus');
    }
}
