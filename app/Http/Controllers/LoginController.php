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

        return response()->json([
        'message'=> 'User successfully registered an account.', 
        'csrfToken' => csrf_token()
    ], 200);
    }

    public function login(Request $request) {
        $validatedData = $request->validate([
            'identifier' => ['string', 'required'],
            'password' => ['string', 'required']
        ]);


        $creds['password'] = $validatedData['password'];

        if (filter_var($validatedData['identifier'], FILTER_VALIDATE_EMAIL)) {
            $creds['email'] = $validatedData['identifier'];
        } else {
            $creds['username'] = $validatedData['identifier'];
        }

        $user = null;
        $identifier = '';

        if (Auth::attempt($creds)) {
            $request->session()->regenerate();
            return response()->json([
                'message' => 'Login successful.', 
                'csrfToken' => csrf_token()
            ], 200);
        }

        return response()->json(['message' => 'Incorrect credentials'], 401);
    }

    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json([
            'Logout sucessful.' => true, 
            'csrfToken' => csrf_token()
        ]);
    }

    public function isLoggedIn() {
        $res = Auth::check();
        return response()->json([
        'result' => $res,
        'csrfToken' => csrf_token()], 200);
    }
}
