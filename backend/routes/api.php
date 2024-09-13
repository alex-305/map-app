<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;


Route::get('/post/{id}', [PostController::class, "show"]);
Route::post("/posts", [PostController::class, "store"]);
Route::get("/posts", [PostController::class,"index"]);