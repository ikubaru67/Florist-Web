import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ auth, categories, availableAddons }) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        image: '',
        additional_images: [''], // Array untuk gambar tambahan
        selected_addons: [], // Array ID addon yang dipilih
        is_featured: false,
        is_active: true,
    });

    const [showDropdown, setShowDropdown] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    // Add addon from dropdown
    const addAddon = (addonId) => {
        if (!data.selected_addons.includes(addonId)) {
            setData('selected_addons', [...data.selected_addons, addonId]);
        }
        setShowDropdown(false);
    };

    // Remove addon
    const removeAddon = (addonId) => {
        setData('selected_addons', data.selected_addons.filter(id => id !== addonId));
    };

    // Get selected addon objects
    const selectedAddonObjects = availableAddons?.filter(addon => 
        data.selected_addons.includes(addon.id)
    ) || [];

    // Get available (not selected) addons for dropdown
    const availableForSelection = availableAddons?.filter(addon => 
        !data.selected_addons.includes(addon.id)
    ) || [];

    // Additional image functions
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

    return (
        <ShopLayout auth={auth}>
            <Head title="Tambah Produk" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-6">Tambah Produk Baru</h3>
                            <form onSubmit={handleSubmit}>
                                {/* Category */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kategori <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && (
                                        <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>
                                    )}
                                </div>

                                {/* Name */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Produk <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Contoh: Bunga Mawar Merah"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Deskripsi <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows="4"
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Deskripsi produk..."
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                                    )}
                                </div>

                                {/* Price */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Harga <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex items-center">
                                        <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600">
                                            Rp
                                        </span>
                                        <input
                                            type="number"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            className="flex-1 border-gray-300 rounded-r-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="0"
                                            min="0"
                                            step="1000"
                                        />
                                    </div>
                                    {errors.price && (
                                        <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                                    )}
                                </div>

                                {/* Stock */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Stok <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="0"
                                        min="0"
                                    />
                                    {errors.stock && (
                                        <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
                                    )}
                                </div>

                                {/* Image URL */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        URL Gambar Produk
                                    </label>
                                    <input
                                        type="url"
                                        value={data.image}
                                        onChange={(e) => setData('image', e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="https://res.cloudinary.com/... atau URL gambar lainnya"
                                    />
                                    {errors.image && (
                                        <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                                    )}
                                    <p className="text-xs text-gray-500 mt-1">
                                        💡 Upload gambar ke <a href="https://cloudinary.com" target="_blank" className="text-blue-600 hover:underline">Cloudinary</a> lalu paste URL-nya di sini
                                    </p>
                                    {data.image && (
                                        <div className="mt-3">
                                            <p className="text-sm text-gray-600 mb-2">Preview:</p>
                                            <img
                                                src={data.image}
                                                alt="Preview"
                                                className="h-40 w-40 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Additional Images */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gambar Tambahan (Opsional)
                                    </label>
                                    <p className="text-xs text-gray-500 mb-3">
                                        Tambahkan hingga 5 gambar produk tambahan untuk galeri
                                    </p>
                                    
                                    {data.additional_images.map((imgUrl, index) => (
                                        <div key={index} className="mb-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                            <div className="flex items-start gap-3">
                                                <div className="flex-1">
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                        Gambar #{index + 1}
                                                    </label>
                                                    <input
                                                        type="url"
                                                        value={imgUrl}
                                                        onChange={(e) => {
                                                            const newImages = [...data.additional_images];
                                                            newImages[index] = e.target.value;
                                                            setData('additional_images', newImages);
                                                        }}
                                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                                        placeholder="https://res.cloudinary.com/..."
                                                    />
                                                </div>
                                                
                                                {/* Preview thumbnail */}
                                                {imgUrl && (
                                                    <img
                                                        src={imgUrl}
                                                        alt={`Preview ${index + 1}`}
                                                        className="h-16 w-16 object-cover rounded border border-gray-200"
                                                        onError={(e) => e.target.style.display = 'none'}
                                                    />
                                                )}
                                                
                                                {/* Remove button */}
                                                {data.additional_images.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newImages = data.additional_images.filter((_, i) => i !== index);
                                                            setData('additional_images', newImages);
                                                        }}
                                                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm"
                                                    >
                                                        🗑️
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {/* Add more button */}
                                    {data.additional_images.length < 5 && (
                                        <button
                                            type="button"
                                            onClick={() => setData('additional_images', [...data.additional_images, ''])}
                                            className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
                                        >
                                            ➕ Tambah Gambar
                                        </button>
                                    )}
                                </div>

                                {/* Add-ons Section - Dropdown Style */}
                                <div className="mb-6 border-t pt-6">
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-800">Add-ons untuk Produk Ini</h4>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Klik tombol di bawah untuk menambah add-on. Kelola add-ons di{' '}
                                                    <Link 
                                                        href={route('admin.addons.index')} 
                                                        className="text-pink-600 hover:underline"
                                                        target="_blank"
                                                    >
                                                        halaman Kelola Add-ons
                                                    </Link>
                                                </p>
                                            </div>
                                            
                                            {/* Dropdown Button */}
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowDropdown(!showDropdown)}
                                                    className="px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2 whitespace-nowrap text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={availableForSelection.length === 0}
                                                >
                                                    ➕ Tambah Add-on
                                                    <span className={`transform transition text-xs ${showDropdown ? 'rotate-180' : ''}`}>▼</span>
                                                </button>
                                                
                                                {/* Dropdown Menu */}
                                                {showDropdown && availableForSelection.length > 0 && (
                                                    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
                                                        {availableForSelection.map((addon) => (
                                                            <button
                                                                    key={addon.id}
                                                                    type="button"
                                                                    onClick={() => addAddon(addon.id)}
                                                                    className="w-full px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 text-left flex items-center gap-3"
                                                                >
                                                                    {addon.images && addon.images.length > 0 && (
                                                                        <img
                                                                            src={addon.images[0].url}
                                                                            alt={addon.name}
                                                                            className="h-12 w-12 object-cover rounded"
                                                                        />
                                                                    )}
                                                                    <div className="flex-1">
                                                                        <div className="font-semibold text-gray-900">{addon.name}</div>
                                                                        <div className="text-sm text-pink-600">
                                                                            Rp {new Intl.NumberFormat('id-ID').format(addon.price)}
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                        </div>
                                    </div>

                                    {/* Selected Addons List */}
                                    {selectedAddonObjects.length === 0 ? (
                                        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                                            {availableAddons && availableAddons.length === 0 ? (
                                                <>
                                                    <p className="text-gray-400 mb-3">Belum ada add-on global.</p>
                                                    <Link
                                                        href={route('admin.addons.create')}
                                                        className="inline-block px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
                                                    >
                                                        Buat Add-on Pertama
                                                    </Link>
                                                </>
                                            ) : (
                                                <p className="text-gray-400">Belum ada add-on dipilih. Klik "Tambah Add-on" untuk memilih.</p>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {selectedAddonObjects.map((addon) => (
                                                <div 
                                                    key={addon.id} 
                                                    className="p-4 border-2 border-green-500 bg-green-50 rounded-lg"
                                                >
                                                    <div className="flex items-start gap-4">
                                                        {/* Images */}
                                                        {addon.images && addon.images.length > 0 && (
                                                            <div className="flex gap-1">
                                                                {addon.images.slice(0, 2).map((img, idx) => (
                                                                    <img
                                                                        key={idx}
                                                                        src={img.url}
                                                                        alt={addon.name}
                                                                        className="h-16 w-16 object-cover rounded"
                                                                    />
                                                                ))}
                                                                {addon.images.length > 2 && (
                                                                    <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-600">
                                                                        +{addon.images.length - 2}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}

                                                        {/* Info */}
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h5 className="font-semibold text-gray-900">{addon.name}</h5>
                                                                <span className="text-pink-600 font-semibold">
                                                                    Rp {new Intl.NumberFormat('id-ID').format(addon.price)}
                                                                </span>
                                                            </div>
                                                            
                                                            {addon.description && (
                                                                <p className="text-sm text-gray-600 mb-2">{addon.description}</p>
                                                            )}
                                                            
                                                            <div className="flex gap-3 text-xs">
                                                                <span className="px-2 py-1 bg-white rounded">
                                                                    Stok: {addon.stock}
                                                                </span>
                                                                {addon.has_custom_message && (
                                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                                                                        📝 Pesan Custom
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Remove Button */}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeAddon(addon.id)}
                                                            className="px-3 py-2 text-red-600 hover:bg-red-100 rounded transition"
                                                        >
                                                            🗑️ Hapus
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {selectedAddonObjects.length > 0 && (
                                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                                            ✓ {selectedAddonObjects.length} add-on dipilih untuk produk ini
                                        </div>
                                    )}
                                </div>

                                {/* Checkboxes */}
                                <div className="mb-4 space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.is_featured}
                                            onChange={(e) => setData('is_featured', e.target.checked)}
                                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Tandai sebagai Featured</span>
                                    </label>

                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Produk Aktif</span>
                                    </label>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-end gap-4 mt-6">
                                    <Link
                                        href={route('admin.products.index')}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Produk'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
