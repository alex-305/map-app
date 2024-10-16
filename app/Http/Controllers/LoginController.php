<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller {
    public function register(Request $request) {
        $validatedData = $request->validate([
            'username' => ['required', 'string', 'min:3', 'max:20', 'unique:users,username'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required']
        ]);

        $user = User::create([
            'username' => $validatedData['username'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password'])
        ]);

        Auth::login($user);

        return response()->json(['message'=> 'User successfully registered an account.'], 200);
    }

    public function login(Request $request) {
        $validatedData = $request->validate([
            'email' => ['nullable', 'email', 'exists:users,email', 'required_without:username'],
            'username' => ['nullable', 'string', 'exists:users,username', 'required_without:email'],
            'password' => ['string', 'required']
        ]);


        $creds['password'] = $validatedData['password'];

        if (!empty($validatedData['email'])) {
            $creds['email'] = $validatedData['email'];
        } else {
            $creds['username'] = $validatedData['username'];
        }

        $user = null;
        $identifier = '';

        if (Auth::attempt($creds)) {
            $request->session()->regenerate();
            return response()->json(['message' => 'Login successful.'], 200);
        }

        return response()->json(['message' => 'Incorrect credentials'], 401);
    }

    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['Logout sucessful.' => true]);
    }

    public function isLoggedIn() {
        $res = Auth::check();
        return response()->json(["result" => $res], 200);
    }
}
