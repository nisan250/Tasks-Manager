<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function index() {
        return Task::all();
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required',
            'datetime' => 'required',
            'isCompleted' => 'required'
        ]);

        return Task::create([
            'name' => $request->get('name'),
            'isCompleted' => $request->get('isCompleted'),
            'datetime' => $request->get('datetime')
        ]);
    }

    public function update(Request $request, int $id){
        $request->validate([
            'name' => 'required',
            'datetime' => 'required',
            'isCompleted' => 'required'
        ]);

        $task = Task::findOrFail($id)->fill([
            'name' => $request->get('name'),
            'isCompleted' => $request->get('isCompleted'),
            'datetime' => $request->get('datetime')
        ]);

        $task->save();
        return $task;
    }

    public function destroy(int $id) {
        Task::findOrFail($id)->delete();
    }

}