import React from 'react';
import StarRating from './StarRating';
import { useTranslation } from '@/Hooks/useTranslation';

export default function ReviewList({ reviews, averageRating, totalReviews }) {
    const { t } = useTranslation();
    // Convert averageRating to number
    const numericRating = parseFloat(averageRating) || 0;
    
    if (!reviews || reviews.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500">{t('no_reviews_yet')}</p>
                <p className="text-sm text-gray-400 mt-2">{t('be_first_reviewer')}</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* Rating Summary */}
            <div className="mb-6 pb-6 border-b">
                <div className="flex items-center gap-4">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900">
                            {numericRating > 0 ? numericRating.toFixed(1) : '0.0'}
                        </div>
                        <StarRating rating={numericRating} size="md" showNumber={false} />
                        <p className="text-sm text-gray-600 mt-1">
                            {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                <h3 className="font-semibold text-lg mb-4">📝 Semua Review</h3>
                {reviews.map((review) => (
                    <div key={review.id} className="border-b last:border-b-0 pb-6 last:pb-0">
                        {/* User Info & Rating */}
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                                        <span className="text-pink-600 font-semibold text-sm">
                                            {review.user?.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {review.user?.name || 'Anonymous'}
                                        </p>
                                        {review.is_verified_purchase && (
                                            <span className="inline-flex items-center text-xs text-green-600">
                                                ✓ Verified Purchase
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <StarRating rating={review.rating} size="sm" showNumber={false} />
                                <p className="text-xs text-gray-500 mt-1">
                                    {new Date(review.created_at).toLocaleDateString('id-ID', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Review Comment */}
                        {review.comment && (
                            <p className="text-gray-700 mt-3 text-sm leading-relaxed">
                                {review.comment}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
