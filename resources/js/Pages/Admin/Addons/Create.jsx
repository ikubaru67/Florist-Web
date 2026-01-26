import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowLeft, Save, Plus, X, Edit2 } from 'lucide-react';
import ImageEditor from '@/Components/ImageEditor';

export default function Create() {
    const [editingImageIndex, setEditingImageIndex] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        name_en: '',
        description: '',
        description_en: '',
        price: '',
        stock: '',
        is_available: true,
        has_custom_message: false,
        image_urls: [''],
    });

    const addImageUrl = () => {
        if (data.image_urls.length < 5) {
            setData('image_urls', [...data.image_urls, '']);
        }
    };

    const removeImageUrl = (index) => {
        setData('image_urls', data.image_urls.filter((_, i) => i !== index));
    };

    const updateImageUrl = (index, value) => {
        const newUrls = [...data.image_urls];
        newUrls[index] = value;
        setData('image_urls', newUrls);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.addons.store'));
    };

    const handleImageSave = async (dataUrl, blob) => {
        updateImageUrl(editingImageIndex, dataUrl);
        setEditingImageIndex(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
<Head title="Add New Add-on" />

            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('admin.addons.index')}
                            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                        <div className="min-w-0">
                            <h1 className="text-2xl font-bold text-gray-900">Add New Add-on</h1>
                            <p className="text-sm text-gray-600 mt-0.5">
                                Create a new add-on for your products
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
                                <p className="text-sm text-gray-500 mt-1">Enter the main details about your add-on</p>
                            </div>

                            <div className="space-y-6">
                                {/* Add-on Name - Bilingual */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2.5">
                                        Add-on Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Bahasa Indonesia</label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                                                placeholder="Contoh: Kartu Ucapan Premium"
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
                                                className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                                                placeholder="Example: Premium Greeting Card"
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
                                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all resize-none"
                                                placeholder="Deskripsi add-on..."
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
                                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all resize-none"
                                                placeholder="Add-on description..."
                                                required
                                            />
                                            {errors.description_en && <p className="text-red-500 text-sm mt-1">{errors.description_en}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Price and Stock */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2.5">
                                            Price <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="price"
                                            type="number"
                                            value={data.price}
                                            onChange={e => setData('price', e.target.value)}
                                            className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                                            placeholder="25000"
                                            required
                                        />
                                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
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
                                            className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                                            placeholder="100"
                                            required
                                        />
                                        {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Add-on Images */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Add-on Images</h2>
                                <p className="text-sm text-gray-500 mt-1">Add up to 5 images (URLs)</p>
                            </div>

                            <div className="space-y-3">
                                {data.image_urls.map((url, index) => (
                                    <div key={index} className="flex gap-2 items-center">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                value={url}
                                                onChange={e => updateImageUrl(index, e.target.value)}
                                                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                                                placeholder={`Image ${index + 1} URL`}
                                            />
                                        </div>

                                        {url && (
                                            <>
                                                <img
                                                    src={url}
                                                    alt={`Preview ${index + 1}`}
                                                    className="h-12 w-12 object-cover rounded border cursor-pointer"
                                                    onClick={() => setEditingImageIndex(index)}
                                                    title="Click to edit image"
                                                    onError={(e) => e.target.style.display = 'none'}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingImageIndex(index)}
                                                    className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                                                    disabled={!url.startsWith('http') && !url.startsWith('data:')}
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                            </>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => removeImageUrl(index)}
                                            className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}

                                {data.image_urls.length < 5 && (
                                    <button
                                        type="button"
                                        onClick={addImageUrl}
                                        className="w-full px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-pink-400 hover:text-pink-600 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Image URL
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Add-on Options */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Add-on Options</h2>
                                <p className="text-sm text-gray-500 mt-1">Configure additional settings</p>
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-300 rounded-xl hover:border-pink-300 transition-all cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_available}
                                        onChange={e => setData('is_available', e.target.checked)}
                                        className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
                                    />
                                    <span className="text-gray-900 font-medium">
                                        {data.is_available ? 'Available to customers' : 'Not available to customers'}
                                    </span>
                                </label>

                                <label className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-300 rounded-xl hover:border-pink-300 transition-all cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.has_custom_message}
                                        onChange={e => setData('has_custom_message', e.target.checked)}
                                        className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
                                    />
                                    <div>
                                        <span className="text-gray-900 font-medium block">Requires custom message</span>
                                        <span className="text-xs text-gray-500">For greeting cards, gift messages, etc.</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between gap-4">
                                <Link
                                    href={route('admin.addons.index')}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl hover:shadow-lg hover:shadow-pink-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-5 h-5" />
                                    <span>{processing ? 'Creating...' : 'Create Add-on'}</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* Image Editor Modal */}
            {editingImageIndex !== null && data.image_urls[editingImageIndex] && (
                <ImageEditor
                    imageUrl={data.image_urls[editingImageIndex]}
                    onSave={handleImageSave}
                    onClose={() => setEditingImageIndex(null)}
                />
            )}
        </div>
    );
}
