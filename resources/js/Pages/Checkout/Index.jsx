import ShopLayout from '@/Layouts/ShopLayout';
import { Head, router, useForm } from '@inertiajs/react';

export default function CheckoutIndex({ auth, cartItems, total, user }) {
    const { data, setData, post, processing, errors } = useForm({
        shipping_name: user.name || '',
        shipping_email: user.email || '',
        shipping_phone: '',
        shipping_address: '',
        shipping_city: '',
        shipping_postal_code: '',
        payment_method: 'cash',
        notes: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post('/orders');
    };

    return (
        <ShopLayout auth={auth}>
            <Head title="Checkout - Florist" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi Pengiriman</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nama Lengkap *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.shipping_name}
                                            onChange={e => setData('shipping_name', e.target.value)}
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                                            required
                                        />
                                        {errors.shipping_name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.shipping_name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={data.shipping_email}
                                            onChange={e => setData('shipping_email', e.target.value)}
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                                            required
                                        />
                                        {errors.shipping_email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.shipping_email}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nomor Telepon *
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.shipping_phone}
                                            onChange={e => setData('shipping_phone', e.target.value)}
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                                            required
                                        />
                                        {errors.shipping_phone && (
                                            <p className="mt-1 text-sm text-red-600">{errors.shipping_phone}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Alamat Lengkap *
                                        </label>
                                        <textarea
                                            value={data.shipping_address}
                                            onChange={e => setData('shipping_address', e.target.value)}
                                            rows="3"
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                                            required
                                        />
                                        {errors.shipping_address && (
                                            <p className="mt-1 text-sm text-red-600">{errors.shipping_address}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Kota *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.shipping_city}
                                            onChange={e => setData('shipping_city', e.target.value)}
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                                            required
                                        />
                                        {errors.shipping_city && (
                                            <p className="mt-1 text-sm text-red-600">{errors.shipping_city}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Kode Pos *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.shipping_postal_code}
                                            onChange={e => setData('shipping_postal_code', e.target.value)}
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                                            required
                                        />
                                        {errors.shipping_postal_code && (
                                            <p className="mt-1 text-sm text-red-600">{errors.shipping_postal_code}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Metode Pembayaran</h2>
                                <div className="space-y-2">
                                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            value="cash"
                                            checked={data.payment_method === 'cash'}
                                            onChange={e => setData('payment_method', e.target.value)}
                                            className="text-pink-600 focus:ring-pink-500"
                                        />
                                        <span className="ml-3">Cash on Delivery (COD)</span>
                                    </label>
                                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            value="transfer"
                                            checked={data.payment_method === 'transfer'}
                                            onChange={e => setData('payment_method', e.target.value)}
                                            className="text-pink-600 focus:ring-pink-500"
                                        />
                                        <span className="ml-3">Transfer Bank</span>
                                    </label>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Catatan (Opsional)</h2>
                                <textarea
                                    value={data.notes}
                                    onChange={e => setData('notes', e.target.value)}
                                    rows="3"
                                    placeholder="Catatan untuk pesanan Anda..."
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Memproses...' : 'Buat Pesanan'}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Ringkasan Pesanan</h2>
                            <div className="space-y-3 mb-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                            {item.product.name} x {item.quantity}
                                        </span>
                                        <span className="font-semibold">
                                            Rp {(item.quantity * item.price).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span className="text-pink-600">
                                        Rp {Number(total).toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
