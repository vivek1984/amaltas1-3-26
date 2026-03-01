<?php

namespace App\Http\Controllers;

use App\Models\CabinetType;
use App\Models\Cluster;
use App\Models\Design;
use App\Models\Estimate;
use App\Models\Group;
use App\Models\Material;
use App\Models\Product;
use App\Models\Size;
use App\Models\Varient;
use App\Services\CabinetCostService;
use App\Services\SlugService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Http\UploadedFile;
use App\Services\ImageKitService;
use ImageKit\ImageKit;
use Illuminate\Support\Facades\Log;


use Intervention\Image\Drivers\Imagick\Driver;
use Intervention\Image\ImageManager;

class AdminController extends Controller
{
    
    protected $costService;
    protected ImageKitService $imageKit;
    protected SlugService $slugService;

    // Inject the service into the constructor
    public function __construct(
        CabinetCostService $costService,
        ImageKitService $imageKit,
        SlugService $slugService
    )
    {
        $this->costService = $costService;
        $this->imageKit = $imageKit;
        $this->slugService = $slugService;
    }
    public function dashboard(Request $request)
    {
        $all_estimates = Estimate::where('type', 'online')->get();
        if($request->id) {

        $estimate = Estimate::findOrFail($request->id);

        $estimateData = $this->costService->calculateEstimateData($estimate);

        $cabinetTypes = CabinetType::with(['materials.categories'])->get();

         $materials = Material::with('categories')->get();

        return Inertia::render('Admin/Estimate',
        [
            'costing' => $estimateData[0],
            'installation' => $estimateData[1],
            'estimates' => $all_estimates,
            'material' => $estimateData[2],
            'addons' => $estimateData[3],
            'materials' => $materials,
            'cabinetTypes' => $cabinetTypes,
        ]);

        }

        return Inertia::render('Admin/Dashboard',
                ['estimates' => $all_estimates]);
    }

    public function category()
    {
        $related_groups = null;
        $cluster_name = null;
        $clusters = Cluster::all();
        $groups = Group::all();
        if(request('id')) $related_groups = $this->getGroup(request('id'));
        if(request("name")) $cluster_name = request('name');

        return Inertia::render('Admin/Category',
        ['clusters' => $clusters, 'groups' => $groups, 'related_groups' => $related_groups, 'cluster_name' => $cluster_name]);
    }

    private function getGroup($id){
        $clusters = Cluster::find($id);
        $related_groups = $clusters->groups()->get()->all();
        return $related_groups;
    }

    public function editCluster() {
        //dd(request()->all());
        $cluster = Cluster::findOrFail(request('id'));
        $cluster->name = request('name');
        $cluster->save();
        return redirect('/admin-category');
    }

    public function editGroup() {
        $group = Group::findOrFail(request('id'));
        $group->name = request('name');
        $group->save();
        return redirect('/admin-category');
    }

    public function linkClusterGroup() {
        $cluster = Cluster::firstWhere('name', request('name'));
        $cluster->groups()->attach(request('id'));
        return redirect ('/admin-category');
    }

    public function detachGroup() {
        $cluster = Cluster::firstWhere('name', request('name'));
        $cluster->groups()->detach(request('id'));
        return redirect ('/admin-category');
    }

    public function createCluster(Request $request) {
        $file = $request->file('image');

        $path = $this->handleImage($file, 'images', 1000);
        $thumbnail = $this->handleThumbnailImage($file, 'thumbnail', 100);

        $cluster = new Cluster();
        $cluster->name = $request->name;
        $cluster->description = $request->description;
        $cluster->image = $path;
        $cluster->thumbnail = $thumbnail;
        $cluster->slug = $this->slugService->provisionalSlug($cluster->name);
        $cluster->save();

        $cluster->slug = $this->slugService->generateCatalogSlugForModel($cluster);
        $cluster->save();

        return redirect('/admin-category');
    }

    public function createGroup(Request $request) {
        $file = $request->file('image');
        $path = $this->handleImage($file, 'images', 1000);
        $thumbnail = $this->handleThumbnailImage($file, 'thumbnail', 100);

        $cluster = new Group();
        $cluster->name = $request->name;
        $cluster->description = $request->description;
        $cluster->image = $path;
        $cluster->thumbnail = $thumbnail;
        $cluster->slug = $this->slugService->provisionalSlug($cluster->name);
        $cluster->save();

        $cluster->slug = $this->slugService->generateCatalogSlugForModel($cluster);
        $cluster->save();

        return redirect('/admin-category');
    }
    
