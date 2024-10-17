<?php

namespace App\Helpers;
use Illuminate\Http\Request;


class PolicyEnforcer {

    public function enforce(Request $request, string $class, string $error_msg)
    {

        if (!$request->user()) {
            return response()->json(['message' => $error_msg], 403);
        } else if ($request->user()->cannot('index', $class)) {
            return response()->json(['message' => $error_msg], 403);
        }
    }
}