<?php

namespace Database\Factories;

use App\Models\Size;
use App\Models\Varient;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Design>
 */
class DesignFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $images = ['images/1.jpeg','images/2.jpeg', 'images/3.jpeg', 'images/4.jpeg', 'images/5.jpeg', 'images/6.jpeg', 'images/7.jpeg', 'images/8.jpeg', 'images/9.jpeg', 'images/10.jpeg', 'images/11.jpeg', 'images/12.jpeg', 'images/13.jpeg', 'images/14.jpeg', 'images/15.jpeg'];
        $varient = Varient::pluck('id')->toArray();
        return [
            'name' => fake()->name(),
            'description' => fake()->text(),
            'varient_id' => fake()->randomElement($varient),
            'mrp' => fake()->numberBetween(1000, 20000),
            'price' => fake()->numberBetween(1000, 20000),
            'size_image' => fake()->randomElement($images),
            'shipping' => 1000,
            'slug' => fake()->slug()

        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (\App\Models\Design $design) {
            // Create between 1 and 3 varients for each product
            Size::factory()->count(rand(0, 3))->create([
                'design_id' => $design->id,
            ]);
        });
    }
}
