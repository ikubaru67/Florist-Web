import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, router } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const [codeSent, setCodeSent] = useState(false);
    const [sendingCode, setSendingCode] = useState(false);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        verification_code: '',
        password: '',
        password_confirmation: '',
    });

    const sendVerificationCode = (e) => {
        e.preventDefault();
        
        if (!data.current_password) {
            return;
        }

        setSendingCode(true);
        router.post(route('password.send.code'), {}, {
            preserveScroll: true,
            onSuccess: () => {
                setCodeSent(true);
                setSendingCode(false);
            },
            onError: () => {
                setSendingCode(false);
            },
        });
    };

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setCodeSent(false);
            },
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <p className="text-sm text-gray-600 mb-6">
                Pastikan akun Anda menggunakan password yang panjang dan acak agar tetap aman.
            </p>

            <form onSubmit={updatePassword} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password Saat Ini</label>
                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        type="password"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        autoComplete="current-password"
                    />
                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                {/* Verification Code Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kode Verifikasi</label>
                    <div className="flex gap-3">
                        <input
                            id="verification_code"
                            type="text"
                            className="flex-1 px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:bg-gray-100"
                            value={data.verification_code}
                            onChange={(e) => setData('verification_code', e.target.value)}
                            placeholder="Masukkan kode 6 digit"
                            maxLength={6}
                            disabled={!codeSent}
                        />
                        <button
                            type="button"
                            onClick={sendVerificationCode}
                            disabled={sendingCode || !data.current_password}
                            className="px-6 py-3.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap font-medium"
                        >
                            {sendingCode ? 'Mengirim...' : codeSent ? 'Kirim Ulang' : 'Kirim Kode'}
                        </button>
                    </div>

                    {codeSent && (
                        <p className="mt-2 text-sm text-emerald-600 font-medium">
                            ✓ Kode verifikasi telah dikirim ke email Anda. Kode berlaku 10 menit.
                        </p>
                    )}

                    <InputError message={errors.verification_code} className="mt-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
                    <input
                        id="password"
                        ref={passwordInput}
                        type="password"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 font-medium"
                    >
                        {processing ? 'Menyimpan...' : 'Update Password'}
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
