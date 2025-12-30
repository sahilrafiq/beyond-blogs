<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'author',
        'url',
        'image_url',
        'published_date',
        'is_updated',
        'updated_content',
        'references'
    ];

    protected $casts = [
        'references' => 'array',
        'is_updated' => 'boolean',
        'published_date' => 'date'
    ];
}