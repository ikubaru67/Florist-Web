<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Notifications\VerificationCodeNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VerifyCodeController extends Controller
{
    public function verify(Request $request)
    {
        $request->validate([
            'code' => 'required|string|size:6',
        ]);

        $user = Auth::user();

        // Check if code matches and not expired
        if ($user->verification_code !== $request->code) {
            return back()->withErrors(['code' => 'Kode verifikasi tidak valid.']);
        }

        if ($user->verification_code_expires_at < now()) {
            return back()->withErrors(['code' => 'Kode verifikasi sudah kadaluarsa. Silakan minta kode baru.']);
        }

        // Mark email as verified
        $user->email_verified_at = now();
        $user->verification_code = null;
        $user->verification_code_expires_at = null;
        $user->save();

        return redirect('/')->with('success', 'Email berhasil diverifikasi!');
    }

    public function resend()
    {
        $user = Auth::user();

        if ($user->hasVerifiedEmail()) {
            return redirect('/');
        }

        // Generate new code
        $verificationCode = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        $user->verification_code = $verificationCode;
        $user->verification_code_expires_at = now()->addMinutes(10);
        $user->save();

        // Send new code via email
        $user->notify(new VerificationCodeNotification($verificationCode));

        return back()->with('status', 'verification-code-sent');
    }
}
