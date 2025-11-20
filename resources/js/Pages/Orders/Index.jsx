import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link } from '@inertiajs/react';

export default function OrdersIndex({ auth, orders }) {
    const getStatusBadge = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            processing: 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status) => {
        const text = {
            pending: 'Menunggu',
            processing: 'Diproses',
            completed: 'Selesai',
            cancelled: 'Dibatalkan'
        };
        return text[status] || status;
    };

    return (
        <ShopLayout auth={auth}>
            <Head title="Pesanan Saya - Florist" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Pesanan Saya</h1>

                {orders.data.length > 0 ? (
                    <>
                        <div className="space-y-4">
                            {orders.data.map((order) => (
                                <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {order.order_number}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {new Date(order.created_at).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(order.status)}`}>
                                            {getStatusText(order.status)}
                                        </span>
                                    </div>

                                    <div className="border-t pt-4">
                                        <div className="space-y-2 mb-4">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex justify-between text-sm">
                                                    <span className="text-gray-600">
                                                        {item.product_name} x {item.quantity}
                                                    </span>
                                                    <span className="font-semibold">
                                                        Rp {Number(item.subtotal).toLocaleString('id-ID')}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center border-t pt-4">
                                            <div>
                                                <p className="text-sm text-gray-600">Total Pembayaran</p>
                                                <p className="text-xl font-bold text-pink-600">
                                                    Rp {Number(order.total_amount).toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                            <Link
                                                href={`/orders/${order.id}`}
                                                className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                                            >
                                                Detail
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {orders.links && orders.links.length > 3 && (
                            <div className="mt-8 flex justify-center gap-2">
                                {orders.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 rounded-lg ${
                                            link.active
                                                ? 'bg-pink-600 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                        } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow-md">
                        <div className="text-6xl mb-4">📦</div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Belum Ada Pesanan
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Anda belum melakukan pemesanan
                        </p>
                        <Link
                            href="/shop"
                            className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700"
                        >
                            Mulai Belanja
                        </Link>
                    </div>
                )}
            </div>
        </ShopLayout>
    );
}
