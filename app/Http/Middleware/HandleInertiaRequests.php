<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $locale = app()->getLocale();
        
        // Load translations for current locale
        $translationsPath = lang_path("{$locale}/messages.php");
        $translations = [];
        
        if (File::exists($translationsPath)) {
            $translations = include $translationsPath;
        }
        
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'locale' => $locale,
            'translations' => $translations,
        ];
    }
}
