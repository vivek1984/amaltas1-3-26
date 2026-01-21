<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::factory(100)->create()
        ->each(function ($product) {
            $product->clusters()->attach(array_rand([1, 2, 3, 4, 5, 6, 7, 8]));
        })
        ->each(function ($product) {
            $product->groups()->attach(array_rand([1, 2, 3, 4, 5, 6, 7, 8]));
        });


    }
}
