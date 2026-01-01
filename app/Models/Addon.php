<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Addon extends Model
{
    protected $fillable = [
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
     * Get the products that have this addon.
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'addon_product');
    }

    /**
     * Get the images for the addon.
     */
    public function images(): HasMany
    {
        return $this->hasMany(AddonImage::class)->orderBy('sort_order');
    }
}
