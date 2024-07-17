<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipoAsignado extends Model
{
    use HasFactory;

    // Especificamos la tabla asociada al modelo (opcional si sigue la convención)
    protected $table = 'equipos_asignados';

    // La clave primaria no es auto-incremental
    public $incrementing = false;

    // La clave primaria es de tipo char (string)
    protected $keyType = 'string';

    // Permitimos asignación masiva solo en estos campos
    protected $fillable = [
        'id',
        'id_equipo',
        'id_tecnico',
        'estatus',
        'comentarios_Tecnico',
        'comentarios_Admin',
        'estatus_updated_at',
        'estatus_anterior'
    ];

    // Definimos los campos que serán tratados como fechas
    protected $dates = [
        'created_at',
        'updated_at',
        'estatus_updated_at'
    ];
    /**
     * Relación con el modelo Equipo
     */
    public function equipo()
    {
        return $this->belongsTo(Equipo::class, 'id_equipo', 'id');
    }
    /**
     * Relación con el modelo Tecnico
     */
    public function tecnico()
    {
        return $this->belongsTo(Tecnico::class, 'id_tecnico', 'id');
    }
}
