<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'varient_id',
        'design_id',
        'size_id',
        'quantity',
        'price',
        'mrp',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function varient() // Changed from variant to varient
    {
        return $this->belongsTo(Varient::class); // Changed from Variant to Varient
    }

    public function design()
    {
        return $this->belongsTo(Design::class);
    }

    public function size()
    {
        return $this->belongsTo(Size::class);
    }
}
