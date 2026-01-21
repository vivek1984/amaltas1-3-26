<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Varient; // Import the Varient model
use Database\Factories\VarientFactory; // Import the VarientFactory if it's in a different namespace

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
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
            'thumbnail' => fake()->randomElement($images),
            'small_image' => fake()->randomElement($images),
            'slug' => fake()->slug(),
            'feature1' => fake()->sentence(),
            'feature2' => fake()->sentence(),
            'feature3' => fake()->sentence(),
            'description' => fake()->sentence()
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function configure()
    {
        return $this->afterCreating(function (\App\Models\Product $product) {
            // Create between 1 and 3 varients for each product
            Varient::factory()->count(rand(1, 3))->create([
                'product_id' => $product->id,
            ]);
        });
    }

    // Alternatively, for Laravel 8+ using the 'has' method directly in your seeder
    // public function withVarients()
    // {
    //     return $this->has(VarientFactory::new()->count(rand(1, 3)));
    // }
}
