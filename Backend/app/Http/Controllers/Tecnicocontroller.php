<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Equipo;
use App\Models\EquipoAsignado;
use Illuminate\Support\Facades\Validator;

class Tecnicocontroller extends Controller
{
    public function showEquiposAsignados(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|string|max:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 400);
        }

        $idTecnico = $request->id;

        $equiposAsignados = EquipoAsignado::where('id_tecnico', $idTecnico)
            ->with('equipo:id,marca,modelo') // Relación para obtener marca y modelo
            ->get();

        if ($equiposAsignados->isEmpty()) {
            return response()->json([
                'status' => 'no equipos',
                'message' => 'Parece que no tienes equipos asignados'
            ], 200);
        }

        $equiposAsignados->transform(function ($asignado) {
            return [
                'id' => $asignado->id,
                'marca' => $asignado->equipo->marca,
                'modelo' => $asignado->equipo->modelo,
                'id_tecnico' => $asignado->id_tecnico,
                'estatus' => $asignado->estatus,
                'comentarios_Tecnico' => $asignado->comentarios_Tecnico,
                'comentarios_Admin' => $asignado->comentarios_Admin,
                'created_at' => $asignado->created_at,
                'updated_at' => $asignado->updated_at,
                'estatus_updated_at' => $asignado->estatus_updated_at,
                'estatus_anterior' => $asignado->estatus_anterior,
            ];
        });

        return response()->json([
            'status' => 'success',
            'equipos' => $equiposAsignados
        ], 200);
    }
}
