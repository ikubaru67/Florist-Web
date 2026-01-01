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
        Schema::table('addon_images', function (Blueprint $table) {
            // Change image_path from VARCHAR(255) to TEXT to support base64 data URLs
            $table->text('image_path')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('addon_images', function (Blueprint $table) {
            // Revert back to VARCHAR(255)
            $table->string('image_path')->change();
        });
    }
};
