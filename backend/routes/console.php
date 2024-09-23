<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Models\Post;
use Carbon\Carbon;


Artisan::command('posts:clean', function () {
    $deletedPosts = Post::where('created_at', '<', Carbon::now()->subWeek())->delete();
    $this->info($deletedPosts . ' posts older than one week were deleted');
})->purpose('clean up posts older than one week');
