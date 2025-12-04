<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Drop buyers table - table ini tidak digunakan sama sekali di aplikasi.
     * Semua data buyer sudah ada di table users.
     */
    public function up(): void
    {
        Schema::dropIfExists('buyers');
    }

    /**
     * Reverse the migrations.
     * 
     * Recreate buyers table jika rollback (untuk compatibility dengan old migrations)
     */
    public function down(): void
    {
        Schema::create('buyers', function (Blueprint $table) {
            $table->id('buyerId');
            $table->foreignId('id')->constrained('users')->onDelete('cascade');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamps();
        });
    }
};
