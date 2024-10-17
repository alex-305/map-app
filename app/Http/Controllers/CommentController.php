<?php

namespace App\Http\Controllers;
use App\Models\Comment;
use App\Models\Post;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class CommentController extends Controller
{
    public function index(Request $request, $postId){
    
        Gate::authorize('index', Comment::class);
    
        $comments = Comment::where('post_id', $postId)
        ->join('users', 'comments.author_id', '=', 'users.id')
        ->select('comments.*','users.username')
        ->get();
    
        return response()->json($comments, 201);
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
    public function destroy(Request $request, $commentId){

        Gate::authorize('destroy', Comment::class);

        $comment = Comment::findOrFail($commentId);

        $post = Post::findOrFail($comment->post_id);  // look for post id

        DB::transaction(function () use ($post, $comment) {
            $comment->delete();
            $post->decrement('comment_count');
        });

        return response()->json(null, 204);
    }
}
