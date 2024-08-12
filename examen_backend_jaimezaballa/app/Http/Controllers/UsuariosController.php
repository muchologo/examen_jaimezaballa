<?php

namespace App\Http\Controllers;

use App\Models\UsuariosInfoModel;
use App\Models\UsuariosModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UsuariosController extends Controller {

    private function calculateAge(&$userData):void {
        if (!empty($userData["info"]["birthday"])) {
            $datetime1 = new \DateTime($userData["info"]["birthday"]);
            $datetime2 = new \DateTime(date('Y-m-d H:i:s'));
            $interval = $datetime1->diff($datetime2);
            $userData["info"]["age"] = $interval->format('%y');    
        }
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) {
        $perpage = $request->has("perpage") ? $request->input("perpage") : 10;
        $users = UsuariosModel::with('info')->paginate($perpage);
        if ($users->total() == 0) {
            return response()->json(["messages"=>"No results"], 404);
        } else {
            $usersData = $users->toArray();
            foreach ($usersData["data"] as &$userData) {
                $this->calculateAge($userData);
            }
            return response()->json($usersData, 200);
        }
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {

        // Podemos combinar definiciones de dos modelos para validar todos los datos recibidos en una sola operación
        $definition = array_merge(UsuariosInfoModel::definition(), UsuariosModel::createDefinition());
        $validator = Validator::make($request->all(), $definition);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        } else {

            // Si el usuario envía un nuevo password, creamos un hash del mismo
            if ($request->has("password")) {
                $request->merge(["password"=>Hash::make($request->input("password"))]);
            }

            // Creamos los datos generales
            $userCreate = $request->only("name","email","password");
            $user = UsuariosModel::create($userCreate);

            // Creamos la información adicional
            $userInfoCreate = $request->only("address","phone","birthday");
            $userInfoCreate["user_id"] = $user->id;
            $userInfo = UsuariosInfoModel::create($userInfoCreate);
            
            return response()->json(["success"=>true, "id"=>$user->id], 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UsuariosModel  $usuariosModel
     * @return \Illuminate\Http\Response
     */
    public function show(UsuariosModel $usuariosModel, int $id)
    {
        $user = UsuariosModel::with('info')->find($id);
        if (empty($user)) {
            return response()->json(["messages"=>"Not found"], 404);
        }

        $userData = $user->toArray();
        $this->calculateAge($userData);

        return response()->json($userData, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\UsuariosModel  $usuariosModel
     * @return \Illuminate\Http\Response
     */
    public function edit(UsuariosModel $usuariosModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\UsuariosModel  $usuariosModel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id) {
       
        $user = UsuariosModel::with('info')->find($id);
        if (empty($user)) {
            return response()->json(["messages"=>"Not found"], 404);
        }

        // Podemos combinar definiciones de dos modelos para validar todos los datos recibidos en una sola operación
        $definition = array_merge(UsuariosInfoModel::definition(), UsuariosModel::updateDefinition());
        // Para que ignore el registro que esta intentando actualizar
        $definition["email"] = str_replace("__USERID__", $id, $definition["email"]);
        $validator = Validator::make($request->all(), $definition);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        } else {
            // Si el usuario envía un nuevo password, creamos un hash del mismo
            if ($request->has("password")) {
                $request->merge(["password"=>Hash::make($request->input("password"))]);    
            }

            // Actualizamos los datos generales
            $userUpdate = $request->only("name","email","password");
            $user->update($userUpdate);

            // Actualizamos la información adicional
            $userInfoUpdate = $request->only("address","phone","birthday");
            $userInfo = UsuariosInfoModel::where("user_id", $id)->first();
            if (empty($userInfo)) {
                $userInfoUpdate["user_id"] = $id;
                UsuariosInfoModel::create($userInfoUpdate);
            } else {
                $userInfo->update($userInfoUpdate);
            }
    
            return response()->json(["success"=>true], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UsuariosModel  $usuariosModel
     * @return \Illuminate\Http\Response
     */
    public function destroy(UsuariosModel $usuariosModel, int $id) {
        $user = UsuariosModel::find($id);
        if (empty($user)) {
            return response()->json(["messages"=>"Not found"], 404);
        } else {
            UsuariosInfoModel::where("user_id", $id)->delete();
            $user->delete();
            return response()->json(["success"=>true], 200);
        }
    }
}
