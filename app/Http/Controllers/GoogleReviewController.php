<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class GoogleReviewController extends Controller
{
    /**
     * Fetch Google Reviews for a specific place (cached).
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getReviews(Request $request): JsonResponse
    {
        $placeId = env('GOOGLE_PLACE_ID');
        $apiKey  = env('GOOGLE_PLACES_API_KEY');
        $cacheHours = (int) env('GOOGLE_REVIEWS_CACHE_HOURS', 6);

        if (!$placeId || !$apiKey) {
            Log::error('Google Reviews: missing API key or Place ID', ['placeId' => $placeId ? true : false, 'apiKey' => $apiKey ? true : false]);
            return response()->json(['error' => 'Google Place ID or API Key not configured.'], 500);
        }

        $cacheKey = 'google_reviews_' . $placeId;

        $reviews = Cache::remember($cacheKey, now()->addHours($cacheHours), function () use ($placeId, $apiKey) {
            $url = "https://maps.googleapis.com/maps/api/place/details/json";

            // Request reviews (and optionally rating/user_ratings_total)
            try {
                $response = Http::timeout(10)->get($url, [
                    'place_id' => $placeId,
                    'fields'   => 'reviews,rating,user_ratings_total',
                    'key'      => $apiKey,
                ]);
            } catch (\Exception $e) {
                Log::error('Google Places HTTP request failed', ['exception' => $e->getMessage()]);
                return [];
            }

            if (! $response->successful()) {
                Log::error('Failed connecting to Google Places API', [
                    'status' => $response->status(),
                    'body'   => $response->body(),
                ]);
                return [];
            }

            $data = $response->json();

            // Google API returns overall status in 'status'
            if (isset($data['status']) && $data['status'] === 'OK' && isset($data['result'])) {
                // return reviews array or empty array
                return $data['result']['reviews'] ?? [];
            }

            // Log Google-provided error message or status
            Log::error('Google Places API returned error', [
                'status' => $data['status'] ?? 'missing',
                'message' => $data['error_message'] ?? null,
            ]);

            return [];
        });

        // Return with explicit structure (helps frontend)
        return response()->json([
            'reviews' => $reviews,
            'count'   => is_array($reviews) ? count($reviews) : 0,
        ], 200);
    }
}
