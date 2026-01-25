<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class LanguageController extends Controller
{
    /**
     * Switch application language
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function switch(Request $request)
    {
        $locale = $request->input('locale', 'id');
        
        // Validate locale
        if (!in_array($locale, ['en', 'id'])) {
            $locale = 'id';
        }
        
        // Store locale in session
        Session::put('locale', $locale);
        Session::save(); // Force save session immediately
        
        // Set application locale for current request
        App::setLocale($locale);
        
        // Return redirect to refresh page with new locale
        return redirect()->back();
    }
}
