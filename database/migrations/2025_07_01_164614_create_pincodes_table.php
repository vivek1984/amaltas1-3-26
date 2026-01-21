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
        Schema::create('pincodes', function (Blueprint $table) {
            $table->id();
            $table->string('circle_name')->nullable();
            $table->string('region_name')->nullable();
            $table->string('division_name')->nullable();
            $table->string('office_name')->nullable();
            $table->string('pincode');
            $table->string('office_type')->nullable();
            $table->string('delivery')->nullable();
            $table->string('district')->nullable();
            $table->string('state_name')->nullable();
            $table->string('latitude');
            $table->string('longitude');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pincodes');
    }
};
