<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTecnicosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tecnicos', function (Blueprint $table) {
            $table->char('id', 6)->primary(); // Clave primaria tipo char(6).
            $table->string('nombre', 100);
            $table->string('apellidos', 100);
            $table->string('telefono', 10);
            $table->string('domicilio', 100);
            $table->string('correo', 100)->unique();
            $table->string('password', 255);
            $table->string('estado', 1);
            $table->string('foto', 255)->nullable();
            $table->string('token', 100)->nullable(); // Nueva columna 'token'.
            $table->timestamps(); // Añade columnas created_at y updated_at.
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tecnicos');
    }
}