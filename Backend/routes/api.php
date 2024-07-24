<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Tecnicocontroller;

Route::get('/admin', function () {
    return 'Hola ya estoy funcional';
});
//Administrador\\\
Route::post('/admin/login',[AdminController::class, 'login']);
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