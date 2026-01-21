<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'thumbnail',
        'small_image',
        'shippable',
        'slug'
    ];
    public function clusters()
    {
        return $this->belongsToMany(Cluster::class);
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class);
    }

    public function varients()
    {
        return $this->hasMany(Varient::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
