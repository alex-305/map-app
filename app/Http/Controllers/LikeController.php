<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function likePost($postId){
        $post = Post::findOrFail($postId);

        $like = $post->likes()->create([
            'user_id' => 1,    //TODO: Replace with AUTH(user)
        ]);

        return response()->json($like, 201);
    }

    public function unlikePost($postId)
    {
        $like = Like::where('post_id', $postId)->where('user_id', 1)->firstOrFail(); // Replace '1' with actual user ID
        $like->delete();

        return response()->json(null, 204);
    }
}

