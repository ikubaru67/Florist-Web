<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('addon_images', function (Blueprint $table) {
            // Check if addon_id column doesn't exist yet
            if (!Schema::hasColumn('addon_images', 'addon_id')) {
                // Add addon_id column (nullable for now to allow transition)
                $table->foreignId('addon_id')->nullable()->after('id')->constrained('addons')->onDelete('cascade');
                
                // Make product_addon_id nullable for transition (if it exists)
                if (Schema::hasColumn('addon_images', 'product_addon_id')) {
                    DB::statement('ALTER TABLE addon_images MODIFY product_addon_id BIGINT UNSIGNED NULL');
                }
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('addon_images', function (Blueprint $table) {
            $table->dropForeign(['addon_id']);
            $table->dropColumn('addon_id');
        });
    }
};
