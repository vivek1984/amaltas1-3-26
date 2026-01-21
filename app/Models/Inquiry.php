<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{

    protected $fillable = [
        'name', 'email', 'phone', 'message', 'address', 'furniture_type', 'dimensions', 'material', 'budget',
        'file_path', 'type'
    ];
}
