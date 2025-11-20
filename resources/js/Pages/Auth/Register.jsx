import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        address: '',
        city: '',
        postal_code: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Register - Florist" />

            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <Link href="/" className="inline-block">
                        <h1 className="text-4xl font-bold text-pink-600">🌸 Florist</h1>
                    </Link>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Buat Akun Baru
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sudah punya akun?{' '}
                        <Link
                            href={route('login')}
                            className="font-medium text-pink-600 hover:text-pink-500"
                        >
                            Masuk di sini
                        </Link>
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nama Lengkap
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="Nama Anda"
                                autoComplete="name"
                                autoFocus
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && (
                                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="nama@email.com"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Nomor Telepon
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                name="phone"
                                value={data.phone}
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="08123456789"
                                autoComplete="tel"
                                onChange={(e) => setData('phone', e.target.value)}
                            />
                            {errors.phone && (
                                <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Alamat Lengkap
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={data.address}
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="Jalan, RT/RW, Kelurahan, Kecamatan"
                                rows="2"
                                autoComplete="street-address"
                                onChange={(e) => setData('address', e.target.value)}
                            />
                            {errors.address && (
                                <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                    Kota
                                </label>
                                <input
                                    id="city"
                                    type="text"
                                    name="city"
                                    value={data.city}
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    placeholder="Jakarta"
                                    autoComplete="address-level2"
                                    onChange={(e) => setData('city', e.target.value)}
                                />
                                {errors.city && (
                                    <p className="mt-2 text-sm text-red-600">{errors.city}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
                                    Kode Pos
                                </label>
                                <input
                                    id="postal_code"
                                    type="text"
                                    name="postal_code"
                                    value={data.postal_code}
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    placeholder="12345"
                                    autoComplete="postal-code"
                                    onChange={(e) => setData('postal_code', e.target.value)}
                                />
                                {errors.postal_code && (
                                    <p className="mt-2 text-sm text-red-600">{errors.postal_code}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                Konfirmasi Password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            {errors.password_confirmation && (
                                <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {processing ? 'Memproses...' : 'Daftar'}
                        </button>
                    </form>

                    <div className="mt-6">
                        <Link
                            href="/"
                            className="text-center block text-sm text-gray-600 hover:text-gray-900"
                        >
                            ← Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
