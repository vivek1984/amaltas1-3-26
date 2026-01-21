<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Varient extends Model
{
    /** @use HasFactory<\Database\Factories\VarientFactory> */
    use HasFactory;

    protected $fillable = [
        'name', 'shippable', 'qty', 'mrp', 'price', 'shipping_fee',
        'description', 'material', 'color', 'size',
        'feature1', 'feature2', 'feature3', 'brand', 'product_id', 'slug', 'size_image'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function sizes()
    {
        return $this->hasMany(Size::class);
    }

    public function designs()
    {
        return $this->hasMany(Design::class);
    }
}
