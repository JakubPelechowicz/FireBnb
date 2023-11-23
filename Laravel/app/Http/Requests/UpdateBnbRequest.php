<?php

namespace App\Http\Requests;

use App\Http\Middleware\PreventRequestsDuringMaintenance;
use App\Models\Bnb;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateBnbRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if(auth()->user()!=null)
        return true;
        else return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' =>['required'],
            'space' => ['integer'],
            'address'=>['max:255'],
            'cost'=>['numeric'],
        ];
    }
    public function messages(): array
    {
        return [
            'id.required' => 'Id is required',
            'space.integer' => 'Space must be an integer',
            'address.max'=>'Address too long',
            'cost.numeric'=>'Cost must be numeric',
        ];
    }
    protected function failedValidation(Validator $validator) {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
