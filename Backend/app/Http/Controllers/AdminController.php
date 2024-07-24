<?php

namespace App\Http\Controllers;

use App\Models\Administrador;
use App\Models\Equipo;
use App\Models\Tecnico;
use App\Models\EquipoAsignado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function login(request $request)
    {
         // Validar los datos del formulario
         $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);
        // Obtener los datos del formulario
        $email = $request->input('email');
        $password = $request->input('password');

        try {
            $admin = Administrador::where('correo', $email)->first();
            if ($admin && Hash::check($password, $admin->password)) {
                return response()->json([
                    'message' => 'Inicio de sesión exitoso',
                    'status' => 'success',
                    'user' => 1,
                    'id' => $admin->id,
                    'name' => $admin->nombre,
                ], 200);
            }
            $tecnico = Tecnico::where('correo', $email)->first();
            if ($tecnico && Hash::check($password, $tecnico->password)) {
                return response()->json([
                    'message' => 'Inicio de sesión exitoso',
                    'status' => 'success',
                    'user' => 2,
                    'id' => $tecnico->id,
                    'name' => $tecnico->nombre,
                ], 200);
            }
            return response()->json([
                'message' => 'Verifica tus datos',
                'status' => 'error',
            ], 401);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al intentar iniciar sesión',
                'status' => 'error',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
    //Tecnicos
    public function countTecnicos()
    {
        $totalRegistros = Tecnico::count();
        if ($totalRegistros == 0) {
            $nextId = 1;
        } else {
            $nextId = $totalRegistros + 1;
        }
        return response()->json(['next_id' => $nextId]);
    }
    public function showTecnicos()
    {
        try {
       $tecnicos = Tecnico::select('id', 'nombre', 'apellidos', 'telefono', 'domicilio', 'correo','estado','foto')->get();
            return response()->json([
                'data' => $tecnicos
            ], 200);
        } catch (\Exception $e) {
            // Manejar cualquier error
            return response()->json([
                'status' => 'error',
                'message' => 'Error al obtener técnicos',
                'details' => $e->getMessage()
            ], 500);
        }

        
    }
    public function newTecnico(Request $request)
    {
        // Validar los datos del formulario
        $validator = Validator::make($request->all(), [
            'numempleado' => 'required|string|max:6|unique:tecnicos,id',
            'name' => 'required|string|max:50',
            'apellido' => 'required|string|max:100',
            'email' => 'required|string|email|max:100|unique:tecnicos,correo',
            'password' => 'required|string|min:8|max:255',
            'telefono' => 'required|string|min:10|max:14',
            'direccion' => 'required|string|max:100',
            'foto' => 'nullable|image|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 400);
        }

        $tecnico = new Tecnico;
        $tecnico->id = $request->numempleado;
        $tecnico->nombre = $request->name;
        $tecnico->apellidos = $request->apellido;
        $tecnico->correo = $request->email;
        $tecnico->password = Hash::make($request->password);
        $tecnico->telefono = $request->telefono;
        $tecnico->domicilio = $request->direccion;
        $tecnico->estado = 1;
        $tecnico->foto = false;
        $tecnico->token = Str::random(20);
        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $nombreArchivo = 'foto_' . $tecnico->nombre . '_' . $tecnico->apellidos . '.' . $file->getClientOriginalExtension();
            $rutaArchivo = $file->storeAs('public/fotos_tecnicos', $nombreArchivo); // Guardar en storage/app/public/fotos_tecnicos
            $tecnico->foto = Storage::url($rutaArchivo); // Guardar la URL pública en la base de datos
        }

        if ($tecnico->save()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Técnico registrado correctamente',
            ], 201);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'No se pudo registrar al técnico. Inténtalo más tarde.',
            ], 500);
        }
    }
    public function inabilitarTecnico($id)
    {
        $tecnico = Tecnico::find($id);
    
        if (!$tecnico) {
            return response()->json(['message' => 'Técnico no encontrado.'], 404);
        }
        $tecnico->estado = $tecnico->estado == 1 ? 0 : 1;
        $tecnico->save();
    
        return response()->json(['message' => 'Estado del técnico actualizado con éxito.']);
    }
    public function updateTec(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'telefono' => 'required|string|min:10',
            'domicilio' => 'required|string|max:255',
            'correo' => 'required|email|ends_with:@gmail.com,@hotmail.com,@outlook.com',
        ]);
        $tecnico = Tecnico::find($id);
    
        if (!$tecnico) {
            return response()->json(['message' => 'Técnico no encontrado.'], 404);
        }
        $tecnico->update($validatedData);
    
        return response()->json(['message' => 'Técnico actualizado con éxito.']);
    }
    public function searchTec(Request $request){
        
    }
    //Equipos
    public function countEquipos()
    {
        $totalRegistros = Equipo::count();
        if ($totalRegistros == 0) {
            $nextId = 1;
        } else {
            $nextId = $totalRegistros + 1;
        }
        return response()->json(['next_id' => $nextId]);
    }
    public function newEquipo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'idequipo' => 'required|string|max:6|unique:equipos,id',
            'marca' => 'required|string',
            'modelo' => 'required|string',
            'tipomantenimiento' => 'required|string|max:1',
            'ram' => 'required|string',
            'procesador' => 'required|string',
            'almacenamiento' => 'required|string',
            'tipo'=>'required|string|max:1'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 400);
        }
        $equipo = new Equipo;
        $equipo->id = $request->idequipo;
        $equipo->marca = $request->marca;
        $equipo->modelo = $request->modelo;
        $equipo->tipo_mantenimiento = $request->tipomantenimiento;
        $equipo->ram = $request->ram;
        $equipo->procesador = $request->procesador;
        $equipo->almacenamiento = $request->almacenamiento;
        $equipo->tipo = $request->tipo;
        //$equipo->comentarios= false;
        $equipo->estado= false;
        $equipo->foto= false;

        if ($equipo->save()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Equipo registrado correctamente',
            ], 201);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'No se pudo registrar el Equipo. Inténtalo más tarde.',
            ], 500);
        }
    }
    public function showEquipoCorectivo()
    {
        try {
            // Obtener los equipos con tipo_mantenimiento = 1 y su estado de asignación
            $equipos = Equipo::where('tipo_mantenimiento', 1)
                ->select(
                    'equipos.id', 
                    'equipos.marca', 
                    'equipos.modelo', 
                    'equipos.tipo_mantenimiento', 
                    'equipos.ram', 
                    'equipos.procesador', 
                    'equipos.almacenamiento', 
                    'equipos.tipo',
                    DB::raw('(SELECT COUNT(*) FROM equipos_asignados WHERE equipos_asignados.id_equipo = equipos.id) as asignaciones_count')
                )
                ->get()
                ->map(function ($equipo) {
                    $equipo->estado_asignacion = $equipo->asignaciones_count > 0 ? 'Asignado' : 'No asignado';
                    unset($equipo->asignaciones_count);
                    return $equipo;
                });

            if ($equipos->isEmpty()) {
                return response()->json([
                    'message' => 'No se encontraron equipos'
                ], 404);
            }

            return response()->json($equipos, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener los equipos',
                'details' => $e->getMessage()
            ], 500);
        }
    }
    public function showEquipoPreventivo()
    {
        try {
            // Obtener los equipos con tipo_mantenimiento = 2
            $equipos = Equipo::where('tipo_mantenimiento', 2)
                ->select(
                    'equipos.id', 
                    'equipos.marca', 
                    'equipos.modelo', 
                    'equipos.tipo_mantenimiento', 
                    'equipos.ram', 
                    'equipos.procesador', 
                    'equipos.almacenamiento', 
                    'equipos.tipo',
                    DB::raw('(SELECT COUNT(*) FROM equipos_asignados WHERE equipos_asignados.id_equipo = equipos.id) as asignaciones_count')
                )
                ->get()
                ->map(function ($equipo) {
                    $equipo->estado_asignacion = $equipo->asignaciones_count > 0 ? 'Asignado' : 'No asignado';
                    unset($equipo->asignaciones_count);
                    return $equipo;
                });

            if ($equipos->isEmpty()) {
                return response()->json([
                    'message' => 'No se encontraron equipos'
                ], 404);
            }

            return response()->json($equipos, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener los equipos',
                'details' => $e->getMessage()
            ], 500);
        }
    }
    public function listTecnicos()
    {
        try {
       $tecnicos = Tecnico::select('id', 'nombre', 'apellidos')->get();
            return response()->json([
                'data' => $tecnicos
            ], 200);
        } catch (\Exception $e) {
            // Manejar cualquier error
            return response()->json([
                'status' => 'error',
                'message' => 'Error al obtener técnicos',
                'details' => $e->getMessage()
            ], 500);
        }
    }
    //logica de asignacion de equipo
    public function asignacionM(Request $request)
    {
        $validator = validator::make($request->all(),[
            'id_equipo'=>'required|string',
            'id_tecnico'=>'required|string',
            'comentario'=>'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 400);
        }
        $count = EquipoAsignado::count();
        $nextId = $count + 1;
        $formattedId = 'MA' . str_pad($nextId, 4, '0', STR_PAD_LEFT);

        $asignacion = new EquipoAsignado();
        $asignacion->id =$formattedId;
        $asignacion->id_equipo = $request->id_equipo;
        $asignacion->id_tecnico = $request->id_tecnico;
        $asignacion->estatus = 0;
        $asignacion->comentarios_Tecnico = false;
        $asignacion->comentarios_Admin = $request->comentario;
        $asignacion->estatus_updated_at = date('Y-m-d H:i:s');;
        $asignacion->estatus_anterior = false;

        if ($asignacion->save()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Tecnico asignado correctamente',
            ], 201);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'No se pudo asignar el tecnico. Inténtalo más tarde.',
            ], 500);
        }
    }   
    public function showEquiposAsignados()
    {
        try {
            // Obtener todos los equipos asignados con la información del técnico y del equipo
            $equiposAsignados = EquipoAsignado::with(['tecnico', 'equipo'])->get();

            // Transformar la colección para incluir los nombres y apellidos del técnico y la marca y modelo del equipo
            $equiposAsignados = $equiposAsignados->map(function ($asignado) {
                return [
                    'id' => $asignado->id,
                    'id_equipo' => [
                        'marca' => $asignado->equipo->marca,
                        'modelo' => $asignado->equipo->modelo,
                    ],
                    'id_tecnico' => [
                        'nombre' => $asignado->tecnico->nombre,
                        'apellidos' => $asignado->tecnico->apellidos,
                    ],
                    'estatus' => $asignado->estatus,
                    'comentarios_Tecnico' => $asignado->comentarios_Tecnico,
                    'comentarios_Admin' => $asignado->comentarios_Admin,
                    'estatus_updated_at' => $asignado->estatus_updated_at,
                    'estatus_anterior' => $asignado->estatus_anterior,
                    'created_at' => $asignado->created_at,
                    'updated_at' => $asignado->updated_at,
                ];
            });

            if ($equiposAsignados->isEmpty()) {
                return response()->json([
                    'message' => 'No se encontraron equipos asignados'
                ], 404);
            }

            return response()->json($equiposAsignados, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener los equipos asignados',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
