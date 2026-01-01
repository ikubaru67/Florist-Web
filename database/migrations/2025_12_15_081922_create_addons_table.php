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
        // Create new addons table (global add-ons without product_id)
        if (!Schema::hasTable('addons')) {
            Schema::create('addons', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->text('description')->nullable();
                $table->decimal('price', 10, 2);
                $table->integer('stock')->default(0);
                $table->boolean('is_available')->default(true);
                $table->boolean('has_custom_message')->default(false);
                $table->integer('sort_order')->default(0);
                $table->timestamps();
            });
        }

        // Note: addon_images table already exists, we'll modify it in a separate migration
        // to change product_addon_id to addon_id
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addons');
    }
};
