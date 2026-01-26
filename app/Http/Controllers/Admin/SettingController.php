<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $bannerImage = Setting::get('home_banner_image', 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&h=600&fit=crop');
        $categories = \App\Models\Category::withCount('products')->orderBy('name')->get();
        $occasions = \App\Models\Occasion::withCount('products')->orderBy('name')->get();
        
        return Inertia::render('Admin/Settings/Index', [
            'banner_image' => $bannerImage,
            'categories' => $categories,
            'occasions' => $occasions
        ]);
    }
    
    public function update(Request $request)
    {
        $validated = $request->validate([
            'banner_image' => ['required', 'string', 'max:2048']
        ]);
        
        Setting::set('home_banner_image', $validated['banner_image']);
        
        return redirect()->route('admin.settings.index')
            ->with('success', 'Pengaturan berhasil diperbarui!');
    }
    
    public function storeCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
        ]);
        
        \App\Models\Category::create($validated);
        
        return redirect()->route('admin.settings.index')
            ->with('success', 'Kategori berhasil ditambahkan!');
    }
    
    public function updateCategory(Request $request, $id)
    {
        $category = \App\Models\Category::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
        ]);
        
        $category->update($validated);
        
        return redirect()->route('admin.settings.index')
            ->with('success', 'Kategori berhasil diperbarui!');
    }
    
    public function deleteCategory($id)
    {
        $category = \App\Models\Category::findOrFail($id);
        
        // Check if category has products
        if ($category->products()->count() > 0) {
            return redirect()->route('admin.settings.index')
                ->with('error', 'Tidak dapat menghapus kategori yang masih memiliki produk!');
        }
        
        $category->delete();
        
        return redirect()->route('admin.settings.index')
            ->with('success', 'Kategori berhasil dihapus!');
    }

    public function storeOccasion(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
        ]);
        
        \App\Models\Occasion::create($validated);
        
        return redirect()->route('admin.settings.index')
            ->with('success', 'Occasion berhasil ditambahkan!');
    }
    
    public function updateOccasion(Request $request, $id)
    {
        $occasion = \App\Models\Occasion::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
        ]);
        
        $occasion->update($validated);
        
        return redirect()->route('admin.settings.index')
            ->with('success', 'Occasion berhasil diperbarui!');
    }
    
    public function deleteOccasion($id)
    {
        $occasion = \App\Models\Occasion::findOrFail($id);
        
        // Check if occasion has products
        if ($occasion->products()->count() > 0) {
            return redirect()->route('admin.settings.index')
                ->with('error', 'Tidak dapat menghapus occasion yang masih memiliki produk!');
        }
        
        $occasion->delete();
        
        return redirect()->route('admin.settings.index')
            ->with('success', 'Occasion berhasil dihapus!');
    }
}
