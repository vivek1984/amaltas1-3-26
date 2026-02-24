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
        Schema::create('cabinet_type_material', function (Blueprint $table) {

            // Foreign key to the 'cabinet_types' table
            $table->foreignId('cabinet_type_id')->constrained()->cascadeOnDelete();

            // Foreign key to the 'materials' table
            $table->foreignId('material_id')->constrained()->cascadeOnDelete();

            // Set the two columns as a composite primary key for efficiency
            $table->primary(['cabinet_type_id', 'material_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cabinet_type_material');
    }
};
