<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SettingsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('posts', [PostController::class, 'index']);
Route::get('/posts/user/{userId}', [PostController::class, 'showAll'])->middleware('auth');
Route::get('/login', [AuthController::class, 'login'])->name('login');

Route::apiResource('posts', PostController::class)->except('index')->middleware('auth');
Route::delete('/posts/{post}', [PostController::class, 'destroy'])->middleware('auth');

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/logout', 'logout');
    Route::post('/login', 'login');
    
    Route::get('/check', 'isLoggedIn');

    Route::post('/forgot-password', 'forgotPassword');
    Route::post('/verify-password', [AuthController::class, 'verifyPassword']);
    Route::get('password/reset', [AuthController::class, 'showLinkRequestForm'])->name('password.request');
    Route::post('password/email', [AuthController::class, 'sendResetLinkEmail'])->name('password.email');
    Route::get('password/reset/{token}', [AuthController::class, 'showResetForm'])->name('password.reset');
    Route::post('password/reset', [AuthController::class, 'reset'])->name('password.update');
});

Route::controller(LikeController::class)->group(function () {
    Route::post('/posts/{post}/like', 'likePost')->middleware('auth');
    Route::delete('/posts/{post}/unlike', 'unlikePost')->middleware('auth');
    Route::get('/posts/{post}/like', 'isPostLiked')->middleware('auth');
});


Route::controller(CommentController::class)->group(function () {
    Route::get('/posts/{post}/comments', 'index');
    Route::post('/posts/{post}/comments', 'store')->middleware('auth');
    Route::delete('/posts/{post}/comments/{comment}', [CommentController::class, 'destroy'])->middleware('auth');
});

Route::controller(UserController::class)->group(function () {
    Route::get('/users/{user}', 'show')->middleware('auth')->name('users.show');
    Route::post('/users/{user}/update-username', [UserController::class, 'updateUser'])->middleware('auth')->name('users.update-username');
    Route::post('/users/{user}/update-email', [UserController::class, 'updateEmail'])->middleware('auth')->name('users.update-email');
    Route::post('/users/{user}/update-password', [UserController::class, 'updatePassword'])->middleware('auth')->name('users.update-password');
});


Route::controller(SettingsController::class)->group(function () {
    Route::get('/settings', 'index')->middleware('auth')->name('settings.index'); // Ensure the user is authenticated
    Route::post('/settings', 'update')->middleware('auth')->name('settings.update'); // Ensure the user is authenticated
});
