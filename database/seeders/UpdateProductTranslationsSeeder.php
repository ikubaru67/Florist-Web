<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\Addon;

class UpdateProductTranslationsSeeder extends Seeder
{
    public function run(): void
    {
        // Update Products by ID
        $productsById = [
            3 => ['name_en' => 'Pink Romance Roses', 'description_en' => 'Beautiful pink roses symbolizing grace and sweetness. Perfect for expressing gentle love and appreciation to loved ones.'],
            4 => ['name_en' => 'Dutch Red Tulips', 'description_en' => 'Premium red tulips imported directly from the Netherlands. Fresh and vibrant, perfect for home decoration or special gifts.'],
            5 => ['name_en' => 'Bright Yellow Tulips', 'description_en' => 'Cheerful bright yellow tulips bringing happiness and positive energy. Perfect for brightening up your room or as a friendship gift.'],
            6 => ['name_en' => 'Colorful Mixed Tulips', 'description_en' => 'Beautiful combination of various colored tulips in one harmonious arrangement. Creates a cheerful and festive atmosphere.'],
            7 => ['name_en' => 'White Oriental Lilies', 'description_en' => 'Elegant white oriental lilies with captivating fragrance. Symbol of purity and majesty for special occasions.'],
            8 => ['name_en' => 'Pink Casablanca Lilies', 'description_en' => 'Luxurious pink casablanca lilies with large blooms. Elegant and fragrant, perfect for special celebrations.'],
            9 => ['name_en' => 'Purple Phalaenopsis Orchids', 'description_en' => 'Beautiful purple phalaenopsis orchids with long-lasting blooms. Exotic and elegant for home or office decoration.'],
            10 => ['name_en' => 'Dendrobium Orchids', 'description_en' => 'Exotic dendrobium orchids with abundant blooms along the stem. Durable and perfect as a special decorative plant.'],
            11 => ['name_en' => 'Giant Sunflowers', 'description_en' => 'Large giant sunflowers bringing cheerful energy and warmth. Symbol of happiness and loyalty.'],
            12 => ['name_en' => 'Sunflower Bouquet', 'description_en' => 'Beautiful bouquet of fresh sunflowers wrapped elegantly. Perfect gift for bringing joy and cheerfulness.'],
            13 => ['name_en' => 'Deluxe Rose Bouquet', 'description_en' => 'Luxurious deluxe rose bouquet with the finest quality roses. Perfect for expressing deep love and appreciation.'],
            14 => ['name_en' => 'Mixed Flower Bouquet', 'description_en' => 'Beautiful combination of various types and colors of fresh flowers. Perfect for celebrations and special moments.'],
            15 => ['name_en' => 'Graduation Bouquet', 'description_en' => 'Special graduation bouquet designed to celebrate academic achievements. Cheerful and inspiring.'],
            16 => ['name_en' => 'Classic Wedding Bouquet', 'description_en' => 'Classic and elegant wedding bouquet specially designed for your special wedding day. Timeless beauty.']
        ];

        foreach ($productsById as $id => $translations) {
            Product::where('id', $id)->update($translations);
        }

        // Update Products by Name
        $products = [
            'Mawar Merah Premium' => [
                'name_en' => 'Premium Red Roses',
                'description_en' => 'Fresh premium quality red roses, perfect for expressing love and affection. Each stem is carefully selected to ensure beauty and freshness.'
            ],
            'Mawar Putih Elegan' => [
                'name_en' => 'Elegant White Roses',
                'description_en' => 'Elegant pure white roses symbolizing purity and sincerity. Ideal for weddings and special ceremonial occasions.'
            ],
            'Bouquet Bunga Campur' => [
                'name_en' => 'Mixed Flower Bouquet',
                'description_en' => 'Beautiful combination of various fresh flowers in one harmonious arrangement. Perfect for celebrations and special moments.'
            ],
            'Lily Putih Segar' => [
                'name_en' => 'Fresh White Lilies',
                'description_en' => 'Fresh white lilies with captivating fragrance. Symbol of purity and elegance for every special occasion.'
            ],
            'Tulip Merah Belanda' => [
                'name_en' => 'Dutch Red Tulips',
                'description_en' => 'Premium red tulips directly imported from the Netherlands. Fresh and long-lasting, perfect for home decoration or gifts.'
            ],
            'Anggrek Bulan Premium' => [
                'name_en' => 'Premium Phalaenopsis Orchids',
                'description_en' => 'Premium quality phalaenopsis orchids with beautiful blooms. Long-lasting and elegant for any room decoration.'
            ],
            'Buket Pengantin Mewah' => [
                'name_en' => 'Luxurious Bridal Bouquet',
                'description_en' => 'Luxury bridal bouquet specially designed with premium quality flowers. Perfect for your dream wedding day.'
            ],
            'Rangkaian Duka Cita' => [
                'name_en' => 'Condolence Arrangement',
                'description_en' => 'Elegant sympathy flower arrangement expressing deepest condolences and prayers for the departed.'
            ],
            'Standing Flower Ucapan' => [
                'name_en' => 'Congratulatory Standing Flower',
                'description_en' => 'Standing flower arrangement for grand openings, congratulations, and other joyful celebrations.'
            ],
            'Parcel Bunga & Coklat' => [
                'name_en' => 'Flower & Chocolate Gift',
                'description_en' => 'Beautiful combination of fresh flowers and premium chocolate. Perfect gift package for loved ones.'
            ]
        ];

        foreach ($products as $name => $translations) {
            Product::where('name', $name)->update($translations);
        }

        // Update Categories by ID
        $categoriesById = [
            1 => ['name_en' => 'Rose Flowers'],
            2 => ['name_en' => 'Tulip Flowers'],
            3 => ['name_en' => 'Lily Flowers'],
            4 => ['name_en' => 'Orchid Flowers'],
            5 => ['name_en' => 'Sunflowers'],
            6 => ['name_en' => 'Bouquets']
        ];

        foreach ($categoriesById as $id => $translations) {
            Category::where('id', $id)->update($translations);
        }

        // Update Categories by Name
        $categories = [
            'Buket Bunga' => [
                'name_en' => 'Flower Bouquets'
            ],
            'Rangkaian Bunga' => [
                'name_en' => 'Flower Arrangements'
            ],
            'Standing Flower' => [
                'name_en' => 'Standing Flowers'
            ],
            'Bunga Papan' => [
                'name_en' => 'Board Flowers'
            ],
            'Parcel & Hampers' => [
                'name_en' => 'Parcels & Hampers'
            ]
        ];

        foreach ($categories as $name => $translations) {
            Category::where('name', $name)->update($translations);
        }

        // Update Addons by ID
        $addonsById = [
            1 => ['name_en' => 'Premium Greeting Card'],
            2 => ['name_en' => 'Decorative Ribbon'],
            3 => ['name_en' => 'Premium Chocolate Box'],
            5 => ['name_en' => 'Ceramic Flower Vase']
        ];

        foreach ($addonsById as $id => $translations) {
            Addon::where('id', $id)->update($translations);
        }

        // Update Addons by Name
        $addons = [
            'Kartu Ucapan' => [
                'name_en' => 'Greeting Card'
            ],
            'Balon Love' => [
                'name_en' => 'Love Balloon'
            ],
            'Coklat Premium' => [
                'name_en' => 'Premium Chocolate'
            ],
            'Boneka Teddy Bear' => [
                'name_en' => 'Teddy Bear Doll'
            ],
            'Lilin Aromaterapi' => [
                'name_en' => 'Aromatherapy Candle'
            ]
        ];

        foreach ($addons as $name => $translations) {
            Addon::where('name', $name)->update($translations);
        }
    }
}
