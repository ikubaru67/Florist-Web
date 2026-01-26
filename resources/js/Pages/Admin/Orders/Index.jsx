import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { ShoppingCart, Search, X, ChevronDown, ChevronUp, Package, User, Calendar, Phone, Mail, MapPin, Check, Clock, Truck, XCircle, MessageSquare, Gift } from 'lucide-react';

export default function Index({ orders, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || 'all');
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.orders.index'), { 
            search, 
            status: statusFilter !== 'all' ? statusFilter : '' 
        }, { 
            preserveState: true,
            preserveScroll: true 
        });
    };

    const handleClearSearch = () => {
        setSearch('');
        setStatusFilter('all');
        router.get(route('admin.orders.index'), {}, { 
            preserveState: true,
            preserveScroll: true 
        });
    };

    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        router.get(route('admin.orders.index'), { 
            search, 
            status: status !== 'all' ? status : '' 
        }, { 
            preserveState: true,
            preserveScroll: true 
        });
    };

    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(Number(amount));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusConfig = (status) => {
        const configs = {
            pending: {
                label: 'Pending',
                color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
                icon: Clock
            },
            processing: {
                label: 'Processing',
                color: 'bg-blue-100 text-blue-700 border-blue-200',
                icon: Truck
            },
            completed: {
                label: 'Completed',
                color: 'bg-green-100 text-green-700 border-green-200',
                icon: Check
            },
            cancelled: {
                label: 'Cancelled',
                color: 'bg-red-100 text-red-700 border-red-200',
                icon: XCircle
            }
        };
        return configs[status] || configs.pending;
    };

    const toggleOrderExpand = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    return (
        <AdminLayout
            title="Orders Management"
            description="Manage and track customer orders"
        >
            <Head title="Orders Management" />

            <div className="space-y-6">
                {/* Header with Search & Filters */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <ShoppingCart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Orders</h2>
                            <p className="text-sm text-gray-500">View and manage customer orders</p>
                        </div>
                    </div>

                    {/* Status Filter Tabs */}
                    <div className="flex gap-2 mb-6 flex-wrap">
                        {[
                            { value: 'all', label: 'All Orders' },
                            { value: 'pending', label: 'Pending' },
                            { value: 'processing', label: 'Processing' },
                            { value: 'completed', label: 'Completed' },
                            { value: 'cancelled', label: 'Cancelled' }
                        ].map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => handleStatusFilter(tab.value)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    statusFilter === tab.value
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch}>
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by Order ID, customer name, or email..."
                                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all shadow-sm hover:border-purple-300"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all font-medium"
                            >
                                Search
                            </button>
                            {(filters?.search || (filters?.status && filters?.status !== 'all')) && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                        {filters?.search && (
                            <p className="mt-3 text-sm text-gray-600">
                                Search results for: <span className="font-semibold text-purple-600">"{filters.search}"</span>
                            </p>
                        )}
                    </form>
                </div>

                {/* Orders List */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
                    {orders.data.length > 0 ? (
                        <div className="space-y-3">
                            {orders.data.map((order) => {
                                const statusConfig = getStatusConfig(order.status);
                                const StatusIcon = statusConfig.icon;
                                const isExpanded = expandedOrderId === order.id;

                                return (
                                    <div
                                        key={order.id}
                                        className="rounded-xl border border-gray-200 bg-white hover:border-purple-300 transition-all overflow-hidden"
                                    >
                                        {/* Order Header */}
                                        <div
                                            className="flex items-center gap-4 p-4 cursor-pointer hover:bg-purple-50/50"
                                            onClick={() => toggleOrderExpand(order.id)}
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold text-gray-900">
                                                        #{order.order_number}
                                                    </h3>
                                                    <span className={`px-3 py-1 rounded-md text-xs font-medium border flex items-center gap-1 ${statusConfig.color}`}>
                                                        <StatusIcon className="w-3.5 h-3.5" />
                                                        {statusConfig.label}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-4 h-4 text-gray-400" />
                                                        <span>{order.shipping_name || order.user?.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-gray-400" />
                                                        <span>{formatDate(order.created_at)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Package className="w-4 h-4 text-gray-400" />
                                                        <span>{order.items?.length || 0} item(s)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 flex-shrink-0">
                                                <div className="text-right">
                                                    <div className="font-bold text-gray-900">
                                                        {formatRupiah(order.total_price)}
                                                    </div>
                                                </div>
                                                <Link
                                                    href={route('admin.orders.show', order.id)}
                                                    className="px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg transition-colors text-sm font-medium"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    View Details
                                                </Link>
                                                {isExpanded ? (
                                                    <ChevronUp className="w-5 h-5 text-gray-400" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                                )}
                                            </div>
                                        </div>

                                        {/* Expanded Order Details */}
                                        {isExpanded && (
                                            <div className="border-t border-gray-200 p-4 bg-gray-50">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* Customer Info */}
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                            <User className="w-4 h-4" />
                                                            Customer Information
                                                        </h4>
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex items-start gap-2">
                                                                <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                                                                <span className="text-gray-600">{order.shipping_email || order.user?.email}</span>
                                                            </div>
                                                            <div className="flex items-start gap-2">
                                                                <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                                                                <span className="text-gray-600">{order.shipping_phone}</span>
                                                            </div>
                                                            <div className="flex items-start gap-2">
                                                                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                                                <span className="text-gray-600">{order.shipping_address}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Order Items */}
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                            <Package className="w-4 h-4" />
                                                            Order Items
                                                        </h4>
                                                        <div className="space-y-2">
                                                            {order.items?.map((item, index) => (
                                                                <div key={index} className="flex items-center gap-3 text-sm">
                                                                    <div className="w-10 h-10 rounded bg-gray-200 flex-shrink-0">
                                                                        {item.product?.image && (
                                                                            <img
                                                                                src={item.product.image}
                                                                                alt={item.product.name}
                                                                                className="w-full h-full object-cover rounded"
                                                                            />
                                                                        )}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="font-medium text-gray-900 truncate">
                                                                            {item.product?.name}
                                                                        </div>
                                                                        <div className="text-gray-500">
                                                                            {item.quantity}x {formatRupiah(item.price)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Notes */}
                                                {order.notes && (
                                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                                            <MessageSquare className="w-4 h-4" />
                                                            Notes
                                                        </h4>
                                                        <p className="text-sm text-gray-600 bg-white p-3 rounded-lg">
                                                            {order.notes}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <ShoppingCart className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                            <p className="text-gray-500">
                                {filters?.search || filters?.status
                                    ? 'Try adjusting your filters'
                                    : 'Orders will appear here when customers make purchases'
                                }
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {orders.links && orders.links.length > 3 && (
                        <div className="mt-6 flex justify-center">
                            <nav className="flex items-center gap-2">
                                {orders.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        disabled={!link.url}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            link.active
                                                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                                                : link.url
                                                ? 'bg-white border border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
