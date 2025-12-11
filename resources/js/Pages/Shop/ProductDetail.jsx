import ShopLayout from '@/Layouts/ShopLayout';
import ProductCard from '@/Components/ProductCard';
import StarRating from '@/Components/StarRating';
import ReviewList from '@/Components/ReviewList';
import ReviewForm from '@/Components/ReviewForm';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ProductDetail({ auth, product, relatedProducts, canReview, userOrder }) {
    const [quantity, setQuantity] = useState(1);
    const [processing, setProcessing] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState(product.image || 'https://via.placeholder.com/600x600?text=No+Image');
    const [selectedAddons, setSelectedAddons] = useState({}); // Changed to object: { addonId: quantity }
    const [addonMessages, setAddonMessages] = useState({}); // Store custom messages: { addonId: message }
    const [lightboxImage, setLightboxImage] = useState(null);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);
    const [imageTransition, setImageTransition] = useState(false);

    // Convert ratings to numbers
    const averageRating = parseFloat(product.reviews_avg_rating) || 0;
    const reviewsCount = parseInt(product.reviews_count) || 0;

    // Prepare all images (main + additional)
    const allImages = [
        product.image || 'https://via.placeholder.com/600x600?text=No+Image',
        ...(product.product_images?.map(img => img.image_path) || [])
    ].filter(img => img); // Remove empty values

    // Calculate total price (base price + addons)
    const calculateTotalPrice = () => {
        let total = parseFloat(product.price) * quantity;
        Object.entries(selectedAddons).forEach(([addonId, addonQty]) => {
            const addon = product.addons?.find(a => a.id === parseInt(addonId));
            if (addon && addonQty > 0) {
                total += parseFloat(addon.price) * addonQty;
            }
        });
        return total;
    };

    // Handle addon quantity change
    const handleAddonQuantityChange = (addonId, newQuantity) => {
        const addon = product.addons?.find(a => a.id === addonId);
        if (!addon) return;

        // Validate stock
        if (newQuantity > addon.stock) {
            alert(`Stok add-on tidak mencukupi. Stok tersedia: ${addon.stock}`);
            return;
        }

        if (newQuantity <= 0) {
            // Remove addon if quantity is 0 or less
            const newAddons = { ...selectedAddons };
            delete newAddons[addonId];
            setSelectedAddons(newAddons);
            
            // Also remove custom message if exists
            const newMessages = { ...addonMessages };
            delete newMessages[addonId];
            setAddonMessages(newMessages);
        } else {
            setSelectedAddons({
                ...selectedAddons,
                [addonId]: newQuantity
            });
        }
    };

    // Increase addon quantity
    const increaseAddonQuantity = (addonId) => {
        const currentQty = selectedAddons[addonId] || 0;
        handleAddonQuantityChange(addonId, currentQty + 1);
    };

    // Decrease addon quantity
    const decreaseAddonQuantity = (addonId) => {
        const currentQty = selectedAddons[addonId] || 0;
        if (currentQty > 0) {
            handleAddonQuantityChange(addonId, currentQty - 1);
        }
    };

    // Open lightbox with multiple images
    const openLightbox = (images, startIndex = 0) => {
        setLightboxImages(images);
        setCurrentLightboxIndex(startIndex);
        setLightboxImage(images[startIndex]);
    };

    // Close lightbox
    const closeLightbox = () => {
        setLightboxImage(null);
        setLightboxImages([]);
        setCurrentLightboxIndex(0);
    };

    // Navigate lightbox images
    const navigateLightbox = (direction) => {
        setImageTransition(true);
        
        setTimeout(() => {
            let newIndex;
            if (direction === 'next') {
                newIndex = currentLightboxIndex + 1 >= lightboxImages.length ? 0 : currentLightboxIndex + 1;
            } else {
                newIndex = currentLightboxIndex - 1 < 0 ? lightboxImages.length - 1 : currentLightboxIndex - 1;
            }
            
            setCurrentLightboxIndex(newIndex);
            setLightboxImage(lightboxImages[newIndex]);
            setImageTransition(false);
        }, 150);
    };

    const handleAddToCart = () => {
        if (!auth?.user) {
            router.visit('/login');
            return;
        }

        setProcessing(true);
        
        // Convert selectedAddons object to array format for backend
        const addonItems = Object.entries(selectedAddons)
            .filter(([_, qty]) => qty > 0)
            .map(([addonId, qty]) => ({
                addon_id: parseInt(addonId),
                quantity: qty,
                custom_message: addonMessages[addonId] || null
            }));

        router.post('/cart', {
            product_id: product.id,
            quantity: quantity,
            addon_items: addonItems
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setQuantity(1);
                setSelectedAddons({});
                setAddonMessages({});
                setProcessing(false);
                // Reload page to update cart count
                window.location.reload();
            },
            onError: (errors) => {
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

        setProcessing(true);
        
        // Convert selectedAddons object to array format for backend
        const addonItems = Object.entries(selectedAddons)
            .filter(([_, qty]) => qty > 0)
            .map(([addonId, qty]) => ({
                addon_id: parseInt(addonId),
                quantity: qty,
                custom_message: addonMessages[addonId] || null
            }));

        // Add to cart first, then redirect to checkout
        router.post('/cart', {
            product_id: product.id,
            quantity: quantity,
            addon_items: addonItems
        }, {
            preserveScroll: true,
            onSuccess: () => {
                // Redirect to checkout immediately
                router.visit('/cart/checkout');
            },
            onError: (errors) => {
                alert('Gagal memproses pesanan: ' + (errors.error || 'Silakan coba lagi'));
                setProcessing(false);
            }
        });
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
                    {/* Product Image Gallery */}
                    <div className="order-1">
                        {/* Main Image with Smooth Fade Transition */}
                        <div className="mb-4 relative overflow-hidden rounded-lg bg-gray-100" style={{ minHeight: '400px' }}>
                            {allImages.map((image, index) => (
                                <img
                                    key={image}
                                    src={image}
                                    alt={`${product.name} ${index + 1}`}
                                    className={`w-full h-auto rounded-lg shadow-lg object-cover max-h-[500px] absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                        selectedImage === image ? 'opacity-100' : 'opacity-0'
                                    }`}
                                    style={{ position: index === allImages.indexOf(selectedImage) ? 'relative' : 'absolute' }}
                                />
                            ))}
                        </div>

                        {/* Thumbnail Gallery */}
                        {allImages.length > 1 && (
                            <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 gap-2">
                                {allImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(image)}
                                        className={`relative rounded-lg overflow-hidden border-2 transition-all hover:border-pink-500 ${
                                            selectedImage === image
                                                ? 'border-pink-500 ring-2 ring-pink-500'
                                                : 'border-gray-200'
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-16 sm:h-20 object-cover"
                                        />
                                        {selectedImage === image && (
                                            <div className="absolute inset-0 bg-pink-500 bg-opacity-20"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Image Counter */}
                        {allImages.length > 1 && (
                            <p className="text-xs text-gray-500 text-center mt-2">
                                {allImages.indexOf(selectedImage) + 1} / {allImages.length} gambar
                            </p>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="order-2">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                        
                        {/* Rating Display */}
                        <div className="flex items-center gap-4 mb-3">
                            <StarRating rating={averageRating} size="md" showNumber={true} />
                            <span className="text-sm text-gray-600">
                                ({reviewsCount} {reviewsCount === 1 ? 'review' : 'reviews'})
                            </span>
                        </div>

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

                        {/* Add-ons Section */}
                        {product.addons && product.addons.length > 0 && (
                            <div className="mb-6 border-t pt-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">Pilih Add-ons</h2>
                                <div className="space-y-3">
                                    {product.addons
                                        .filter(addon => addon.is_available && addon.stock > 0)
                                        .map(addon => {
                                            const addonQty = selectedAddons[addon.id] || 0;
                                            const isSelected = addonQty > 0;
                                            const addonImages = addon.images || [];
                                            
                                            return (
                                                <div 
                                                    key={addon.id} 
                                                    className={`border rounded-lg p-4 transition-all ${
                                                        isSelected 
                                                            ? 'border-pink-500 bg-pink-50 ring-2 ring-pink-200' 
                                                            : 'border-gray-200'
                                                    }`}
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex-1">
                                                            <div className="flex items-start justify-between mb-3">
                                                                <div className="flex-1">
                                                                    <h3 className="font-semibold text-gray-900">{addon.name}</h3>
                                                                    {addon.description && (
                                                                        <p className="text-sm text-gray-600 mt-1">{addon.description}</p>
                                                                    )}
                                                                    <p className="text-sm text-gray-500 mt-1">
                                                                        Stok: {addon.stock}
                                                                    </p>
                                                                </div>
                                                                <span className="text-lg font-bold text-pink-600 ml-4">
                                                                    Rp {Number(addon.price).toLocaleString('id-ID')}
                                                                </span>
                                                            </div>

                                                            {/* Custom Message Input - Only show if addon is selected and has_custom_message is true */}
                                                            {isSelected && addon.has_custom_message && (
                                                                <div className="mb-3 border-t pt-3">
                                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                        Pesan Custom {addon.name === 'Kartu Ucapan' || addon.name.toLowerCase().includes('kartu') ? '(untuk kartu ucapan)' : ''}
                                                                    </label>
                                                                    <textarea
                                                                        value={addonMessages[addon.id] || ''}
                                                                        onChange={(e) => setAddonMessages({
                                                                            ...addonMessages,
                                                                            [addon.id]: e.target.value
                                                                        })}
                                                                        placeholder="Tuliskan pesan Anda di sini..."
                                                                        rows="3"
                                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 resize-none"
                                                                        maxLength="500"
                                                                    />
                                                                    <p className="text-xs text-gray-500 mt-1">
                                                                        Maksimal 500 karakter. Tersisa: {500 - (addonMessages[addon.id]?.length || 0)}
                                                                    </p>
                                                                </div>
                                                            )}

                                                            {/* Quantity Selector */}
                                                            <div className="mb-3">
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                    Jumlah
                                                                </label>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                                                        <button
                                                                            onClick={() => decreaseAddonQuantity(addon.id)}
                                                                            disabled={addonQty <= 0}
                                                                            className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                                                            type="button"
                                                                        >
                                                                            -
                                                                        </button>
                                                                        <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                                                                            {addonQty}
                                                                        </span>
                                                                        <button
                                                                            onClick={() => increaseAddonQuantity(addon.id)}
                                                                            disabled={addonQty >= addon.stock}
                                                                            className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                                                            type="button"
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                    {addonQty > 0 && (
                                                                        <span className="text-sm text-gray-600">
                                                                            = Rp {Number(addon.price * addonQty).toLocaleString('id-ID')}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Addon Image Gallery - All Thumbnails with Lightbox */}
                                                            {isSelected && addonImages.length > 0 && (
                                                                <div className="mt-3 border-t pt-3">
                                                                    <p className="text-xs text-gray-600 mb-2">Preview:</p>
                                                                    <div className="flex gap-2 flex-wrap">
                                                                        {addonImages.map((img, idx) => (
                                                                            <button
                                                                                key={idx}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    openLightbox(addonImages.map(i => i.image_path), idx);
                                                                                }}
                                                                                className="flex-shrink-0 rounded-lg border-2 border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition hover:border-pink-400 cursor-pointer"
                                                                            >
                                                                                <img
                                                                                    src={img.image_path}
                                                                                    alt={`${addon.name} ${idx + 1}`}
                                                                                    className="h-20 w-20 sm:h-24 sm:w-24 object-cover"
                                                                                />
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        )}

                        {product.stock > 0 && (
                            <div className="space-y-4">
                                {/* Total Price Display */}
                                {Object.keys(selectedAddons).length > 0 && Object.values(selectedAddons).some(qty => qty > 0) && (
                                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Harga Produk ({quantity}x):</span>
                                                <span className="font-semibold">Rp {Number(product.price * quantity).toLocaleString('id-ID')}</span>
                                            </div>
                                            {Object.entries(selectedAddons).map(([addonId, addonQty]) => {
                                                if (addonQty <= 0) return null;
                                                const addon = product.addons?.find(a => a.id === parseInt(addonId));
                                                return addon ? (
                                                    <div key={addonId} className="flex justify-between text-gray-600">
                                                        <span>+ {addon.name} ({addonQty}x):</span>
                                                        <span>Rp {Number(addon.price * addonQty).toLocaleString('id-ID')}</span>
                                                    </div>
                                                ) : null;
                                            })}
                                            <div className="flex justify-between pt-2 border-t border-pink-300">
                                                <span className="font-bold text-gray-900">Total:</span>
                                                <span className="font-bold text-pink-600 text-lg">
                                                    Rp {Number(calculateTotalPrice()).toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

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

                {/* Reviews Section */}
                <div className="mt-12 sm:mt-16">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                        ⭐ Rating & Review
                    </h2>

                    {/* Review Form for Eligible Users */}
                    {canReview && !showReviewForm && (
                        <div className="mb-6">
                            <button
                                onClick={() => setShowReviewForm(true)}
                                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors"
                            >
                                ✍️ Tulis Review Anda
                            </button>
                            <p className="text-sm text-gray-600 mt-2">
                                Anda telah membeli produk ini. Bagikan pengalaman Anda!
                            </p>
                        </div>
                    )}

                    {showReviewForm && canReview && userOrder && (
                        <div className="mb-8">
                            <ReviewForm
                                product={product}
                                orderId={userOrder.id}
                                onSuccess={() => {
                                    setShowReviewForm(false);
                                    window.location.reload();
                                }}
                            />
                            <button
                                onClick={() => setShowReviewForm(false)}
                                className="text-sm text-gray-600 hover:text-gray-800 mt-2"
                            >
                                Batal
                            </button>
                        </div>
                    )}

                    {/* Reviews List */}
                    <ReviewList
                        reviews={product.reviews || []}
                        averageRating={averageRating}
                        totalReviews={reviewsCount}
                    />
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-12 sm:mt-16">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Produk Terkait</h2>
                        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                            {relatedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox Modal with Arrow Navigation */}
            {lightboxImage && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md p-4"
                    onClick={closeLightbox}
                >
                    <div className="relative max-w-2xl max-h-[75vh] w-full">
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute -top-12 right-0 text-white hover:text-pink-400 transition-colors"
                            aria-label="Close"
                        >
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        {/* Image Container with Transition */}
                        <div className="relative bg-white rounded-lg overflow-hidden">
                            <img
                                src={lightboxImage}
                                alt="Preview"
                                className={`w-full h-auto max-h-[75vh] object-contain transition-all ${
                                    imageTransition 
                                        ? 'opacity-0 transform scale-95' 
                                        : 'opacity-100 transform scale-100 duration-500'
                                }`}
                                onClick={(e) => e.stopPropagation()}
                            />

                            {/* Navigation Arrows - only show if multiple images */}
                            {lightboxImages.length > 1 && (
                                <>
                                    {/* Previous Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigateLightbox('prev');
                                        }}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white border-2 border-gray-300 hover:border-pink-500 transition shadow-lg"
                                    >
                                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    {/* Next Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigateLightbox('next');
                                        }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white border-2 border-gray-300 hover:border-pink-500 transition shadow-lg"
                                    >
                                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>

                                    {/* Image Counter */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/60 text-white text-sm font-medium">
                                        {currentLightboxIndex + 1} / {lightboxImages.length}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </ShopLayout>
    );
}
