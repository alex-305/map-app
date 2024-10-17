<?php

namespace App\Http\Controllers;
use App\Models\Comment;
use App\Models\Post;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    public function store(Request $request, $postId){

        if ($request->user()->cannot('store', Comment::class)) {
            return response()->json(['message' => 'You do not have permission to create this resource'],403);
        }

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

        if ($request->user()->cannot('destroy', Comment::class)) {
            return response()->json(['message' => 'You do not have permission to delete this resource'],403);
        }

        $comment = Comment::where('id', $commentId)
            ->firstOrFail();

        $post = Post::findOrFail($comment->post_id);  // look for post id

        DB::transaction(function () use ($post, $comment) {
            $comment->delete();
            $post->decrement('comment_count');
        });

        return response()->json(null, 204);
    }

    public function index(Request $request, $postId){

        if ($request->user()->cannot('index', Comment::class)) {
            return response()->json(['message' => 'You do not have permission to view this resource'],403);
        }

        $comments = Comment::where('post_id', $postId)->get();

        return response()->json($comments, 201);
    }

}
