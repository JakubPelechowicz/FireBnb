<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateUserRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => ['required','max:255'],
            'email' => ['required','email','unique:email'],
            'password' => ['required','min:8','max:32'],
        ];
    }
    public function messages(): array
    {
        return [
            'full_name.max' => 'Name is too long',
            'full_name.required' => 'Name is required',
            'email.email' => 'Email format is wrong',
            'email.unique' => 'Email is already in use',
            'email.required' => 'Email is required',
            'password.min'=>'Your password is too short',
            'password.max'=>'Your password is too long',
            'password.required' => 'Password is required',
        ];
    }
    protected function failedValidation(Validator $validator) {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
