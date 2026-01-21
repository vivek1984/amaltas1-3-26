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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->string('razorpay_payment_id')->unique(); // The actual payment ID from RazorPay
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('INR');
            $table->string('method')->nullable(); // e.g., 'card', 'netbanking', 'upi'
            $table->string('status')->default('pending'); // captured, failed, refunded
            $table->json('details')->nullable(); // Store additional JSON details from RazorPay
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
