<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    protected $fillable = [
        'name', 'description', 'design_id', 'mrp', 'shipping', 'price', 'slug', 'size_image', 'qty'
        ];
    /** @use HasFactory<\Database\Factories\SizeFactory> */
    use HasFactory;

    public function design()
    {
        return $this->belongsTo(Design::class);
    }
}
