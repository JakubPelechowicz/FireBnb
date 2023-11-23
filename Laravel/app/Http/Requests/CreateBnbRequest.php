<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateBnbRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if (auth()->user()!=null)
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
            'space' => ['required','integer'],
            'address'=>['required','max:255'],
            'cost'=>['required','numeric'],
        ];
    }
    public function messages(): array
    {
        return [
            'space.integer' => 'Space must be an integer',
            'address.max'=>'Address too long',
            'cost.numeric'=>'Cost must be numeric',
            'space.required' => 'Space is required',
            'address.required'=>'Address is required',
            'cost.required'=>'Cost is required',
        ];
    }
    protected function failedValidation(Validator $validator) {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
