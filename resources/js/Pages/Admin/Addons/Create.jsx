import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import ImageEditor from '@/Components/ImageEditor';

export default function Create({ auth }) {
    const [editingImageIndex, setEditingImageIndex] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
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
        // You can upload to Cloudinary here or save as base64
        // For now, we'll use data URL
        updateImageUrl(editingImageIndex, dataUrl);
        setEditingImageIndex(null);
    };

    return (
        <ShopLayout auth={auth}>
            <Head title="Tambah Add-on" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href={route('admin.addons.index')}
                            className="text-pink-600 hover:text-pink-700 flex items-center gap-2 mb-4"
                        >
                            ← Kembali ke Daftar Add-ons
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Tambah Add-on Baru</h1>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <form onSubmit={handleSubmit}>
                            {/* Name */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Add-on <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    placeholder="Contoh: Kartu Ucapan, Coklat Valentine, Boneka Teddy"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    placeholder="Deskripsi add-on..."
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            {/* Price and Stock */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Harga <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        placeholder="0"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Stok <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={data.stock}
                                        onChange={e => setData('stock', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        placeholder="0"
                                        min="0"
                                        required
                                    />
                                    {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                                </div>
                            </div>

                            {/* Is Available */}
                            <div className="mb-6">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_available}
                                        onChange={e => setData('is_available', e.target.checked)}
                                        className="w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        Tersedia untuk pelanggan
                                    </span>
                                </label>
                            </div>

                            {/* Has Custom Message */}
                            <div className="mb-6">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.has_custom_message}
                                        onChange={e => setData('has_custom_message', e.target.checked)}
                                        className="w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        Memerlukan pesan khusus (untuk kartu ucapan, dll)
                                    </span>
                                </label>
                            </div>

                            {/* Images */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Gambar Add-on (URL - Maksimal 5)
                                </label>
                                
                                {data.image_urls.map((url, index) => (
                                    <div key={index} className="mb-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                                        <div className="flex items-start gap-2">
                                            <div className="flex-1">
                                                <input
                                                    type="url"
                                                    value={url}
                                                    onChange={e => updateImageUrl(index, e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                    placeholder="https://res.cloudinary.com/..."
                                                />
                                            </div>
                                            
                                            {url && (
                                                <div className="flex flex-col gap-2">
                                                    <img
                                                        key={url.substring(0, 50)}
                                                        src={url}
                                                        alt={`Preview ${index + 1}`}
                                                        className="h-16 w-16 object-cover rounded border cursor-pointer"
                                                        onClick={() => setEditingImageIndex(index)}
                                                        title="Klik untuk edit gambar"
                                                        onError={(e) => {
                                                            if (!url.startsWith('data:')) {
                                                                e.target.style.display = 'none';
                                                            }
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditingImageIndex(index)}
                                                        className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                                                        disabled={!url.startsWith('http') && !url.startsWith('data:')}
                                                    >
                                                        ✂️ Edit
                                                    </button>
                                                </div>
                                            )}
                                            
                                            {data.image_urls.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeImageUrl(index)}
                                                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                                                >
                                                    🗑️
                                                </button>
                                            )}
                                        </div>
                                        {errors[`image_urls.${index}`] && (
                                            <p className="text-red-500 text-sm mt-1">{errors[`image_urls.${index}`]}</p>
                                        )}
                                    </div>
                                ))}
                                
                                {data.image_urls.length < 5 && (
                                    <button
                                        type="button"
                                        onClick={addImageUrl}
                                        className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-pink-400 hover:text-pink-600 transition"
                                    >
                                        ➕ Tambah URL Gambar
                                    </button>
                                )}
                                
                                <p className="text-xs text-gray-500 mt-2">
                                    💡 Upload gambar ke Cloudinary atau hosting gambar lainnya, lalu paste URL-nya di sini
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-4">
                                <Link
                                    href={route('admin.addons.index')}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Add-on'}
                                </button>
                            </div>
                        </form>
                    </div>
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
        </ShopLayout>
    );
}
