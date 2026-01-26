<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Addon;

class AddonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $addons = [
            [
                'name' => 'Kartu Ucapan Premium',
                'description' => 'Kartu ucapan dengan desain eksklusif dan tulisan custom',
                'price' => 15000,
                'stock' => 100,
                'is_available' => true,
                'has_custom_message' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Pita Dekoratif',
                'description' => 'Pita satin berkualitas tinggi untuk mempercantik buket',
                'price' => 10000,
                'stock' => 150,
                'is_available' => true,
                'has_custom_message' => false,
                'sort_order' => 2,
            ],
            [
                'name' => 'Coklat Premium Box',
                'description' => 'Box coklat premium isi 12 pieces',
                'price' => 75000,
                'stock' => 50,
                'is_available' => true,
                'has_custom_message' => false,
                'sort_order' => 3,
            ],
            [
                'name' => 'Boneka Teddy Bear',
                'description' => 'Boneka beruang lucu ukuran sedang (30cm)',
                'price' => 50000,
                'stock' => 30,
                'is_available' => true,
                'has_custom_message' => false,
                'sort_order' => 4,
            ],
            [
                'name' => 'Vas Bunga Keramik',
                'description' => 'Vas bunga keramik cantik untuk display jangka panjang',
                'price' => 85000,
                'stock' => 25,
                'is_available' => true,
                'has_custom_message' => false,
                'sort_order' => 5,
            ],
        ];

        foreach ($addons as $addon) {
            Addon::create($addon);
        }
    }
}
