<?php

use App\Models\CartItem;
use App\Models\User;

// Get current user (ganti ID sesuai user yang login)
$userId = 1; // Ganti dengan ID user yang sedang testing

$cartItems = CartItem::with('product')
    ->where('user_id', $userId)
    ->get();

dump('Total cart items:', $cartItems->count());
dump('Cart items:', $cartItems->toArray());

// Check if any cart items exist
if ($cartItems->isEmpty()) {
    dump('Cart is empty for user ID: ' . $userId);
} else {
    foreach ($cartItems as $item) {
        dump([
            'id' => $item->id,
            'user_id' => $item->user_id,
            'product_name' => $item->product->name,
            'quantity' => $item->quantity,
            'price' => $item->price,
        ]);
    }
}
