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

        $completedTodo = Tasks::where('status','completed')->where('user_id',$userId)->orderBy('priority','asc')->get();
        $activeTodo = Tasks::where('status','active')->where('user_id',$userId)->orderBy('priority','asc')->get();
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
                  'startTime' =>$data['startTime']

             ];

            if(!Tasks::create($data2)){
                return response()->json("error creating task");

            }
            return response()->json("task created successfully");
    }

    public function destroy(Request $request,$id){
          $userId = $request->header('userId');

              $tupleTodelete= Tasks::find($id);
               if( $tupleTodelete){
                 $tupleTodelete->delete();




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

  public function updatePriority(Request $request){
           $userId = $request->header('userId');
            

          $taskAtTargetPostnId = $request->elementBeingDraggedOnId;
          $taskAtTargetPosition =  Tasks::find($taskAtTargetPostnId)->priority;
      
          $taskToReorderId = $request->elementBeingDraggedId;

         $taskToReorder=  Tasks::find($taskToReorderId);

         $totalTodoCount = Tasks::where('user_id',$userId)->count();

         $allTodo = Tasks::where('user_id',$userId)->orderBy('priority')->get();

        
         function findIndex($positionId,$totalElementsCount, $elements){
                $index = -1;

                for($i = 0; $i< $totalElementsCount; $i++){
                  if($elements[$i]["id"] == $positionId){
                          $index = $i;
                  }
              }
               return  $index;
            }

           $taskAtTargetPostnIndex = findIndex($taskAtTargetPostnId,$totalTodoCount,$allTodo);
            $taskToReorderIndex =  findIndex($taskToReorderId,$totalTodoCount,$allTodo);
         
             
            if($taskAtTargetPostnIndex  <  $taskToReorderIndex){
                      for($i = $taskAtTargetPostnIndex ; $i < $totalTodoCount ; $i++ )
            {
                 $id = $allTodo[$i]->id;
                 $tuple = Tasks::find($id) ;
                 $tuple->priority = $i + 2;
                 $tuple->save();


                }
                
                 $taskToReorder->priority = $taskAtTargetPostnIndex +1;
                 $taskToReorder->save();

                 
            }
            
            else{

              for($i = $taskAtTargetPostnIndex ;  $i >$taskToReorderIndex +1; $i-- )
              {
                   $id = $allTodo[$i]->id;
                   $tuple = Tasks::find($id) ;
                   $tuple->priority = $i;
                   $tuple->save();
  
  
                  }
                
                   $taskToReorder->priority = $taskAtTargetPostnIndex + 1;
                   $taskToReorder->save();
  

            
            }
                 
                
            return  response()->json("priority updated successfully",200);
  }

   public function clearAllCompletes(Request  $request){
         $user_id = $request->header("userId");
     
         $completedTodos = Tasks::where('status','completed')->where("user_id",$user_id)->get();
         $completedTodosCount = Tasks::where('status','completed')->where("user_id",$user_id)->count();

         for($i = 0; $i < $completedTodosCount; $i++){
                
          $id = $completedTodos[$i]->id;
          $todo = Tasks::find($id);
          $todo->delete();
         }
         return  response()->json(["deleted Successfully"],200);
   }
}
