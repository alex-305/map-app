<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\CommentController;
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

// routes for liking unliking posts
Route::post('/posts/{post}/like', [LikeController::class, 'likePost'])->middleware('auth');
Route::delete('/posts/{post}/unlike', [LikeController::class, 'unlikePost'])->middleware('auth');

// routes for adding deleting comments
Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->middleware('auth');
Route::delete('/posts/{post}/comments/{comment}', [CommentController::class, 'destroy'])->middleware('auth');
