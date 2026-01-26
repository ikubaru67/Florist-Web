import { ShoppingCart, X, Minus, Plus, Trash2 } from 'lucide-react';

export interface AddOnItem {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  occasion: string;
  addOns?: AddOnItem[];
  customMessage?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }: CartDrawerProps) {
  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString('id-ID')}`;
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full md:w-[450px] bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-[#064232]" />
            <h2 className="text-2xl text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
              Shopping Cart
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
              <p className="text-gray-400 text-sm">Add some beautiful flowers to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4 bg-[#FFF5F2] p-4 rounded-lg">
                  {/* Image */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#064232] mb-1" style={{ fontFamily: 'Merriweather, serif' }}>
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">{item.occasion}</p>
                    <p className="text-[#568F87]">{formatPrice(item.price)}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 hover:bg-white rounded transition-colors"
                      >
                        <Minus className="w-4 h-4 text-[#064232]" />
                      </button>
                      <span className="text-sm w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white rounded transition-colors"
                      >
                        <Plus className="w-4 h-4 text-[#064232]" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 hover:bg-white rounded-lg transition-colors h-fit"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-[#064232]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="text-[#064232]">Calculated at checkout</span>
              </div>
              <div className="h-px bg-gray-200 my-3" />
              <div className="flex justify-between">
                <span className="text-lg text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>Total</span>
                <span className="text-xl text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>{formatPrice(subtotal)}</span>
              </div>
            </div>
            
            <button className="w-full bg-[#064232] hover:bg-[#568F87] text-white py-3 rounded-lg transition-colors">
              Proceed to Checkout
            </button>
            <button 
              onClick={onClose}
              className="w-full mt-2 text-[#568F87] hover:text-[#064232] py-2 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}