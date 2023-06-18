<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TasksController;
use App\Http\Middleware\TaskMiddleware;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class,'login']);
Route::post('/signup',[AuthController::class,'signup']);
Route::post('/logout',[AuthController::class,'logout']);
Route::get('/tasks', [TasksController::class,'tasks'])->middleware(TaskMiddleware::class);
Route::post('/createtask',[TasksController::class,'createTask'])->middleware(TaskMiddleware::class);
Route::delete('/deletetodo/{id}',[TasksController::class,'destroy'])->middleware(TaskMiddleware::class);
Route::Put('/updatestatus/{id}',[TasksController::class,'updateStatus'])->middleware(TaskMiddleware::class);
Route::Post('/updatepriority/',[TasksController::class,'updatePriority'])->middleware(TaskMiddleware::class);
Route::delete('/clearallcompletes',[TasksController::class,'clearAllCompletes'])->middleware(TaskMiddleware::class);
