<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVarientRequest;
use App\Http\Requests\UpdateVarientRequest;
use App\Models\Design;
use App\Models\Product;
use App\Models\Size;
use App\Models\Varient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

use Intervention\Image\Drivers\Imagick\Driver;
use Intervention\Image\ImageManager;

class VarientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {



            // 1. Validate the incoming request data
            $validatedData = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'shippable' => ['required', 'boolean'],
                'qty' => ['required', 'integer', 'min:0'],
                'mrp' => ['required', 'integer', 'min:0'],
                'price' => ['required', 'integer', 'min:0'],
                'shipping_fee' => ['required', 'integer', 'min:0'],
                'description' => ['nullable', 'string'],
                'material' => ['nullable', 'string', 'max:255'],
                'color' => ['nullable', 'string', 'max:255'],
                'size' => ['nullable', 'string', 'min:0'],
                'feature1' => ['nullable', 'string', 'max:255'],
                'feature2' => ['nullable', 'string', 'max:255'],
                'feature3' => ['nullable', 'string', 'max:255'],
                'brand' => ['required', 'string', 'max:255'],
                'size_image' => ['required', 'image']

            ]);

            $validatedData['slug'] = $this->generateUniqueSlug($request->name, Varient::class, 'slug');
            $validatedData['product_id'] = $request->product_id;
            $validatedData['size_image'] = $this->handleImage($request->size_image, 'images', 500);

            // 2. Create the new variant record
            Varient::create($validatedData);

            $path = 'admin_edit_product?product=' . $request->product_id;
            return redirect($path)->with('success', 'Product variant created successfully!');
    }

    public function storeDesign(Request $request) {
                    // 1. Validate the incoming request data
                    $validatedData = $request->validate([
                        'name' => ['required', 'string', 'max:255'],
                        'mrp' => ['required', 'integer', 'min:0'],
                        'price' => ['required', 'integer', 'min:0'],
                        'shipping' => ['nullable', 'integer',],
                        'description' => ['nullable', 'string'],


                    ]);

                    $validatedData['slug'] = $this->generateUniqueSlug($request->name, Varient::class, 'slug');
                    $validatedData['varient_id'] = $request->variant_id;
                    $validatedData['size_image'] = $this->handleImage($request->size_image, 'images', 500);

                    // 2. Create the new variant record
                    $newDesign = Design::create($validatedData);
                    $product = $newDesign->varient()->first()->product()->first();


                    $path = 'admin_edit_product?product=' . $product->id;
                    return redirect($path)->with('success', 'Product variant created successfully!');
    }

    public function storeSize(Request $request) {
        $validatedData = $request->validate(  [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'design_id' => ['required'],
            'mrp' => ['required', 'integer', 'min:0'] ,
            'shipping' => ['nullable', 'integer'],
            'price' => ['required', 'integer'],
            'size_image' => ['required', 'image']
        ]);

        $validatedData['slug'] = $this->generateUniqueSlug($request->name, Size::class, 'slug');
        $validatedData['design_id'] = $request->design_id;
        $validatedData['size_image'] = $this->handleImage($request->size_image, 'images', 500);
        $newSize = Size::create($validatedData);
        $product = $newSize->design()->first()->varient()->first()->product()->first();

        $path = 'admin_edit_product?product=' . $product->id;
                    return redirect($path)->with('success', 'Product size created successfully!');

    }

    private function generateUniqueSlug(string $name, string $modelClass, string $slugField = 'slug', ?int $excludeId = null): string
    {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug;
        $counter = 1;

        while (true) {
            $query = $modelClass::where($slugField, $slug);

            if ($excludeId !== null) {
                $query->where('id', '!=', $excludeId);
            }

            if (!$query->exists()) {
                return $slug; // Slug is unique
            }

            // If slug exists, append counter and try again
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }
    }

    public function storeProduct(Request $request) {

        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'shippable' => ['required', 'boolean'],
            'small_image' => ['required']
        ]);

        $file = $request->small_image;
        $path_small_image = $this->handleImage($file, 'images', 500);
        $path_thumbnail = $this->handleImage($file, 'images', 50);

        $validatedData['slug'] = $this->generateUniqueSlug($request->name, Varient::class, 'slug');

        $validatedData['thumbnail'] = $path_thumbnail;
        $validatedData['small_image'] = $path_small_image;
        // 2. Create the new product record
        Product::create($validatedData);

        $path = 'admin-product';
        return redirect($path)->with('success', 'Product variant created successfully!');


    }

    public function addClusterToProduct() {
        dd(request()->all());
    }

    private function handleImage(
    UploadedFile $file,
    string $directory = 'images',
    int $width = null,
    int $quality = 80
) {
    // 1. Critical Check: Ensure Imagick is loaded
    if (!extension_loaded('imagick')) {
        \Log::error("CRITICAL: Imagick extension is not loaded.");
        throw new \RuntimeException('Imagick extension is not loaded on this server.');
    }

    // 2. Load the Main Image
    $manager = new ImageManager(new Driver());
    $image = $manager->read($file);

    // 3. Resize Main Image (If width is provided, e.g., 1000 or 100)
    if ($width !== null) {
        $image->scaleDown(width: $width);
    }

    // 4. Apply Watermark 
    // Logic: Only apply if the image is larger than 400px.
    // This automatically skips thumbnails (100px) so they stay clean.
    if ($image->width() > 400) {
        
        // Locate Watermark
        $watermarkPath = storage_path('app/public/watermark.png');
        if (!file_exists($watermarkPath)) {
            $watermarkPath = public_path('watermark.png'); // Fallback check
        }

        // Apply if found
        if (file_exists($watermarkPath)) {
            try {
                // Read watermark file
                $watermark = $manager->read($watermarkPath);

                // Resize watermark to 40% of the main image width
                // (Ensures it fits perfectly on any size image)
                $watermark->scaleDown(width: $image->width() * 0.20);

                // Place Watermark: Bottom-Right, 100% Opacity
                $image->place(
                    $watermark,      
                    'bottom-right',  
                    20,             // X offset 
                    20,             // Y offset
                    100             // Opacity (100 = Solid, needed for dark red logo)
                );
            } catch (\Exception $e) {
                // Log error but allow upload to finish without watermark
                \Log::error("Watermark failed to apply: " . $e->getMessage());
            }
        } else {
            \Log::warning("Watermark file missing. Uploading image without it.");
        }
    }

    // 5. Save as WebP
    $filename = time() . '_' . uniqid('', true) . '.webp';
    $binary = $image->toWebp($quality);

    $path = $directory . '/' . $filename;
    Storage::disk('public')->put($path, $binary);

    return $path;
}

    public function editProductClusters(Request $request) {
        $product = Product::find($request->product);
        $product->clusters()->detach();
        $product->clusters()->attach($request->items);
        return redirect('/admin-product');
    }

    public function editProductGroups(Request $request) {
        $product = Product::find($request->product);
        $product->groups()->detach();
        $product->groups()->attach($request->items);
        return redirect('/admin-prodcut');
    }


    /**
     * Display the specified resource.
     */
    public function show(Varient $varient)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Varient $varient)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVarientRequest $request, Varient $varient)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Varient $varient)
    {
        //
    }
}