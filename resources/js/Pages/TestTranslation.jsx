import { usePage } from '@inertiajs/react';
import { useTranslation } from '@/Hooks/useTranslation';
import ShopLayout from '@/Layouts/ShopLayout';

export default function TestTranslation({ auth }) {
    const { locale, translations } = usePage().props;
    const { t } = useTranslation();

    return (
        <ShopLayout auth={auth}>
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-4">Translation Test Page</h1>
                
                <div className="bg-white p-6 rounded-lg shadow mb-4">
                    <h2 className="text-xl font-semibold mb-2">Debug Info:</h2>
                    <p><strong>Current Locale:</strong> {locale}</p>
                    <p><strong>Translations Object:</strong> {JSON.stringify(translations, null, 2)}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Translation Tests:</h2>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-2">Key</th>
                                <th className="text-left p-2">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-2">t('home')</td>
                                <td className="p-2 font-bold">{t('home')}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2">t('catalog')</td>
                                <td className="p-2 font-bold">{t('catalog')}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2">t('cart')</td>
                                <td className="p-2 font-bold">{t('cart')}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2">t('orders')</td>
                                <td className="p-2 font-bold">{t('orders')}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2">t('profile')</td>
                                <td className="p-2 font-bold">{t('profile')}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-2">t('logout')</td>
                                <td className="p-2 font-bold">{t('logout')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </ShopLayout>
    );
}
