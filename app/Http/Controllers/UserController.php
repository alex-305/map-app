<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller {
    public function show($userId) {
        $user = User::where('id', $userId)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user, 200);
    }

    public function updateUser(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255',
        ]);

        $user = Auth::user();
        
        if (!$user instanceof User) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->update([
            'username' => $request->username,
        ]);

        return response()->json(['message' => 'Username updated successfully'], 200);
    }

    public function updateEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|max:255|unique:users',
        ]);

        $user = Auth::user();
        
        if (!$user instanceof User) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->update([
            'email' => $request->email,
        ]);

        return response()->json(['message' => 'Email updated successfully'], 200);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'password' => 'required|string|min:8|confirmed',
            'password_confirmation',
        ]);

        $user = Auth::user();
        
        if (!$user instanceof User) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Password updated successfully'], 200);
    }
    
}
