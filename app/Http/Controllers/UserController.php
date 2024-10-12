<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller {
    public function show($userId) {
        $user = User::where('id', $userId)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user, 200);
    }
}
