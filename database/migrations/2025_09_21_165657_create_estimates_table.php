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
        Schema::create('estimates', function (Blueprint $table) {
            $table->id();
            $table->string('type')->default('online');
            $table->string('clientName');
            $table->string('clientPhone');
            $table->string('email')->nullable();
            $table->text('address');
            $table->integer('bodyMaterial');
            $table->integer('bodyLaminate')->nullable();
            $table->integer('backMaterial');
            $table->integer('backLaminate')->nullable();
            $table->integer('shutterMaterial');
            $table->integer('shutterLaminate');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estimates');
    }
};
