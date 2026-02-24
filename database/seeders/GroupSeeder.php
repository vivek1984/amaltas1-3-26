<?php

namespace Database\Seeders;

use App\Models\Cluster;
use App\Models\Group;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Group::factory(10)->create()
            ->each(function ($group) {
                $group->clusters()->attach(array_rand([1, 2, 3, 4, 5, 6, 7, 8]));
            });
    }
}
