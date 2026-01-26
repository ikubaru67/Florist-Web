import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <p className="text-sm text-gray-600">
                Setelah akun Anda dihapus, semua data dan informasi akan dihapus secara permanen. 
                Sebelum menghapus akun, silakan unduh data atau informasi yang ingin Anda simpan.
            </p>

            <button
                type="button"
                onClick={confirmUserDeletion}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all font-medium"
            >
                Hapus Akun
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Apakah Anda yakin ingin menghapus akun Anda?
                    </h2>

                    <p className="text-sm text-gray-600 mb-6">
                        Setelah akun dihapus, semua data akan hilang secara permanen. 
                        Masukkan password Anda untuk konfirmasi penghapusan akun.
                    </p>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            id="password"
                            type="password"
                            ref={passwordInput}
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Masukkan password Anda"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-medium"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all disabled:opacity-50 font-medium"
                        >
                            {processing ? 'Menghapus...' : 'Hapus Akun'}
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
