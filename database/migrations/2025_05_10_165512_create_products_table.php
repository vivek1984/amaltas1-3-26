<?php

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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('thumbnail')->nullable();
            $table->string('slug')->unique();
            $table->string('youtube')->nullable();
            $table->boolean('shippable')->default(false);
            $table->text('feature1')->nullable();
            $table->text('feature2')->nullable();
            $table->text('feature3')->nullable();
            $table->longText('description')->nullable();
            $table->string('small_image')->nullable();
            $table->integer('clicks')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
