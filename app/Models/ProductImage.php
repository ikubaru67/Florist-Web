<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ProductImage extends Model
{
    protected $fillable = [
        'product_id',
        'image_path',
        'sort_order',
        'is_primary'
    ];

    protected $casts = [
        'sort_order' => 'integer',
        'is_primary' => 'boolean'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // Get full URL for image
    public function getImageUrlAttribute()
    {
        return Storage::url($this->image_path);
    }
}
