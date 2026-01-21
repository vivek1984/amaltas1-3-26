<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ccart extends Model
{
    protected $fillable = [
        'user_id',
        'user_ip',
        'product_id',
        'varient_id',
        'design_id',
        'size_id',
        'quantity',
        'price',
        'mrp',

    ];
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the variant associated with the cart item.
     */
    public function varient()
    {
        // Assuming 'varient_id' is the foreign key in 'ccarts' table
        // and 'id' is the primary key in 'varients' table.
        // If your foreign key is 'variant_id', you can omit the second argument.
        return $this->belongsTo(Varient::class, 'varient_id');
    }

    /**
     * Get the design associated with the cart item.
     */
    public function design()
    {
        return $this->belongsTo(Design::class);
    }

    /**
     * Get the size associated with the cart item.
     */
    public function size()
    {
        return $this->belongsTo(Size::class);
    }
}
