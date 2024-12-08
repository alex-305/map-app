<?php

namespace App\Http\Controllers;
use App\Models\Comment;
use App\Models\Post;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class CommentController extends Controller
{
    public function index(Request $request, $postId){
    
        Gate::authorize('index', Comment::class);
    
        $comments = Comment::where('post_id', $postId)
        ->join('users', 'comments.author_id', '=', 'users.id')
        ->select('comments.*','users.username')
        ->get();
    
        return response()->json($comments, 200); // changed to 200
    }

    
    public function store(Request $request, $postId){

        Gate::authorize('store', Comment::class);

        $validatedData = $request->validate([
            'content' => 'required|string',
        ]);

        $post = Post::findOrFail($postId);  // look for post id

        $comment = null;

        DB::transaction(function () use ($post, $validatedData, &$comment) {
            $comment = $post->comments()->create([
                'author_id' => auth()->id(),
                'post_id' => $post->id,
                'content' => $validatedData['content'],
            ]);
            $post->increment('comment_count');
        });

        return response()->json(['message' => 'Successfully left a comment.'], 201);
    }
    
    public function destroy(Request $request, $postId, $commentId)
    {
        // get the comment and check if it belongs to the post
        $comment = Comment::where('id', $commentId)->where('post_id', $postId)->firstOrFail();
    
        Gate::authorize('delete', $comment);
    
        $post = Post::findOrFail($postId);
    
        DB::transaction(function () use ($post, $comment) {
            $comment->delete();
            $post->decrement('comment_count');
        });
    
        return response()->json(null, 204);
    }
    
};