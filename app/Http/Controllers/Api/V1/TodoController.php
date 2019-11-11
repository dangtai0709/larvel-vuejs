<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Todo;
class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Todo::all();
    }

    public function show($id)
    {
        return Todo::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $Todo = Todo::findOrFail($id);
        $Todo->update($request->all());
        return $Todo;
    }

    public function store(Request $request)
    {
        $Todo = Todo::create($request->all());
        return $Todo;
    }

    public function destroy($id)
    {
        $Todo = Todo::findOrFail($id);
        $Todo->delete();
        return '';
    }
}
