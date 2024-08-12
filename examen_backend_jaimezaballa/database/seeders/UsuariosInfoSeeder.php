<?php

namespace Database\Seeders;

use App\Models\UsuariosInfoModel;
use Illuminate\Database\Seeder;

class UsuariosInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        UsuariosInfoModel::factory()
            ->count(100)
            ->create();
    }
}
