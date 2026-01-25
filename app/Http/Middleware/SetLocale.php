<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get locale from session first
        $locale = Session::get('locale');
        
        // If no session locale, try to detect from browser
        if (!$locale) {
            $browserLang = $request->server('HTTP_ACCEPT_LANGUAGE');
            
            if ($browserLang) {
                $locale = substr($browserLang, 0, 2);
            } else {
                $locale = config('app.locale', 'id');
            }
            
            // Validate locale
            if (!in_array($locale, ['en', 'id'])) {
                $locale = config('app.locale', 'id');
            }
            
            // Store for future requests
            Session::put('locale', $locale);
        }
        
        // Set application locale
        App::setLocale($locale);
        
        return $next($request);
    }
}
