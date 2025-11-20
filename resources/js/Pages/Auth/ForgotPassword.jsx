import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Lupa Password - Florist" />

            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <Link href="/" className="inline-block">
                        <h1 className="text-4xl font-bold text-pink-600">🌸 Florist</h1>
                    </Link>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Lupa Password?
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Tidak masalah! Masukkan email Anda dan kami akan mengirimkan kode verifikasi untuk reset password.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {status && (
                        <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200">
                            <p className="text-sm text-green-600">{status}</p>
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Alamat Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="nama@email.com"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {processing ? 'Mengirim...' : '📧 Kirim Kode Verifikasi'}
                            </button>
                        </div>

                        <div className="text-center">
                            <Link
                                href={route('login')}
                                className="text-sm font-medium text-pink-600 hover:text-pink-500"
                            >
                                ← Kembali ke Login
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Footer Info */}
                <div className="text-center">
                    <p className="text-xs text-gray-500">
                        Butuh bantuan? Hubungi kami di{' '}
                        <a href="mailto:support@florist.com" className="text-pink-600 hover:text-pink-500">
                            support@florist.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
