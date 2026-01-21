<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pincode extends Model
{
    protected $fillable = [
        'circle_name',
        'region_name',
        'division_name',
        'office_name',
        'pincode',
        'office_type',
        'delivery',
        'district',
        'state_name',
        'latitude',
        'longitude'
    ];
}
