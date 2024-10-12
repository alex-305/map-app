<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('posts', [PostController::class, 'index']);

Route::apiResource('posts', PostController::class)->except('index')->middleware('auth');

Route::controller(LoginController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/logout', 'logout');
    Route::post('/login', 'login');
    Route::get('/check', 'isLoggedIn');
});

Route::controller(LikeController::class)->group(function () {
    Route::post('/posts/{post}/like', 'likePost')->middleware('auth');
    Route::delete('/posts/{post}/unlike', 'unlikePost')->middleware('auth');
    Route::get('/posts/{post}/like', 'isPostLiked')->middleware('auth');
});

Route::controller(CommentController::class)->group(function () {
    Route::post('/posts/{post}/comments', 'store')->middleware('auth');
    Route::delete('/posts/{post}/comments/{comment}', 'destroy')->middleware('auth');
});

Route::controller(UserController::class)->group(function () {
    Route::get('/users/{user}', 'show');
});
