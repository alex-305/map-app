<?php

namespace App\Http\Controllers;
use App\Models\Comment;
use App\Models\Post;

use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, $postId){
        $validatedData = $request->validate([
            'content' => 'required|string',
        ]);

        $post = Post::findOrFail($postId);  // look for post id
        $comment = $post->comments()->create([
            'author_id' => 1,               // TODO: Replace with AUTH(user)
            'content' => $validatedData['content'],
        ]);

        return response()->json($comment, 201);
    }

    public function destroy($postId, $commentId){
        $comment = Comment::where('id', $commentId)
            ->where('post_id', $postId)
            ->where('author_id', 1)  // TODO: Replace with AUTH(user)
            ->firstOrFail();

        $comment->delete();

        return response()->json(null, 204);
    }
}
