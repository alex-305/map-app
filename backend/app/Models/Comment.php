<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model{
    use HasFactory;

    protected $fillable = ['body', 'user_id', 'post_id'];

    // a Comment belongs to a user
    public function user(){
        return $this->belongsTo(User::class);
    }

    // a Comment belongs to a Post
    public function post(){
        return $this->belongsTo(Post::class);
    }
}

