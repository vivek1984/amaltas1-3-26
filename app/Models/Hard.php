<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hard extends Model
{
    protected $fillable = [
        'cabinet_id',
        'hardware_id',
        'quantity'
    ];

    public function cabinets() {
        return $this->belongsTo(Cabinet::class);
    }

    public function material()
{
    return $this->belongsTo(Material::class, 'hardware_id');
}

}
