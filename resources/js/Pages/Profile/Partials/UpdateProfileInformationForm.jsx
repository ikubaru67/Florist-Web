import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            address: user.address || '',
            city: user.city || '',
            postal_code: user.postal_code || '',
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <p className="text-sm text-gray-600 mb-6">
                Update informasi profil dan alamat email akun Anda.
            </p>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
                    <input
                        id="name"
                        type="text"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                    <input
                        id="phone"
                        type="tel"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        autoComplete="tel"
                        placeholder="08123456789"
                    />
                    <InputError className="mt-2" message={errors.phone} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
                    <textarea
                        id="address"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        rows="3"
                        placeholder="Jalan, RT/RW, Kelurahan, Kecamatan"
                    />
                    <InputError className="mt-2" message={errors.address} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kota</label>
                        <input
                            id="city"
                            type="text"
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            placeholder="Jakarta"
                        />
                        <InputError className="mt-2" message={errors.city} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kode Pos</label>
                        <input
                            id="postal_code"
                            type="text"
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                            value={data.postal_code}
                            onChange={(e) => setData('postal_code', e.target.value)}
                            placeholder="12345"
                        />
                        <InputError className="mt-2" message={errors.postal_code} />
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Email Anda belum terverifikasi.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Klik di sini untuk mengirim ulang email verifikasi.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                Link verifikasi baru telah dikirim ke email Anda.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all disabled:opacity-50 font-medium"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-emerald-600 font-medium">
                            ✓ Tersimpan
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
