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
        Schema::table('product_reviews', function (Blueprint $table) {
            // Drop old unique constraint
            $table->dropUnique('product_reviews_product_id_user_id_order_id_unique');
            
            // Add new unique constraint with order_item_id
            // This allows same product to be reviewed multiple times from different order items
            $table->unique(['product_id', 'user_id', 'order_id', 'order_item_id'], 'product_reviews_unique_constraint');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_reviews', function (Blueprint $table) {
            // Drop new constraint
            $table->dropUnique('product_reviews_unique_constraint');
            
            // Restore old constraint
            $table->unique(['product_id', 'user_id', 'order_id'], 'product_reviews_product_id_user_id_order_id_unique');
        });
    }
};
