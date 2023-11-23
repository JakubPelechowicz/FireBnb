<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BnbController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth')->get('/user', function (Request $request) {
    return $request->user();
});

//--------------------------------------------------
//      AUTH
//--------------------------------------------------

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);

});

//--------------------------------------------------
//      USER
//--------------------------------------------------

Route::group([

    'middleware' => 'api',
    'prefix' => 'user'

], function ($router) {

    Route::post('create', [UserController::class, 'create']);
    Route::put('update', [UserController::class, 'update']);
    Route::delete('delete', [UserController::class, 'delete']);
});

//--------------------------------------------------
//      BNB
//--------------------------------------------------

Route::group([

    'middleware' => 'api',
    'prefix' => 'bnb'

], function ($router) {

    Route::post('create', [BnbController::class, 'create']);
    Route::get('index/{id}',[BnbController::class, 'index']);
    Route::get('list',[BnbController::class, 'list']);
    Route::put('update', [BnbController::class, 'update']);
    Route::delete('delete/{id}', [BnbController::class, 'delete']);
});

//--------------------------------------------------
//      RESERVATION
//--------------------------------------------------

Route::group([

    'middleware' => 'api',
    'prefix' => 'reservation'

], function ($router) {

    Route::post('create', [ReservationController::class, 'create']);
    Route::get('index/{id}',[ReservationController::class, 'index']);
    Route::get('list',[ReservationController::class, 'list']);
    Route::put('update', [ReservationController::class, 'update']);
    Route::delete('delete/{id}', [ReservationController::class, 'delete']);
});

