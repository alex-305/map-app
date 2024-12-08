<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        Gate::authorize('index', Post::class);

        $request->validate([
            'min_lat' => 'required|numeric',
            'max_lat' => 'required|numeric',
            'min_lng' => 'required|numeric',
            'max_lng' => 'required|numeric',
        ]);
        $minLat = $request->query('min_lat');
        $maxLat = $request->query('max_lat');
        $minLng = $request->query('min_lng');
        $maxLng = $request->query('max_lng');
        
        $posts = Post::whereBetween('latitude', [$minLat, $maxLat])
        ->whereBetween('longitude', [$minLng, $maxLng])
        ->orderBy('like_count')
        ->join('users', 'posts.author_id', '=', 'users.id')
        ->select('posts.*','users.username')
        ->limit(100)
        ->get();

        return response()->json($posts, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        Gate::authorize('store', Post::class);


        $validatedData = $request->validate([
            'content' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'color' => 'required|string',
        ]);

        $validatedData['author_id'] = auth()->id();

        $post = Post::create($validatedData);

        return response()->json($post, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $post = Post::findOrFail($id);
        
        Gate::authorize('show', $post);
    
        $post = Post::where('posts.id', $id)
            ->join('users', 'posts.author_id', '=', 'users.id')
            ->select('posts.*', 'users.username')
            ->firstOrFail();
    
        return response()->json($post, 200);
    }

    public function showAll(Request $request, string $userId)
    {
        Gate::authorize('showAll', [Post::class, $userId]);

        $posts = Post::where('author_id', $userId)
            ->join('users', 'posts.author_id', '=', 'users.id')
            ->select('posts.*', 'users.username')
            ->orderBy('posts.created_at', 'desc')
            ->get();
    
        return response()->json($posts, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        Gate::authorize('update', Post::class);

        $post = Post::findOrFail($id);

        $validatedData = $request->validate([
            'content' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric'
        ]);

        $post->update($validatedData);

        return response()->json($post, 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $post = Post::findOrFail($id);

    
        Gate::authorize('delete', $post);

        if (!Gate::allows('delete', $post)) {
            Log::error('Authorization failed for User ID: ' . auth()->id() . ' on Post ID: ' . $id);
        }
        
        $post->delete();

        return response()->json(null, 204);
    }
}
