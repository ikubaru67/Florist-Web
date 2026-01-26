import ShopLayout from '@/Layouts/ShopLayout';
import Toast from '@/Components/Toast';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function CartCheckout({ auth, cartItems, total, user }) {
    const [processing, setProcessing] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [formData, setFormData] = useState({
        shipping_name: user.name || '',
        shipping_email: user.email || '',
        shipping_phone: user.phone || '',
        shipping_address: user.address || '',
        shipping_city: user.city || '',
        shipping_postal_code: user.postal_code || '',
        notes: '',
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post('/cart/checkout', formData, {
            onSuccess: () => {
            },
            onError: (errors) => {
                setToast({ show: true, message: 'Gagal membuat pesanan: ' + (errors.error || 'Silakan coba lagi'), type: 'error' });
                setProcessing(false);
            },
            onFinish: () => {
                setProcessing(false);
            }
        });
    };

    return (
        <ShopLayout auth={auth}>
            <Head title="Checkout - Florist" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Informasi Pengiriman</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Lengkap *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.shipping_name}
                                        onChange={(e) => handleChange('shipping_name', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.shipping_email}
                                            onChange={(e) => handleChange('shipping_email', e.target.value)}
                                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            No. Telepon *
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.shipping_phone}
                                            onChange={(e) => handleChange('shipping_phone', e.target.value)}
                                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Alamat Lengkap *
                                    </label>
                                    <textarea
                                        value={formData.shipping_address}
                                        onChange={(e) => handleChange('shipping_address', e.target.value)}
                                        rows="3"
                                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                                        required
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Kota *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.shipping_city}
                                            onChange={(e) => handleChange('shipping_city', e.target.value)}
                                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Kode Pos *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.shipping_postal_code}
                                            onChange={(e) => handleChange('shipping_postal_code', e.target.value)}
                                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Catatan (Opsional)
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => handleChange('notes', e.target.value)}
                                        rows="3"
                                        placeholder="Tambahkan catatan untuk pesanan Anda..."
                                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                                    ></textarea>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 transition-colors text-sm sm:text-base"
                                    >
                                        {processing ? 'Memproses...' : '🛒 Buat Pesanan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:sticky lg:top-20">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Ringkasan Pesanan</h2>
                            
                            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="pb-3 border-b last:border-b-0">
                                        <div className="flex gap-3">
                                            <img
                                                src={item.product.image || 'https://via.placeholder.com/60'}
                                                alt={item.product.name}
                                                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded flex-shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-xs sm:text-sm text-gray-900 truncate">
                                                    {item.product.name}
                                                </p>
                                                <p className="text-xs sm:text-sm text-gray-600">
                                                    {item.quantity} x Rp {Number(item.price).toLocaleString('id-ID')}
                                                </p>
                                                <p className="text-xs sm:text-sm font-semibold text-pink-600">
                                                    Rp {(item.quantity * item.price).toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* Add-ons Display */}
                                        {item.addons_detail && item.addons_detail.length > 0 && (
                                            <div className="mt-2 ml-0 sm:ml-16 pl-3 border-l-2 border-pink-200 space-y-1">
                                                {item.addons_detail.map((addon) => (
                                                    <div key={addon.id} className="text-xs sm:text-sm">
                                                        <p className="text-gray-700">
                                                            <span className="font-medium">+ {addon.name}</span>
                                                            <span className="text-gray-500"> ({addon.cart_quantity}x)</span>
                                                        </p>
                                                        <p className="text-pink-600">
                                                            Rp {(addon.price * addon.cart_quantity).toLocaleString('id-ID')}
                                                        </p>
                                                        {addon.custom_message && (
                                                            <p className="text-gray-500 italic text-xs mt-1">
                                                                "{addon.custom_message}"
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between text-base sm:text-lg font-bold mb-4">
                                    <span>Total</span>
                                    <span className="text-pink-600">
                                        Rp {Number(total).toLocaleString('id-ID')}
                                    </span>
                                </div>
                                
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs sm:text-sm text-blue-800">
                                    <p className="font-semibold mb-1">📱 Pembayaran via WhatsApp</p>
                                    <p className="text-xs">
                                        Setelah checkout, Anda akan diarahkan untuk konfirmasi pembayaran via WhatsApp.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, show: false })}
            />
        </ShopLayout>
    );
}
