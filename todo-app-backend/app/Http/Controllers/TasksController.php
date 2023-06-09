<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Models\Tasks;
use Illuminate\Support\Facades\Auth;

class TasksController extends Controller
{
    public function tasks(){
               $user = Auth::user();
               return $user;
    }

    public function destroy(){
                
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
