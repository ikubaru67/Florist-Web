<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Notifications\VerificationCodeNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class PasswordController extends Controller
{
    /**
     * Send verification code before updating password.
     */
    public function sendCode(Request $request): RedirectResponse
    {
        $user = $request->user();

        // Generate 6 digit verification code
        $verificationCode = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        $user->verification_code = $verificationCode;
        $user->verification_code_expires_at = now()->addMinutes(10);
        $user->save();

        // Send verification code via email
        $user->notify(new VerificationCodeNotification($verificationCode));

        return back()->with('status', 'verification-code-sent');
    }

    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'verification_code' => ['required', 'string', 'size:6'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $user = $request->user();

        // Check verification code
        if ($user->verification_code !== $request->verification_code) {
            throw ValidationException::withMessages([
                'verification_code' => 'Kode verifikasi tidak valid.',
            ]);
        }

        if ($user->verification_code_expires_at < now()) {
            throw ValidationException::withMessages([
                'verification_code' => 'Kode verifikasi sudah kadaluarsa. Silakan minta kode baru.',
            ]);
        }

        // Update password
        $user->update([
            'password' => Hash::make($validated['password']),
            'verification_code' => null,
            'verification_code_expires_at' => null,
        ]);

        return back()->with('status', 'password-updated');
    }
}
