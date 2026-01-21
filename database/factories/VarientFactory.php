<?php

namespace Database\Factories;

use App\Models\Design;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Varient>
 */
class VarientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $images = ['images/1.jpeg','images/2.jpeg', 'images/3.jpeg', 'images/4.jpeg', 'images/5.jpeg', 'images/6.jpeg', 'images/7.jpeg', 'images/8.jpeg', 'images/9.jpeg', 'images/10.jpeg', 'images/11.jpeg', 'images/12.jpeg', 'images/13.jpeg', 'images/14.jpeg', 'images/15.jpeg'];

        return [

            'name' => fake()->name(),
            'shippable' => fake()->boolean(),
            'qty'=> fake()->numberBetween(1,50),
            'mrp' => fake()->randomElement([10000, 12000, 15000, 20000, 30000]),
            'price' => fake()->randomElement([8000, 10000, 12000, 15000, 20000]),
            'shipping_fee' => fake()->randomNumber(),
            'slug' => fake()->slug(),
            'size_image' => fake()->randomElement($images),
            'product_id' => fake()->numberBetween(1, 100)
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (\App\Models\Varient $varient) {
            // Create between 1 and 3 varients for each product
            Design::factory()->count(rand(0, 3))->create([
                'varient_id' => $varient->id,
            ]);
        });
    }
}
