<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TranslateExistingDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Update Categories
        $categories = [
            ['name' => 'Bunga Mawar', 'name_en' => 'Rose Flowers'],
            ['name' => 'Bunga Tulip', 'name_en' => 'Tulip Flowers'],
            ['name' => 'Bunga Lily', 'name_en' => 'Lily Flowers'],
            ['name' => 'Bunga Anggrek', 'name_en' => 'Orchid Flowers'],
            ['name' => 'Bunga Matahari', 'name_en' => 'Sunflower'],
            ['name' => 'Bouquet', 'name_en' => 'Bouquet'],
        ];

        foreach ($categories as $category) {
            DB::table('categories')
                ->where('name', $category['name'])
                ->update(['name_en' => $category['name_en']]);
        }

        // Update Products
        $products = [
            [
                'name' => 'Mawar Merah Premium',
                'name_en' => 'Premium Red Rose',
                'description_en' => 'Fresh premium red roses, perfect for expressing deep love and affection. Each rose is carefully selected for its vibrant color and perfect bloom.'
            ],
            [
                'name' => 'Mawar Putih Elegan',
                'name_en' => 'Elegant White Rose',
                'description_en' => 'Pure white roses symbolizing innocence and elegance. Ideal for weddings, sympathy, or expressing pure intentions.'
            ],
            [
                'name' => 'Mawar Pink Romance',
                'name_en' => 'Pink Romance Rose',
                'description_en' => 'Romantic pink roses that convey admiration, joy, and gratitude. Perfect for expressing sweet emotions and gentle feelings.'
            ],
            [
                'name' => 'Tulip Belanda Merah',
                'name_en' => 'Red Dutch Tulip',
                'description_en' => 'Authentic red tulips imported from Holland. Known for their perfect shape and vibrant color that brightens any occasion.'
            ],
            [
                'name' => 'Tulip Kuning Cerah',
                'name_en' => 'Bright Yellow Tulip',
                'description_en' => 'Cheerful yellow tulips that bring sunshine and happiness. Perfect for celebrations and spreading positive energy.'
            ],
            [
                'name' => 'Tulip Mix Warna-Warni',
                'name_en' => 'Colorful Mixed Tulips',
                'description_en' => 'Beautiful assortment of colorful tulips in various shades. Creates a stunning visual display for any space.'
            ],
            [
                'name' => 'Lily Putih Oriental',
                'name_en' => 'Oriental White Lily',
                'description_en' => 'Majestic oriental white lilies with a captivating fragrance. Symbol of purity and refined beauty.'
            ],
            [
                'name' => 'Lily Pink Casablanca',
                'name_en' => 'Pink Casablanca Lily',
                'description_en' => 'Exotic pink Casablanca lilies with large, elegant blooms. Perfect for making a grand statement.'
            ],
            [
                'name' => 'Anggrek Bulan Ungu',
                'name_en' => 'Purple Moon Orchid',
                'description_en' => 'Sophisticated purple moon orchids representing luxury and exotic beauty. Long-lasting blooms for extended enjoyment.'
            ],
            [
                'name' => 'Anggrek Dendrobium',
                'name_en' => 'Dendrobium Orchid',
                'description_en' => 'Elegant dendrobium orchids with delicate cascading blooms. Perfect for adding tropical elegance to any setting.'
            ],
            [
                'name' => 'Bunga Matahari Giant',
                'name_en' => 'Giant Sunflower',
                'description_en' => 'Impressive giant sunflowers that radiate warmth and happiness. Perfect for brightening up large spaces.'
            ],
            [
                'name' => 'Sunflower Bouquet',
                'name_en' => 'Sunflower Bouquet',
                'description_en' => 'Cheerful sunflower bouquet arranged with complementary greenery. Brings joy and positive energy to any recipient.'
            ],
            [
                'name' => 'Rose Bouquet Deluxe',
                'name_en' => 'Deluxe Rose Bouquet',
                'description_en' => 'Luxurious mixed rose bouquet featuring premium roses in various colors. Elegantly arranged for maximum visual impact.'
            ],
            [
                'name' => 'Mixed Flower Bouquet',
                'name_en' => 'Mixed Flower Bouquet',
                'description_en' => 'Beautiful combination of seasonal flowers expertly arranged. Perfect for any occasion with a variety of colors and textures.'
            ],
            [
                'name' => 'Graduation Bouquet',
                'name_en' => 'Graduation Bouquet',
                'description_en' => 'Special graduation bouquet featuring bright, celebratory flowers. Perfect for congratulating graduates on their achievement.'
            ],
            [
                'name' => 'Wedding Bouquet Classic',
                'name_en' => 'Classic Wedding Bouquet',
                'description_en' => 'Timeless white and cream wedding bouquet designed for elegance. Features premium flowers arranged in classic bridal style.'
            ],
        ];

        foreach ($products as $product) {
            DB::table('products')
                ->where('name', $product['name'])
                ->update([
                    'name_en' => $product['name_en'],
                    'description_en' => $product['description_en']
                ]);
        }

        // Update Addons
        $addons = [
            [
                'name' => 'Kartu Ucapan Premium',
                'name_en' => 'Premium Greeting Card',
                'description_en' => 'High-quality greeting card with elegant design. Includes envelope and custom message writing.'
            ],
            [
                'name' => 'Pita Dekoratif',
                'name_en' => 'Decorative Ribbon',
                'description_en' => 'Beautiful decorative ribbon in various colors. Adds an elegant finishing touch to your flower arrangement.'
            ],
            [
                'name' => 'Coklat Premium Box',
                'name_en' => 'Premium Chocolate Box',
                'description_en' => 'Assorted premium chocolates in elegant gift box. Perfect companion for flower gifts.'
            ],
            [
                'name' => 'Boneka Teddy Bear',
                'name_en' => 'Teddy Bear Doll',
                'description_en' => 'Cute and cuddly teddy bear. Available in various sizes and colors to complement your flower gift.'
            ],
            [
                'name' => 'Vas Bunga Keramik',
                'name_en' => 'Ceramic Flower Vase',
                'description_en' => 'Elegant ceramic vase for displaying flowers. Durable and stylish design that complements any decor.'
            ],
        ];

        foreach ($addons as $addon) {
            DB::table('addons')
                ->where('name', $addon['name'])
                ->update([
                    'name_en' => $addon['name_en'],
                    'description_en' => $addon['description_en']
                ]);
        }

        $this->command->info('All data translated successfully!');
    }
}
