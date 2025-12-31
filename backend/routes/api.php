<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});

// Scrape route BEFORE resource routes
Route::post('/articles/scrape', [ArticleController::class, 'scrape']);

// Resource routes
Route::apiResource('articles', ArticleController::class);