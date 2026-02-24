<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'order_id',
        'razorpay_payment_id',
        'amount',
        'currency',
        'method',
        'status',
        'details',
    ];

    protected $casts = [
        'details' => 'array', // Cast the 'details' column to a JSON array
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
