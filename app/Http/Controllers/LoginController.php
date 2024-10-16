<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller {
    public function register(Request $request) {
        $validatedData = $request->validate([
            'username' => ['required', 'string', 'min:3', 'max:20'],
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        $existingUser = User::where('email', $validatedData['email'])
                            ->orWhere('username', $validatedData['username'])
                            ->first();

        if($existingUser) {
            if($existingUser->email === $validatedData['email']) {
                return response()->json(['message' => 'An account with this email already exists.'], 409);
            }

            if($existingUser->username === $validatedData['username']) {
                return response()->json(['message' => 'This username is already in use.'], 409);
            }
        }

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
            'email' => ['nullable', 'email', 'required_without:username'],
            'username' => ['nullable', 'string', 'required_without:email'],
            'password' => ['required']
        ]);

        $creds = [ 'password' => $validatedData['password']];

        $user = null;
        $identifier = '';

        if(!empty($validatedData['email'])) {
            $identifier = 'email';
            $user = User::where($identifier, $validatedData['email'])->first();
            $creds['email'] = $validatedData['email'];
        } else {
            $identifier = 'username';
            $user = User::where($identifier, $validatedData['username'])->first();
            $creds['username'] = $validatedData['username'];
        }

        if(!$user) {
            return response()->json(['message' => 'User with the specified ' + $identifier +' does not exist.'], 401);
        }

        if(Hash::check($validatedData['password'], $user->password)) {
            return response()->json(['message' => 'Incorrect password.'], 401);
        }

        if (Auth::attempt($creds)) {
            $request->session()->regenerate();

            return response()->json(status: 200);
        }

        return response()->json(['message' => 'Login successful.'], 401);
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
