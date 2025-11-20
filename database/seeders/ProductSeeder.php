<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Bunga Mawar
            [
                'category' => 'Bunga Mawar',
                'name' => 'Mawar Merah Premium',
                'description' => 'Mawar merah segar pilihan terbaik, sempurna untuk menyatakan cinta. Setiap tangkai dipilih dengan hati-hati untuk memastikan kualitas terbaik.',
                'price' => 150000,
                'stock' => 50,
                'is_featured' => true,
                'image' => 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600'
            ],
            [
                'category' => 'Bunga Mawar',
                'name' => 'Mawar Putih Elegan',
                'description' => 'Mawar putih melambangkan kesucian dan kemurnian. Cocok untuk pernikahan dan acara formal.',
                'price' => 145000,
                'stock' => 40,
                'is_featured' => false,
                'image' => 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=600'
            ],
            [
                'category' => 'Bunga Mawar',
                'name' => 'Mawar Pink Romance',
                'description' => 'Mawar pink lembut yang sempurna untuk mengungkapkan perasaan sayang dan apresiasi.',
                'price' => 140000,
                'stock' => 45,
                'is_featured' => true,
                'image' => 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600'
            ],
            
            // Bunga Tulip
            [
                'category' => 'Bunga Tulip',
                'name' => 'Tulip Belanda Merah',
                'description' => 'Tulip merah import dari Belanda dengan kualitas premium. Segar dan tahan lama.',
                'price' => 180000,
                'stock' => 30,
                'is_featured' => true,
                'image' => 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=600'
            ],
            [
                'category' => 'Bunga Tulip',
                'name' => 'Tulip Kuning Cerah',
                'description' => 'Tulip kuning ceria yang membawa kebahagiaan dan kehangatan.',
                'price' => 175000,
                'stock' => 35,
                'is_featured' => false,
                'image' => 'https://images.unsplash.com/photo-1524386416438-98b9b2d4b433?w=600'
            ],
            [
                'category' => 'Bunga Tulip',
                'name' => 'Tulip Mix Warna-Warni',
                'description' => 'Kombinasi tulip berbagai warna yang cantik dan menarik perhatian.',
                'price' => 190000,
                'stock' => 25,
                'is_featured' => true,
                'image' => 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600'
            ],

            // Bunga Lily
            [
                'category' => 'Bunga Lily',
                'name' => 'Lily Putih Oriental',
                'description' => 'Lily putih dengan aroma harum yang mewah. Sempurna untuk acara formal dan pernikahan.',
                'price' => 200000,
                'stock' => 20,
                'is_featured' => true,
                'image' => 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=600'
            ],
            [
                'category' => 'Bunga Lily',
                'name' => 'Lily Pink Casablanca',
                'description' => 'Lily pink dengan kelopak besar dan aroma yang lembut.',
                'price' => 210000,
                'stock' => 18,
                'is_featured' => false,
                'image' => 'https://images.unsplash.com/photo-1528318269406-0c2d3b6c8f14?w=600'
            ],

            // Bunga Anggrek
            [
                'category' => 'Bunga Anggrek',
                'name' => 'Anggrek Bulan Ungu',
                'description' => 'Anggrek bulan eksotis dengan warna ungu yang memukau. Tahan lama dan mudah dirawat.',
                'price' => 250000,
                'stock' => 15,
                'is_featured' => true,
                'image' => 'https://images.unsplash.com/photo-1514649923863-ceaf75b7ec40?w=600'
            ],
            [
                'category' => 'Bunga Anggrek',
                'name' => 'Anggrek Dendrobium',
                'description' => 'Anggrek dendrobium dengan rangkaian bunga yang lebat dan cantik.',
                'price' => 230000,
                'stock' => 12,
                'is_featured' => false,
                'image' => 'https://images.unsplash.com/photo-1584292752865-85836f8ac911?w=600'
            ],

            // Bunga Matahari
            [
                'category' => 'Bunga Matahari',
                'name' => 'Bunga Matahari Giant',
                'description' => 'Bunga matahari berukuran besar yang ceria dan mencerahkan suasana.',
                'price' => 120000,
                'stock' => 40,
                'is_featured' => true,
                'image' => 'https://images.unsplash.com/photo-1597848212624-e4c0d1d3f58c?w=600'
            ],
            [
                'category' => 'Bunga Matahari',
                'name' => 'Sunflower Bouquet',
                'description' => 'Rangkaian bunga matahari yang penuh dengan energi positif.',
                'price' => 165000,
                'stock' => 30,
                'is_featured' => false,
                'image' => 'https://images.unsplash.com/photo-1530027644375-9c83053d392e?w=600'
            ],

            // Bouquet
            [
                'category' => 'Bouquet',
                'name' => 'Rose Bouquet Deluxe',
                'description' => 'Rangkaian 12 tangkai mawar merah premium dengan wrapping elegan.',
                'price' => 350000,
                'stock' => 20,
                'is_featured' => true,
                'image' => 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600'
            ],
            [
                'category' => 'Bouquet',
                'name' => 'Mixed Flower Bouquet',
                'description' => 'Kombinasi berbagai jenis bunga segar dalam satu rangkaian cantik.',
                'price' => 300000,
                'stock' => 25,
                'is_featured' => true,
                'image' => 'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600'
            ],
            [
                'category' => 'Bouquet',
                'name' => 'Graduation Bouquet',
                'description' => 'Bouquet spesial untuk wisuda dengan tema ceria dan penuh warna.',
                'price' => 280000,
                'stock' => 30,
                'is_featured' => false,
                'image' => 'https://images.unsplash.com/photo-1535379453347-1ffd615e2e08?w=600'
            ],
            [
                'category' => 'Bouquet',
                'name' => 'Wedding Bouquet Classic',
                'description' => 'Bouquet pernikahan klasik dengan mawar putih dan baby breath.',
                'price' => 450000,
                'stock' => 15,
                'is_featured' => true,
                'image' => 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600'
            ]
        ];

        foreach ($products as $productData) {
            $category = Category::where('name', $productData['category'])->first();
            
            if ($category) {
                Product::create([
                    'category_id' => $category->id,
                    'name' => $productData['name'],
                    'slug' => Str::slug($productData['name']),
                    'description' => $productData['description'],
                    'price' => $productData['price'],
                    'stock' => $productData['stock'],
                    'is_featured' => $productData['is_featured'],
                    'is_active' => true,
                    'image' => $productData['image']
                ]);
            }
        }
    }
}
