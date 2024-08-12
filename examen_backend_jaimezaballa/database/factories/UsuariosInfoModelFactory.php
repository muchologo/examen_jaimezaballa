<?php

namespace Database\Factories;

use App\Models\Model;
use App\Models\UsuariosInfoModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class UsuariosInfoModelFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = UsuariosInfoModel::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition() {
        return [
            'user_id' => $this->faker->unique()->numberBetween(1, 100),
            'address' => $this->faker->address(),
            'phone' => $this->faker->phoneNumber(),
            'birthday' => $this->faker->dateTimeBetween('-35 years', '-25 years')
        ];
    }
}
