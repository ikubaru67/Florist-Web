import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Settings, Image as ImageIcon, Save, Sparkles, Plus, Edit2, Trash2, Tag, X, Calendar } from 'lucide-react';
import { useState } from 'react';
import Toast from '@/Components/Toast';

export default function SettingsIndex({ banner_image, categories, occasions }) {
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [showOccasionModal, setShowOccasionModal] = useState(false);
    const [editingOccasion, setEditingOccasion] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const { data, setData, post, processing, errors } = useForm({
        banner_image: banner_image || ''
    });

    const { data: categoryData, setData: setCategoryData, post: postCategory, put: putCategory, processing: categoryProcessing, errors: categoryErrors, reset: resetCategory } = useForm({
        name: '',
        name_en: '',
    });

    const { data: occasionData, setData: setOccasionData, post: postOccasion, put: putOccasion, processing: occasionProcessing, errors: occasionErrors, reset: resetOccasion } = useForm({
        name: '',
        name_en: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            preserveScroll: true,
            onSuccess: () => {
                setToast({ show: true, message: 'Settings updated successfully!', type: 'success' });
            },
            onError: () => {
                setToast({ show: true, message: 'Failed to update settings. Please try again.', type: 'error' });
            }
        });
    };

    const openCategoryModal = (category = null) => {
        if (category) {
            setEditingCategory(category);
            setCategoryData({
                name: category.name,
                name_en: category.name_en || '',
            });
        } else {
            setEditingCategory(null);
            resetCategory();
        }
        setShowCategoryModal(true);
    };

    const closeCategoryModal = () => {
        setShowCategoryModal(false);
        setEditingCategory(null);
        resetCategory();
    };

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        
        if (editingCategory) {
            putCategory(route('admin.settings.categories.update', editingCategory.id), {
                preserveScroll: true,
                onSuccess: () => {
                    closeCategoryModal();
                    setToast({ show: true, message: 'Category updated successfully!', type: 'success' });
                },
                onError: () => {
                    setToast({ show: true, message: 'Failed to update category. Please try again.', type: 'error' });
                }
            });
        } else {
            postCategory(route('admin.settings.categories.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    closeCategoryModal();
                    setToast({ show: true, message: 'Category created successfully!', type: 'success' });
                },
                onError: () => {
                    setToast({ show: true, message: 'Failed to create category. Please try again.', type: 'error' });
                }
            });
        }
    };

    const handleDeleteCategory = (categoryId) => {
        if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
            router.delete(route('admin.settings.categories.delete', categoryId), {
                preserveScroll: true,
                onSuccess: () => {
                    setToast({ show: true, message: 'Category deleted successfully!', type: 'success' });
                },
                onError: () => {
                    setToast({ show: true, message: 'Failed to delete category. Make sure no products are using it.', type: 'error' });
                }
            });
        }
    };

    const openOccasionModal = (occasion = null) => {
        if (occasion) {
            setEditingOccasion(occasion);
            setOccasionData({
                name: occasion.name,
                name_en: occasion.name_en || '',
            });
        } else {
            setEditingOccasion(null);
            resetOccasion();
        }
        setShowOccasionModal(true);
    };

    const closeOccasionModal = () => {
        setShowOccasionModal(false);
        setEditingOccasion(null);
        resetOccasion();
    };

    const handleOccasionSubmit = (e) => {
        e.preventDefault();
        
        if (editingOccasion) {
            putOccasion(route('admin.settings.occasions.update', editingOccasion.id), {
                preserveScroll: true,
                onSuccess: () => {
                    closeOccasionModal();
                    setToast({ show: true, message: 'Occasion updated successfully!', type: 'success' });
                },
                onError: () => {
                    setToast({ show: true, message: 'Failed to update occasion. Please try again.', type: 'error' });
                }
            });
        } else {
            postOccasion(route('admin.settings.occasions.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    closeOccasionModal();
                    setToast({ show: true, message: 'Occasion created successfully!', type: 'success' });
                },
                onError: () => {
                    setToast({ show: true, message: 'Failed to create occasion. Please try again.', type: 'error' });
                }
            });
        }
    };

    const handleDeleteOccasion = (occasionId) => {
        if (confirm('Are you sure you want to delete this occasion? This action cannot be undone.')) {
            router.delete(route('admin.settings.occasions.delete', occasionId), {
                preserveScroll: true,
                onSuccess: () => {
                    setToast({ show: true, message: 'Occasion deleted successfully!', type: 'success' });
                },
                onError: () => {
                    setToast({ show: true, message: 'Failed to delete occasion. Make sure no products are using it.', type: 'error' });
                }
            });
        }
    };

    return (
        <AdminLayout
            title="Settings"
            description="Configure your store settings and preferences"
        >
            <Head title="Settings" />

            <div className="space-y-6">
                {/* Banner Settings Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                            <ImageIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Banner Settings</h2>
                            <p className="text-sm text-gray-500">Configure homepage banner appearance</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Banner Image URL */}
                        <div>
                            <label htmlFor="banner_image" className="block text-sm font-medium text-gray-700 mb-2">
                                Banner Background Image URL
                            </label>
                            <input
                                id="banner_image"
                                type="url"
                                value={data.banner_image}
                                onChange={(e) => setData('banner_image', e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm hover:border-emerald-300"
                                placeholder="https://images.unsplash.com/photo-..."
                                required
                            />
                            {errors.banner_image && (
                                <p className="text-red-500 text-sm mt-2">{errors.banner_image}</p>
                            )}
                            <p className="text-sm text-gray-500 mt-2">
                                💡 Upload gambar ke <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline font-medium">Cloudinary</a> atau hosting gambar lainnya, lalu paste URL-nya di sini. Recommended size: 1920x600px
                            </p>
                        </div>

                        {/* Banner Preview */}
                        {data.banner_image && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Banner Preview
                                </label>
                                <div className="aspect-[16/5] w-full max-w-4xl rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 relative">
                                    <img
                                        key={data.banner_image}
                                        src={data.banner_image}
                                        alt="Banner Preview"
                                        className="w-full h-full object-cover"
                                        onLoad={(e) => {
                                            e.target.style.display = 'block';
                                            e.target.parentElement.querySelector('.error-placeholder')?.style.setProperty('display', 'none');
                                        }}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.querySelector('.error-placeholder')?.style.setProperty('display', 'flex');
                                        }}
                                    />
                                    <div className="error-placeholder absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-teal-900/50 to-green-900/60 flex items-center justify-center" style={{ display: 'none' }}>
                                        <div className="text-white text-center">
                                            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm opacity-90">Failed to load image</p>
                                        </div>
                                    </div>
                                    {/* Overlay to show how text will appear */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-teal-900/50 to-green-900/60 flex items-center justify-center pointer-events-none">
                                        <div className="text-white text-center px-4">
                                            <div className="flex items-center justify-center gap-2 mb-3">
                                                <Sparkles className="w-6 h-6" />
                                                <h1 className="text-3xl md:text-5xl font-bold">
                                                    Fresh Flowers Daily
                                                </h1>
                                                <Sparkles className="w-6 h-6" />
                                            </div>
                                            <p className="text-lg md:text-xl opacity-90">
                                                Handpicked flowers delivered to your door
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Preview shows how the banner will look with overlay and text on the homepage
                                </p>
                            </div>
                        )}

                        {/* Save Button */}
                        <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save className="w-5 h-5" />
                                <span>{processing ? 'Saving...' : 'Save Settings'}</span>
                            </button>
                            <p className="text-sm text-gray-500">
                                Changes will be visible immediately on the homepage
                            </p>
                        </div>
                    </form>
                </div>

                {/* Categories Management Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                                <Tag className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Product Categories</h2>
                                <p className="text-sm text-gray-500">Organize products by categories</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => openCategoryModal()}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all font-medium"
                        >
                            <Plus className="w-5 h-5" />
                            Add Category
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories && categories.length > 0 ? (
                            categories.map((category) => (
                                <div key={category.id} className="bg-white rounded-xl border-2 border-gray-200 p-4 hover:border-orange-300 transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900">{category.name}</h3>
                                            {category.name_en && (
                                                <p className="text-sm text-gray-500">{category.name_en}</p>
                                            )}
                                        </div>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => openCategoryModal(category)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCategory(category.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                disabled={category.products_count > 0}
                                                title={category.products_count > 0 ? 'Cannot delete category with products' : 'Delete category'}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                                            {category.products_count || 0} products
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-gray-400">
                                <Tag className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <p>No categories yet. Add your first category to get started.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Occasions Management Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Product Occasions</h2>
                                <p className="text-sm text-gray-500">Tag products for special events and celebrations</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => openOccasionModal()}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all font-medium"
                        >
                            <Plus className="w-5 h-5" />
                            Add Occasion
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {occasions && occasions.length > 0 ? (
                            occasions.map((occasion) => (
                                <div key={occasion.id} className="bg-white rounded-xl border-2 border-gray-200 p-4 hover:border-purple-300 transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900">{occasion.name}</h3>
                                            {occasion.name_en && (
                                                <p className="text-sm text-gray-500">{occasion.name_en}</p>
                                            )}
                                        </div>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => openOccasionModal(occasion)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteOccasion(occasion.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                disabled={occasion.products_count > 0}
                                                title={occasion.products_count > 0 ? 'Cannot delete occasion with products' : 'Delete occasion'}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                                            {occasion.products_count || 0} products
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-gray-400">
                                <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <p>No occasions yet. Add your first occasion to get started.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* System Information */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">System Information</h2>
                            <p className="text-sm text-gray-500">Current system status and details</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                            <div className="text-sm text-emerald-600 font-medium mb-1">Platform</div>
                            <div className="text-lg font-bold text-emerald-900">Kala Florist</div>
                        </div>
                        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                            <div className="text-sm text-blue-600 font-medium mb-1">Version</div>
                            <div className="text-lg font-bold text-blue-900">1.0.0</div>
                        </div>
                        <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                            <div className="text-sm text-purple-600 font-medium mb-1">Environment</div>
                            <div className="text-lg font-bold text-purple-900">Production</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Modal */}
            {showCategoryModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">
                                {editingCategory ? 'Edit Category' : 'Add New Category'}
                            </h3>
                            <button
                                onClick={closeCategoryModal}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCategorySubmit} className="p-6 space-y-6">
                            {/* Category Name - Bilingual */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category Name <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">Bahasa Indonesia</label>
                                        <input
                                            type="text"
                                            value={categoryData.name}
                                            onChange={(e) => setCategoryData('name', e.target.value)}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                            placeholder="Contoh: Bunga Pernikahan"
                                            required
                                        />
                                        {categoryErrors.name && <p className="text-red-500 text-sm mt-1">{categoryErrors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">English Version</label>
                                        <input
                                            type="text"
                                            value={categoryData.name_en}
                                            onChange={(e) => setCategoryData('name_en', e.target.value)}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                            placeholder="Example: Wedding Flowers"
                                            required
                                        />
                                        {categoryErrors.name_en && <p className="text-red-500 text-sm mt-1">{categoryErrors.name_en}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={closeCategoryModal}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={categoryProcessing}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-5 h-5" />
                                    <span>{categoryProcessing ? 'Saving...' : (editingCategory ? 'Update Category' : 'Add Category')}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Occasions Modal */}
            {showOccasionModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">
                                {editingOccasion ? 'Edit Occasion' : 'Add New Occasion'}
                            </h3>
                            <button
                                onClick={closeOccasionModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleOccasionSubmit} className="p-6">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">Indonesian Name *</label>
                                        <input
                                            type="text"
                                            value={occasionData.name}
                                            onChange={(e) => setOccasionData('name', e.target.value)}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                                            placeholder="Contoh: Ulang Tahun"
                                            required
                                        />
                                        {occasionErrors.name && <p className="text-red-500 text-sm mt-1">{occasionErrors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">English Version</label>
                                        <input
                                            type="text"
                                            value={occasionData.name_en}
                                            onChange={(e) => setOccasionData('name_en', e.target.value)}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                                            placeholder="Example: Birthday"
                                            required
                                        />
                                        {occasionErrors.name_en && <p className="text-red-500 text-sm mt-1">{occasionErrors.name_en}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 mt-6">
                                <button
                                    type="button"
                                    onClick={closeOccasionModal}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={occasionProcessing}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-5 h-5" />
                                    <span>{occasionProcessing ? 'Saving...' : (editingOccasion ? 'Update Occasion' : 'Add Occasion')}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
