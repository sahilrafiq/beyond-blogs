<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Services\ScraperService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ArticleController extends Controller
{
    public function index(): JsonResponse
    {
        $articles = Article::orderBy('created_at', 'desc')->get();
        
        return response()->json([
            'success' => true,
            'data' => $articles
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'author' => 'nullable|string',
            'url' => 'nullable|url',
            'image_url' => 'nullable|url',
        ]);

        $article = Article::create($validated);

        return response()->json([
            'success' => true,
            'data' => $article
        ], 201);
    }

    public function show(Article $article): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $article
        ]);
    }

    public function update(Request $request, Article $article): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'author' => 'nullable|string',
            'url' => 'nullable|url',
            'image_url' => 'nullable|url',
            'is_updated' => 'sometimes|boolean',
            'updated_content' => 'nullable|string',
            'references' => 'nullable|array'
        ]);

        $article->update($validated);

        return response()->json([
            'success' => true,
            'data' => $article
        ]);
    }

    public function destroy(Article $article): JsonResponse
    {
        $article->delete();

        return response()->json([
            'success' => true,
            'message' => 'Article deleted successfully'
        ]);
    }

    public function scrape(ScraperService $scraper): JsonResponse
    {
        try {
            $articles = $scraper->scrapeBeyondChatsBlogs();
            
            return response()->json([
                'success' => true,
                'message' => 'Articles scraped successfully',
                'count' => count($articles),
                'data' => $articles
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Scraping failed: ' . $e->getMessage()
            ], 500);
        }
    }
}