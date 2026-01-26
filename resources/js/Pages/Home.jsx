import ShopLayout from '@/Layouts/ShopLayout';
import ProductCard from '@/Components/ProductCard';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from '@/Hooks/useTranslation';

export default function Home({ auth, featuredProducts, categories, latestProducts, bannerImage }) {
    const { t } = useTranslation();
    
    return (
        <ShopLayout auth={auth}>
            <Head title="Home - Florist Shop" />

            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white overflow-hidden">
                {/* Banner Image */}
                <div className="absolute inset-0">
                    <img
                        src={bannerImage || 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&h=600&fit=crop'}
                        alt="Hero Banner"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&h=600&fit=crop';
                        }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-900/80 to-purple-900/80"></div>
                </div>
                
                {/* Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                            {t('hero_title')}
                        </h1>
                        <p className="text-xl mb-8 drop-shadow-md">
                            {t('hero_subtitle')}
                        </p>
                        <Link
                            href="/shop"
                            className="inline-block bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                        >
                            {t('shop_now')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">{t('categories')}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/shop?category=${category.slug}`}
                            className="bg-white rounded-lg shadow-md p-3 sm:p-4 text-center hover:shadow-lg transition-shadow"
                        >
                            <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">🌸</div>
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{category.localized_name || category.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-600">{category.products_count} {t('products_count')}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Featured Products */}
            {featuredProducts.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">{t('featured_products')}</h2>
                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            )}

            {/* Latest Products */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">{t('latest_products')}</h2>
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {latestProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className="text-center mt-6 sm:mt-8">
                    <Link
                        href="/shop"
                        className="inline-block bg-pink-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-pink-700 transition-colors"
                    >
                        {t('view_all')}
                    </Link>
                </div>
            </div>
        </ShopLayout>
    );
}
