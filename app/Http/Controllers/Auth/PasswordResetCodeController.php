<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\VerificationCodeNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class PasswordResetCodeController extends Controller
{
    public function show()
    {
        $email = session('password_reset_email');

        if (!$email) {
            return redirect()->route('password.request');
        }

        return Inertia::render('Auth/VerifyPasswordCode', [
            'email' => $email,
            'status' => session('status'),
        ]);
    }

    public function verify(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['Email tidak ditemukan.'],
            ]);
        }

        // Check if code matches and not expired
        if ($user->verification_code !== $request->code) {
            throw ValidationException::withMessages([
                'code' => ['Kode verifikasi tidak valid.'],
            ]);
        }

        if ($user->verification_code_expires_at < now()) {
            throw ValidationException::withMessages([
                'code' => ['Kode verifikasi sudah kadaluarsa. Silakan minta kode baru.'],
            ]);
        }

        // Store verified email in session
        session(['password_reset_verified_email' => $request->email]);

        return redirect()->route('password.reset.new');
    }

    public function showResetForm()
    {
        $email = session('password_reset_verified_email');

        if (!$email) {
            return redirect()->route('password.request');
        }

        return Inertia::render('Auth/ResetPasswordNew', [
            'email' => $email,
        ]);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $email = session('password_reset_verified_email');

        if (!$email || $email !== $request->email) {
            return redirect()->route('password.request');
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['Email tidak ditemukan.'],
            ]);
        }

        // Reset password
        $user->password = Hash::make($request->password);
        $user->verification_code = null;
        $user->verification_code_expires_at = null;
        $user->save();

        // Clear session
        session()->forget(['password_reset_email', 'password_reset_verified_email']);

        return redirect()->route('login')->with('status', 'Password berhasil diubah. Silakan login dengan password baru.');
    }

    public function resend(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['Email tidak ditemukan.'],
            ]);
        }

        // Generate new code
        $verificationCode = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        $user->verification_code = $verificationCode;
        $user->verification_code_expires_at = now()->addMinutes(10);
        $user->save();

        // Send new code via email
        $user->notify(new VerificationCodeNotification($verificationCode));

        return back()->with('status', 'Kode verifikasi baru telah dikirim ke email Anda.');
    }
}
