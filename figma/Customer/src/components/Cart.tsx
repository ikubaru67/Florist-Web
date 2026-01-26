import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft, Gift } from 'lucide-react';
import { CartItem } from './CartDrawer';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onBackToShop: () => void;
  onCheckout: () => void;
}

export function Cart({ cartItems, onUpdateQuantity, onRemoveItem, onBackToShop, onCheckout }: CartProps) {
  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString('id-ID')}`;
  };

  // Calculate subtotal including add-ons
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.price;
    const addOnsPrice = item.addOns?.reduce((sum, addOn) => sum + addOn.price, 0) || 0;
    return total + ((itemPrice + addOnsPrice) * item.quantity);
  }, 0);
  const shipping = 0; // Free shipping atau bisa di-calculate
  const total = subtotal + shipping;

  return (
    <section className="py-12 px-6 md:px-12 bg-[#FFF5F2] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={onBackToShop}
            className="flex items-center gap-2 text-[#568F87] hover:text-[#064232] mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="w-8 h-8 text-[#064232]" />
            <h1 className="text-4xl md:text-5xl text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
              Shopping Cart
            </h1>
          </div>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-lg p-16 text-center">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl mb-3 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Add some beautiful flowers to get started!
            </p>
            <button 
              onClick={onBackToShop}
              className="bg-[#064232] hover:bg-[#568F87] text-white px-8 py-3 rounded-lg transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Left Side (2 columns) */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => {
                const itemTotal = item.price;
                const addOnsTotal = item.addOns?.reduce((sum, addOn) => sum + addOn.price, 0) || 0;
                const lineTotal = (itemTotal + addOnsTotal) * item.quantity;

                return (
                  <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex gap-6">
                      {/* Image */}
                      <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="text-xl mb-1 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                              {item.name}
                            </h3>
                            <div className="flex gap-2 mb-2">
                              <span className="text-xs bg-[#064232] text-white px-2 py-1 rounded-full">
                                {item.category}
                              </span>
                              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                                {item.occasion}
                              </span>
                            </div>

                            {/* Add-ons */}
                            {item.addOns && item.addOns.length > 0 && (
                              <div className="mt-3 p-3 bg-[#FFF5F2] rounded-lg">
                                <div className="flex items-center gap-1 mb-2">
                                  <Gift className="w-4 h-4 text-[#568F87]" />
                                  <span className="text-sm text-[#064232]">Add-ons:</span>
                                </div>
                                <ul className="space-y-1">
                                  {item.addOns.map(addOn => (
                                    <li key={addOn.id} className="text-sm text-gray-600 flex justify-between">
                                      <span>• {addOn.name}</span>
                                      <span className="text-[#568F87]">{formatPrice(addOn.price)}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Custom Message */}
                            {item.customMessage && (
                              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-xs text-blue-800 mb-1">💌 Custom Message:</p>
                                <p className="text-sm text-gray-700 italic">"{item.customMessage}"</p>
                              </div>
                            )}
                          </div>
                          
                          {/* Remove Button */}
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors group ml-4"
                          >
                            <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-4 bg-[#FFF5F2] px-4 py-2 rounded-lg">
                            <button
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="p-1 hover:bg-white rounded transition-colors"
                            >
                              <Minus className="w-4 h-4 text-[#064232]" />
                            </button>
                            <span className="w-12 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-white rounded transition-colors"
                            >
                              <Plus className="w-4 h-4 text-[#064232]" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">
                              {formatPrice(itemTotal + addOnsTotal)} × {item.quantity}
                            </p>
                            <p className="text-xl text-[#568F87]">
                              {formatPrice(lineTotal)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary - Right Side (1 column) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-6">
                <h2 className="text-2xl mb-6 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="text-[#064232]">{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-[#064232]">
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
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

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm text-gray-600 mb-2">Promo Code</label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064232]"
                    />
                    <button className="px-4 py-2 bg-[#568F87] hover:bg-[#064232] text-white rounded-lg transition-colors">
                      Apply
                    </button>
                  </div>
                </div>

                <button className="w-full bg-[#064232] hover:bg-[#568F87] text-white py-3 rounded-lg transition-colors mb-3" onClick={onCheckout}>
                  Proceed to Checkout
                </button>
                
                <button 
                  onClick={onBackToShop}
                  className="w-full text-[#568F87] hover:text-[#064232] py-2 transition-colors"
                >
                  Continue Shopping
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Free delivery on orders over Rp500.000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Fresh flowers guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span>Same-day delivery available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}