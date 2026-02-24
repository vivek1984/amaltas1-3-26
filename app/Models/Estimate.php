<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Estimate extends Model
{
    protected $fillable = [
        'type',
        'clientName',
        'clientPhone',
        'address',
        'email',
        'bodyMaterial',
        'bodyLaminate',
        'backMaterial',
        'backLaminate',
        'shutterMaterial',
        'shutterLaminate'
    ];

    public function cabinets() {
        return $this->hasMany(Cabinet::class);
    }
    public function addons(): HasMany
    {
        return $this->hasMany(Addon::class);
    }
}
