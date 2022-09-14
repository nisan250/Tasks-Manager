<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @method static find($id)
 * @method static create(array $array)
 */

class Task extends Model
{
    /**
     * @var string[]
     */
    protected $fillable = ['name', 'datetime', 'isCompleted'];

    /**
     * @var bool
     */
    public $timestamps = false;
}