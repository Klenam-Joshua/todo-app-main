<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TaskMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {   
           $id = $request->header("userId");
           $token =  $request->header("token");
        
            if(!$token ){
                    return response()->json("not Authorized",401);
            }

           
        return $next($request);
    }
}
