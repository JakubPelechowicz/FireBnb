<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\EditUserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function create(CreateUserRequest $request)
    {
        $user = User::create($request->validated());
        return response()->json($user,201);
    }
    public function update(EditUserRequest $request)
    {
        $user = auth()->user();
        $user->fill($request->validated());
        $user->save();
        return response()->json($user,200);
    }
    public function delete()
    {
        $user = auth()->user();
        if($user==null)
            return response()->json(['this method requires authentication'],403);
        auth()->logout();
        $user ->reservations()->delete();
        $user ->bnbs()->delete();
        $user ->delete();
        return response()->json($user,200);
    }
}
