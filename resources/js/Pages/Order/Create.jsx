import ShopLayout from '@/Layouts/ShopLayout';
import { Head, useForm } from '@inertiajs/react';

export default function OrderCreate({ auth, product, user }) {
    const { data, setData, post, processing, errors } = useForm({
        product_id: product.id,
        quantity: 1,
        shipping_name: user.name || '',
        shipping_email: user.email || '',
        shipping_phone: user.phone || '',
        shipping_address: user.address || '',
        shipping_city: user.city || '',
        shipping_postal_code: user.postal_code || '',
        notes: ''
    });

    const totalPrice = product.price * data.quantity;

    const submit = (e) => {
        e.preventDefault();
        post('/orders');
    };

    return (
        <ShopLayout auth={auth}>
            <Head title={`Order ${product.name} - Florist`} />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Form Pemesanan</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Product Info */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Produk yang Dipesan</h2>
                                <div className="flex gap-4">
                                    <img
                                        src={product.image || 'https://via.placeholder.com/100'}
                                        alt={product.name}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                                        <p className="text-sm text-gray-600">Rp {Number(product.price).toLocaleString('id-ID')}</p>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Jumlah
                                    </label>
                                    <div className="flex items-center border border-gray-300 rounded-lg w-32">
                                        <button
                                            type="button"
                                            onClick={() => setData('quantity', Math.max(1, data.quantity - 1))}
                                            className="px-3 py-2 hover:bg-gray-100"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={data.quantity}
                                            onChange={(e) => setData('quantity', Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                                            className="w-16 text-center border-0 focus:ring-0"
                                            min="1"
                                            max={product.stock}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setData('quantity', Math.min(product.stock, data.quantity + 1))}
                                            className="px-3 py-2 hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                    {errors.quantity && (
                                        <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
                                    )}
                                </div>
                            </div>

                            {/* Shipping Information */}
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
                                            Nomor Telepon/WhatsApp *
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.shipping_phone}
                                            onChange={e => setData('shipping_phone', e.target.value)}
                                            placeholder="08xxxxxxxxxx"
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

                            {/* Notes */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Catatan Tambahan</h2>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Catatan Pesanan
                                    </label>
                                    <textarea
                                        value={data.notes}
                                        onChange={e => setData('notes', e.target.value)}
                                        rows="3"
                                        placeholder="Catatan tambahan untuk pesanan Anda..."
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-pink-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Memproses...' : '✓ Checkout & Lihat Invoice'}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Ringkasan Pesanan</h2>
                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">{product.name}</span>
                                    <span className="font-semibold">
                                        x {data.quantity}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Harga Satuan</span>
                                    <span className="font-semibold">
                                        Rp {Number(product.price).toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span className="text-pink-600">
                                        Rp {Number(totalPrice).toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    💬 Setelah checkout, Anda akan mendapatkan invoice dan link WhatsApp untuk konfirmasi pembayaran
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
