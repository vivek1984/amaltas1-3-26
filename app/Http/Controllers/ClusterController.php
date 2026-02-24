<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClusterRequest;
use App\Http\Requests\UpdateClusterRequest;
use App\Models\Cluster;
use App\Models\Group;
use App\Models\Location;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SiteUrl;


class ClusterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($path, Request $request)
    {
        if($request->id === 'group') return $this->group($path, $request);
        if($request->id === 'cluster') return $this->cluster($path, $request);
        if($request->id === 'product') return $this->product($path);
        
        
        $pathStr = $request->path();
        $dbUrlToCheck = 'https://www.amaltasfurniture.com/' . $pathStr;
        $siteUrl = SiteUrl::where('url', $dbUrlToCheck)->first();

        if ($siteUrl) {
            if (!empty($siteUrl->new_url)) {
                return redirect($siteUrl->new_url, 301);
            }
            // If found in DB but no new_url, standard redirect to home
            return redirect('/');
        }

         return redirect('/');


    }

    private function group($path, Request $request)
    {
    $ip = $request->ip();

    // Check if IP exists
    $location = Location::where('ip', $ip)->first();

    $query = Group::where('slug', $path);

    // If dehradun is "no", sort products by shippable (yes first, then no)
    if ($location && $location->dehradun === 'no') {
        $query->with([
            'products' => function ($q) {
                $q->orderByRaw("CASE WHEN shippable = 1 THEN 0 ELSE 1 END")
                  ->with('varients');
            }
        ]);
    } else {
        // Default load
        $query->with(['products', 'products.varients']);
    }

    $group = $query->firstOrFail();

    // Increment clicks
    $group->increment('clicks');

    $clusters = Cluster::with('groups')->get();

    return Inertia::render('Category/GroupIndex', [
        'group'    => $group,
        'clusters' => $clusters,
    ]);

    }


    private function cluster($path, Request $request)
    {

    //if($path == 'modular-kitchens') return $this->modularKitchens($path, $request);
    $ip = $request->ip();

    // Check if IP exists in locations table
    $location = Location::where('ip', $ip)->first();

    $query = Cluster::where('slug', $path);

    // If dehradun = "no", sort products by shippable first
    if ($location && $location->dehradun === 'no') {
        $query->with([
            'groups',
            'products' => function ($q) {
                // If shippable is BOOLEAN (0/1)
                $q->orderByRaw("CASE WHEN shippable = 1 THEN 0 ELSE 1 END")
                  ->with('varients');

                // 👉 If shippable is string ('yes'/'no'), replace with:
                // $q->orderByRaw("CASE WHEN shippable = 'yes' THEN 0 ELSE 1 END")
                //   ->with('varients');
            }
        ]);
    } else {
        // Default eager load
        $query->with(['groups', 'products', 'products.varients']);
    }

    $cluster = $query->firstOrFail();

    // Increment clicks
    $cluster->increment('clicks');

    $clusters = Cluster::with('groups')->get();

    return Inertia::render('Category/ClusterIndex', [
        'cluster'  => $cluster,
        'clusters' => $clusters,
    ]);
    }

    public function modularKitchens(Request $request) {
        $clusters = Cluster::with('groups')->get();
        $cluster = Cluster::where('slug', 'modular-kitchens');
         return Inertia::render('Category/ModularKitchens', [
        'cluster'  => $cluster,
        'clusters' => $clusters,
    ]);
    }
    private function product($path) {
        $product = Product::where('slug', $path)->with(['varients','varients.designs', 'varients.designs.sizes', 'varients.images'])->first();
        $clusters = Cluster::with(['groups'])->get();
        $products = $this->getRelatedProducts($product->id);
        $product->clicks++;
        $product->save();
        return Inertia::render('Category/Product',
        ['product' => $product, 'clusters' => $clusters, 'products' => $products]);
    }



    private function getRelatedProducts($id) {
        $mainProduct = Product::findOrFail($id);
        $allRelatedProducts = collect(); // Start with an empty Laravel Collection

        // 1. Get products from related clusters
        foreach ($mainProduct->clusters as $cluster) {
            $allRelatedProducts = $allRelatedProducts->merge($cluster->products);
        }

        // 2. Get products from related groups
        foreach ($mainProduct->groups as $group) {
            $allRelatedProducts = $allRelatedProducts->merge($group->products);
        }

        // 3. Ensure uniqueness by product ID, and remove the main product itself
        $allRelatedProducts = $allRelatedProducts->unique('id')->filter(function ($product) use ($mainProduct) {
            return $product->id !== $mainProduct->id;
        });

        // 4. Add price information and ensure 'clicks' attribute for sorting
        $productsWithFullInfo = $allRelatedProducts->map(function ($product) {
            // Use your existing addPriceInfoToProducts logic
            $product = $this->addPriceInfoToProducts(collect([$product]))->first(); // Apply to single product and get it back

            // Ensure 'clicks' exists for sorting. If it's a DB column, it'll be there.
            // If not, you might need to default it or derive it.
            $product->clicks = $product->clicks ?? 0; // Default to 0 if null

            return $product;
        });

        // 5. Sort by clicks (descending) and take the top 10
        $sortedAndLimited = $productsWithFullInfo->sortByDesc('clicks')->take(10);

        return $sortedAndLimited;
    }

    // Your addPriceInfoToProducts is generally good, just ensure it always returns a Collection
    // and accepts one, which it appears to do if `Product::varients()` returns a Collection.
    private function addPriceInfoToProducts($productsCollection) {
        // Ensure $productsCollection is a Laravel Collection instance
        if (!($productsCollection instanceof \Illuminate\Support\Collection)) {
            $productsCollection = collect($productsCollection);
        }

        foreach($productsCollection as $product) {
            $varient = $product->varients()->first();

            if ($varient) {
                $product->mrp = $varient->mrp;
                $product->price = $varient->price;
            } else {
                $product->mrp = null;
                $product->price = null;
            }
        }
        return $productsCollection; // Always return the modified collection
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClusterRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Cluster $cluster)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cluster $cluster)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClusterRequest $request, Cluster $cluster)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cluster $cluster)
    {
        //
    }
}