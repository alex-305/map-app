<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::apiResource('posts', PostController::class);

// routes for liking unliking posts
Route::post('/posts/{post}/like', [LikeController::class, 'likePost']);
Route::delete('/posts/{post}/unlike', [LikeController::class, 'unlikePost']);

// routes for adding deleting comments
Route::post('/posts/{post}/comments', [CommentController::class, 'store']);
Route::delete('/posts/{post}/comments/{comment}', [CommentController::class, 'destroy']);
