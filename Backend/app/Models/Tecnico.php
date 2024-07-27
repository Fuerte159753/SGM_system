<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Tecnico extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'tecnicos';

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'id',
        'nombre',
        'apellidos',
        'telefono',
        'domicilio',
        'correo',
        'password',
        'estado',
        'foto',
        'token',
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'correo_verified_at' => 'datetime',
    ];
    public function asignaciones()
    {
        return $this->hasMany(EquipoAsignado::class, 'id_equipo', 'id');
    }
}
