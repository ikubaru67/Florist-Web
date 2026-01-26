import AdminLayout from '@/Layouts/AdminLayout';
import Toast from '@/Components/Toast';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Pencil, Trash2, Package, Search, X } from 'lucide-react';

export default function Index({ products, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

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
        if (confirm(`Are you sure you want to delete "${productName}"?`)) {
            router.delete(route('admin.products.destroy', productId), {
                preserveScroll: true,
                onSuccess: () => {
                    setToast({ show: true, message: 'Product deleted successfully!', type: 'success' });
                },
                onError: () => {
                    setToast({ show: true, message: 'Failed to delete product. Please try again.', type: 'error' });
                }
            });
        }
    };

    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(Number(amount));
    };

    const getStockStatus = (stock) => {
        if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-700 border-red-200' };
        if (stock <= 5) return { label: `Low Stock (${stock})`, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
        return { label: `In Stock (${stock})`, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
    };

    return (
        <AdminLayout
            title="Product Management"
            description="Add, edit, and manage your flower products"
        >
            <Head title="Products Management" />

            <div className="space-y-6">
                {/* Header with Add Button */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Products</h2>
                                <p className="text-sm text-gray-500">Manage your flower catalog</p>
                            </div>
                        </div>
                        <Link
                            href={route('admin.products.create')}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add Product</span>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="mt-6">
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search products by name, description, or category..."
                                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm hover:border-emerald-300"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all font-medium"
                            >
                                Search
                            </button>
                            {filters?.search && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                        {filters?.search && (
                            <p className="mt-3 text-sm text-gray-600">
                                Search results for: <span className="font-semibold text-emerald-600">"{filters.search}"</span>
                            </p>
                        )}
                    </form>
                </div>

                {/* Products List */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
                    {products.data.length > 0 ? (
                        <div className="space-y-2">
                            {products.data.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group"
                                >
                                    {/* Product Image */}
                                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100">
                                                <Package className="w-8 h-8 text-emerald-600" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 truncate mb-1">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-medium text-gray-900">
                                                {formatRupiah(product.price)}
                                            </span>
                                            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-medium">
                                                {product.category?.name}
                                            </span>
                                            <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStockStatus(product.stock).color}`}>
                                                {getStockStatus(product.stock).label}
                                            </span>
                                            {product.is_featured && (
                                                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs border border-yellow-300 font-medium">
                                                    ⭐ Featured
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <Link
                                            href={route('admin.products.edit', product.id)}
                                            className="px-3 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-colors"
                                            title="Edit product"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id, product.name)}
                                            className="px-3 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors"
                                            title="Delete product"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Package className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-500 mb-6">
                                {filters?.search 
                                    ? 'Try adjusting your search terms'
                                    : 'Start by adding your first product!'
                                }
                            </p>
                            {!filters?.search && (
                                <Link
                                    href={route('admin.products.create')}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
                                >
                                    <Plus className="w-5 h-5" />
                                    <span>Add Your First Product</span>
                                </Link>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {products.links && products.links.length > 3 && (
                        <div className="mt-6 flex justify-center">
                            <nav className="flex items-center gap-2">
                                {products.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        disabled={!link.url}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            link.active
                                                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                                                : link.url
                                                ? 'bg-white border border-gray-200 text-gray-700 hover:border-emerald-300 hover:bg-emerald-50'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </div>

            {/* Toast Notification */}
            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, show: false })}
            />
        </AdminLayout>
    );
}
