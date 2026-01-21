<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Group>
 */
class GroupFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $images = ['images/1.jpeg','images/2.jpeg', 'images/3.jpeg', 'images/4.jpeg', 'images/5.jpeg', 'images/6.jpeg', 'images/7.jpeg', 'images/8.jpeg', 'images/9.jpeg', 'images/10.jpeg', 'images/11.jpeg', 'images/12.jpeg', 'images/13.jpeg', 'images/14.jpeg', 'images/15.jpeg'];

        $items = ['Fabric Sofa', 'Wooden Sofa', 'L Shaped Sofa', 'Sofa Cum Beds', 'Recliners',  'Wooden Dinings', 'Onyx Top Dining', 'Four Seater Dinings', 'Six Seater Dinings' , 'Wooden Bed', 'Cushioned Beds', 'Engineering Wood Beds'];

        return [
            'name' => fake()->randomElement($items),
            'description' => fake()->text(),
            'image' => fake()->randomElement($images),
            'slug' => fake()->slug()
        ];
    }
}
