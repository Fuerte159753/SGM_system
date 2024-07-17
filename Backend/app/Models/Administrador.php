<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Administrador extends Authenticatable
{
    use HasFactory, Notifiable;

    // Definir la tabla asociada a este modelo.
    protected $table = 'administrador';

    // Los atributos que son asignables en masa.
    protected $fillable = [
        'nombre',
        'apellidos',
        'telefono',
        'domicilio',
        'correo',
        'password',
        'foto',
    ];

    // Los atributos que deben ocultarse para arrays.
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Los tipos de los atributos.
    protected $casts = [
        'correo_verified_at' => 'datetime',
    ];
}
