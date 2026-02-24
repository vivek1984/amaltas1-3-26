<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteUrl extends Model
{
     protected $fillable = [
        'category',
        'url',
        'new_url',
        'page_type',
        'source',
        'priority',
        'last_modified',
    ];
}
