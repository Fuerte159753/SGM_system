<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquiposTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipos', function (Blueprint $table) {
            $table->char('id', 6)->primary(); // Cambiado a 'char(6)' y marcado como clave primaria.
            $table->string('marca', 50);
            $table->string('modelo', 50);
            $table->tinyInteger('tipo_mantenimiento');
            $table->string('ram', 7);
            $table->string('foto', 50);
            $table->string('procesador', 100);
            $table->string('almacenamiento', 7);
            $table->tinyInteger('tipo');
            $table->string('estado', 1);
            $table->string('comentarios');
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
        Schema::dropIfExists('equipos');
    }
}