<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cabinet extends Model
{
    protected $fillable = [
        'estimate_id',
        'type',
        'name',
        'width',
        'height'
    ];

    public function hard()
    {
        return $this->hasMany(Hard::class);
    }
    public function estimates() {
        return $this->belongsTo(Estimate::class);
    }
}
