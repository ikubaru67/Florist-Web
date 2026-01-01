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
            pending: 'Menunggu Pembayaran',
            processing: 'Diproses',
            completed: 'Selesai',
            cancelled: 'Dibatalkan'
        };
        return text[status] || status;
    };

    // Generate detailed WhatsApp message
    const generateWhatsAppMessage = () => {
        let message = `Halo Admin, saya ingin konfirmasi pembayaran untuk pesanan:\n\n`;
        message += `📋 *DETAIL PESANAN*\n`;
        message += `Order: ${order.order_number}\n`;
        message += `Tanggal: ${new Date(order.created_at).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}\n\n`;
        
        message += `👤 *INFORMASI PENERIMA*\n`;
        message += `Nama: ${order.shipping_name}\n`;
        message += `Telepon: ${order.shipping_phone}\n`;
        message += `Email: ${order.shipping_email}\n`;
        message += `Alamat: ${order.shipping_address}, ${order.shipping_city}, ${order.shipping_postal_code}\n\n`;
        
        message += `🛍️ *PRODUK*\n`;
        order.items.forEach((item, index) => {
            message += `${index + 1}. ${item.product_name}\n`;
            message += `   Harga: Rp ${Number(item.price).toLocaleString('id-ID')}\n`;
            message += `   Jumlah: ${item.quantity}\n`;
            
            // Add-ons
            if (item.addon_data && item.addon_data.length > 0) {
                message += `   Add-ons:\n`;
                item.addon_data.forEach((addon) => {
                    message += `   + ${addon.name} (${addon.quantity}x) - Rp ${Number(addon.price * addon.quantity).toLocaleString('id-ID')}\n`;
                    if (addon.custom_message) {
                        message += `     Pesan: "${addon.custom_message}"\n`;
                    }
                });
            }
            
            message += `   Subtotal: Rp ${Number(item.subtotal).toLocaleString('id-ID')}\n\n`;
        });
        
        if (order.notes) {
            message += `📝 *CATATAN*\n${order.notes}\n\n`;
        }
        
        message += `💰 *TOTAL PEMBAYARAN*\n`;
        message += `Rp ${Number(order.total_amount).toLocaleString('id-ID')}\n\n`;
        message += `Status: ${getStatusText(order.status)}\n\n`;
        message += `Mohon informasi metode pembayaran yang tersedia. Terima kasih! 🙏`;
        
        return encodeURIComponent(message);
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
                                <div className="mt-4">
                                    <p className="text-xs text-gray-500 mb-2">
                                        Metode pembayaran akan ditentukan setelah admin menerima pesanan
                                    </p>
                                    <a
                                        href={`https://wa.me/6281380973824?text=${generateWhatsAppMessage()}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                        </svg>
                                        Hubungi Admin via WhatsApp
                                    </a>
                                </div>
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
