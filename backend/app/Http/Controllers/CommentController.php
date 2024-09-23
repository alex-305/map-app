<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller {

    // store new comment
    public function store(Request $request, $postId) {
        
        $request->validate([
            'body' => 'required',
        ]);

        $post = Post::findOrFail($postId);

        $comment = new Comment();
        $comment->body = $request->body;
        $comment->user_id = Auth::id();
        $comment->post_id = $post->id;
        $comment->save();

        return redirect()->route('posts.show', $postId)->with('success', 'comment added');
    }

    // delete comment
    public function destroy($id) {
        $comment = Comment::findOrFail($id);
        
        // check if the user is the owner of the comment
        if($comment->user_id != Auth::id()) {
            return redirect()->back()->with('error', 'You are not the owner of this comment.');
        }

        $comment->delete();
        return redirect()->back()->with('success', 'comment deleted');
    }
}
