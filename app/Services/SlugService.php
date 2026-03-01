<?php

namespace App\Services;

use App\Models\Cluster;
use App\Models\Group;
use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SlugService
{
    public function baseSlug(string $name): string
    {
        $slug = Str::slug($name);

        return $slug !== '' ? $slug : 'item';
    }

    public function provisionalSlug(string $name): string
    {
        return $this->baseSlug($name) . '-tmp-' . uniqid();
    }

    public function generateUniqueSlug(
        string $name,
        string $modelClass,
        string $slugField = 'slug',
        ?int $excludeId = null
    ): string {
        $baseSlug = $this->baseSlug($name);
        $slug = $baseSlug;
        $counter = 1;

        while (true) {
            $query = $modelClass::where($slugField, $slug);

            if ($excludeId !== null) {
                $query->where('id', '!=', $excludeId);
            }

            if (!$query->exists()) {
                return $slug;
            }

            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }
    }

    public function generateCatalogSlugForModel(Model $model, string $nameField = 'name'): string
    {
        $baseSlug = $this->baseSlug((string) $model->{$nameField});
        $modelClass = get_class($model);
        $modelId = $model->getKey();

        if (!$this->slugExistsAcrossCatalog($baseSlug, $modelClass, $modelId)) {
            return $baseSlug;
        }

        if (!$modelId) {
            return $baseSlug . '-tmp-' . uniqid();
        }

        $slug = $baseSlug . '-' . $modelId;
        $counter = 2;

        while ($this->slugExistsAcrossCatalog($slug, $modelClass, $modelId)) {
            $slug = $baseSlug . '-' . $modelId . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    private function slugExistsAcrossCatalog(string $slug, ?string $excludeModelClass = null, ?int $excludeId = null): bool
    {
        return $this->existsInModel(Product::class, $slug, $excludeModelClass, $excludeId)
            || $this->existsInModel(Group::class, $slug, $excludeModelClass, $excludeId)
            || $this->existsInModel(Cluster::class, $slug, $excludeModelClass, $excludeId);
    }

    private function existsInModel(string $modelClass, string $slug, ?string $excludeModelClass, ?int $excludeId): bool
    {
        $query = $modelClass::where('slug', $slug);

        if ($excludeModelClass === $modelClass && $excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        return $query->exists();
    }
}
