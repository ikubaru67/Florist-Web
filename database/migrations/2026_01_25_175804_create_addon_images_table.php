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
        Schema::create('addon_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('addon_id')->constrained()->onDelete('cascade');
            $table->string('image_path');
            $table->integer('sort_order')->default(0)->comment('Display order');
            $table->boolean('is_primary')->default(false)->comment('Primary/thumbnail image');
            $table->timestamps();
            
            $table->index(['addon_id', 'sort_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addon_images');
    }
};
