<?php

use App\Models\Cluster;
use App\Models\Group;
use App\Models\Product;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clusters', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('thumbnail')->nullable();
            $table->integer('clicks')->default(0);
            $table->string('slug')->unique();
            $table->timestamps();
        });

        Schema::create('cluster_group', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Cluster::class)->cascadeOnDelete();
            $table->foreignIdFor(Group::class)->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create('cluster_product', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Cluster::class)->cascadeOnDelete();
            $table->foreignIdFor(Product::class)->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create('group_product', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Group::class)->cascadeOnDelete();
            $table->foreignIdFor(Product::class)->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clusters');
        Schema::dropIfExists('cluster_group');
        Schema::dropIfExists('cluster_product');
        Schema::dropIfExists('group_product');
    }
};
