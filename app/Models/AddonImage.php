<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AddonImage extends Model
{
    protected $fillable = [
        'product_addon_id',
        'image_path',
        'sort_order',
    ];

    /**
     * Get the addon that owns the image.
     */
    public function addon(): BelongsTo
    {
        return $this->belongsTo(ProductAddon::class, 'product_addon_id');
    }
}
