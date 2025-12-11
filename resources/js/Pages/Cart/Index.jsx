import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function CartIndex({ auth, cartItems, total }) {
    const updateQuantity = (itemId, quantity) => {
        router.patch(`/cart/${itemId}`, { quantity }, {
            preserveScroll: true
        });
    };

    const removeItem = (itemId) => {
        if (confirm('Hapus item ini dari keranjang?')) {
            router.delete(`/cart/${itemId}`, {
                preserveScroll: true
            });
        }
    };

    const clearCart = () => {
        if (confirm('Kosongkan seluruh keranjang?')) {
            router.delete('/cart');
        }
    };

    return (
        <ShopLayout auth={auth}>
            <Head title="Keranjang - Florist" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Keranjang Belanja</h1>

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
                                                    🗑️ Hapus
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
                                🗑️ Kosongkan Keranjang
                            </button>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:sticky lg:top-20">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Ringkasan Pesanan</h2>
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm sm:text-base">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-semibold">
                                            Rp {Number(total).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>
                                <div className="border-t pt-4 mb-4">
                                    <div className="flex justify-between text-base sm:text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-pink-600">
                                            Rp {Number(total).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>
                                <Link
                                    href="/cart/checkout"
                                    className="block w-full bg-pink-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors text-sm sm:text-base"
                                >
                                    Lanjut ke Checkout
                                </Link>
                                <Link
                                    href="/shop"
                                    className="block w-full text-center mt-4 text-pink-600 hover:text-pink-800 text-sm sm:text-base"
                                >
                                    Lanjut Belanja
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-5xl sm:text-6xl mb-4">🛒</div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                            Keranjang Anda Kosong
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 mb-8">
                            Belum ada produk di keranjang Anda
                        </p>
                        <Link
                            href="/shop"
                            className="inline-block bg-pink-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors text-sm sm:text-base"
                        >
                            Mulai Belanja
                        </Link>
                    </div>
                )}
            </div>
        </ShopLayout>
    );
}
