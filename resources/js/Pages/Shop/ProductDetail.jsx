import ShopLayout from '@/Layouts/ShopLayout';
import ProductCard from '@/Components/ProductCard';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ProductDetail({ auth, product, relatedProducts }) {
    const [quantity, setQuantity] = useState(1);
    const [processing, setProcessing] = useState(false);

    const handleAddToCart = () => {
        if (!auth?.user) {
            router.visit('/login');
            return;
        }

        setProcessing(true);
        router.post('/cart', {
            product_id: product.id,
            quantity: quantity
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setQuantity(1);
                setProcessing(false);
                // Reload page to update cart count
                window.location.reload();
            },
            onError: (errors) => {
                console.error('Add to cart error:', errors);
                alert('Gagal menambahkan ke keranjang: ' + (errors.error || 'Silakan coba lagi'));
                setProcessing(false);
            }
        });
    };

    const handleBuyNow = () => {
        if (!auth?.user) {
            router.visit('/login');
            return;
        }

        // Redirect to order page
        router.visit(`/order/${product.slug}`);
    };

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <ShopLayout auth={auth}>
            <Head title={`${product.name} - Florist`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Product Image */}
                    <div className="order-1">
                        <img
                            src={product.image || 'https://via.placeholder.com/600x600?text=No+Image'}
                            alt={product.name}
                            className="w-full h-auto rounded-lg shadow-lg object-cover max-h-[500px]"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="order-2">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                        <p className="text-sm text-gray-600 mb-4">
                            Kategori: <span className="text-pink-600">{product.category.name}</span>
                        </p>

                        <div className="mb-6">
                            <span className="text-3xl sm:text-4xl font-bold text-pink-600">
                                Rp {Number(product.price).toLocaleString('id-ID')}
                            </span>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi</h2>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{product.description}</p>
                        </div>

                        <div className="mb-6">
                            <p className="text-sm text-gray-600">
                                Stok: <span className={product.stock > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                    {product.stock > 0 ? `${product.stock} tersedia` : 'Habis'}
                                </span>
                            </p>
                        </div>

                        {product.stock > 0 && (
                            <div className="space-y-4">
                                {/* Quantity Selector */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Jumlah
                                    </label>
                                    <div className="flex items-center border border-gray-300 rounded-lg w-full sm:w-36">
                                        <button
                                            onClick={decreaseQuantity}
                                            disabled={quantity <= 1}
                                            className="flex-1 sm:flex-none px-4 py-3 sm:py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-lg sm:text-base"
                                        >
                                            -
                                        </button>
                                        <span className="flex-1 text-center py-3 sm:py-2 font-semibold text-lg sm:text-base">{quantity}</span>
                                        <button
                                            onClick={increaseQuantity}
                                            disabled={quantity >= product.stock}
                                            className="flex-1 sm:flex-none px-4 py-3 sm:py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-lg sm:text-base"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={processing}
                                        className="flex-1 bg-white border-2 border-pink-600 text-pink-600 py-3 sm:py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors disabled:opacity-50 text-sm sm:text-base"
                                    >
                                        🛒 Tambah ke Keranjang
                                    </button>
                                    <button
                                        onClick={handleBuyNow}
                                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 sm:py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors text-sm sm:text-base"
                                    >
                                        ⚡ Beli Sekarang
                                    </button>
                                </div>
                                
                                <p className="text-center text-xs sm:text-sm text-gray-600">
                                    💬 Pembayaran via WhatsApp setelah order
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-12 sm:mt-16">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Produk Terkait</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {relatedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </ShopLayout>
    );
}
