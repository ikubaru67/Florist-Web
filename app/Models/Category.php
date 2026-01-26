<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{

    protected $fillable = [
        'name',
        'name_en',
        'slug'
    ];

    protected $appends = ['localized_name'];

    // protected static function boot()
    // {
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($category) {
            if (empty($category->slug)) {
                $category->slug = Str::slug($category->name);
            }
        });
    }

    public function getLocalizedNameAttribute()
    {
        $locale = app()->getLocale();
        return $locale === 'en' && !empty($this->name_en) ? $this->name_en : $this->name;
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
