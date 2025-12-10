<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductReview;

class ProductReviewSeeder extends Seeder
{
    public function run(): void
    {
        // Buat user test jika belum ada
        $testUser = User::firstOrCreate(
            ['email' => 'customer@florist.com'],
            [
                'name' => 'Customer Test',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
                'is_admin' => false
            ]
        );

        // Ambil beberapa produk
        $products = Product::take(5)->get();

        foreach ($products as $index => $product) {
            // Buat order completed untuk user
            $order = Order::create([
                'user_id' => $testUser->id,
                'order_number' => 'ORD-TEST-' . time() . '-' . $index,
                'total_amount' => $product->price,
                'status' => 'completed',
                'payment_method' => 'transfer',
                'payment_status' => 'paid',
                'shipping_name' => $testUser->name,
                'shipping_email' => $testUser->email,
                'shipping_phone' => '08123456789',
                'shipping_address' => 'Jl. Test No. 123',
                'shipping_city' => 'Jakarta',
                'shipping_postal_code' => '12345'
            ]);

            // Buat order item
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'product_name' => $product->name,
                'quantity' => 1,
                'price' => $product->price,
                'subtotal' => $product->price
            ]);

            // Buat review
            $reviews = [
                [
                    'rating' => 5,
                    'comment' => 'Bunganya sangat segar dan indah! Pengiriman cepat dan rapi. Sangat puas dengan pelayanannya.'
                ],
                [
                    'rating' => 4,
                    'comment' => 'Produk bagus, sesuai dengan foto. Hanya saja pengiriman agak lama.'
                ],
                [
                    'rating' => 5,
                    'comment' => 'Luar biasa! Bunga masih segar sampai tujuan. Penerima sangat senang. Terima kasih!'
                ],
                [
                    'rating' => 3,
                    'comment' => 'Bunga cukup bagus tapi ada beberapa yang layu. Overall masih oke.'
                ],
                [
                    'rating' => 5,
                    'comment' => 'Perfect! Rangkaian bunganya cantik banget. Highly recommended!'
                ]
            ];

            ProductReview::create([
                'product_id' => $product->id,
                'user_id' => $testUser->id,
                'order_id' => $order->id,
                'rating' => $reviews[$index]['rating'],
                'comment' => $reviews[$index]['comment'],
                'is_verified_purchase' => true
            ]);
        }

        $this->command->info('✅ Created sample reviews for 5 products');
    }
}
