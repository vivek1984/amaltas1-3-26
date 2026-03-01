<?php

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
        Schema::create('varients', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('qty')->nullable();
            $table->integer('mrp')->nullable();
            $table->integer('price')->nullable();
            $table->integer('shipping_fee')->nullable();
            $table->string('slug')->unique();
            $table->string('material')->nullable();
            $table->string('color')->nullable();
            $table->string('size')->nullable();
            $table->boolean('shippable')->default(false);
            $table->text('feature1')->nullable();
            $table->text('feature2')->nullable();
            $table->text('feature3')->nullable();
            $table->longText('description')->nullable();
            $table->string('brand')->default('Amaltas');
            $table->string('size_image')->nullable();
            $table->foreignIdFor(Product::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('varients');
    }
};
