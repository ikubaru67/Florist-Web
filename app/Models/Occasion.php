<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Occasion extends Model
{
    protected $fillable = [
        'name',
        'name_en',
        'slug',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($occasion) {
            if (empty($occasion->slug)) {
                $occasion->slug = Str::slug($occasion->name);
            }
        });
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
