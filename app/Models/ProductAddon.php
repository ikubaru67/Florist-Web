<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductAddon extends Model
{
    protected $fillable = [
        'product_id',
        'name',
        'description',
        'price',
        'stock',
        'is_available',
        'has_custom_message',
        'sort_order',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_available' => 'boolean',
        'has_custom_message' => 'boolean',
    ];

    /**
     * Get the product that owns the addon.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the images for the addon.
     */
    public function images(): HasMany
    {
        return $this->hasMany(AddonImage::class)->orderBy('sort_order');
    }
}
