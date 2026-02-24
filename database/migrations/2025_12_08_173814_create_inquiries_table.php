<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('inquiries', function (Blueprint $table) {
        $table->id();

        $table->string('name');
        $table->string('type');
        $table->string('phone')->nullable();
        $table->string('email')->nullable();
        $table->text('address')->nullable();
        $table->string('furniture_type')->nullable();
        $table->string('dimensions')->nullable();
        $table->string('material')->nullable();
        $table->string('budget')->nullable();
        $table->text('message')->nullable();
        $table->string('file_path')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};
