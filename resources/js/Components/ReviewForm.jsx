import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import StarRating from './StarRating';

export default function ReviewForm({ product, orderId, onSuccess }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (rating === 0) {
            setErrors({ rating: 'Silakan pilih rating' });
            return;
        }

        setIsSubmitting(true);

        router.post(
            `/products/${product.id}/reviews`,
            {
                order_id: orderId,
                rating: rating,
                comment: comment
            },
            {
                onSuccess: () => {
                    setRating(0);
                    setComment('');
                    if (onSuccess) onSuccess();
                },
                onError: (errors) => {
                    setErrors(errors);
                },
                onFinish: () => {
                    setIsSubmitting(false);
                }
            }
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">✍️ Tulis Review Anda</h3>
            
            <form onSubmit={handleSubmit}>
                {/* Rating Selection */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating <span className="text-red-500">*</span>
                    </label>
                    <StarRating
                        rating={rating}
                        size="xl"
                        showNumber={false}
                        interactive={true}
                        onChange={setRating}
                    />
                    {errors.rating && (
                        <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
                    )}
                </div>

                {/* Comment */}
                <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Komentar (Opsional)
                    </label>
                    <textarea
                        id="comment"
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Ceritakan pengalaman Anda dengan produk ini..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        maxLength="1000"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        {comment.length}/1000 karakter
                    </p>
                    {errors.comment && (
                        <p className="mt-1 text-sm text-red-600">{errors.comment}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-3">
                    <button
                        type="submit"
                        disabled={isSubmitting || rating === 0}
                        className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSubmitting ? 'Mengirim...' : 'Kirim Review'}
                    </button>
                </div>
            </form>
        </div>
    );
}
