<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});


Route::apiResource('posts', PostController::class);

Route::controller(LoginController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/logout', 'logout');
    Route::post('/login', 'login');
    Route::get('/check', 'isLoggedIn');
});
