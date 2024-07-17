<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipo extends Model
{
    use HasFactory;

    protected $table = 'equipos';

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'id',
        'marca',
        'modelo',
        'tipo_mantenimiento',
        'ram',
        'foto',
        'procesador',
        'almacenamiento',
        'tipo',
        //'comentarios'
        'estado',
        'foto',
    ];

    protected $casts = [
        'tipo_mantenimiento' => 'integer',
        'tipo' => 'integer',
    ];
    public function asignaciones()
    {
        return $this->hasMany(EquipoAsignado::class, 'id_tecnico', 'id');
    }
}
