<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cluster extends Model
{
    /** @use HasFactory<\Database\Factories\ClusterFactory> */
    use HasFactory;

    public function groups()
    {

        return $this->belongsToMany(Group::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
