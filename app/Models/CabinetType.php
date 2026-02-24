<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CabinetType extends Model
{
    protected $fillable = [
        'name'
    ];

    public function materials() {
        return $this->belongsToMany(Material::class);
    }
}
