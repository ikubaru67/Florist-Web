import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, X, Plus } from 'lucide-react';

export default function Edit({ product, categories, availableAddons, occasions }) {
    const { data, setData, patch, processing, errors } = useForm({
        category_id: product.category_id || '',
        name: product.name || '',
        name_en: product.name_en || '',
        description: product.description || '',
        description_en: product.description_en || '',
        price: product.price || '',
        stock: product.stock || '',
        image: product.image || '',
        additional_images: product.product_images?.map(img => img.image_path) || [''],
        selected_addons: product.addons?.map(addon => addon.id) || [],
        selected_occasions: product.occasions?.map(occasion => occasion.id) || [],
        is_featured: product.is_featured || false,
        is_active: product.is_active !== undefined ? product.is_active : true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('admin.products.update', product.id));
    };

    const addAdditionalImage = () => {
        if (data.additional_images.length < 5) {
            setData('additional_images', [...data.additional_images, '']);
        }
    };

    const removeAdditionalImage = (index) => {
        setData('additional_images', data.additional_images.filter((_, i) => i !== index));
    };

    const updateAdditionalImage = (index, value) => {
        const newImages = [...data.additional_images];
        newImages[index] = value;
        setData('additional_images', newImages);
    };

    const toggleAddon = (addonId) => {
        if (data.selected_addons.includes(addonId)) {
            setData('selected_addons', data.selected_addons.filter(id => id !== addonId));
        } else {
            setData('selected_addons', [...data.selected_addons, addonId]);
        }
    };

    const toggleOccasion = (occasionId) => {
        if (data.selected_occasions.includes(occasionId)) {
            setData('selected_occasions', data.selected_occasions.filter(id => id !== occasionId));
        } else {
            setData('selected_occasions', [...data.selected_occasions, occasionId]);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
<Head title="Edit Product" />

            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('admin.products.index')}
                            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                        <div className="min-w-0">
                            <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                            <p className="text-sm text-gray-600 mt-0.5">
                                Update product information
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto pb-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
                                <p className="text-sm text-gray-500 mt-1">Update the main details about your product</p>
                            </div>

                            <div className="space-y-6">
                                {/* Product Name - Bilingual */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2.5">
                                        Product Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Bahasa Indonesia</label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                                placeholder="Contoh: Bunga Mawar Merah"
                                                required
                                            />
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">English Version</label>
                                            <input
                                                type="text"
                                                value={data.name_en}
                                                onChange={e => setData('name_en', e.target.value)}
                                                className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                                placeholder="Example: Red Rose Flower"
                                                required
                                            />
                                            {errors.name_en && <p className="text-red-500 text-sm mt-1">{errors.name_en}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Description - Bilingual */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2.5">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Bahasa Indonesia</label>
                                            <textarea
                                                value={data.description}
                                                onChange={e => setData('description', e.target.value)}
                                                rows="4"
                                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                                                placeholder="Deskripsi produk..."
                                                required
                                            />
                                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">English Version</label>
                                            <textarea
                                                value={data.description_en}
                                                onChange={e => setData('description_en', e.target.value)}
                                                rows="4"
                                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                                                placeholder="Product description..."
                                                required
                                            />
                                            {errors.description_en && <p className="text-red-500 text-sm mt-1">{errors.description_en}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Price, Category, Stock */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2.5">
                                            Price <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="price"
                                            type="number"
                                            value={data.price}
                                            onChange={e => setData('price', e.target.value)}
                                            className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                            placeholder="450000"
                                            required
                                        />
                                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2.5">
                                            Category <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="category"
                                            value={data.category_id}
                                            onChange={e => setData('category_id', e.target.value)}
                                            className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                            required
                                        >
                                            <option value="">Select category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2.5">
                                            Stock <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="stock"
                                            type="number"
                                            value={data.stock}
                                            onChange={e => setData('stock', e.target.value)}
                                            className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                            placeholder="10"
                                            required
                                        />
                                        {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Images */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Product Images</h2>
                                <p className="text-sm text-gray-500 mt-1">Update product images (URLs)</p>
                            </div>

                            <div className="space-y-4">
                                {/* Main Image */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Main Image <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.image}
                                        onChange={e => setData('image', e.target.value)}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                        placeholder="https://example.com/image.jpg"
                                        required
                                    />
                                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                                    {data.image && (
                                        <div className="mt-3">
                                            <img
                                                src={data.image}
                                                alt="Main preview"
                                                className="h-32 w-32 object-cover rounded-lg border-2 border-gray-200"
                                                onError={(e) => e.target.style.display = 'none'}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Additional Images */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Additional Images (Optional)
                                        </label>
                                        <button
                                            type="button"
                                            onClick={addAdditionalImage}
                                            disabled={data.additional_images.length >= 5}
                                            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 disabled:opacity-50"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add Image
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {data.additional_images.map((url, index) => (
                                            <div key={index} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={url}
                                                    onChange={e => updateAdditionalImage(index, e.target.value)}
                                                    className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                                    placeholder={`Image ${index + 1} URL`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeAdditionalImage(index)}
                                                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Options */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Product Options</h2>
                                <p className="text-sm text-gray-500 mt-1">Configure additional settings</p>
                            </div>

                            <div className="space-y-6">
                                {/* Available Add-ons */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Available Add-ons
                                    </label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {availableAddons && availableAddons.map((addon) => (
                                            <label
                                                key={addon.id}
                                                className="flex items-start gap-3 px-4 py-3 bg-white border-2 border-gray-300 rounded-xl hover:border-emerald-300 transition-all cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={data.selected_addons.includes(addon.id)}
                                                    onChange={() => toggleAddon(addon.id)}
                                                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 mt-1"
                                                />
                                                
                                                {/* Add-on Image */}
                                                {addon.images && addon.images.length > 0 ? (
                                                    <img
                                                        src={addon.images[0].url}
                                                        alt={addon.name}
                                                        className="h-16 w-16 object-cover rounded border-2 border-gray-200"
                                                        onError={(e) => e.target.style.display = 'none'}
                                                    />
                                                ) : (
                                                    <div className="h-16 w-16 flex items-center justify-center bg-gray-100 rounded border-2 border-gray-200">
                                                        <span className="text-2xl">🎁</span>
                                                    </div>
                                                )}
                                                
                                                {/* Add-on Details */}
                                                <div className="flex-1">
                                                    <div className="font-semibold text-gray-900">{addon.name}</div>
                                                    <div className="flex items-center gap-3 mt-1 text-sm">
                                                        <span className="text-pink-600 font-medium">
                                                            Rp {new Intl.NumberFormat('id-ID').format(addon.price)}
                                                        </span>
                                                        <span className="text-gray-600">
                                                            Stock: {addon.stock}
                                                        </span>
                                                        {addon.has_custom_message && (
                                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                                💬 Custom Message
                                                            </span>
                                                        )}
                                                    </div>
                                                    {addon.description && (
                                                        <p className="text-sm text-gray-500 mt-1">{addon.description}</p>
                                                    )}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Occasions */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                        🎉 Occasions (Optional)
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {occasions && occasions.map((occasion) => (
                                            <label
                                                key={occasion.id}
                                                className={`
                                                    flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all
                                                    ${data.selected_occasions.includes(occasion.id)
                                                        ? 'bg-purple-50 border-2 border-purple-500'
                                                        : 'bg-white border-2 border-gray-300 hover:border-purple-300'
                                                    }
                                                `}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={data.selected_occasions.includes(occasion.id)}
                                                    onChange={() => toggleOccasion(occasion.id)}
                                                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                                                />
                                                <div className="flex-1">
                                                    <div className="font-semibold text-gray-900">{occasion.name}</div>
                                                    {occasion.name_en && (
                                                        <div className="text-sm text-gray-600">{occasion.name_en}</div>
                                                    )}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Status Toggles */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-300 rounded-xl hover:border-emerald-300 transition-all cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.is_featured}
                                            onChange={e => setData('is_featured', e.target.checked)}
                                            className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                                        />
                                        <span className="text-gray-900 font-medium">Featured Product</span>
                                    </label>

                                    <label className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-300 rounded-xl hover:border-emerald-300 transition-all cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.is_active}
                                            onChange={e => setData('is_active', e.target.checked)}
                                            className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                                        />
                                        <span className="text-gray-900 font-medium">
                                            {data.is_active ? 'Visible to customers' : 'Hidden from customers'}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between gap-4">
                                <Link
                                    href={route('admin.products.index')}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-5 h-5" />
                                    <span>{processing ? 'Updating...' : 'Update Product'}</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
