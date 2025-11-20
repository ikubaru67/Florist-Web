import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, orders, filters }) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin', { search }, { 
            preserveState: true,
            preserveScroll: true 
        });
    };

    const clearSearch = () => {
        setSearch('');
        router.get('/admin', {}, { 
            preserveState: true,
            preserveScroll: true 
        });
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
            <Head title="Admin - Kelola Pesanan" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Title */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard - Kelola Pesanan</h1>
                    </div>

                    {/* Action Buttons & Search Bar */}
                    <div className="mb-6">
                        {/* Button */}
                        <div className="mb-4">
                            <Link
                                href="/admin/products"
                                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
                            >
                                Kelola Produk
                            </Link>
                        </div>

                        {/* Search Form */}
                        <form onSubmit={handleSearch} className="flex gap-3">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari berdasarkan Order ID, Nama Customer, atau Email..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 font-medium"
                            >
                                🔍 Cari
                            </button>
                            {filters?.search && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                                >
                                    ✕ Clear
                                </button>
                            )}
                        </form>
                        {filters?.search && (
                            <p className="mt-2 text-sm text-gray-600">
                                Hasil pencarian untuk: <span className="font-semibold">"{filters.search}"</span>
                            </p>
                        )}
                    </div>

                    {orders.data.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <p className="text-gray-500 text-lg">
                                {filters?.search ? 'Tidak ada pesanan yang cocok dengan pencarian' : 'Belum ada pesanan'}
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Table wrapper with horizontal scroll */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                                Order #
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                                Customer
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                                Total
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                                Tanggal
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {orders.data.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {order.order_number}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {order.shipping_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    Rp {Number(order.total_amount).toLocaleString('id-ID')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(order.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(order.created_at).toLocaleDateString('id-ID')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <Link
                                                        href={`/admin/orders/${order.id}`}
                                                        className="inline-block bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 font-medium transition-colors"
                                                    >
                                                        Detail
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {orders.links.length > 3 && (
                                <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{orders.from}</span> to{' '}
                                            <span className="font-medium">{orders.to}</span> of{' '}
                                            <span className="font-medium">{orders.total}</span> results
                                        </div>
                                        <div className="flex gap-2">
                                            {orders.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`px-3 py-1 rounded ${
                                                        link.active
                                                            ? 'bg-pink-600 text-white'
                                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </ShopLayout>
    );
}
