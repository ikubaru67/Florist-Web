import ShopLayout from '@/Layouts/ShopLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function SettingsIndex({ auth, banner_image }) {
    const [autoResize, setAutoResize] = useState(true);
    const [isResizing, setIsResizing] = useState(false);
    
    const { data, setData, post, processing, errors } = useForm({
        banner_image: banner_image || ''
    });

    const resizeImage = async (imageUrl) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = 1920;
                canvas.height = 600;
                
                ctx.drawImage(img, 0, 0, 1920, 600);
                
                canvas.toBlob((blob) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve(reader.result);
                    };
                    reader.readAsDataURL(blob);
                }, 'image/jpeg', 0.9);
            };
            
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = imageUrl;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (autoResize && data.banner_image.startsWith('http')) {
            try {
                setIsResizing(true);
                const resizedImage = await resizeImage(data.banner_image);
                setData('banner_image', resizedImage);
                
                // Submit after resize
                setTimeout(() => {
                    post(route('admin.settings.update'));
                }, 100);
            } catch (error) {
                console.error('Resize error:', error);
                alert('Gagal resize gambar. Gambar akan disimpan tanpa resize.');
                post(route('admin.settings.update'));
            } finally {
                setIsResizing(false);
            }
        } else {
            post(route('admin.settings.update'));
        }
    };

    return (
        <ShopLayout auth={auth}>
            <Head title="Pengaturan - Admin" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href={route('admin.dashboard')}
                            className="text-pink-600 hover:text-pink-700 flex items-center gap-2 mb-4"
                        >
                            ← Kembali ke Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Pengaturan Website</h1>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <form onSubmit={handleSubmit}>
                            {/* Banner Image */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Banner Halaman Depan (URL Gambar)
                                </label>
                                <input
                                    type="text"
                                    value={data.banner_image}
                                    onChange={e => setData('banner_image', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    placeholder="https://images.unsplash.com/photo-..."
                                    required
                                />
                                {errors.banner_image && (
                                    <p className="text-red-500 text-sm mt-1">{errors.banner_image}</p>
                                )}
                                
                                {/* Auto Resize Option */}
                                <div className="mt-3">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={autoResize}
                                            onChange={(e) => setAutoResize(e.target.checked)}
                                            className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                                        />
                                        <span className="text-sm text-gray-700">
                                            Auto-resize gambar ke 1920x600px saat simpan
                                        </span>
                                    </label>
                                </div>
                                
                                <p className="text-xs text-gray-500 mt-2">
                                    💡 Gunakan URL gambar dari Unsplash, Cloudinary, atau hosting gambar lainnya.
                                    <br />
                                    {autoResize ? (
                                        <>✅ Gambar akan otomatis di-resize ke 1920x600px (ukuran ideal banner)</>
                                    ) : (
                                        <>⚠️ Gambar akan disimpan dengan ukuran asli</>
                                    )}
                                </p>
                            </div>

                            {/* Preview */}
                            {data.banner_image && (
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Preview Banner
                                    </label>
                                    <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                                        <img
                                            key={data.banner_image.substring(0, 50)}
                                            src={data.banner_image}
                                            alt="Banner Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                if (!data.banner_image.startsWith('data:')) {
                                                    e.target.src = 'https://via.placeholder.com/1920x600?text=Invalid+Image+URL';
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Suggested Images */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Saran Gambar Banner (Klik untuk gunakan)
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&h=600&fit=crop',
                                        'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1920&h=600&fit=crop',
                                        'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=1920&h=600&fit=crop',
                                        'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=1920&h=600&fit=crop',
                                    ].map((url, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setData('banner_image', url)}
                                            className="relative h-24 rounded-lg overflow-hidden cursor-pointer hover:ring-4 hover:ring-pink-500 transition"
                                        >
                                            <img
                                                src={url}
                                                alt={`Banner suggestion ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            {data.banner_image === url && (
                                                <div className="absolute inset-0 bg-pink-600 bg-opacity-50 flex items-center justify-center">
                                                    <span className="text-white font-bold text-lg">✓ Dipilih</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-4">
                                <Link
                                    href={route('admin.dashboard')}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing || isResizing}
                                    className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
                                >
                                    {processing || isResizing ? (isResizing ? 'Resize gambar...' : 'Menyimpan...') : 'Simpan Pengaturan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
