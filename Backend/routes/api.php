<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/Administrador', function(){
    return 'Hola putitos';
});
//Route::get('/user', function (Request $request) {
  //  return $request->user();
//})->middleware('auth:sanctum');
