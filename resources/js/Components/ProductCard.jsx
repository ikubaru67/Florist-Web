import { Link } from '@inertiajs/react';
import StarRating from './StarRating';

export default function ProductCard({ product }) {
    const averageRating = product.reviews_avg_rating || 0;
    const reviewsCount = product.reviews_count || 0;

    return (
        <Link
            href={`/products/${product.slug}`}
            className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                <img
                    src={product.image || 'https://via.placeholder.com/400x400?text=No+Image'}
                    alt={product.name}
                    className="h-64 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                
                {/* Rating Display */}
                {reviewsCount > 0 && (
                    <div className="mb-2">
                        <StarRating rating={averageRating} size="sm" showNumber={false} />
                        <span className="text-xs text-gray-500 ml-1">
                            ({reviewsCount})
                        </span>
                    </div>
                )}
                
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-pink-600">
                        Rp {Number(product.price).toLocaleString('id-ID')}
                    </span>
                    {product.stock > 0 ? (
                        <span className="text-sm text-green-600">In Stock</span>
                    ) : (
                        <span className="text-sm text-red-600">Out of Stock</span>
                    )}
                </div>
            </div>
        </Link>
    );
}
