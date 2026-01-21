<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
 protected $fillable = [
        'name',
        'rate',
        'length',
        'width',
        'description',
        'image',
        'level',
        'mica'

    ];

    public function categories() {

        return $this->hasMany(MaterialCategory::class);
    }

    public function cabinetTypes() {
        return $this->belongsToMany(CabinetType::class);
    }
}
