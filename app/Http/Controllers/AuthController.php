<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller {
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
            'password' => ['string', 'required'],
            'rememberMe' => ['boolean', 'nullable']
        ]);


        $creds['password'] = $validatedData['password'];

        if (filter_var($validatedData['identifier'], FILTER_VALIDATE_EMAIL)) {
            $creds['email'] = $validatedData['identifier'];
        } else {
            $creds['username'] = $validatedData['identifier'];
        }

        $user = null;
        $identifier = '';

        error_log($validatedData['rememberMe']);

        if (Auth::attempt($creds, $validatedData['rememberMe'])) {
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
        $result = Auth::check();

        if($result) {
            $user = Auth::user();

            return response()->json([
                'result' => $result,
                'user' => [
                    'id' => $user->id,
                    'username' => $user->username,
                    'email' => $user->email,
                    'created_at' => $user->created_at,
                    'follower_count' => $user->follower_count
                ],
                'csrfToken' => csrf_token()
            ], 200);
        }

        return response()->json([
            'result' => $result,
            'message' => 'This user is not logged in',
            'csrfToken' => csrf_token()
        ], 200);
    }

    public function forgotPassword(Request $request) {
        error_log($request->email);
        $request->validate(['email' => 'required|email']); // check email

        // send reset link 
        $status = Password::sendResetLink($request->only('email'));

        if($status === Password::RESET_LINK_SENT){
            return response()->json([ 'message' => __($status) ], 200);
        }else {
            return response()->json([ 'message' => __($status)], 400);
        }
    }

    public function verifyPassword(Request $request) {
        $request->validate([
            'password' => 'required|string',
        ]);

        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        if (Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Password verified successfully'], 200);
        } else {
            return response()->json(['message' => 'Invalid password'], 400);
        }
    }

    public function showLinkRequestForm() {
        return Inertia::render('Auth/PasswordForgot'); 
    }

    // sends the password reset link
    public function sendResetLinkEmail(Request $request) {
        $request->validate(['email' => 'required|email']);
        $status = Password::sendResetLink($request->only('email'));

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => __($status)], 200)
            : response()->json(['message' => __($status)], 400);
    }

    // shows the reset form
    public function showResetForm($token) {
        return Inertia::render('Auth/PasswordReset', ['token' => $token]);
    }

    // resets the password
    public function reset(Request $request) {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            
            function(User $user, $password)
            {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => __($status)], 200)
            : response()->json(['message' => __($status)], 400);
    }

}
