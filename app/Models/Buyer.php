<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Buyer extends Model
{
    protected $primaryKey = 'buyerId';
    protected $fillable = ['name', 'email'];
    protected $table = 'buyers';
    public $timestamps = false;
    // public function test() : Returntype {
        
    // }
}
