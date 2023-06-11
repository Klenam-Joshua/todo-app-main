<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Models\Tasks;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TasksController extends Controller
{
    public function tasks(Request $request){
     $userId = $request->header("userId");
      $user =  User::where('user_id',$userId);
      if(!$user){
          return response()->json("not found",404);
      }
     $todos =  Tasks::where("user_id",$userId)->orderBy('priority','asc');

      return response()->json($todos);
             
    }

    public function destroy(Request $request){
                
            $totalTodoCount = todos::where('status','active')->count();

            $allTodo = todos::where('status','active')->get();
            $lessData = todos::where("id", '<' ,$id)->where("status","active")->count();
           
            if(!$lessData){
                 $lessData = 0;
              }


              $tupleTodelete= todos::find($id);
               if( $tupleTodelete){
                 $tupleTodelete->delete();



              for($i = $lessData +1; $i < $totalTodoCount ; $i++ )
              {
                   $id = $allTodo[$i]->id;
                   $tuple = todos::find($id) ;
                   $tuple->todoRank = $i;
                   $tuple->save();
                     

                  }

                  return response()->json("deleted successfully");
               }
               else{
                    abort(404,"item not found");
               }
    }

    public function  update(){
        
    }


}
