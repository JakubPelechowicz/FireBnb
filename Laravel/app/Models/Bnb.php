<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bnb extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'bnb';

    protected $fillable = [
        '_id',
        'user_id',
        'created_at',
        'updated_at',
        'space',
        'address',
        'cost'
    ];

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
