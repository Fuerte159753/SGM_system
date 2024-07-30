<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Tecnicocontroller;

Route::get('/admin', function () {
    return json_encode('Hola ya estoy funcional');
});
//Administrador\\\
Route::post('/admin/login',[AdminController::class, 'login']);
Route::get('/admin/perfil/{id}', [AdminController::class, 'getAdminById']);
Route::put('/admin/perfil/{id}', [AdminController::class, 'updateAdmin']);
Route::put('/admin/perfilpassword/{id}', [AdminController::class, 'updatePasswordAdmin']);
Route::post('/admin/fotoadmin', [AdminController::class, 'updatePhoto']);
Route::get('/admin/photo/{id}',[AdminController::class, 'getPhoto']);
/* Tecnicos */
Route::get('/admin/count', [AdminController::class, 'countTecnicos']);
Route::get('/admin/show', [AdminController::class, 'showTecnicos']);
Route::post('/admin/newT', [AdminController::class, 'newTecnico']);
Route::delete('/admin/inhabilitar/{id}', [AdminController::class, 'inabilitarTecnico']);
Route::put('/admin/update/{id}', [AdminController::class, 'updateTec']);
Route::get('/admin/search/{data}', [AdminController::class, 'searchTec']);
/* Equipos */
Route::get('/admin/countEq', [AdminController::class, 'countEquipos']);
Route::post('/admin/newE', [AdminController::class, 'newEquipo']);
Route::get('/admin/showcorrectivo', [AdminController::class, 'showEquipoCorectivo']);
Route::get('/admin/showpreventivo', [AdminController::class, 'showEquipoPreventivo']);
/* Asignacion de equipo a un tecnico */
Route::get('/admin/listec', [AdminController::class, 'listTecnicos']);
Route::post('/admin/asignar2', [AdminController::class, 'asignacionM']);
Route::get('/admin/listasignacion', [AdminController::class, 'showEquiposAsignados']);

///Tecnico\\\\
Route::post('/Tecnico/obtener', [Tecnicocontroller::class, 'showEquiposAsignados']);
//Graficas\\
Route::get('admin/graficaequipo', [AdminController::class, 'graficaequipos']);
Route::get('admin/graficatecnico', [AdminController::class, 'graficatecnico']);