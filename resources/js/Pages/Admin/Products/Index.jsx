import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, products, filters }) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.products.index'), { search }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleClearSearch = () => {
        setSearch('');
        router.get(route('admin.products.index'), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (productId, productName) => {
        if (confirm(`Apakah Anda yakin ingin menghapus produk "${productName}"?`)) {
            router.delete(route('admin.products.destroy', productId), {
                preserveScroll: true,
                onSuccess: () => {
                    alert('Produk berhasil dihapus');
                }
            });
        }
    };

    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID').format(Number(amount));
    };

    return (
        <ShopLayout auth={auth}>
            <Head title="Kelola Produk" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Title */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard - Kelola Produk</h1>
                    </div>

                    {/* Action Buttons & Search Bar */}
                    <div className="mb-6">
                        {/* Buttons */}
                        <div className="flex gap-3 mb-4">
                            <Link
                                href={route('admin.orders.index')}
                                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
                            >
                                Kelola Pesanan
                            </Link>
                            <Link
                                href={route('admin.addons.index')}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Kelola Add-ons
                            </Link>
                            <Link
                                href={route('admin.products.create')}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                + Tambah Produk
                            </Link>
                        </div>

                        {/* Search Form */}
                        <form onSubmit={handleSearch} className="flex gap-3">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari produk berdasarkan nama, deskripsi, atau kategori..."
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
                                    onClick={handleClearSearch}
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

                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {/* Table wrapper with horizontal scroll */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                            Gambar
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                            Nama Produk
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                            Kategori
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                            Harga
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                            Stok
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.data.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {product.image ? (
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="h-12 w-12 object-cover rounded"
                                                    />
                                                ) : (
                                                    <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                                                        <span className="text-gray-400 text-xs">No Image</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {product.name}
                                                </div>
                                                {product.is_featured && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                                                        Featured
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {product.category?.name || '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    Rp {formatRupiah(product.price)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {product.stock}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {product.is_active ? (
                                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                        Aktif
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                                        Nonaktif
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={route('admin.products.edit', product.id)}
                                                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product.id, product.name)}
                                                        className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium transition-colors"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {products.links.length > 3 && (
                            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{products.from}</span> to{' '}
                                        <span className="font-medium">{products.to}</span> of{' '}
                                        <span className="font-medium">{products.total}</span> results
                                    </div>
                                    <div className="flex gap-2">
                                        {products.links.map((link, index) => (
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
                </div>
            </div>
        </ShopLayout>
    );
}
