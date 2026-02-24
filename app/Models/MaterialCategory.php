<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaterialCategory extends Model
{
    protected $fillable = [
        'name',
        'material_id'
    ];

    public function material() {
       return  $this->belongsTo(Material::class);
    }
}
