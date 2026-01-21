<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cluster; // Assuming these models exist
use App\Models\Group;
use App\Models\Product;
use App\Models\Varient;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    /**
     * Handle the incoming request to search across multiple models.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(Request $request)
    {

        $keyword = $request->query('q');

        // Ensure a keyword is provided and meets the minimum length (client-side handles this, but good for backend too)
        if (empty($keyword) || strlen($keyword) < 3) {
            return response()->json([]); // Return empty results if query is too short
        }

        // Sanitize the keyword for database queries
        $sanitizedKeyword = '%' . $keyword . '%';

        $results = collect();

        // --- Search in Cluster Model ---
        $clusterResults = Cluster::where('name', 'like', $sanitizedKeyword)
            ->orWhere('description', 'like', $sanitizedKeyword)
            ->select('id', 'name', 'slug','description', 'image', DB::raw("'cluster' as type")) // Add 'type' for frontend identification
            ->limit(5) // Limit results per model to avoid overwhelming frontend
            ->get();
        $results = $results->merge($clusterResults);

        // --- Search in Group Model ---
        $groupResults = Group::where('name', 'like', $sanitizedKeyword)
            ->orWhere('description', 'like', $sanitizedKeyword)
            ->select('id','slug', 'name', 'description', 'image', DB::raw("'group' as type"))
            ->limit(5)
            ->get();
        $results = $results->merge($groupResults);

        // --- Search in Product Model ---
        $productResults = Product::where('name', 'like', $sanitizedKeyword)
            ->select('id', 'slug','name', 'small_image', DB::raw("'product' as type"))
            ->limit(5)
            ->get();
        $results = $results->merge($productResults);

        // --- Search in Varient Model (name and description) ---
        $variantResults = Varient::where('name', 'like', $sanitizedKeyword)
            ->orWhere('material', 'like', $sanitizedKeyword)
            ->select('id', 'slug', 'name', 'material', 'size_image', DB::raw("'variant' as type"))
            ->limit(5)
            ->get();
        $results = $results->merge($variantResults);

        // Optional: Sort results by relevance or a specific order
        // For simplicity, we are just returning them merged.
        // You might want to remove duplicates if an item matches across multiple fields/models
        // based on id and type.
        $finalResults = $results->unique(function ($item) {
            return $item['id'] . $item['type'];
        })->sortBy('name')->values()->all(); // Remove duplicates and sort by name

        return response()->json($finalResults);
    }
}
