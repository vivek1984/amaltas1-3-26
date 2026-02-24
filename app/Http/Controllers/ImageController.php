<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Varient;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Intervention\Image\Drivers\Imagick\Driver;
use Intervention\Image\ImageManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class ImageController extends Controller
{

// private function handleImage(
//     UploadedFile $file,
//     string $directory = 'images',
//     int $width = null,
//     int $quality = 80
// ) {
//     // 🔒 Ensure Imagick is available
//     if (!extension_loaded('imagick')) {
//         throw new \RuntimeException('Imagick extension is not loaded');
//     }

//     // 🔒 Absolute watermark path (storage, NOT public)
//     $watermarkPath = storage_path('app/public/watermark.png');

//     if (!file_exists($watermarkPath)) {
//         throw new \RuntimeException('Watermark file not found at ' . $watermarkPath);
//     }

//     // Image manager (Imagick)
//     $manager = new ImageManager(new Driver());

//     // Read uploaded image
//     $image = $manager->read($file);

//     // Resize safely (no upscaling)
//     if ($width !== null) {
//         $image = $image->scaleDown(width: $width);
//     }

//     // ✅ Apply watermark
//     if($width > 400)
//     $image->place(
//         $watermarkPath, // absolute filesystem path
//         'bottom-right', // position
//         20,             // x offset
//         20,             // y offset
//         50              // opacity (0–100)
//     );

//     // ✅ Force WebP output
//     $filename = time() . '_' . uniqid('', true) . '.webp';
//     $binary = $image->toWebp($quality);

//     // Save to storage
//     $path = $directory . '/' . $filename;
//     Storage::disk('public')->put($path, $binary);

//     return $path;
// }
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
                $watermark->scaleDown(width: $image->width() * 0.40);

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


    private function deleteImage(?string $imagePath) {
        if($imagePath && Storage::disk('public')->exists($imagePath)) {
            return Storage::disk('public')->delete($imagePath);
        }
    }

    public function varientImages(Request $request) {
        $varient = Varient::findOrFail($request->id);
        $images = $varient->images()->get();

        $names = ['varient' => $varient->name, 'product' => $varient->product()->first()->name ];
        return Inertia::render('Admin/EditImages', ['value' => $images, 'id' => $request->id, 'names' => $names]);
    }

    public function upload(Request $request) {
        $request->validate(['variant_id' => 'required', 'image' => 'required | image']);
        $varient = Varient::findOrFail($request->variant_id);
        $image_path = $this->handleImage($request->image, 'images', 1000);
        $image = new \App\Models\Image(['name' => $image_path]);
        $varient->images()->save($image);

        return redirect()->back();

    }

    public function delete(Request $request) {
        $image = Image::findOrFail($request->id);
        $this->deleteImage($image->name);
        $image->delete();

        return redirect()->back();
    }
}