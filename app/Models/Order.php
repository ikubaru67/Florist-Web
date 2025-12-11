<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'order_number',
        'total_amount',
        'status',
        'payment_method',
        'payment_status',
        'shipping_name',
        'shipping_email',
        'shipping_phone',
        'shipping_address',
        'shipping_city',
        'shipping_postal_code',
        'notes'
    ];

    protected $casts = [
        'total_amount' => 'decimal:2'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($order) {
            if (empty($order->order_number)) {
                // Generate unique order number dengan retry mechanism
                $maxRetries = 5;
                
                for ($i = 0; $i < $maxRetries; $i++) {
                    $date = now()->format('Ymd');
                    $randomSuffix = strtoupper(substr(uniqid() . bin2hex(random_bytes(3)), -6));
                    $orderNumber = 'ORD-' . $date . '-' . $randomSuffix;
                    
                    // Check if exists (very unlikely with random suffix + random_bytes)
                    if (!self::where('order_number', $orderNumber)->exists()) {
                        $order->order_number = $orderNumber;
                        return;
                    }
                }
                
                // Ultimate fallback (almost impossible to reach)
                $order->order_number = 'ORD-' . strtoupper(uniqid() . bin2hex(random_bytes(4)));
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function reviews()
    {
        return $this->hasMany(ProductReview::class);
    }
}
