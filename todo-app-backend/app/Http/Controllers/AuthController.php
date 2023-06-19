<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;



class AuthController extends Controller
{
     protected $headers =['Access-Control-Allow-Origin'=> '*',
     'Access-Control-Allow-Methods'=>'POST'];
  //310300
     public function signup(SignUpRequest  $request){
        $data = $request->validated();
                // Users::create($request->validated())  ;
             $findUser = User::where('email',$data["useremail"])->count() ;
              if($findUser >=1){
                return  response()->json("user already exist",409,$this->headers);
               
              }
              else{

                $user =  User::create([
                        'name' => $data['username'],
                        'email' => $data['useremail'],
                        'contact'=>$data['userContact'],
                        'password'=> bcrypt($data['userpassword'])
                   ]);
                       
                   $token = $user->createToken("signup")->plainTextToken;
                   $userData = ['user'=> $user, 'usertoken'=>$token];
   
                     return response()->json($userData,200,$this->headers);
              }
               
      }



     public  function login(LoginRequest $request){
                $loginCredentials = $request->validated();
                 if(!Auth::attempt($loginCredentials)){
                         return response()->json("invalid email or password",400,$this->headers);
                 }

                 $user = Auth::user();
                 $token = $user->createToken('main')->plainTextToken;

                 return response()->json([
                        'user' => $user,
                        'usertoken' => $token
                 ],200);

    }

    public function logout(Request $request){
            $user = $request->$user();
            $user->currentAccessToken()->delete();
               
            // why this return is not response()->json()
            return response('',204);
    }
}
