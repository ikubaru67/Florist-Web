<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Addon;
use App\Models\AddonImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AddonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $addons = Addon::with('images')
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
                    'is_available' => $addon->is_available,
                    'has_custom_message' => $addon->has_custom_message,
                    'sort_order' => $addon->sort_order,
                    'images' => $addon->images->map(fn($img) => [
                        'id' => $img->id,
                        'image_path' => $img->image_path, // URL langsung
                        'sort_order' => $img->sort_order,
                    ]),
                    'created_at' => $addon->created_at,
                ];
            });

        return Inertia::render('Admin/Addons/Index', [
            'addons' => $addons,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Addons/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'is_available' => 'boolean',
            'has_custom_message' => 'boolean',
            'image_urls' => 'nullable|array',
            'image_urls.*' => ['nullable', 'string'],
        ]);

        $addon = Addon::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'is_available' => $validated['is_available'] ?? true,
            'has_custom_message' => $validated['has_custom_message'] ?? false,
            'sort_order' => 0,
        ]);

        // Handle image URLs
        if ($request->has('image_urls')) {
            foreach ($request->image_urls as $index => $imageUrl) {
                if (!empty($imageUrl)) {
                    AddonImage::create([
                        'addon_id' => $addon->id,
                        'image_path' => $imageUrl,
                        'sort_order' => $index,
                    ]);
                }
            }
        }

        return redirect()->route('admin.addons.index')
            ->with('success', 'Add-on berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Addon $addon)
    {
        $addon->load('images');

        return Inertia::render('Admin/Addons/Edit', [
            'addon' => [
                'id' => $addon->id,
                'name' => $addon->name,
                'description' => $addon->description,
                'price' => $addon->price,
                'stock' => $addon->stock,
                'is_available' => $addon->is_available,
                'has_custom_message' => $addon->has_custom_message,
                'sort_order' => $addon->sort_order,
                'images' => $addon->images->map(fn($img) => [
                    'id' => $img->id,
                    'image_path' => $img->image_path, // URL langsung
                    'sort_order' => $img->sort_order,
                ]),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Addon $addon)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'is_available' => 'boolean',
            'has_custom_message' => 'boolean',
            'image_urls' => 'nullable|array',
            'image_urls.*' => ['nullable', 'string'],
        ]);

        $addon->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'is_available' => $validated['is_available'] ?? true,
            'has_custom_message' => $validated['has_custom_message'] ?? false,
            'sort_order' => 0,
        ]);

        // Delete all existing images and re-create from URLs
        $addon->images()->delete();

        // Handle image URLs
        if ($request->has('image_urls')) {
            foreach ($request->image_urls as $index => $imageUrl) {
                if (!empty($imageUrl)) {
                    AddonImage::create([
                        'addon_id' => $addon->id,
                        'image_path' => $imageUrl,
                        'sort_order' => $index,
                    ]);
                }
            }
        }

        return redirect()->route('admin.addons.index')
            ->with('success', 'Add-on berhasil diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Addon $addon)
    {
        // Delete all associated images
        foreach ($addon->images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }

        $addon->delete();

        return redirect()->route('admin.addons.index')
            ->with('success', 'Add-on berhasil dihapus!');
    }
}
