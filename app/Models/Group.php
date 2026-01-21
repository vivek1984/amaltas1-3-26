<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    /** @use HasFactory<\Database\Factories\GroupFactory> */
    use HasFactory;

    public function clusters()
    {
        return $this->belongsToMany(Cluster::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
