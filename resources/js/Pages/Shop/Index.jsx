import ShopLayout from '@/Layouts/ShopLayout';
import ProductCard from '@/Components/ProductCard';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ShopIndex({ auth, products, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/shop', { search, category: filters.category, sort: filters.sort });
    };

    const handleFilterChange = (key, value) => {
        const params = { ...filters, [key]: value };
        if (!value) delete params[key];
        router.get('/shop', params);
    };

    return (
        <ShopLayout auth={auth}>
            <Head title="Shop - Florist" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shop</h1>

                {/* Filters */}
                <div className="mb-8 space-y-4">
                    {/* Search */}
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari produk..."
                            className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                        >
                            Cari
                        </button>
                    </form>

                    {/* Category & Sort Filters */}
                    <div className="flex flex-wrap gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kategori
                            </label>
                            <select
                                value={filters.category || ''}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                            >
                                <option value="">Semua Kategori</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.slug}>
                                        {category.name} ({category.products_count})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Urutkan
                            </label>
                            <select
                                value={filters.sort || 'latest'}
                                onChange={(e) => handleFilterChange('sort', e.target.value)}
                                className="rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                            >
                                <option value="latest">Terbaru</option>
                                <option value="name">Nama A-Z</option>
                                <option value="price_low">Harga Terendah</option>
                                <option value="price_high">Harga Tertinggi</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {products.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {products.data.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {products.links && products.links.length > 3 && (
                            <div className="mt-8 flex justify-center gap-2">
                                {products.links.map((link, index) => (
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
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">Tidak ada produk ditemukan.</p>
                    </div>
                )}
            </div>
        </ShopLayout>
    );
}
