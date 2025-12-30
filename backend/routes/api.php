<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});

Route::apiResource('articles', ArticleController::class);
Route::post('articles/scrape', [ArticleController::class, 'scrape']);