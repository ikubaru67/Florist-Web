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
        // Check if locale is stored in session
        if (Session::has('locale')) {
            $locale = Session::get('locale');
        } else {
            // Default to browser language if available, otherwise use config default
            $locale = substr($request->server('HTTP_ACCEPT_LANGUAGE'), 0, 2);
            
            // Validate locale
            if (!in_array($locale, ['en', 'id'])) {
                $locale = config('app.locale', 'en');
            }
            
            Session::put('locale', $locale);
        }
        
        App::setLocale($locale);
        
        return $next($request);
    }
}
