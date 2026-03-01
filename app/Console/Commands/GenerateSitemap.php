<?php

namespace App\Console\Commands;

use App\Models\Cluster;
use App\Models\Group;
use App\Models\Product;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate
                            {--url= : Base URL (defaults to APP_URL)}
                            {--path= : Output path relative to project root (defaults to public/sitemap.xml)}';

    protected $description = 'Generate sitemap.xml with image entries';

    public function handle()
    {
        $baseUrl = rtrim((string) ($this->option('url') ?: config('app.url')), '/');
        $outputPath = (string) ($this->option('path') ?: 'public/sitemap.xml');
        $absoluteOutputPath = base_path($outputPath);

        if ($baseUrl === '') {
            $this->error('APP_URL is empty. Set APP_URL or pass --url option.');
            return self::FAILURE;
        }

        $this->info("Generating sitemap for: {$baseUrl}");
        $this->info("Writing to: {$absoluteOutputPath}");

        $sitemap = Sitemap::create();

        // Core static pages.
        $staticPaths = [
            '/',
            '/about-us',
            '/locate-us',
            '/contact-us',
            '/custom-furniture',
            '/exports',
            '/shipping-policy',
            '/return-policy',
            '/terms-of-use',
            '/kitchen-cost-calculator',
            '/cart',
        ];

        foreach ($staticPaths as $path) {
            $sitemap->add(
                Url::create($this->absoluteUrl($baseUrl, $path))
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
            );
        }

        // Cluster pages with images.
        Cluster::query()
            ->select(['slug', 'image', 'thumbnail', 'updated_at'])
            ->whereNotNull('slug')
            ->chunk(500, function ($clusters) use ($sitemap, $baseUrl) {
                foreach ($clusters as $cluster) {
                    $url = Url::create($this->absoluteUrl($baseUrl, '/' . ltrim($cluster->slug, '/')))
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY);

                    if ($cluster->updated_at) {
                        $url->setLastModificationDate($cluster->updated_at);
                    }

                    foreach ([$cluster->image, $cluster->thumbnail] as $image) {
                        $imageUrl = $this->storageUrl($baseUrl, $image);
                        if ($imageUrl) {
                            $url->addImage($imageUrl);
                        }
                    }

                    $sitemap->add($url);
                }
            });

        // Group pages with images.
        Group::query()
            ->select(['slug', 'image', 'thumbnail', 'updated_at'])
            ->whereNotNull('slug')
            ->chunk(500, function ($groups) use ($sitemap, $baseUrl) {
                foreach ($groups as $group) {
                    $url = Url::create($this->absoluteUrl($baseUrl, '/' . ltrim($group->slug, '/')))
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY);

                    if ($group->updated_at) {
                        $url->setLastModificationDate($group->updated_at);
                    }

                    foreach ([$group->image, $group->thumbnail] as $image) {
                        $imageUrl = $this->storageUrl($baseUrl, $image);
                        if ($imageUrl) {
                            $url->addImage($imageUrl);
                        }
                    }

                    $sitemap->add($url);
                }
            });

        // Product pages with images.
        Product::query()
            ->select(['slug', 'small_image', 'thumbnail', 'updated_at'])
            ->whereNotNull('slug')
            ->chunk(500, function ($products) use ($sitemap, $baseUrl) {
                foreach ($products as $product) {
                    $url = Url::create($this->absoluteUrl($baseUrl, '/' . ltrim($product->slug, '/')))
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY);

                    if ($product->updated_at) {
                        $url->setLastModificationDate($product->updated_at);
                    }

                    foreach ([$product->small_image, $product->thumbnail] as $image) {
                        $imageUrl = $this->storageUrl($baseUrl, $image);
                        if ($imageUrl) {
                            $url->addImage($imageUrl);
                        }
                    }

                    $sitemap->add($url);
                }
            });

        $sitemap->writeToFile($absoluteOutputPath);

        $this->info('Sitemap generated successfully.');
        return self::SUCCESS;
    }

    private function absoluteUrl(string $baseUrl, string $path): string
    {
        return $baseUrl . '/' . ltrim($path, '/');
    }

    private function storageUrl(string $baseUrl, ?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        return $baseUrl . '/storage/' . ltrim($path, '/');
    }
}
