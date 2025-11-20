import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link } from '@inertiajs/react';

export default function OrderInvoice({ auth, order, whatsappUrl }) {
    return (
        <ShopLayout auth={auth}>
            <Head title={`Invoice ${order.order_number} - Florist`} />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Success Message */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <div className="flex items-center">
                        <div className="text-green-600 text-4xl mr-4">✓</div>
                        <div>
                            <h2 className="text-xl font-bold text-green-900">Pesanan Berhasil Dibuat!</h2>
                            <p className="text-green-700">Terima kasih atas pesanan Anda</p>
                        </div>
                    </div>
                </div>

                {/* Invoice */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                    <div className="border-b pb-6 mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
                        <p className="text-gray-600">Order #{order.order_number}</p>
                        <p className="text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>

                    {/* Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Informasi Pelanggan</h3>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p>{order.shipping_name}</p>
                                <p>{order.shipping_email}</p>
                                <p>{order.shipping_phone}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Alamat Pengiriman</h3>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p>{order.shipping_address}</p>
                                <p>{order.shipping_city}, {order.shipping_postal_code}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Detail Pesanan</h3>
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Produk</th>
                                    <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Qty</th>
                                    <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">Harga</th>
                                    <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {order.items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-4 py-3 text-sm text-gray-900">{item.product_name}</td>
                                        <td className="px-4 py-3 text-sm text-center text-gray-900">{item.quantity}</td>
                                        <td className="px-4 py-3 text-sm text-right text-gray-900">
                                            Rp {Number(item.price).toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                                            Rp {Number(item.subtotal).toLocaleString('id-ID')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-gray-50">
                                <tr>
                                    <td colSpan="3" className="px-4 py-3 text-right font-bold text-gray-900">
                                        TOTAL
                                    </td>
                                    <td className="px-4 py-3 text-right font-bold text-pink-600 text-lg">
                                        Rp {Number(order.total_amount).toLocaleString('id-ID')}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Notes */}
                    {order.notes && (
                        <div className="border-t pt-4">
                            <h3 className="font-semibold text-gray-900 mb-2">Catatan</h3>
                            <p className="text-sm text-gray-600">{order.notes}</p>
                        </div>
                    )}
                </div>

                {/* WhatsApp Payment Instruction */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">📱 Langkah Selanjutnya</h2>
                    <ol className="space-y-3 text-gray-700 mb-6">
                        <li className="flex items-start">
                            <span className="font-bold text-pink-600 mr-2">1.</span>
                            <span>Klik tombol "Konfirmasi via WhatsApp" di bawah</span>
                        </li>
                        <li className="flex items-start">
                            <span className="font-bold text-pink-600 mr-2">2.</span>
                            <span>Konfirmasi pesanan Anda dengan admin kami</span>
                        </li>
                        <li className="flex items-start">
                            <span className="font-bold text-pink-600 mr-2">3.</span>
                            <span>Admin akan memproses pesanan dan memberikan metode pembayaran (DANA, GOPAY, OVO, ShopeePay, SeaBank, BANK, atau QRIS)</span>
                        </li>
                        <li className="flex items-start">
                            <span className="font-bold text-pink-600 mr-2">4.</span>
                            <span>Lakukan pembayaran sesuai instruksi dari admin</span>
                        </li>
                        <li className="flex items-start">
                            <span className="font-bold text-pink-600 mr-2">5.</span>
                            <span>Pesanan akan diproses setelah pembayaran dikonfirmasi</span>
                        </li>
                    </ol>

                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-green-600 text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
                    >
                        💬 Konfirmasi via WhatsApp
                    </a>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <Link
                        href="/orders"
                        className="flex-1 text-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                        Lihat Semua Pesanan
                    </Link>
                    <Link
                        href="/"
                        className="flex-1 text-center px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                    >
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </ShopLayout>
    );
}
