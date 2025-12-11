import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        image: '',
        additional_images: [''], // Array untuk gambar tambahan
        addons: [], // Array untuk add-ons
        is_featured: false,
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    // Add-on functions
    const addAddon = () => {
        setData('addons', [...data.addons, {
            name: '',
            description: '',
            price: '',
            stock: '',
            is_available: true,
            has_custom_message: false,
            images: ['']
        }]);
    };

    const removeAddon = (index) => {
        setData('addons', data.addons.filter((_, i) => i !== index));
    };

    const updateAddon = (index, field, value) => {
        const newAddons = [...data.addons];
        newAddons[index][field] = value;
        setData('addons', newAddons);
    };

    const addAddonImage = (addonIndex) => {
        const newAddons = [...data.addons];
        if (newAddons[addonIndex].images.length < 5) {
            newAddons[addonIndex].images.push('');
            setData('addons', newAddons);
        }
    };

    const removeAddonImage = (addonIndex, imageIndex) => {
        const newAddons = [...data.addons];
        newAddons[addonIndex].images = newAddons[addonIndex].images.filter((_, i) => i !== imageIndex);
        setData('addons', newAddons);
    };

    const updateAddonImage = (addonIndex, imageIndex, value) => {
        const newAddons = [...data.addons];
        newAddons[addonIndex].images[imageIndex] = value;
        setData('addons', newAddons);
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

                                {/* Add-ons Section */}
                                <div className="mb-6 border-t pt-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-800">Add-ons Produk</h4>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Tambahkan pilihan add-ons seperti kartu ucapan, coklat, boneka, dll.
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={addAddon}
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm"
                                        >
                                            ➕ Tambah Add-on
                                        </button>
                                    </div>

                                    {data.addons.length === 0 && (
                                        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                                            <p className="text-gray-400">Belum ada add-on. Klik tombol di atas untuk menambah.</p>
                                        </div>
                                    )}

                                    {data.addons.map((addon, addonIndex) => (
                                        <div key={addonIndex} className="mb-4 p-5 border-2 border-gray-300 rounded-lg bg-gray-50">
                                            <div className="flex items-start justify-between mb-4">
                                                <h5 className="font-semibold text-gray-700">Add-on #{addonIndex + 1}</h5>
                                                <button
                                                    type="button"
                                                    onClick={() => removeAddon(addonIndex)}
                                                    className="px-3 py-1 text-red-600 hover:bg-red-100 rounded transition text-sm"
                                                >
                                                    🗑️ Hapus
                                                </button>
                                            </div>

                                            {/* Addon Name */}
                                            <div className="mb-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Nama Add-on <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={addon.name}
                                                    onChange={(e) => updateAddon(addonIndex, 'name', e.target.value)}
                                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                    placeholder="Contoh: Kartu Ucapan Premium"
                                                />
                                                {errors[`addons.${addonIndex}.name`] && (
                                                    <p className="text-red-500 text-sm mt-1">{errors[`addons.${addonIndex}.name`]}</p>
                                                )}
                                            </div>

                                            {/* Addon Description */}
                                            <div className="mb-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Deskripsi
                                                </label>
                                                <textarea
                                                    value={addon.description}
                                                    onChange={(e) => updateAddon(addonIndex, 'description', e.target.value)}
                                                    rows="2"
                                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                    placeholder="Deskripsi add-on..."
                                                />
                                            </div>

                                            {/* Price and Stock */}
                                            <div className="grid grid-cols-2 gap-3 mb-3">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Harga <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="flex items-center">
                                                        <span className="px-2 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600 text-sm">
                                                            Rp
                                                        </span>
                                                        <input
                                                            type="number"
                                                            value={addon.price}
                                                            onChange={(e) => updateAddon(addonIndex, 'price', e.target.value)}
                                                            className="flex-1 border-gray-300 rounded-r-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                            placeholder="0"
                                                            min="0"
                                                        />
                                                    </div>
                                                    {errors[`addons.${addonIndex}.price`] && (
                                                        <p className="text-red-500 text-sm mt-1">{errors[`addons.${addonIndex}.price`]}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Stok <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={addon.stock}
                                                        onChange={(e) => updateAddon(addonIndex, 'stock', e.target.value)}
                                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                        placeholder="0"
                                                        min="0"
                                                    />
                                                    {errors[`addons.${addonIndex}.stock`] && (
                                                        <p className="text-red-500 text-sm mt-1">{errors[`addons.${addonIndex}.stock`]}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Addon Available Checkbox */}
                                            <div className="mb-3">
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={addon.is_available}
                                                        onChange={(e) => updateAddon(addonIndex, 'is_available', e.target.checked)}
                                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">Add-on Tersedia</span>
                                                </label>
                                            </div>

                                            {/* Has Custom Message Checkbox */}
                                            <div className="mb-3">
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={addon.has_custom_message || false}
                                                        onChange={(e) => updateAddon(addonIndex, 'has_custom_message', e.target.checked)}
                                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">Aktifkan Kolom Pesan Custom</span>
                                                </label>
                                                <p className="ml-6 text-xs text-gray-500 mt-1">
                                                    Centang jika add-on ini memerlukan pesan dari customer (contoh: kartu ucapan)
                                                </p>
                                            </div>

                                            {/* Addon Images */}
                                            <div className="border-t pt-3 mt-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Gambar Add-on (Maks. 5)
                                                </label>
                                                
                                                {addon.images.map((imgUrl, imgIndex) => (
                                                    <div key={imgIndex} className="mb-2 p-3 border border-gray-200 rounded bg-white">
                                                        <div className="flex items-start gap-2">
                                                            <div className="flex-1">
                                                                <input
                                                                    type="url"
                                                                    value={imgUrl}
                                                                    onChange={(e) => updateAddonImage(addonIndex, imgIndex, e.target.value)}
                                                                    className="w-full border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                                                    placeholder="https://res.cloudinary.com/..."
                                                                />
                                                            </div>
                                                            
                                                            {imgUrl && (
                                                                <img
                                                                    src={imgUrl}
                                                                    alt={`Preview ${imgIndex + 1}`}
                                                                    className="h-12 w-12 object-cover rounded border"
                                                                    onError={(e) => e.target.style.display = 'none'}
                                                                />
                                                            )}
                                                            
                                                            {addon.images.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeAddonImage(addonIndex, imgIndex)}
                                                                    className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                                                                >
                                                                    🗑️
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                                
                                                {addon.images.length < 5 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => addAddonImage(addonIndex)}
                                                        className="w-full px-3 py-2 border border-dashed border-gray-300 rounded text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
                                                    >
                                                        ➕ Tambah Gambar Add-on
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
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
