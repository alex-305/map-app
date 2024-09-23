<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model{
    use HasFactory;

    protected $fillable = ['title', 'body', 'user_id'];

    // a Post belongs to a User
    public function user(){
        return $this->belongsTo(User::class);
    }

    // a Post has many Comments
    public function comments(){
        return $this->hasMany(Comment::class);
    }

    // a Post has many Likes
    public function likes(){
        return $this->hasMany(Like::class);
    }
}

