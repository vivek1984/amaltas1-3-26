<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Design extends Model
{
    protected $fillable = [
        'name',
        'shippable', 'qty',
        'mrp',
         'price',
          'shipping',
        'description',
         'varient_id',
        'slug', 'size_image'
    ];
    /** @use HasFactory<\Database\Factories\DesignFactory> */
    use HasFactory;

    public function varient()
    {
        return $this->belongsTo(Varient::class);
    }

    public function sizes()
    {
        return $this->hasMany(Size::class);
    }
}
