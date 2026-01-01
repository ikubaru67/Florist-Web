import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, addons }) {
    const handleDelete = (addonId, addonName) => {
        if (confirm(`Apakah Anda yakin ingin menghapus add-on "${addonName}"?`)) {
            router.delete(route('admin.addons.destroy', addonId), {
                preserveScroll: true,
                onSuccess: () => {
                    alert('Add-on berhasil dihapus');
                }
            });
        }
    };

    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID').format(Number(amount));
    };

    return (
        <ShopLayout auth={auth}>
            <Head title="Kelola Add-ons" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Title */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard - Kelola Add-ons</h1>
                        <p className="mt-2 text-gray-600">Kelola add-ons global yang dapat ditambahkan ke produk (Kartu Ucapan, Coklat, Boneka, dll)</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mb-6">
                        <div className="flex gap-3 mb-4">
                            <Link
                                href={route('admin.orders.index')}
                                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
                            >
                                Kelola Pesanan
                            </Link>
                            <Link
                                href={route('admin.products.index')}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Kelola Produk
                            </Link>
                            <Link
                                href={route('admin.addons.create')}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                + Tambah Add-on
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {addons.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <p className="mb-4">Belum ada add-on. Tambahkan add-on pertama Anda!</p>
                                <Link
                                    href={route('admin.addons.create')}
                                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
                                >
                                    + Tambah Add-on
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                                Gambar
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                                Nama Add-on
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
                                                Custom Message
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {addons.map((addon) => (
                                            <tr key={addon.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {addon.images && addon.images.length > 0 ? (
                                                        <img
                                                            src={addon.images[0].image_path}
                                                            alt={addon.name}
                                                            className="h-16 w-16 object-cover rounded border border-gray-200"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.nextElementSibling.style.display = 'flex';
                                                            }}
                                                        />
                                                    ) : null}
                                                    <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center" style={{ display: addon.images && addon.images.length > 0 ? 'none' : 'flex' }}>
                                                        <span className="text-gray-400 text-xs">No Image</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {addon.name}
                                                    </div>
                                                    {addon.description && (
                                                        <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                                                            {addon.description}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        Rp {formatRupiah(addon.price)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {addon.stock}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {addon.is_available ? (
                                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                            Tersedia
                                                        </span>
                                                    ) : (
                                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                                            Tidak Tersedia
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {addon.has_custom_message ? (
                                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                            Ya
                                                        </span>
                                                    ) : (
                                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                                            Tidak
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={route('admin.addons.edit', addon.id)}
                                                            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(addon.id, addon.name)}
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
                        )}
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
