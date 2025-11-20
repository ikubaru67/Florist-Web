import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ auth, order }) {
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('DANA');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAccept = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        router.patch(route('admin.orders.accept', order.id), {
            payment_method: selectedPaymentMethod
        }, {
            onSuccess: () => {
                setShowAcceptModal(false);
                setIsSubmitting(false);
            },
            onError: () => {
                setIsSubmitting(false);
            }
        });
    };

    const handleReject = () => {
        if (confirm('Tolak pesanan ini? Stock akan dikembalikan.')) {
            router.patch(route('admin.orders.reject', order.id));
        }
    };

    const handleComplete = () => {
        if (confirm('Tandai pesanan sebagai selesai?')) {
            router.patch(route('admin.orders.complete', order.id));
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800',
            processing: 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        
        const labels = {
            pending: 'Pending',
            processing: 'Diproses',
            completed: 'Selesai',
            cancelled: 'Dibatalkan',
        };
        
        return (
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${badges[status]}`}>
                {labels[status]}
            </span>
        );
    };

    return (
        <ShopLayout auth={auth}>
            <Head title={`Admin - Order ${order.order_number}`} />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link href="/admin" className="text-pink-600 hover:text-pink-700">
                            ← Kembali ke Dashboard
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Order #{order.order_number}</h1>
                                <p className="text-gray-600 mt-1">
                                    Tanggal: {new Date(order.created_at).toLocaleString('id-ID')}
                                </p>
                            </div>
                            <div>
                                {getStatusBadge(order.status)}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {order.status === 'pending' && (
                            <div className="flex gap-3 mb-6 pb-6 border-b">
                                <button
                                    onClick={() => setShowAcceptModal(true)}
                                    disabled={isSubmitting}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                                >
                                    Terima Pesanan
                                </button>
                                <button
                                    onClick={handleReject}
                                    disabled={isSubmitting}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
                                >
                                    Tolak Pesanan
                                </button>
                            </div>
                        )}

                        {/* Accept Order Modal */}
                        {showAcceptModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Pilih Metode Pembayaran</h3>
                                    <form onSubmit={handleAccept}>
                                        <div className="space-y-3 mb-6">
                                            {['DANA', 'GOPAY', 'OVO', 'ShopeePay', 'SeaBank', 'BANK', 'QRIS'].map((method) => (
                                                <label
                                                    key={method}
                                                    className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50"
                                                    style={{
                                                        borderColor: selectedPaymentMethod === method ? '#ec4899' : '#e5e7eb'
                                                    }}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="payment_method"
                                                        value={method}
                                                        checked={selectedPaymentMethod === method}
                                                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                                        className="w-4 h-4 text-pink-600 focus:ring-pink-500"
                                                    />
                                                    <span className="ml-3 text-gray-900 font-medium">{method}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setShowAcceptModal(false)}
                                                disabled={isSubmitting}
                                                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                                            >
                                                Batal
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                                            >
                                                {isSubmitting ? 'Memproses...' : 'Konfirmasi'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {order.status === 'processing' && (
                            <div className="flex gap-3 mb-6 pb-6 border-b">
                                <button
                                    onClick={handleComplete}
                                    disabled={isSubmitting}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    Tandai Selesai
                                </button>
                            </div>
                        )}

                        {/* Customer Info */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Informasi Customer</h3>
                                <div className="space-y-2 text-sm">
                                    <p><span className="font-medium">Nama:</span> {order.shipping_name}</p>
                                    <p><span className="font-medium">Email:</span> {order.shipping_email}</p>
                                    <p><span className="font-medium">Telepon:</span> {order.shipping_phone}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Alamat Pengiriman</h3>
                                <div className="space-y-2 text-sm">
                                    <p>{order.shipping_address}</p>
                                    <p>{order.shipping_city}, {order.shipping_postal_code}</p>
                                </div>
                            </div>
                        </div>

                        {order.notes && (
                            <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">Catatan Customer:</h3>
                                <p className="text-sm text-gray-700">{order.notes}</p>
                            </div>
                        )}

                        {/* Order Items */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Item Pesanan</h3>
                            <div className="border rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produk</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {order.items.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-4 py-3 text-sm text-gray-900">{item.product_name}</td>
                                                <td className="px-4 py-3 text-sm text-gray-900">
                                                    Rp {Number(item.price).toLocaleString('id-ID')}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                    Rp {Number(item.subtotal).toLocaleString('id-ID')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-gray-50">
                                        <tr>
                                            <td colSpan="3" className="px-4 py-3 text-sm font-semibold text-right text-gray-900">
                                                Total:
                                            </td>
                                            <td className="px-4 py-3 text-sm font-bold text-gray-900">
                                                Rp {Number(order.total_amount).toLocaleString('id-ID')}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
