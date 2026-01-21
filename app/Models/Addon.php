<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Addon extends Model
{
    /** @use HasFactory<\Database\Factories\AddonFactory> */
    use HasFactory;

    protected $fillable = [
        'estimate_id',
        'item_name',
        'description',
        'amount',
    ];

    /**
     * Get the estimate that owns the addon.
     */
    public function estimate(): BelongsTo
    {
        return $this->belongsTo(Estimate::class);
    }
}
