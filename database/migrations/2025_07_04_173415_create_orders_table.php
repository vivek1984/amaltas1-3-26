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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('user_ip');
            $table->string('cashfree_order_id')->nullable();
            $table->string('cashfree_payment_id')->nullable();
            $table->decimal('total_amount', 10, 2);
            $table->string('status')->default('pending'); // pending, processing, completed, cancelled, etc.
            $table->string('payment_method')->nullable(); // e.g., 'online', 'cod'
            $table->string('payment_status')->default('pending'); // pending, paid, failed, refunded
            //$table->string('razorpay_order_id')->nullable()->unique(); // RazorPay order ID
            //$table->string('razorpay_payment_id')->nullable()->unique(); // RazorPay payment ID (after success)
           // You might also want to store the raw response for debugging/auditing
            $table->json('cashfree_response_data')->nullable();

            // Shipping address details
            $table->string('shipping_name');
            $table->string('shipping_address_line1');
            $table->string('shipping_address_line2')->nullable();
            $table->string('shipping_city');
            $table->string('shipping_state');
            $table->string('shipping_pincode', 6);
            $table->string('shipping_mobile', 15);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
