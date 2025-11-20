import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        code: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.verify.code'), {
            onError: () => reset('code'),
        });
    };

    const resendCode = (e) => {
        e.preventDefault();
        post(route('verification.resend.code'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Verifikasi Email - Florist" />

            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-pink-600">🌸 Florist</h1>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Verifikasi Email
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Kami telah mengirimkan kode verifikasi 6 digit ke email Anda. 
                        Silakan masukkan kode tersebut di bawah ini untuk memverifikasi akun Anda.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {status === 'verification-code-sent' && (
                        <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200">
                            <p className="text-sm text-green-600">
                                Kode verifikasi baru telah dikirim ke email Anda.
                            </p>
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 text-center mb-2">
                                Kode Verifikasi (6 digit)
                            </label>
                            <input
                                id="code"
                                type="text"
                                name="code"
                                value={data.code}
                                className="mt-1 block w-full px-4 py-4 border border-gray-300 rounded-lg shadow-sm text-center text-3xl tracking-widest font-bold focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="000000"
                                maxLength={6}
                                autoFocus
                                onChange={(e) => setData('code', e.target.value.replace(/\D/g, ''))}
                            />
                            {errors.code && (
                                <p className="mt-2 text-sm text-red-600 text-center">{errors.code}</p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing || data.code.length !== 6}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {processing ? 'Memverifikasi...' : '✓ Verifikasi Email'}
                            </button>
                        </div>

                        <div className="text-center space-y-3">
                            <button
                                onClick={resendCode}
                                type="button"
                                disabled={processing}
                                className="text-sm font-medium text-pink-600 hover:text-pink-500 disabled:opacity-50"
                            >
                                📧 Kirim Ulang Kode
                            </button>
                            
                            <div>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="text-sm font-medium text-gray-600 hover:text-gray-500"
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Info */}
                <div className="text-center">
                    <p className="text-xs text-gray-500">
                        ⏰ Kode berlaku selama 10 menit
                    </p>
                </div>
            </div>
        </div>
    );
}
