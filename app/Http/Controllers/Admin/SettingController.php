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
        
        return Inertia::render('Admin/Settings/Index', [
            'banner_image' => $bannerImage
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
}
