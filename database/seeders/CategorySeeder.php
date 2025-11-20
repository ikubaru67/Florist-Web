<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Bunga Mawar',
                'slug' => Str::slug('Bunga Mawar'),
                'description' => 'Koleksi bunga mawar segar dalam berbagai warna',
                'image' => 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400'
            ],
            [
                'name' => 'Bunga Tulip',
                'slug' => Str::slug('Bunga Tulip'),
                'description' => 'Tulip cantik untuk berbagai acara',
                'image' => 'https://images.unsplash.com/photo-1524386416438-98b9b2d4b433?w=400'
            ],
            [
                'name' => 'Bunga Lily',
                'slug' => Str::slug('Bunga Lily'),
                'description' => 'Lily elegan dengan aroma khas',
                'image' => 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=400'
            ],
            [
                'name' => 'Bunga Anggrek',
                'slug' => Str::slug('Bunga Anggrek'),
                'description' => 'Anggrek eksotis untuk hadiah istimewa',
                'image' => 'https://images.unsplash.com/photo-1514649923863-ceaf75b7ec40?w=400'
            ],
            [
                'name' => 'Bunga Matahari',
                'slug' => Str::slug('Bunga Matahari'),
                'description' => 'Bunga matahari ceria yang mencerahkan hari',
                'image' => 'https://images.unsplash.com/photo-1597848212624-e4c0d1d3f58c?w=400'
            ],
            [
                'name' => 'Bouquet',
                'slug' => Str::slug('Bouquet'),
                'description' => 'Rangkaian bunga cantik siap dikirim',
                'image' => 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400'
            ]
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
