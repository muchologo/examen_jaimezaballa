<?php

namespace Database\Seeders;

use App\Models\UsuariosModel;
use Illuminate\Database\Seeder;

class UsuariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        UsuariosModel::factory()
            ->count(100)
            ->create();
    }
}
