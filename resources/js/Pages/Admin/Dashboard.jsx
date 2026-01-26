import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Package, ShoppingBag, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export default function Dashboard({ 
    stats, 
    latestProducts, 
    categoryDistribution,
    recentOrders 
}) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getStockStatus = (stock) => {
        if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-700 border-red-200' };
        if (stock <= 5) return { label: `Low Stock (${stock})`, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
        return { label: `In Stock (${stock})`, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
    };

    return (
        <AdminLayout
            title="Dashboard"
            description="Overview of your store's performance"
        >
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Products */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Products</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                            </div>
                        </div>
                    </div>

                    {/* Total Categories */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                                <ShoppingBag className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Categories</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalCategories}</p>
                            </div>
                        </div>
                    </div>

                    {/* Total Orders */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                            </div>
                        </div>
                    </div>

                    {/* Average Price */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                                <DollarSign className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Avg. Price</p>
                                <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.averagePrice)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Latest Products */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Latest Products</h2>
                    
                    {latestProducts.length > 0 ? (
                        <div className="space-y-3">
                            {latestProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50 transition-all"
                                >
                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                        {product.image_path ? (
                                            <img
                                                src={product.image_path}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100">
                                                <Package className="w-8 h-8 text-emerald-600" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 truncate mb-1">
                                            {product.localized_name || product.name}
                                        </h3>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-medium text-gray-600">
                                                {formatPrice(product.price)}
                                            </span>
                                            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-medium">
                                                {product.category?.localized_name || product.category?.name}
                                            </span>
                                            <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStockStatus(product.stock).color}`}>
                                                {getStockStatus(product.stock).label}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Package className="w-8 h-8 text-emerald-600" />
                            </div>
                            <p className="text-gray-500">No products yet. Start by adding your first product!</p>
                        </div>
                    )}
                </div>

                {/* Category Distribution */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Category Distribution</h2>
                    
                    {categoryDistribution.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categoryDistribution.map((category) => (
                                <div
                                    key={category.id}
                                    className="p-4 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50 transition-all"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-gray-900">
                                            {category.localized_name || category.name}
                                        </h3>
                                        <span className="text-2xl font-bold text-emerald-600">
                                            {category.products_count}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all"
                                            style={{
                                                width: `${(category.products_count / stats.totalProducts) * 100}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-500">No categories available</p>
                        </div>
                    )}
                </div>

                {/* Recent Orders */}
                {recentOrders && recentOrders.length > 0 && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Orders</h2>
                        
                        <div className="space-y-3">
                            {recentOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50 transition-all"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-gray-900">
                                                #{order.order_number}
                                            </h3>
                                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                                                order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {order.user?.name} • {formatPrice(order.total_price)}
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {new Date(order.created_at).toLocaleDateString('id-ID')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
