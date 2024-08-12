<?php

use App\Models\UsuariosModel;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosInfoTable extends Migration  {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::connection("mysql")->create('usuarios_info', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->foreignId('user_id')->references('id')->on('usuarios');
            $table->string("address", 255)->nullable();
            $table->string("phone", 32)->nullable();
            $table->date("birthday")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::connection("mysql")->dropIfExists('usuarios_info');
    }
}
