<?php

namespace App\Http\Requests;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Http\FormRequest;

class TasksRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
              'status' => ['required'],
              'priority'=> ['required'],
              'title'=>  ['required'],
               'startTime' =>[]
              
        ];
    }

    protected function failedValidation(Validator $validator){
           throw new HttpResponseException(
                 response()->json(['errors'=>$validator->errors()],400)
           );
    }
}
