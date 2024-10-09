<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LikeController extends Controller
{
    public function likePost($postId){

        $user_id = auth()->id();

        DB::transaction(function() use ($postId, $user_id) {
            $post = Post::findOrFail($postId);

            $like = Like::where('user_id', $user_id)->where('post_id', $postId)->first();
    
            if($like) {
                return response()->json(['message' => 'Already liked this post'], 409);
            }
    
            $like = $post->likes()->create(['user_id' => $user_id,]);

            $post->increment('like_count');
        });
        
        return response()->json(['message' => 'Successfully liked post'], 201);
    }

    public function unlikePost($postId)
    {
        $user_id = auth()->id();
        DB::transaction(function() use ($postId, $user_id) {
            $like = Like::where('post_id', $postId)->where('user_id', $user_id)->first();

            if(!$like) {
                return response()->json(['message' => 'Post has not been liked'], 400);
            }

            $like->delete();

            $post = Post::where('id', $postId)->first();

            if(!$post) {
                return response()->json(['message' => 'Post does not exist'], 400);
            }

            $post->decrement('like_count');
        });

        return response()->json(['message' => 'Successfully unliked post'], 200);
    }

    public function isPostLiked($postId)
    {
        $user_id = auth()->id();

        $like = Like::where('post_id', $postId)->where('user_id', $user_id)->first();

        return response()->json(['liked' => (bool)$like], 200);
    }
}

