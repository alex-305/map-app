<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
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
        ->limit(100)
        ->get();

        return response()->json($posts, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
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
    public function show(string $id)
    {
        $post = Post::findOrFail($id);

        return response()->json($post, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $post = Post::findOrFail($id);

        $validatedData = $request->validate([
            'author_id' => 'required|integer',
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
    public function destroy(string $id)
    {
        $post = Post::findOrFail($id);

        $post->delete();

        return response()->json(null, 204);
    }
}
