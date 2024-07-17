<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('equipos_asignados', function (Blueprint $table) {
            $table->char('id', 6)->primary()->unique()->comment('ID del equipo asignado en formato MA0000');
            $table->char('id_equipo', 6)->comment('ID del equipo (llave foránea)');
            $table->char('id_tecnico', 6)->comment('ID del técnico (llave foránea)');
            $table->tinyInteger('estatus')->comment('Estatus del equipo asignado (0, 1, 2, 3)');
            $table->string('comentarios_Tecnico', 255)->nullable()->comment('Comentarios adicionales del tecnico');
            $table->string('comentarios_Admin', 255)->nullable()->comment('Comentarios adicionales del administrador');
            $table->timestamps();
            $table->timestamp('estatus_updated_at')->nullable()->comment('Fecha de la última modificación del estatus');
            $table->tinyInteger('estatus_anterior')->nullable()->comment('Estatus anterior del equipo');

            $table->foreign('id_equipo')->references('id')->on('equipos')->onDelete('cascade');
            $table->foreign('id_tecnico')->references('id')->on('tecnicos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipos_asignados');
    }
};