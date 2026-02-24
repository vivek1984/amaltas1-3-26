<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\SitemapGenerator;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';
    protected $description = 'Auto-generate sitemap by crawling the site';

    public function handle()
    {
        SitemapGenerator::create('https://test.amaltasfurniture.com')
            ->writeToFile(public_path('sitemap.xml'));

        $this->info('✅ Sitemap generated successfully.');
    }
}