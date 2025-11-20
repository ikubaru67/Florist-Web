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
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Pastikan akun Anda menggunakan password yang panjang dan acak agar tetap aman.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Password Saat Ini"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                {/* Verification Code Section */}
                <div>
                    <InputLabel
                        htmlFor="verification_code"
                        value="Kode Verifikasi"
                    />
                    
                    <div className="flex gap-2 mt-1">
                        <TextInput
                            id="verification_code"
                            value={data.verification_code}
                            onChange={(e) =>
                                setData('verification_code', e.target.value)
                            }
                            type="text"
                            className="block w-full"
                            placeholder="Masukkan kode 6 digit"
                            maxLength={6}
                            disabled={!codeSent}
                        />
                        
                        <button
                            type="button"
                            onClick={sendVerificationCode}
                            disabled={sendingCode || !data.current_password}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                            {sendingCode ? 'Mengirim...' : codeSent ? 'Kirim Ulang' : 'Kirim Kode'}
                        </button>
                    </div>

                    {codeSent && (
                        <p className="mt-2 text-sm text-green-600">
                            Kode verifikasi telah dikirim ke email Anda. Kode berlaku 10 menit.
                        </p>
                    )}

                    <InputError
                        message={errors.verification_code}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password Baru" />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Simpan</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Tersimpan.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
