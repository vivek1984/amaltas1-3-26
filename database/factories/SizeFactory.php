<?php

namespace Database\Factories;

use App\Models\Design;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Size>
 */
class SizeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $images = ['images/1.jpeg','images/2.jpeg', 'images/3.jpeg', 'images/4.jpeg', 'images/5.jpeg', 'images/6.jpeg', 'images/7.jpeg', 'images/8.jpeg', 'images/9.jpeg', 'images/10.jpeg', 'images/11.jpeg', 'images/12.jpeg', 'images/13.jpeg', 'images/14.jpeg', 'images/15.jpeg'];
$designs = Design::pluck('id')->toArray();

        return [
            'name' => fake()->name(),
            'description' => fake()->text(),
            'design_id' => fake()->randomElement($designs),
            'mrp' => fake()->numberBetween(1000, 20000),
            'price' => fake()->numberBetween(1000, 20000),
            'qty' => fake()->numberBetween(1, 10),
            'size_image' => fake()->randomElement($images),
            'shipping' => 1000,
            'slug' => fake()->slug()
        ];
    }
}
