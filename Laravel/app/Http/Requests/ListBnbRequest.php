<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ListBnbRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'space_max' => ['integer'],
            'space_min' => ['integer'],
            'user_id' => ['integer'],
            'address_like'=>['max:255'],
            'max_cost'=>['numeric'],
            'min_cost'=>['numeric'],
        ];
    }
    public function messages(): array
    {
        return [
            'max_space.integer' => 'Maximum Space must be an integer',
            'min_space.integer' => 'Minimum Space must be an integer',
            'user_id.integer' => 'user_id must be an integer',
            'address_like.max'=>'Address too long',
            'min_cost.numeric'=>'Minimum Cost must be numeric',
            'max_cost.numeric'=>'Maximum Cost must be numeric',
        ];
    }
    protected function failedValidation(Validator $validator) {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
