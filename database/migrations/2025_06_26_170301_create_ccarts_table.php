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
        Schema::create('ccarts', function (Blueprint $table) {
            $table->id(); // Primary key for the cart item
            $table->unsignedBigInteger('user_id')->nullable(); // Foreign key for authenticated users
            $table->string('user_ip')->nullable(); // Column to store user's IP address for guest carts

            $table->unsignedBigInteger('product_id'); // Foreign key to the products table
            $table->unsignedBigInteger('varient_id')->nullable(); // Foreign key to the variants table
            $table->unsignedBigInteger('design_id')->nullable(); // Foreign key to the designs table
            $table->unsignedBigInteger('size_id')->nullable(); // Foreign key to the sizes table

            $table->integer('quantity'); // Quantity of the item
            $table->decimal('price', 10, 2); // Price at the time of adding to cart
            $table->decimal('mrp', 10, 2);   // MRP at the time of adding to cart

            $table->timestamps(); // created_at and updated_at columns

            // Foreign key constraints
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('varient_id')->references('id')->on('varients')->onDelete('cascade'); // Assuming 'varients' is your table name
            $table->foreign('design_id')->references('id')->on('designs')->onDelete('cascade');
            $table->foreign('size_id')->references('id')->on('sizes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ccarts');
    }
};
