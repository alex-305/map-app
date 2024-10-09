<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function likePost($postId){

        $user_id = auth()->id();

        $post = Post::findOrFail($postId);

        $like = Like::where('user_id', $user_id)->where('post_id', $postId)->first();

        if($like) {
            return response()->json(['message' => 'Already liked this post'], 409);
        }

        $like = $post->likes()->create(['user_id' => $user_id,]);
        
        return response()->json(['message' => 'Successfully liked post'], 201);
    }

    public function unlikePost($postId)
    {
        $user_id = auth()->id();

        $like = Like::where('post_id', $postId)->where('user_id', $user_id)->firstOrFail();

        $like->delete();

        return response()->json(null, 204);
    }
}

