import React from 'react';

export default function StarRating({ rating, maxRating = 5, size = 'md', showNumber = true, interactive = false, onChange = null }) {
    // Convert rating to number and ensure it's valid
    const numericRating = parseFloat(rating) || 0;
    
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-8 h-8'
    };

    const handleClick = (value) => {
        if (interactive && onChange) {
            onChange(value);
        }
    };

    return (
        <div className="flex items-center gap-1">
            {[...Array(maxRating)].map((_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= Math.floor(numericRating);
                const isHalf = starValue === Math.ceil(numericRating) && numericRating % 1 !== 0;

                return (
                    <button
                        key={index}
                        type="button"
                        onClick={() => handleClick(starValue)}
                        disabled={!interactive}
                        className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} ${sizes[size]}`}
                    >
                        {isFilled ? (
                            <svg className="text-yellow-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        ) : isHalf ? (
                            <svg className="text-yellow-400" viewBox="0 0 24 24">
                                <defs>
                                    <linearGradient id={`halfGrad${index}`}>
                                        <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
                                        <stop offset="50%" stopColor="currentColor" stopOpacity="0.2" />
                                    </linearGradient>
                                </defs>
                                <path fill={`url(#halfGrad${index})`} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        ) : (
                            <svg className="text-gray-300 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        )}
                    </button>
                );
            })}
            {showNumber && (
                <span className="ml-1 text-sm text-gray-600">
                    {numericRating > 0 ? numericRating.toFixed(1) : '0.0'}
                </span>
            )}
        </div>
    );
}
