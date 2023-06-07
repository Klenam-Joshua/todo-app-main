<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Request\Http\LoginRequest;
use App\Request\Http\SignUpRequest;
use App\Model\Users;
use Illumintate\Support\Facades\Auth;




class AuthController extends Controller
{
    
  //310300
     public function signup(SignUpRequest  $request){
          try{
                // Users::create($request->validated())  ;
                // return response()->json(200, "user created successfully");
                $data = $request->validated();
                Users::create([
                     'name' => $data['username'],
                     'email' => $data['useremail'],
                     'password'=> bcrypt($data['userpassword'])
                ]);

                  return response()->json(200,"user created successfully");
            }
                     catch(Exception $e){
                     return response()->json(400,"error creating user");
           }
     }



     public  function login(LoginRequest $request){
                $loginCredentials = $request->validated();
                 if(!Auth::attempt($loginCredentials)){
                         return response()->json("invalid email or password");
                 }

                 $user = Auth::user();
                 $token = $user->createToken('main')->accessToken;

                 return response()-json([
                        'user' => $user,
                        'usertoken' => $token
                 ], 201);

    }

    public function logout(){
        
    }
}
