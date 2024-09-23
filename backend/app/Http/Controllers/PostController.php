<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller{

    // list of all posts
    public function index(){
        $allPosts = Post::with('user', 'comments')->get();

        return view('posts.index', compact('posts'));
    }

    public function show($id){
        // find post by ID with user and comments
        $post = Post::with('user', 'comments')->findOrFail($id);
        
        // return post view
        return view('posts.show', compact('post'));
    }

    public function store(Request $request){
        
        // data validation
        $validated = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
        ]);

        // create new post
        $newPost = new Post();
        $newPost->title = $validated['title'];
        $newPost->body = $validated['body'];
        $newPost->user_id = Auth::id(); 
        $newPost->save();

        return redirect()->route('posts.index')->with('success', 'Post created successfully.');
    }

    // update an existing post
    public function update(Request $request, $id){
        // find post by ID
        $post = Post::findOrFail($id);

        // check if the user is the owner of the post
        if($post->user_id != Auth::id()){
            return redirect()->route('posts.index')->with('error', 'You are not the owner of the post.');
        }

        // data validation
        $validated = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
        ]);

        // edit the post
        $post->title = $validated['title'];
        $post->body = $validated['body'];
        $post->save();

        return redirect()->route('posts.index')->with('success', 'Post updated successfully.');
    }

    // delete post
    public function destroy($id){
        // find post by ID
        $post = Post::findOrFail($id);
  
        // check if the user is the owner of the post
        if($post->user_id != Auth::id()) {
            return redirect()->route('posts.index')->with('error', 'You are not the owner of the post.');
        }
  
        // delete post
        $post->delete();
  
        return redirect()->route('posts.index')->with('success', 'Post deleted successfully.');
    }

    //TODO - Like and Unlike posts
}
