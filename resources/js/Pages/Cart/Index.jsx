import ShopLayout from '@/Layouts/ShopLayout';
import Toast from '@/Components/Toast';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from '@/Hooks/useTranslation';

export default function CartIndex({ auth, cartItems, total }) {
    const { t } = useTranslation();
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    
    const updateQuantity = (itemId, quantity) => {
        router.patch(`/cart/${itemId}`, { quantity }, {
            preserveScroll: true
        });
    };

    const removeItem = (itemId) => {
        if (confirm(t('confirm_remove_item'))) {
            router.delete(`/cart/${itemId}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setToast({ show: true, message: 'Item berhasil dihapus dari keranjang', type: 'success' });
                }
            });
        }
    };

    const clearCart = () => {
        if (confirm(t('confirm_clear_cart'))) {
            router.delete('/cart', {
                onSuccess: () => {
                    setToast({ show: true, message: 'Keranjang berhasil dikosongkan', type: 'success' });
                }
            });
        }
    };

    return (
        <ShopLayout auth={auth}>
            <Head title={`${t('cart')} - Florist`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">{t('shopping_cart')}</h1>

                {Array.isArray(cartItems) && cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <img
                                            src={item.product.image || 'https://via.placeholder.com/150'}
                                            alt={item.product.name}
                                            className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <Link
                                                href={`/products/${item.product.slug}`}
                                                className="text-base sm:text-lg font-semibold text-gray-900 hover:text-pink-600"
                                            >
                                                {item.product.name}
                                            </Link>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Rp {Number(item.price).toLocaleString('id-ID')}
                                            </p>
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-3">
                                                <div className="flex items-center border border-gray-300 rounded w-full sm:w-auto">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className="flex-1 sm:flex-none px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="flex-1 sm:flex-none px-6 py-2 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        disabled={item.quantity >= item.product.stock}
                                                        className="flex-1 sm:flex-none px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                >
                                                    🗑️ {t('remove')}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-left sm:text-right mt-2 sm:mt-0">
                                            <p className="text-base sm:text-lg font-bold text-pink-600">
                                                Rp {(item.quantity * item.price).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={clearCart}
                                className="text-red-600 hover:text-red-800 text-sm font-medium mt-4"
                            >
                                🗑️ {t('clear_cart')}
                            </button>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:sticky lg:top-20">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{t('order_summary')}</h2>
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm sm:text-base">
                                        <span className="text-gray-600">{t('subtotal')}</span>
                                        <span className="font-semibold">
                                            Rp {Number(total).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>
                                <div className="border-t pt-4 mb-4">
                                    <div className="flex justify-between text-base sm:text-lg font-bold">
                                        <span>{t('total')}</span>
                                        <span className="text-pink-600">
                                            Rp {Number(total).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>
                                <Link
                                    href="/cart/checkout"
                                    className="block w-full bg-pink-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors text-sm sm:text-base"
                                >
                                    {t('checkout')}
                                </Link>
                                <Link
                                    href="/shop"
                                    className="block w-full text-center mt-4 text-pink-600 hover:text-pink-800 text-sm sm:text-base"
                                >
                                    {t('continue_shopping')}
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-5xl sm:text-6xl mb-4">🛒</div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                            {t('empty_cart')}
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 mb-8">
                            {t('empty_cart_message')}
                        </p>
                        <Link
                            href="/shop"
                            className="inline-block bg-pink-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors text-sm sm:text-base"
                        >
                            {t('start_shopping')}
                        </Link>
                    </div>
                )}
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
