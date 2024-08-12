<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsuariosInfoModel extends Model {
    use HasFactory;

    protected $connection = "mysql";

    protected $table = "usuarios_info";

    protected $primaryKey = "id";

    public $incrementing = true;

    protected $fillable = [
        "user_id",
        "address",
        "phone",
        "birthday"
    ];

    public static function definition() {
        return [
            'address' => 'max:255|nullable',
            'birthday' => 'date|nullable',
            'phone' => 'max:32|nullable'
        ];
    }
}
