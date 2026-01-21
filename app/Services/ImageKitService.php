<?php

namespace App\Services;

use ImageKit\ImageKit;
use Illuminate\Http\UploadedFile;

class ImageKitService
{
    protected ImageKit $imageKit;

    public function __construct()
    {
        $this->imageKit = new ImageKit(
            config('imagekit.public_key'),
            config('imagekit.private_key'),
            config('imagekit.url_endpoint')
        );
    }

    public function upload(UploadedFile $file, string $folder = 'images'): string
    {
        $upload = $this->imageKit->upload([
            'file' => base64_encode(file_get_contents($file->getRealPath())),
            'fileName' => uniqid() . '.' . $file->getClientOriginalExtension(),
            'folder' => $folder,
            'useUniqueFileName' => true,
        ]);

        if (!isset($upload->result->url)) {
            throw new \Exception('ImageKit upload failed');
        }

        return $upload->result->url;
    }
}
