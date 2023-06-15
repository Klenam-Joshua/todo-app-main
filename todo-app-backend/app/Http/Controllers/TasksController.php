<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Models\Tasks;
use App\Models\User;
use App\Http\Requests\TasksRequest;
use Illuminate\Support\Facades\Auth;

class TasksController extends Controller
{
  protected $headers =['Access-Control-Allow-Origin'=> '*',
  'Access-Control-Allow-Methods'=>'POST'];
    public function tasks(Request $request){
   
     $userId = $request->header("userId");
      $user =  User::find($userId);
      
        $completedTodo = Tasks::where('status','completed')->orderBy('priority','asc')->get();
        $activeTodo = Tasks::where('status','active')->orderBy('priority','asc')->get();
        $allTasks = Tasks::where('user_id',$userId)->orderBy('priority','asc')->get();

        $data = [
          "All" => $allTasks,
          "Completed" => $completedTodo,
          "Active" => $activeTodo,
        ];

       return response()->json($data,200,$this->headers);
       
       // return response()->json($todos,200,$headers);
             
    }

    public function createTask(TasksRequest $request ){ 
             $data = $request->validated();
             $id = $request->header('userId');
             $data2 = [
                  'user_id' => (int)$id,
                  'status' => $data['status'],
                  'priority' => $data['priority'],
                  'title'=>$data['title'],
                  
             ];
           
            if(!Tasks::create($data2)){
                return response()->json("error creating task");

            }
            return response()->json("task created successfully");
    }

    public function destroy(Request $request,$id){
          $userId = $request->header('userId');
            $totalTodoCount = Tasks::where('user_id',$userId)->count();

            $allTodo = Tasks::where('user_id',$userId)->get();
            $lessData = Tasks::where("id", '<' ,$id)->where("user_id",$userId)->count();
           
            if(!$lessData){
                 $lessData = 0;
              }


              $tupleTodelete= Tasks::find($id);
               if( $tupleTodelete){
                 $tupleTodelete->delete();



              for($i = $lessData +1; $i < $totalTodoCount ; $i++ )
              {
                   $id = $allTodo[$i]->id;
                   $tuple = Tasks::find($id) ;
                   $tuple->priority = $i;
                   $tuple->save();
                     

                  }

                  return response()->json("deleted successfully");
               }
               else{
                    abort(404,"item not found");
               }
    }

    public function  updateStatus($id){
            $task = Tasks::find($id);
              if($task->status === "active"){
                  $task->status = "completed";
                  $task->save();
              }
             else{
               $task->status = "active";
               $task->save();
              
             }
              return response()->json("status updated successfully",200);
            // return response()->json("status update successfully",200);
    }


}
