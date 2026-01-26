import { useState } from 'react';
import { Search, Package, User, Calendar, Phone, Mail, MapPin, ChevronDown, ChevronUp, Check, X, Clock, Truck, ArrowUpDown, Gift, MessageSquare } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OrderItem {
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  price: string;
  customMessage?: string;
  addOns?: OrderAddOn[];
}

interface OrderAddOn {
  id: number;
  name: string;
  price: string;
}

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  deliveryDate: string;
  totalPrice: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  orderDate: string;
  notes?: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  additionalImages: string[];
  category: string;
  occasion: string;
}

interface OrdersPanelProps {
  products: Product[];
}

export function OrdersPanel({ products }: OrdersPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'processing' | 'completed' | 'cancelled'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  
  // Mock orders data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      orderNumber: 'ORD-2024-001',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@email.com',
      customerPhone: '+62 812 3456 7890',
      customerAddress: 'Jl. Sudirman No. 123, Jakarta Selatan',
      items: [
        { 
          productId: 1, 
          productName: 'Pink Rose Bouquet', 
          productImage: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400', 
          quantity: 2, 
          price: 'Rp 450.000', 
          customMessage: 'Happy Anniversary my love! ❤️',
          addOns: [
            { id: 1, name: 'Greeting Card', price: 'Rp 25.000' },
            { id: 2, name: 'Premium Vase', price: 'Rp 75.000' }
          ]
        },
        { 
          productId: 3, 
          productName: 'Sunflower Arrangement', 
          productImage: 'https://images.unsplash.com/photo-1597848212624-e4c29e3dedc3?w=400', 
          quantity: 1, 
          price: 'Rp 420.000', 
          customMessage: 'Wishing you a bright and sunny day!',
          addOns: [
            { id: 3, name: 'Chocolate Box', price: 'Rp 120.000' }
          ]
        }
      ],
      deliveryDate: '2024-12-16',
      totalPrice: 'Rp 1.540.000',
      status: 'pending',
      orderDate: '2024-12-14 10:30',
      notes: 'Please deliver before 5 PM'
    },
    {
      id: 2,
      orderNumber: 'ORD-2024-002',
      customerName: 'Michael Chen',
      customerEmail: 'michael.chen@email.com',
      customerPhone: '+62 821 9876 5432',
      customerAddress: 'Jl. Gatot Subroto No. 45, Jakarta Pusat',
      items: [
        { 
          productId: 5, 
          productName: 'Elegant Orchids', 
          productImage: 'https://images.unsplash.com/photo-1558603668-6570496b66f8?w=400', 
          quantity: 1, 
          price: 'Rp 680.000', 
          customMessage: 'Congratulations on your promotion!',
          addOns: [
            { id: 4, name: 'Gift Wrapping', price: 'Rp 50.000' },
            { id: 5, name: 'Ribbon', price: 'Rp 15.000' }
          ]
        }
      ],
      deliveryDate: '2024-12-15',
      totalPrice: 'Rp 745.000',
      status: 'processing',
      orderDate: '2024-12-13 14:20',
      notes: 'Gift wrapping required'
    },
    {
      id: 3,
      orderNumber: 'ORD-2024-003',
      customerName: 'Diana Putri',
      customerEmail: 'diana.putri@email.com',
      customerPhone: '+62 813 5555 4444',
      customerAddress: 'Jl. Thamrin No. 78, Jakarta Pusat',
      items: [
        { 
          productId: 4, 
          productName: 'Colorful Tulips', 
          productImage: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400', 
          quantity: 3, 
          price: 'Rp 520.000',
          addOns: []
        }
      ],
      deliveryDate: '2024-12-14',
      totalPrice: 'Rp 1.560.000',
      status: 'completed',
      orderDate: '2024-12-12 09:15'
    },
    {
      id: 4,
      orderNumber: 'ORD-2024-004',
      customerName: 'Robert Anderson',
      customerEmail: 'robert.a@email.com',
      customerPhone: '+62 815 7777 8888',
      customerAddress: 'Jl. Kuningan No. 99, Jakarta Selatan',
      items: [
        { 
          productId: 2, 
          productName: 'Lavender Fields', 
          productImage: 'https://images.unsplash.com/photo-1595791204629-aacf7c90b905?w=400', 
          quantity: 1, 
          price: 'Rp 380.000', 
          customMessage: 'Thank you for being an amazing friend!',
          addOns: [
            { id: 6, name: 'Teddy Bear', price: 'Rp 150.000' }
          ]
        },
        { 
          productId: 6, 
          productName: 'Wildflower Mix', 
          productImage: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400', 
          quantity: 2, 
          price: 'Rp 350.000',
          addOns: []
        }
      ],
      deliveryDate: '2024-12-13',
      totalPrice: 'Rp 1.230.000',
      status: 'completed',
      orderDate: '2024-12-11 16:45'
    },
    {
      id: 5,
      orderNumber: 'ORD-2024-005',
      customerName: 'Lisa Wijaya',
      customerEmail: 'lisa.w@email.com',
      customerPhone: '+62 817 3333 2222',
      customerAddress: 'Jl. Senopati No. 12, Jakarta Selatan',
      items: [
        { 
          productId: 1, 
          productName: 'Pink Rose Bouquet', 
          productImage: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400', 
          quantity: 1, 
          price: 'Rp 450.000', 
          customMessage: 'Happy Birthday Mom! Love you always 💕',
          addOns: []
        }
      ],
      deliveryDate: '2024-12-14',
      totalPrice: 'Rp 450.000',
      status: 'cancelled',
      orderDate: '2024-12-10 11:00',
      notes: 'Customer requested cancellation'
    }
  ]);

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = 
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.orderDate).getTime();
      const dateB = new Date(b.orderDate).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <Truck className="w-4 h-4" />;
      case 'completed':
        return <Check className="w-4 h-4" />;
      case 'cancelled':
        return <X className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
    }
  };

  const handleStatusChange = (orderId: number, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const toggleOrderExpanded = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getOrderStats = () => {
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
      completed: orders.filter(o => o.status === 'completed').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length
    };
  };

  const stats = getOrderStats();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <p className="text-gray-900 mt-1">{stats.total}</p>
            </div>
            <Package className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-5 border border-yellow-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-700 text-sm">Pending</p>
              <p className="text-yellow-900 mt-1">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 text-sm">Processing</p>
              <p className="text-blue-900 mt-1">{stats.processing}</p>
            </div>
            <Truck className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-700 text-sm">Completed</p>
              <p className="text-emerald-900 mt-1">{stats.completed}</p>
            </div>
            <Check className="w-8 h-8 text-emerald-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-5 border border-red-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-700 text-sm">Cancelled</p>
              <p className="text-red-900 mt-1">{stats.cancelled}</p>
            </div>
            <X className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-5">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order number, customer name, or email..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'processing', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as any)}
                className={`px-4 py-3 rounded-xl transition-all capitalize ${
                  statusFilter === status
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Sort Order */}
          <div className="flex gap-2 flex-wrap">
            {['newest', 'oldest'].map((order) => (
              <button
                key={order}
                onClick={() => setSortOrder(order as any)}
                className={`px-4 py-3 rounded-xl transition-all capitalize ${
                  sortOrder === order
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300'
                }`}
              >
                {order}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No orders found</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-gray-900">{order.orderNumber}</h3>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{order.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{order.customerEmail}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{order.customerPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{order.orderDate}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleOrderExpanded(order.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                  >
                    {expandedOrderId === order.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Order Details (Expandable) */}
              {expandedOrderId === order.id && (
                <div className="p-5 bg-gradient-to-br from-gray-50 to-white space-y-5">
                  {/* Delivery Date */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border-2 border-emerald-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-emerald-900 mb-0.5">Delivery Date</h4>
                        <p className="text-emerald-700">{new Date(order.deliveryDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div>
                    <h4 className="text-gray-700 mb-3">Order Items</h4>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                          <div className="p-4 flex items-start gap-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              <ImageWithFallback
                                src={item.productImage}
                                alt={item.productName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-gray-900">{item.productName}</p>
                              <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-gray-900">{item.price}</p>
                            </div>
                          </div>
                          {item.customMessage && (
                            <div className="px-4 pb-4 pt-0">
                              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-3 border border-pink-200">
                                <div className="flex items-start gap-2">
                                  <MessageSquare className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                                  <div className="flex-1">
                                    <p className="text-pink-900 text-sm mb-0.5">Custom Message</p>
                                    <p className="text-pink-700 text-sm italic">"{item.customMessage}"</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {item.addOns && item.addOns.length > 0 && (
                            <div className="px-4 pb-4 pt-0">
                              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
                                <div className="flex items-start gap-2">
                                  <Gift className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                                  <div className="flex-1">
                                    <p className="text-purple-900 text-sm mb-0.5">Add-ons</p>
                                    <div className="space-y-1">
                                      {item.addOns.map((addOn, addOnIndex) => (
                                        <p key={addOnIndex} className="text-purple-700 text-sm italic">{addOn.name} - {addOn.price}</p>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-gray-700 mb-1">Delivery Address</h4>
                        <p className="text-gray-600 text-sm">{order.customerAddress}</p>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {order.notes && (
                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                      <h4 className="text-amber-900 mb-1">Notes</h4>
                      <p className="text-amber-700 text-sm">{order.notes}</p>
                    </div>
                  )}

                  {/* Total & Status Update */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-gray-500 text-sm">Total Amount</p>
                      <p className="text-gray-900">{order.totalPrice}</p>
                    </div>

                    {/* Status Update Buttons */}
                    <div className="flex gap-2">
                      {order.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(order.id, 'processing')}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                          >
                            Mark Processing
                          </button>
                          <button
                            onClick={() => handleStatusChange(order.id, 'cancelled')}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {order.status === 'processing' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'completed')}
                          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm"
                        >
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}