<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Equipo;
use App\Models\FotoEquipo;
use App\Models\EquipoAsignado;
use App\Models\Tecnico;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

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
            ->with('equipo:id,marca,modelo') // Relación para obtener marca y modelo del equipo
            ->get();
    
        if ($equiposAsignados->isEmpty()) {
            return response()->json([
                'status' => 'no equipos',
                'message' => 'Parece que no tienes equipos asignados'
            ], 200);
        }
    
        $equiposAsignados->transform(function ($asignado) {
            $equipo = $asignado->equipo;
            $fotos = FotoEquipo::where('equipo_id', $equipo->id)->pluck('url')->toArray();
    
            return [
                'id' => $asignado->id,
                'marca' => $equipo->marca,
                'modelo' => $equipo->modelo,
                'id_tecnico' => $asignado->id_tecnico,
                'estatus' => $asignado->estatus,
                'comentarios_Admin' => $asignado->comentarios_Admin,
                'created_at' => $asignado->created_at,
                'updated_at' => $asignado->updated_at,
                'estatus_updated_at' => $asignado->estatus_updated_at,
                'fotos' => $fotos, // Incluimos las fotos solo si existen
            ];
        });
    
        return response()->json([
            'status' => 'success',
            'equipos' => $equiposAsignados
        ], 200);
    }  
    public function cambiarestado(Request $request)
    {
        $id = $request->input('id');
        $equipoAsignado = EquipoAsignado::find($id);

        if ($equipoAsignado) {
            $equipoAsignado->estatus = 1;
            $equipoAsignado->estatus_anterior = $equipoAsignado->estatus;
            $equipoAsignado->estatus_updated_at = 0;
            $equipoAsignado->save();

            return response()->json(['status' => 'success','message' => 'Estatus actualizado exitosamente']);
        }

        return response()->json(['status' => 'error','message' => 'Equipo asignado no encontrado']);
    } 
    public function photo(Request $request){
        $id = $request->input('id');
        $tecnico = Tecnico::find($id);
        if ($tecnico) {
            return response()->json([
                'foto' => $tecnico->foto
            ]);
        } else {
            return response()->json([
                'error' => 'Técnico no encontrado'
            ], 404);
        }
    }
    public function updateComentario(Request $request)
    {
        $validatedData = $request->validate([
            'nuevo_comentario' => 'required|string|min:10',
            'id' => 'required|string|exists:equipos_asignados,id',
        ]);
        $equipoAsignado = EquipoAsignado::find($validatedData['id']);
        if ($equipoAsignado) {
            $equipoAsignado->comentarios_Tecnico = $validatedData['nuevo_comentario'];
            $equipoAsignado->estatus = 2;
            $equipoAsignado->estatus_anterior = 1;
            $equipoAsignado->save(); 
            return response()->json([
                'status' => 'success',
                'message' => 'Comentario actualizado correctamente.'
            ]);
        }
        return response()->json([
            'status' => 'error',
            'message' => 'No se encontró el equipo asignado.'
        ]);
    }
    public function getAdminById($id)
    {
        try {
            $admin = Tecnico::find($id);
            if ($admin) {
                return response()->json([
                    'status' => 'success',
                    'data' => [
                        'nombre' => $admin->nombre,
                        'apellidos' => $admin->apellidos,
                        'telefono' => $admin->telefono,
                        'domicilio' => $admin->domicilio,
                        'correo' => $admin->correo,
                        'foto' => $admin->foto,
                    ],
                ]);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Tecnico no encontrado',
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al obtener los datos del Tecnico',
                'details' => $e->getMessage(),
            ]);
        }
    }
    public function updateAdmin(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'telefono' => 'required|string|max:12',
            'domicilio' => 'required|string|max:255',
            'correo' => 'required|email|ends_with:@gmail.com,@hotmail.com,@outlook.com',
        ]);
        $admin = Tecnico::find($id);
        if (!$admin) {
            return response()->json(['message' => 'Tecnico no encontrado.']);
        }

        $admin->update($validatedData);
        return response()->json(['message' => 'Perfil actualizado exitosamente']);
    }

    public function updatePasswordAdmin(Request $request, $id)
    {
        // Validar los datos del formulario
        $validatedData = $request->validate([
            'password' => 'required',
            'newPassword' => 'required|min:8',
            'confirmPassword' => 'required|same:newPassword',
        ]);

        // Buscar el administrador por su ID
        $admin = Tecnico::find($id);

        if (!$admin) {
            return response()->json(['status' => 'error', 'message' => 'Tecnico no encontrado.']);
        }

        if (!Hash::check($request->input('password'), $admin->password)) {
            return response()->json(['status' => 'error', 'message' => 'Tu Contraseña proporcionada no coincide con la almacenada en el sistema.']);
        }

        // Actualizar la contraseña con la nueva
        $admin->password = Hash::make($request->input('newPassword'));
        $admin->save();

        return response()->json(['status' => 'success', 'message' => 'Contraseña actualizada con éxito.']);
    }
    public function updatePhoto(Request $request)
    {
        // Validar la solicitud
        $request->validate([
            'id' => 'required|exists:administrador,id', // Validar que el ID exista en la tabla
            'nombreFoto' => 'required|string',
            'foto' => 'required|file|mimes:svg,png,jpg,gif|max:2048', // Validar el archivo
        ]);
    
        $admin = Tecnico::find($request->input('id'));
    
        if (!$admin) {
            return response()->json(['status' => 'error', 'message' => 'Tecnico no encontrado']);
        }
    
        $file = $request->file('foto');
        $nombreArchivo = 'foto_' . $admin->id . '.' . $file->getClientOriginalExtension();
    
        if ($admin->foto) {
            $oldPhotoBaseName = 'foto_' . $admin->id;
            $files = Storage::files('public/fotos_tecnicos');
    
            foreach ($files as $filePath) {
                $fileName = basename($filePath);
                if (strpos($fileName, $oldPhotoBaseName) === 0) {
                    if (Storage::exists($filePath)) {
                        Storage::delete($filePath);
                    }
                }
            }
        }
    
        $rutaArchivo = $file->storeAs('public/fotos_tecnicos', $nombreArchivo);
        $admin->foto = str_replace('public/', '', $rutaArchivo);
        $admin->save();
    
        return response()->json(['status' => 'success', 'message' => 'Foto actualizada exitosamente']);
    } 
}
