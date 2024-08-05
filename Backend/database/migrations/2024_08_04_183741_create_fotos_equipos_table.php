<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFotosEquiposTable extends Migration
{
    public function up()
    {
        Schema::create('fotos_equipos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equipo_id')->constrained('equipos')->onDelete('cascade');
            $table->string('url');
            $table->timestamps();

            // Asegúrate de que no haya más de 4 fotos para un equipo
            $table->unique(['equipo_id', 'url']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('fotos_equipos');
    }
}
