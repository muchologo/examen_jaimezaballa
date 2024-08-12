<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration  {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::connection("mysql")->create('usuarios', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->string("name", 64);
            $table->string("email", 128);
            $table->string("password", 64);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::connection("mysql")->dropIfExists('usuarios');
    }
}
