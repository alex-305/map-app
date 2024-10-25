<?php

// app/Http/Controllers/SettingsController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingsController extends Controller
{
    public function index()
    {
        // Get the authenticated user
        $user = Auth::user();

        // Pass the user's settings to the view
        return view('settings.index', [
            'settings' => [
                'username' => $user->username,
               // 'theme' => $user->theme,
                //'notifications' => $user->notifications,
            ],
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255',
            //'theme' => 'required|string|in:light,dark',
           // 'notifications' => 'required|boolean',
        ]);

        $user = Auth::user();
        $user->username = $request->username;
       // $user->theme = $request->theme;
        //$user->notifications = $request->notifications;
        $user->save();

        return redirect()->back()->with('success', 'Settings updated successfully.');
    }
}