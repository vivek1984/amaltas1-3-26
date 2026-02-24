<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            // Add any other specific user-related fields you want for a particular page
            // For example:
            // 'is_admin' => $this->is_admin,
            // 'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
