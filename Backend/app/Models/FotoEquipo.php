<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FotoEquipo extends Model
{
    use HasFactory;

    protected $table = 'fotos_equipos';

    protected $fillable = [
        'equipo_id',
        'url',
    ];

    public function equipo()
    {
        return $this->belongsTo(Equipo::class, 'equipo_id');
    }
}