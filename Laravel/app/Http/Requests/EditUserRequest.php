<?php

namespace App\Http\Requests;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Foundation\Http\FormRequest;

class EditUserRequest extends FormRequest
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
           'full_name' => ['max:255'],
           'email' => ['email','unique:email'],
           'password' => ['min:8','max:32'],
        ];
    }
    public function messages(): array
    {
        return [
            'full_name.max' => 'Name is too long',
            'email.email' => 'Email format is wrong',
            'email.unique' => 'Email is already in use',
            'password.min'=>'Your password is too short',
            'password.max'=>'Your password is too long',
        ];
    }
    protected function failedValidation(Validator $validator) {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}

