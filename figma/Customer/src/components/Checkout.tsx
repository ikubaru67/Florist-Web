import { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, MapPin, User, Mail, Phone, Calendar, Gift, Package } from 'lucide-react';
import { CartItem } from './CartDrawer';

interface CheckoutProps {
  cartItems: CartItem[];
  onBack: () => void;
  onOrderComplete: (orderData: any) => void;
}

export function Checkout({ cartItems, onBack, onOrderComplete }: CheckoutProps) {
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    notes: ''
  });

  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString('id-ID')}`;
  };

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.price;
    const addOnsPrice = item.addOns?.reduce((sum, addOn) => sum + addOn.price, 0) || 0;
    return total + ((itemPrice + addOnsPrice) * item.quantity);
  }, 0);

  const shippingOptions = [
    { id: 'standard', name: 'Standard Delivery', price: 0, time: '3-5 business days' },
    { id: 'express', name: 'Express Delivery', price: 50000, time: '1-2 business days' },
    { id: 'sameday', name: 'Same-Day Delivery', price: 100000, time: 'Order before 2 PM' }
  ];

  const paymentMethods = [
    { id: 'transfer', name: 'Bank Transfer', icon: 'bank', description: 'BCA, Mandiri, BNI, BRI' },
    { id: 'ewallet', name: 'E-Wallet', icon: 'wallet', description: 'GoPay, OVO, Dana, ShopeePay' },
    { id: 'card', name: 'Credit/Debit Card', icon: 'card', description: 'Visa, Mastercard, JCB' },
    { id: 'cod', name: 'Cash on Delivery', icon: 'cash', description: 'Pay when you receive' }
  ];

  const shippingCost = shippingOptions.find(opt => opt.id === selectedShipping)?.price || 0;
  const total = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }

    if (!deliveryDate) {
      alert('Please select a delivery date');
      return;
    }

    // Generate order number
    const orderNumber = `PB${Date.now().toString().slice(-8)}`;
    const now = new Date();
    const orderDate = now.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Prepare order data
    const orderData = {
      orderNumber,
      orderDate,
      customerInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone
      },
      deliveryAddress: {
        address: formData.address,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
        notes: formData.notes
      },
      deliveryDate,
      shippingMethod: selectedShipping,
      shippingCost,
      paymentMethod: selectedPayment,
      items: cartItems,
      subtotal,
      total
    };

    onOrderComplete(orderData);
  };

  return (
    <section className="py-8 px-6 md:px-12 bg-[#FFF5F2] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#568F87] hover:text-[#064232] mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </button>
          
          <h1 className="text-4xl md:text-5xl text-[#064232] mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
            Checkout
          </h1>
          <p className="text-gray-600">
            Complete your order
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Forms (2 columns) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#FFF5F2] rounded-lg">
                    <User className="w-6 h-6 text-[#064232]" />
                  </div>
                  <h2 className="text-2xl text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#064232] mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064232] focus:border-transparent"
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#064232] mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064232] focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#064232] mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064232] focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#064232] mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064232] focus:border-transparent"
                        placeholder="08123456789"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#FFF5F2] rounded-lg">
                    <MapPin className="w-6 h-6 text-[#064232]" />
                  </div>
                  <h2 className="text-2xl text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                    Delivery Address
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#064232] mb-2">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064232] focus:border-transparent"
                      placeholder="Jl. Sudirman No. 123"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-[#064232] mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064232] focus:border-transparent"
                        placeholder="Jakarta"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-[#064232] mb-2">
                        Province <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064232] focus:border-transparent"
                        placeholder="DKI Jakarta"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-[#064232] mb-2">
                        Postal Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064232] focus:border-transparent"
                        placeholder="12190"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#064232] mb-2">
                      Delivery Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064232] focus:border-transparent resize-none"
                      placeholder="Building name, floor, any special instructions..."
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Date & Time */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#FFF5F2] rounded-lg">
                    <Calendar className="w-6 h-6 text-[#064232]" />
                  </div>
                  <h2 className="text-2xl text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                    Delivery Date
                  </h2>
                </div>

                <div>
                  <label className="block text-sm text-[#064232] mb-2">
                    Preferred Delivery Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064232] focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    💡 Order before 2 PM for same-day delivery option
                  </p>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#FFF5F2] rounded-lg">
                    <Truck className="w-6 h-6 text-[#064232]" />
                  </div>
                  <h2 className="text-2xl text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                    Shipping Method
                  </h2>
                </div>

                <div className="space-y-3">
                  {shippingOptions.map(option => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedShipping(option.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                        selectedShipping === option.id
                          ? 'bg-[#FFF5F2] border-[#064232]'
                          : 'border-gray-200 hover:border-[#568F87]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedShipping === option.id ? 'border-[#064232]' : 'border-gray-300'
                        }`}>
                          {selectedShipping === option.id && (
                            <div className="w-3 h-3 rounded-full bg-[#064232]" />
                          )}
                        </div>
                        <div className="text-left">
                          <p className="text-[#064232]">{option.name}</p>
                          <p className="text-sm text-gray-500">{option.time}</p>
                        </div>
                      </div>
                      <span className="text-[#568F87]">
                        {option.price === 0 ? 'FREE' : formatPrice(option.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#FFF5F2] rounded-lg">
                    <CreditCard className="w-6 h-6 text-[#064232]" />
                  </div>
                  <h2 className="text-2xl text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3">
                  {paymentMethods.map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedPayment(method.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                        selectedPayment === method.id
                          ? 'bg-[#FFF5F2] border-[#064232]'
                          : 'border-gray-200 hover:border-[#568F87]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPayment === method.id ? 'border-[#064232]' : 'border-gray-300'
                        }`}>
                          {selectedPayment === method.id && (
                            <div className="w-3 h-3 rounded-full bg-[#064232]" />
                          )}
                        </div>
                        <div className="text-left">
                          <p className="text-[#064232]">{method.name}</p>
                          <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Order Summary (1 column) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-6">
                <h2 className="text-2xl mb-6 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                  Order Summary
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {cartItems.map(item => {
                    const itemTotal = item.price;
                    const addOnsTotal = item.addOns?.reduce((sum, addOn) => sum + addOn.price, 0) || 0;
                    const lineTotal = (itemTotal + addOnsTotal) * item.quantity;

                    return (
                      <div key={item.id} className="pb-4 border-b border-gray-200 last:border-0">
                        <div className="flex gap-3 mb-2">
                          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm text-[#064232] mb-1 line-clamp-2">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>

                        {/* Add-ons */}
                        {item.addOns && item.addOns.length > 0 && (
                          <div className="bg-[#FFF5F2] p-2 rounded-lg mb-2">
                            <p className="text-xs text-[#568F87] mb-1 flex items-center gap-1">
                              <Gift className="w-3 h-3" />
                              Add-ons:
                            </p>
                            <ul className="space-y-0.5">
                              {item.addOns.map(addOn => (
                                <li key={addOn.id} className="text-xs text-gray-600">
                                  • {addOn.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Custom Message */}
                        {item.customMessage && (
                          <div className="bg-blue-50 p-2 rounded-lg mb-2">
                            <p className="text-xs text-blue-700 italic line-clamp-2">
                              💌 "{item.customMessage}"
                            </p>
                          </div>
                        )}

                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {formatPrice(itemTotal + addOnsTotal)} × {item.quantity}
                          </span>
                          <span className="text-sm text-[#568F87]">
                            {formatPrice(lineTotal)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pt-4 border-t-2 border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="text-[#064232]">{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-[#064232]">
                      {shippingCost === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        formatPrice(shippingCost)
                      )}
                    </span>
                  </div>

                  <div className="h-px bg-gray-200" />

                  <div className="flex justify-between">
                    <span className="text-lg text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                      Total
                    </span>
                    <span className="text-2xl text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  className="w-full bg-[#064232] hover:bg-[#568F87] text-white py-4 rounded-lg transition-colors mb-3"
                >
                  Place Order
                </button>

                <button 
                  type="button"
                  onClick={onBack}
                  className="w-full text-[#568F87] hover:text-[#064232] py-2 transition-colors"
                >
                  Back to Cart
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Secure payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Fresh flowers guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Money back guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}