<?php

namespace Database\Factories;

use App\Models\Image;
use App\Models\Varient;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
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
            'name' => fake()->randomElement($images),
            'varient_id' => fake()->randomElement(range(1,100))
        ];
    }
}
