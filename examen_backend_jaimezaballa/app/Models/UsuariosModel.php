<?php

namespace App\Models;

use App\Models\UsuariosInfoModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsuariosModel extends Model {
    
    use HasFactory;

    protected $connection = "mysql";

    protected $table = "usuarios";

    protected $primaryKey = "id";

    public $incrementing = true;

    public static function createDefinition() {
        return [
            'name' => 'required|max:64',
            'email' => 'required|email|max:128|unique:usuarios,email',
            'password' => 'required|max:16'
        ];
    }

    public static function updateDefinition() {
        return [
            'name' => 'required|max:64',
            'email' => 'required|email|max:128|unique:usuarios,email,__USERID__,id',
            'password' => 'max:16'
        ];
    }

    protected $fillable = [
        "name",
        "email",
        "password"
    ];

    protected $hidden = [
        "password"
    ];

    public function info() {
        return $this->hasOne(UsuariosInfoModel::class, 'user_id');
    }

}
