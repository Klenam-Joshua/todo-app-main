<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;




class AuthController extends Controller
{
    
  //310300
     public function signup(SignUpRequest  $request){
         
                // Users::create($request->validated())  ;
                // return response()->json(200, "user created successfully");
                $data = $request->validated();
                User::create([
                     'name' => $data['username'],
                     'email' => $data['useremail'],
                     'password'=> bcrypt($data['userpassword'])
                ]);

                  return response()->json("user created successfully");
            
               
      }



     public  function login(LoginRequest $request){
                $loginCredentials = $request->validated();
                 if(!Auth::attempt($loginCredentials)){
                         return response()->json("invalid email or password");
                 }

                 $user = Auth::user();
                 $token = $user->createToken('main')->plainTextToken;

                 return response()->json([
                        'user' => $user,
                        'usertoken' => $token
                 ], 201);

    }

    public function logout(Request $request){
            $user = $request->$user();
            $user->currentAccessToken()->delete();
               
            // why this return is not response()->json()
            return response('',204);
    }
}
