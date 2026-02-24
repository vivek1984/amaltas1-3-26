<?php

namespace Database\Seeders;

use App\Models\Cluster;
use App\Models\Group;
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
        $clusterIds = Cluster::pluck('id');
        $groupIds = Group::pluck('id');

        Product::factory(100)->create()
        ->each(function ($product) use ($clusterIds) {
            if ($clusterIds->isNotEmpty()) {
                $clusterId = $clusterIds->random();
                $product->clusters()->syncWithoutDetaching([$clusterId]);
            }
        })
        ->each(function ($product) use ($groupIds) {
            if ($groupIds->isNotEmpty()) {
                $groupId = $groupIds->random();
                $product->groups()->syncWithoutDetaching([$groupId]);
            }
        });


    }
}
