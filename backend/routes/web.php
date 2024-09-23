<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;

// home route
Route::get('/', function () {
    return view('welcome');
});

Auth::routes();  // Laravel’s built-in auth

// Route for auth users
Route::middleware(['auth'])->group(function () {

    // post routes
    Route::get('/posts', [PostController::class, 'index'])->name('posts.index');             // get posts
    Route::get('/posts/{id}', [PostController::class, 'show'])->name('posts.show');          // view a post
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');            // create a post
    Route::put('/posts/{id}', [PostController::class, 'update'])->name('posts.update');      // edit a post
    Route::delete('/posts/{id}', [PostController::class, 'destroy'])->name('posts.destroy'); // delete a post

    // comment routes
    Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->name('comments.store'); // add comment
    Route::delete('/comments/{id}', [CommentController::class, 'destroy'])->name('comments.destroy');   // delete comment

    // like unlike posts
    Route::post('/posts/{id}/like', [PostController::class, 'like'])->name('posts.like'); 
    Route::post('/posts/{id}/unlike', [PostController::class, 'unlike'])->name('posts.unlike'); 

    // profile routes
    Route::get('/profile', [UserController::class, 'profile'])->name('user.profile');              // view profile
    Route::post('/profile', [UserController::class, 'updateProfile'])->name('user.updateProfile'); // update user profile

});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
