<?php

namespace Database\Seeders;

use App\Models\Cluster;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClusterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clusters = [
            ['name' => 'Sofas', 'slug' => 'sofas'],
            ['name' => 'Bedroom', 'slug' => 'bedroom'],
            ['name' => 'Dining', 'slug' => 'dining'],
            ['name' => 'Wardrobes', 'slug' => 'wardrobes'],
            ['name' => 'Modular Kitchens', 'slug' => 'modular-kitchens'],
            ['name' => 'Interior', 'slug' => 'interior'],
            ['name' => 'Tables Office', 'slug' => 'tables-office'],
            ['name' => 'Mattress', 'slug' => 'mattress'],
        ];

        foreach ($clusters as $cluster) {
            Cluster::updateOrCreate(
                ['slug' => $cluster['slug']],
                [
                    'name' => $cluster['name'],
                    'description' => $cluster['name'] . ' collection',
                    'image' => 'images/1.jpeg',
                    'thumbnail' => 'images/1.jpeg',
                ]
            );
        }
    }
}
