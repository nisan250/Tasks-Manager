<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\TaskController;

Route::get('/tasks', [TaskController::class, "index"]);
Route::post('/tasks', [TaskController::class, "store"]);
Route::put('/tasks/{id}', [TaskController::class, "update"]);
Route::delete('/tasks/{id}', [TaskController::class, "destroy"]);