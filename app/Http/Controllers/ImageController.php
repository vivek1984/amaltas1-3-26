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

class ImageController extends Controller
{
private function handleImage(
    UploadedFile $file,
    string $directory = 'images',
    int $width = null,
    int $quality = 80
) {
    // 🔒 Ensure Imagick is available
    if (!extension_loaded('imagick')) {
        throw new \RuntimeException('Imagick extension is not loaded');
    }

    // 🔒 Absolute watermark path (storage, NOT public)
    $watermarkPath = storage_path('app/public/watermark.png');

    if (!file_exists($watermarkPath)) {
        throw new \RuntimeException('Watermark file not found at ' . $watermarkPath);
    }

    // Image manager (Imagick)
    $manager = new ImageManager(new Driver());

    // Read uploaded image
    $image = $manager->read($file);

    // Resize safely (no upscaling)
    if ($width !== null) {
        $image = $image->scaleDown(width: $width);
    }

    // ✅ Apply watermark
    if($width > 400)
    $image->place(
        $watermarkPath, // absolute filesystem path
        'bottom-right', // position
        20,             // x offset
        20,             // y offset
        50              // opacity (0–100)
    );

    // ✅ Force WebP output
    $filename = time() . '_' . uniqid('', true) . '.webp';
    $binary = $image->toWebp($quality);

    // Save to storage
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
