import ShopLayout from '@/Layouts/ShopLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <ShopLayout auth={auth}>
            <Head title="Profile" />

            <div className="py-12 bg-gray-50">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Profil Saya</h1>
                    
                    <div className="space-y-6">
                        <div className="bg-white p-6 shadow-md rounded-lg">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        <div className="bg-white p-6 shadow-md rounded-lg">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>

                        <div className="bg-white p-6 shadow-md rounded-lg">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
