import AdminLayout from '@/Layouts/AdminLayout';
import Toast from '@/Components/Toast';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Pencil, Trash2, Gift, MessageSquare } from 'lucide-react';

export default function Index({ addons }) {
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const handleDelete = (addonId, addonName) => {
        if (confirm(`Are you sure you want to delete add-on "${addonName}"?`)) {
            router.delete(route('admin.addons.destroy', addonId), {
                preserveScroll: true,
                onSuccess: () => {
                    setToast({ show: true, message: 'Add-on deleted successfully!', type: 'success' });
                },
                onError: () => {
                    setToast({ show: true, message: 'Failed to delete add-on. Please try again.', type: 'error' });
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
        if (stock <= 10) return { label: `Low Stock (${stock})`, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
        return { label: `In Stock (${stock})`, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
    };

    return (
        <AdminLayout
            title="Add-ons Management"
            description="Manage add-ons for your products (Cards, Chocolates, Teddy Bears, etc.)"
        >
            <Head title="Add-ons Management" />

            <div className="space-y-6">
                {/* Header with Add Button */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30">
                                <Gift className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Add-ons</h2>
                                <p className="text-sm text-gray-500">Manage global add-ons for products</p>
                            </div>
                        </div>
                        <Link
                            href={route('admin.addons.create')}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl hover:shadow-lg hover:shadow-pink-500/30 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add New Add-on</span>
                        </Link>
                    </div>
                </div>

                {/* Add-ons List */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
                    {addons.length > 0 ? (
                        <div className="space-y-2">
                            {addons.map((addon) => (
                                <div
                                    key={addon.id}
                                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-pink-300 hover:bg-pink-50/50 transition-all group"
                                >
                                    {/* Add-on Image */}
                                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                        {addon.images && addon.images.length > 0 ? (
                                            <img
                                                src={addon.images[0].image_path}
                                                alt={addon.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-100">
                                                <Gift className="w-8 h-8 text-pink-600" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Add-on Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 truncate mb-1">
                                            {addon.name}
                                        </h3>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-medium text-gray-900">
                                                {formatRupiah(addon.price)}
                                            </span>
                                            <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStockStatus(addon.stock).color}`}>
                                                {getStockStatus(addon.stock).label}
                                            </span>
                                            {addon.has_custom_message && (
                                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs border border-blue-300 font-medium flex items-center gap-1">
                                                    <MessageSquare className="w-3 h-3" />
                                                    Custom Message
                                                </span>
                                            )}
                                        </div>
                                        {addon.description && (
                                            <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                                {addon.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <Link
                                            href={route('admin.addons.edit', addon.id)}
                                            className="px-3 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-colors"
                                            title="Edit add-on"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(addon.id, addon.name)}
                                            className="px-3 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors"
                                            title="Delete add-on"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Gift className="w-8 h-8 text-pink-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No add-ons found</h3>
                            <p className="text-gray-500 mb-6">
                                Start by adding your first add-on!
                            </p>
                            <Link
                                href={route('admin.addons.create')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl hover:shadow-lg hover:shadow-pink-500/30 transition-all"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Add Your First Add-on</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Info Card */}
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-200 p-6">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Gift className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">About Add-ons</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Add-ons are optional extras that customers can include with their flower orders. Common add-ons include:
                            </p>
                            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                                <li>Premium Greeting Cards - Personalized messages</li>
                                <li>Decorative Ribbons - Various colors and styles</li>
                                <li>Premium Chocolate Boxes - Sweet companions</li>
                                <li>Teddy Bears - Cute stuffed animals</li>
                                <li>Ceramic Vases - Elegant flower containers</li>
                            </ul>
                            <p className="text-sm text-gray-600 mt-3">
                                <strong>Custom Message:</strong> Enable this option if customers can write personalized messages on this add-on (e.g., greeting cards).
                            </p>
                        </div>
                    </div>
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
