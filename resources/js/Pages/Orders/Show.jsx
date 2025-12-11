import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link } from '@inertiajs/react';

export default function OrderShow({ auth, order }) {
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
            <Head title={`Order ${order.order_number} - Florist`} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <Link href="/orders" className="text-pink-600 hover:text-pink-800">
                        ← Kembali ke Daftar Pesanan
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                {order.order_number}
                            </h1>
                            <p className="text-sm text-gray-600">
                                Tanggal: {new Date(order.created_at).toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusBadge(order.status)}`}>
                            {getStatusText(order.status)}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Informasi Pengiriman</h3>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p>{order.shipping_name}</p>
                                <p>{order.shipping_email}</p>
                                <p>{order.shipping_phone}</p>
                                <p>{order.shipping_address}</p>
                                <p>{order.shipping_city}, {order.shipping_postal_code}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Metode Pembayaran</h3>
                            <p className="text-sm text-gray-600">
                                {order.payment_method === 'whatsapp' ? 'Belum ditentukan' : order.payment_method}
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                                Status: <span className={order.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'}>
                                    {order.payment_status === 'paid' ? 'Lunas' : 'Belum Lunas'}
                                </span>
                            </p>
                            {order.status === 'pending' && (
                                <p className="text-xs text-gray-500 mt-2">
                                    Metode pembayaran akan ditentukan setelah admin menerima pesanan
                                </p>
                            )}
                        </div>
                    </div>

                    {order.notes && (
                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-900 mb-2">Catatan</h3>
                            <p className="text-sm text-gray-600">{order.notes}</p>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Detail Produk</h2>
                    <div className="space-y-4">
                        {order.items.map((item) => (
                            <div key={item.id} className="pb-4 border-b last:border-b-0">
                                <div className="flex gap-4">
                                    <img
                                        src={item.product?.image || 'https://via.placeholder.com/100'}
                                        alt={item.product_name}
                                        className="w-20 h-20 object-cover rounded flex-shrink-0"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{item.product_name}</h3>
                                        <p className="text-sm text-gray-600">
                                            Rp {Number(item.price).toLocaleString('id-ID')} x {item.quantity}
                                        </p>
                                        
                                        {/* Add-ons Display */}
                                        {item.addon_data && item.addon_data.length > 0 && (
                                            <div className="mt-2 ml-4 space-y-1 border-l-2 border-pink-300 pl-3">
                                                {item.addon_data.map((addon, addonIdx) => (
                                                    <div key={addonIdx} className="text-sm">
                                                        <p className="text-gray-700">
                                                            <span className="text-pink-600">+</span> {addon.name} 
                                                            <span className="text-gray-500"> ({addon.quantity}x)</span>
                                                        </p>
                                                        <p className="text-pink-600 text-xs">
                                                            Rp {Number(addon.price * addon.quantity).toLocaleString('id-ID')}
                                                        </p>
                                                        {addon.custom_message && (
                                                            <p className="italic text-gray-500 text-xs mt-1">
                                                                "{addon.custom_message}"
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">
                                            Rp {Number(item.subtotal).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t mt-4 pt-4">
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total Pembayaran</span>
                            <span className="text-pink-600">
                                Rp {Number(order.total_amount).toLocaleString('id-ID')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
