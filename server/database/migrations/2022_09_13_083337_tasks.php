<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Tasks extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            // $table->id()->autoIncrement();
            // $table->mediumText('title');
            // $table->boolean('completed');
            // $table->date('date');

            // $table->id()->autoIncrement();
            // $table->mediumText('name');
            // $table->boolean('isCompleted');
            // $table->dateTime('datetime', $precision = 0);
            // $table->dateTimeTz('datetime', $precision = 0);

            $table->id()->autoIncrement();
            $table->mediumText('name');
            $table->boolean('isCompleted');
            $table->dateTime('datetime', $precision = 0);         
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
