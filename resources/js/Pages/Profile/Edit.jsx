import ShopLayout from '@/Layouts/ShopLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { User, Lock, Trash2 } from 'lucide-react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <ShopLayout auth={auth}>
            <Head title="Profile" />

            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                            Profil Saya
                        </h1>
                        <p className="text-gray-600">Kelola informasi profil dan keamanan akun Anda</p>
                    </div>
                    
                    <div className="space-y-6">
                        {/* Profile Information Card */}
                        <div className="bg-white/90 backdrop-blur-sm p-8 shadow-xl rounded-2xl border border-emerald-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">Informasi Profil</h2>
                            </div>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </div>

                        {/* Password Card */}
                        <div className="bg-white/90 backdrop-blur-sm p-8 shadow-xl rounded-2xl border border-orange-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                                    <Lock className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">Keamanan Password</h2>
                            </div>
                            <UpdatePasswordForm />
                        </div>

                        {/* Delete Account Card */}
                        <div className="bg-white/90 backdrop-blur-sm p-8 shadow-xl rounded-2xl border border-red-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                                    <Trash2 className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">Zona Berbahaya</h2>
                            </div>
                            <DeleteUserForm />
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