    private function handleThumbnailImage(
        
         UploadedFile $file,
    string $directory = 'images',
    int $width = null,
    int $quality = 100
        ) {
         if (!extension_loaded('imagick')) {
        throw new \RuntimeException('Imagick extension is not loaded');
    }

    // 🔒 Absolute watermark path
    $watermarkPath = storage_path('app/public/watermark.png');

    if (!file_exists($watermarkPath)) {
        throw new \RuntimeException('Watermark file not found at ' . $watermarkPath);
    }

    // Image manager (Imagick)
    $manager = new ImageManager(new Driver());

    // Read uploaded image
    $image = $manager->read($file);

    // Resize safely (if width is provided)
    if ($width !== null) {
        $image->scaleDown(width: $width);
    }

    // ✅ FIXED: Check actual image width, not the $width parameter
    if ($image->width() > 400) {
        $image->place(
            $watermarkPath, // absolute filesystem path
            'bottom-right', // position
            20,             // x offset
            20,             // y offset
            100              // opacity (0–100)
        );
    }

    // ✅ Force WebP output
    $filename = time() . '_' . uniqid('', true) . '.webp';
    $binary = $image->toWebp($quality);

    // Save to storage
    $path = $directory . '/' . $filename;
    Storage::disk('public')->put($path, $binary);

    return $path;
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

    // private function handleImage(UploadedFile $file, string $directory = 'images', int $width = null, int $quality = 100) {


    //     $manager = new ImageManager(new Driver());
    //     $image = $manager->read($file);
    //     if($width !=null)
    //     $image = $image->scale(width: $width);
    //     $extension = $file->getClientOriginalExtension(); // Get original extension
    //     $filename = time() . '_' . uniqid() . '.' . $extension; // e.g., 1678881234_654321.jpg

    //     $encodeImage = $image->toJpeg($quality);
    //     $path = $directory . '/' . $filename;
    //     Storage::disk('public')->put($path, $encodeImage);

    //     return $path;
    // }

    // public function product(Request $request) {
    //     $products = Product::with([
    //         'varients',
    //         'varients.designs',
    //         'varients.designs.sizes',
    //         'clusters',
    //         'groups'
    //     ])
    //     ->when($request->filled('search'), function ($query) use ($request) {
    //         $search = $request->input('search');
    //         $query->where('name', 'like', '%' . $search . '%');
    //     })
    //     ->paginate(10)
    //     ->withQueryString();

    //     $clusters = Cluster::all();
    //     $groups = Group::all();
    //     return Inertia::render('Admin/Product',
    //     ['products' => $products, 'clusters' => $clusters, 'groups' => $groups]);

    // }
    
   public function product(Request $request) {
        $products = Product::with([
            'varients',
            'varients.designs',
            'varients.designs.sizes',
            'clusters',
            'groups'
        ])
        ->when($request->filled('search'), function ($query) use ($request) {
            $search = $request->input('search');
            $query->where('name', 'like', '%' . $search . '%');
        })
        ->paginate(10)
        ->withQueryString();

        $clusters = Cluster::all();
        $groups = Group::all();
        return Inertia::render('Admin/Product',
        ['products' => $products, 'clusters' => $clusters, 'groups' => $groups]);

    }


    public function editProduct() {
        $product = Product::with('varients', 'varients.designs', 'varients.designs.sizes', 'clusters', 'groups')->find(request('product'));
        return Inertia::render('Admin/EditProduct', ['product' => $product]);
    }

    public function editProductField() {

        if(request('model') == 'product') {
            $product = Product::find(request('id'));
            if(request('field') == 'name') $product->name = request('value'); {
            $product->slug = $this->slugService->generateCatalogSlugForModel($product);
            $product->save();
            }

            if(request('field') == 'shippable') $product->shippable = request('value'); $product->save();
            if(request('field') == 'description') $product->description = request('value'); $product->save();
            if(request('field') == 'feature1') { $product->feature1 = request('value'); $product->save(); }

            if(request('field') == 'feature2') { $product->feature2 = request('value'); $product->save(); }

            if(request('field') == 'youtube') { $product->youtube = request('value'); $product->save(); }


        }

        if(request('model') == 'varient'){
            $varient = Varient::find(request('id'));
            if(request('field') == 'name')
            {
            $varient->name = request('value');
            $varient->slug = $this->slugService->generateUniqueSlug($varient->name, Varient::class, 'slug');
            $varient->save();
            }

            if(request('field') == 'description') { $varient->description = request('value'); $varient->save(); }

            if(request('field') == 'feature1') { $varient->feature1 = request('value'); $varient->save(); }

            if(request('field') == 'feature2') { $varient->feature2 = request('value'); $varient->save(); }

            if(request('field') == 'feature3') { $varient->feature3 = request('value'); $varient->save(); }

            if(request('field') == 'material') { $varient->material = request('value'); $varient->save(); }

            if(request('field') == 'mrp') { $varient->mrp = request('value'); $varient->save(); }

            if(request('field') == 'price') { $varient->price = request('value'); $varient->save(); }

            if(request('field') == 'shipping_fee') { $varient->shipping_fee = request('value'); $varient->save(); }

            if(request('field') == 'size') { $varient->size = request('value'); $varient->save(); }

            if(request('field') == 'qty') { $varient->qty = request('value'); $varient->save(); }
        }

        if(request('model') == 'design') {
            $design = Design::find(request('id'));

            if(request('field') == 'name') {
                $design->name = request('value');
                $design->slug = $this->slugService->generateUniqueSlug($design->name, Design::class, 'slug');
                $design->save();
            }

            if(request('field') == 'description') { $design->description = request('value'); $design->save(); }

            if(request('field') == 'feature1') { $design->feature1 = request('value'); $design->save(); }

            if(request('field') == 'feature2') { $design->feature2 = request('value'); $design->save(); }

            if(request('field') == 'feature3') { $design->feature3 = request('value'); $design->save(); }

            if(request('field') == 'material') { $design->material = request('value'); $design->save(); }

            if(request('field') == 'mrp') { $design->mrp = request('value'); $design->save(); }

            if(request('field') == 'price') { $design->price = request('value'); $design->save(); }

            if(request('field') == 'shipping_fee') { $design->shipping_fee = request('value'); $design->save(); }

            if(request('field') == 'size') { $design->size = request('value'); $design->save(); }

            if(request('field') == 'qty') { $design->qty = request('value'); $design->save(); }

        }

        if(request('model') == 'size') {
            $size = Size::find(request('id'));

            if(request('field') == 'name') {
                $size->name = request('value');
                $size->slug = $this->slugService->generateUniqueSlug($size->name, Size::class, 'slug');
                $size->save();
            }

            if(request('field') == 'description') { $size->description = request('value'); $size->save(); }

            if(request('field') == 'mrp') { $size->mrp = request('value'); $size->save(); }

            if(request('field') == 'price') { $size->price = request('value'); $size->save(); }

            if(request('field') == 'shipping') { $size->shipping = request('value'); $size->save(); }

            if(request('field') == 'qty') { $size->qty = request('value'); $size->save(); }

        }

        return redirect()->back();
    }

    private function deleteImage(?string $imagePath) {
        if($imagePath && Storage::disk('public')->exists($imagePath)) {
            return Storage::disk('public')->delete($imagePath);
        }
    }

    public function editProductImage(Request $request) {
        $image = $request->file('image');
        $data = $request->input('value');

        $request->validate(['image' => 'required|image', 'value.model' => 'required']);


        if($data['model'] === 'product') {
            $product = Product::findOrFail($data['id']);
            if($data['field'] === 'thumbnail')  {
                $oldImagePath = $product->thumbnail;
                $newImagePath = $this->handleThumbnailImage($image, 'images', 100);
                $product->thumbnail = $newImagePath;
                $product->save();
                if ($oldImagePath) {
                    $this->deleteImage($oldImagePath); // This deleteImage should also use Storage facade
                }
            }

            if($data['field'] === 'small_image') {
                $oldImagePath = $product->small_image;
                $newImagePath = $this->handleImage($image, 'images', 1500);
                $product->small_image = $newImagePath;
                $product->save();
                if($oldImagePath) {
                    $this->deleteImage($oldImagePath);
                }
            }
        }
        return redirect()->back();
    }

    public function editVarientSmallImage(Request $request) {
        $image = $request->file('image');
        $data = $request->input('value');

        $request->validate(['image' => 'required|image', 'value.model' => 'required']);


        if($data['model'] === 'varient') {
            $varient = Varient::findOrFail($data['id']);
            if($data['field'] === 'size_image')  {
                $oldImagePath = $varient->size_image;
                $newImagePath = $this->handleImage($image, 'images', 1500);
                $varient->size_image = $newImagePath;
                $varient->save();
                if ($oldImagePath) {
                    $this->deleteImage($oldImagePath); // This deleteImage should also use Storage facade
                }
            }
        }
        if($data['model'] === 'design') {
            $design = Design::findOrFail($data['id']);
            if($data['field'] === 'size_image')  {
                $oldImagePath = $design->size_image;
                $newImagePath = $this->handleImage($image, 'images', 1500);
                $design->size_image = $newImagePath;
                $design->save();
                if ($oldImagePath) {
                    $this->deleteImage($oldImagePath); // This deleteImage should also use Storage facade
                }
            }
        }
        if($data['model'] === 'size') {
            $size = Size::findOrFail($data['id']);
            if($data['field'] === 'size_image')  {
                $oldImagePath = $size->size_image;
                $newImagePath = $this->handleImage($image, 'images', 1500);
                $size->size_image = $newImagePath;
                $size->save();
                if ($oldImagePath) {
                    $this->deleteImage($oldImagePath); // This deleteImage should also use Storage facade
                }
            }
        }


        return redirect()->back();
    }

    public function createVarient() {
        $product = Product::with('varients', 'varients.designs', 'varients.designs.sizes', 'clusters', 'groups')->find(request('product'));
        return Inertia::render('Admin/CreateVarient', ['product' => $product]);

    }

    public function createDesign() {
        $product = Product::with('varients', 'varients.designs', 'varients.designs.sizes', 'clusters', 'groups')->find(request('product'));
        return Inertia::render('Admin/CreateDesign', ['product' => $product]);

    }

    public function createSize() {
        $product = Product::with('varients', 'varients.designs', 'varients.designs.sizes', 'clusters', 'groups')->find(request('product'));

        $designs = [];

        foreach($product->varients()->get() as $varient) {
            foreach($varient->designs()->get() as $desg)
            array_push($designs, $desg);
        };




        return Inertia::render('Admin/CreateSize', ['product' => $product, 'designs' => $designs]);

    }

}
