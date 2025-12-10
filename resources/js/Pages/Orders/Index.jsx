import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import StarRating from '@/Components/StarRating';

export default function OrdersIndex({ auth, orders }) {
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        rating: 5,
        comment: ''
    });

    const getStatusBadge = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            processing: 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status) => {
        const text = {
            pending: 'Menunggu',
            processing: 'Diproses',
            completed: 'Selesai',
            cancelled: 'Dibatalkan'
        };
        return text[status] || status;
    };

    const handleOpenReview = (item, order) => {
        setSelectedItem({ ...item, order_id: order.id });
        setShowReviewModal(true);
        reset();
    };

    const handleCloseReview = () => {
        setShowReviewModal(false);
        setSelectedItem(null);
        reset();
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        
        // Inertia post: (url, data, options)
        post(`/products/${selectedItem.product_id}/reviews`, {
            rating: data.rating,
            comment: data.comment,
            order_id: selectedItem.order_id,
            order_item_id: selectedItem.id
        }, {
            preserveScroll: false,
            onSuccess: (page) => {
                handleCloseReview();
                // Reload current page to refresh order data with reviews
                router.reload({ only: ['orders'] });
            },
            onError: (errors) => {
                console.log('Review submission errors:', errors);
            }
        });
    };

    return (
        <ShopLayout auth={auth}>
            <Head title="Pesanan Saya - Florist" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Pesanan Saya</h1>

                {orders.data.length > 0 ? (
                    <>
                        <div className="space-y-4">
                            {orders.data.map((order) => (
                                <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {order.order_number}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {new Date(order.created_at).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(order.status)}`}>
                                            {getStatusText(order.status)}
                                        </span>
                                    </div>

                                    <div className="border-t pt-4">
                                        <div className="space-y-3 mb-4">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex items-center justify-between gap-4 p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-gray-900">{item.product_name}</p>
                                                        <p className="text-sm text-gray-600">
                                                            {item.quantity} x Rp {Number(item.price).toLocaleString('id-ID')}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-gray-900">
                                                            Rp {Number(item.subtotal).toLocaleString('id-ID')}
                                                        </p>
                                                        {order.status === 'completed' && (
                                                            item.review ? (
                                                                <div className="mt-2 flex items-center gap-1 justify-end">
                                                                    <span className="text-xs text-gray-600">Rating Anda:</span>
                                                                    <div className="flex items-center gap-1">
                                                                        {[...Array(5)].map((_, index) => (
                                                                            <svg
                                                                                key={index}
                                                                                className={`w-4 h-4 ${
                                                                                    index < item.review.rating
                                                                                        ? 'text-yellow-400'
                                                                                        : 'text-gray-300'
                                                                                }`}
                                                                                fill="currentColor"
                                                                                viewBox="0 0 20 20"
                                                                            >
                                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                            </svg>
                                                                        ))}
                                                                        <span className="text-xs font-bold text-gray-900 ml-1">
                                                                            {item.review.rating}.0
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleOpenReview(item, order)}
                                                                    className="text-xs bg-pink-600 text-white px-3 py-1.5 rounded-lg hover:bg-pink-700 mt-1 flex items-center gap-1"
                                                                >
                                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                    </svg>
                                                                    Beri Rating
                                                                </button>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center border-t pt-4">
                                            <div>
                                                <p className="text-sm text-gray-600">Total Pembayaran</p>
                                                <p className="text-xl font-bold text-pink-600">
                                                    Rp {Number(order.total_amount).toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                            <Link
                                                href={`/orders/${order.id}`}
                                                className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                                            >
                                                Detail
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {orders.links && orders.links.length > 3 && (
                            <div className="mt-8 flex justify-center gap-2">
                                {orders.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 rounded-lg ${
                                            link.active
                                                ? 'bg-pink-600 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                        } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow-md">
                        <div className="text-6xl mb-4">📦</div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Belum Ada Pesanan
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Anda belum melakukan pemesanan
                        </p>
                        <Link
                            href="/shop"
                            className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700"
                        >
                            Mulai Belanja
                        </Link>
                    </div>
                )}
            </div>

            {/* Review Modal */}
            {showReviewModal && selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Beri Rating</h3>
                            <button
                                onClick={handleCloseReview}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mb-4">
                            <p className="font-semibold text-gray-900">{selectedItem.product_name}</p>
                            <p className="text-sm text-gray-600">{selectedItem.quantity} item</p>
                        </div>

                        <form onSubmit={handleSubmitReview}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rating Anda
                                </label>
                                <StarRating
                                    rating={data.rating}
                                    onChange={(rating) => setData('rating', rating)}
                                    interactive={true}
                                    size="lg"
                                    showNumber={false}
                                />
                                <p className="text-sm text-gray-600 mt-1">
                                    Pilih {data.rating} dari 5 bintang
                                </p>
                                {errors.rating && (
                                    <p className="text-red-600 text-sm mt-1">{errors.rating}</p>
                                )}
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Komentar (Opsional)
                                </label>
                                <textarea
                                    value={data.comment}
                                    onChange={(e) => setData('comment', e.target.value)}
                                    rows={4}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                                    placeholder="Bagikan pengalaman Anda dengan produk ini..."
                                />
                                {errors.comment && (
                                    <p className="text-red-600 text-sm mt-1">{errors.comment}</p>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleCloseReview}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
                                >
                                    {processing ? 'Mengirim...' : 'Kirim Review'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </ShopLayout>
    );
}
