<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\PasswordResetCodeController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\VerifyCodeController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store'])
        ->middleware('throttle:5,1'); // Max 5 registrations per minute per IP

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store'])
        ->middleware('throttle:5,1'); // Max 5 login attempts per minute per IP

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->middleware('throttle:3,1') // Max 3 password reset requests per minute
        ->name('password.email');

    Route::get('verify-password-code', [PasswordResetCodeController::class, 'show'])
        ->name('password.verify.code');

    Route::post('verify-password-code', [PasswordResetCodeController::class, 'verify'])
        ->name('password.verify.code.submit');

    Route::post('resend-password-code', [PasswordResetCodeController::class, 'resend'])
        ->middleware('throttle:6,1')
        ->name('password.resend.code');

    Route::get('reset-password-new', [PasswordResetCodeController::class, 'showResetForm'])
        ->name('password.reset.new');

    Route::post('reset-password-new', [PasswordResetCodeController::class, 'reset'])
        ->name('password.reset.new.submit');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::post('verify-code', [VerifyCodeController::class, 'verify'])
        ->name('verification.verify.code');

    Route::post('resend-code', [VerifyCodeController::class, 'resend'])
        ->middleware('throttle:6,1')
        ->name('verification.resend.code');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::post('password/send-code', [PasswordController::class, 'sendCode'])
        ->middleware('throttle:6,1')
        ->name('password.send.code');

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
