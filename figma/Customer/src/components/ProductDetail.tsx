import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Heart, Minus, Plus, Truck, Shield, Star, Gift, Package } from 'lucide-react';
import { CartItem } from './CartDrawer';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  occasion: string;
  description: string;
  images: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  icon: 'gift' | 'package';
}

const availableAddOns: AddOn[] = [
  { id: 'card', name: 'Personalized Greeting Card', price: 25000, icon: 'gift' },
  { id: 'wrapping', name: 'Premium Gift Wrapping', price: 35000, icon: 'package' },
  { id: 'vase', name: 'Glass Vase', price: 150000, icon: 'package' },
  { id: 'chocolate', name: 'Belgian Chocolates Box', price: 180000, icon: 'gift' },
  { id: 'teddy', name: 'Small Teddy Bear', price: 120000, icon: 'gift' },
];

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Omit<CartItem, 'quantity'>) => void;
}

export function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString('id-ID')}`;
  };

  const toggleAddOn = (addOnId: string) => {
    if (selectedAddOns.includes(addOnId)) {
      setSelectedAddOns(selectedAddOns.filter(id => id !== addOnId));
    } else {
      setSelectedAddOns([...selectedAddOns, addOnId]);
    }
  };

  // Calculate total with add-ons
  const addOnsTotal = selectedAddOns.reduce((total, addOnId) => {
    const addOn = availableAddOns.find(a => a.id === addOnId);
    return total + (addOn?.price || 0);
  }, 0);

  const totalPrice = (product.price + addOnsTotal) * quantity;

  const handleAddToCart = () => {
    const addOnItems = selectedAddOns.map(addOnId => {
      const addOn = availableAddOns.find(a => a.id === addOnId);
      return addOn ? { id: addOn.id, name: addOn.name, price: addOn.price } : null;
    }).filter(Boolean) as { id: string; name: string; price: number }[];

    for (let i = 0; i < quantity; i++) {
      onAddToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        occasion: product.occasion,
        addOns: addOnItems.length > 0 ? addOnItems : undefined,
        customMessage: customMessage.trim() || undefined
      });
    }
  };

  return (
    <section className="py-8 px-6 md:px-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb & Back Button */}
        <div className="mb-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#568F87] hover:text-[#064232] mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Shop
          </button>
          
          <div className="text-sm text-gray-500">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span>{product.category}</span>
            <span className="mx-2">/</span>
            <span className="text-[#064232]">{product.name}</span>
          </div>
        </div>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Gallery */}
          <div>
            {/* Main Image */}
            <div className="mb-4 rounded-lg overflow-hidden bg-[#FFF5F2] aspect-square">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-[#064232] scale-95' 
                      : 'border-transparent hover:border-[#568F87]'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-3">
              <span className="text-xs bg-[#064232] text-white px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="text-xs bg-[#568F87] text-white px-3 py-1 rounded-full">
                {product.occasion}
              </span>
              {product.inStock && (
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  In Stock
                </span>
              )}
            </div>

            {/* Product Name */}
            <h1 className="text-4xl mb-3 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl text-[#568F87]" style={{ fontFamily: 'Merriweather, serif' }}>
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Description */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-lg mb-2 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm mb-2 text-[#064232]">Quantity</label>
              <div className="flex items-center gap-4 bg-[#FFF5F2] px-4 py-3 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:bg-white rounded transition-colors"
                >
                  <Minus className="w-5 h-5 text-[#064232]" />
                </button>
                <span className="w-12 text-center text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:bg-white rounded transition-colors"
                >
                  <Plus className="w-5 h-5 text-[#064232]" />
                </button>
              </div>
            </div>

            {/* Add-ons */}
            <div className="mb-6">
              <h3 className="text-lg mb-3 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                Add-ons
              </h3>
              <div className="space-y-2 mb-4">
                {availableAddOns.map(addOn => {
                  const isSelected = selectedAddOns.includes(addOn.id);
                  return (
                    <button
                      key={addOn.id}
                      onClick={() => toggleAddOn(addOn.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                        isSelected 
                          ? 'bg-[#FFF5F2] border-[#064232]' 
                          : 'border-gray-200 hover:border-[#568F87]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#064232] text-white' : 'bg-gray-100 text-gray-600'}`}>
                          {addOn.icon === 'gift' ? <Gift className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                        </div>
                        <span className="text-[#064232]">{addOn.name}</span>
                      </div>
                      <span className="text-[#568F87]">+ {formatPrice(addOn.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Message */}
            <div className="mb-6">
              <label className="block text-lg mb-2 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                Custom Message
              </label>
              <p className="text-sm text-gray-600 mb-3">
                Add a personalized message for your card (optional, max 200 characters)
              </p>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value.slice(0, 200))}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064232] focus:border-transparent resize-none"
                rows={4}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {customMessage.length}/200
              </div>
            </div>

            {/* Price Summary */}
            {(selectedAddOns.length > 0 || quantity > 1) && (
              <div className="mb-6 bg-[#FFF5F2] p-5 rounded-lg space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Product ({quantity}x)</span>
                  <span>{formatPrice(product.price * quantity)}</span>
                </div>
                {selectedAddOns.length > 0 && (
                  <>
                    {selectedAddOns.map(addOnId => {
                      const addOn = availableAddOns.find(a => a.id === addOnId);
                      if (!addOn) return null;
                      return (
                        <div key={addOnId} className="flex justify-between text-sm text-gray-600">
                          <span>+ {addOn.name}</span>
                          <span>{formatPrice(addOn.price * quantity)}</span>
                        </div>
                      );
                    })}
                  </>
                )}
                <div className="h-px bg-gray-300 my-2" />
                <div className="flex justify-between text-lg text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-[#064232] hover:bg-[#568F87] text-white py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isFavorite 
                    ? 'bg-[#F5BABB] border-[#F5BABB]' 
                    : 'border-gray-300 hover:border-[#F5BABB]'
                }`}
              >
                <Heart 
                  className={`w-6 h-6 ${
                    isFavorite ? 'fill-white text-white' : 'text-gray-600'
                  }`}
                />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-4 bg-[#FFF5F2] p-6 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg">
                  <Truck className="w-5 h-5 text-[#064232]" />
                </div>
                <div>
                  <h4 className="text-sm text-[#064232] mb-1">Free Delivery</h4>
                  <p className="text-sm text-gray-600">On orders over Rp500.000</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg">
                  <Shield className="w-5 h-5 text-[#064232]" />
                </div>
                <div>
                  <h4 className="text-sm text-[#064232] mb-1">Freshness Guarantee</h4>
                  <p className="text-sm text-gray-600">100% fresh flowers or your money back</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg">
                  <Star className="w-5 h-5 text-[#064232]" />
                </div>
                <div>
                  <h4 className="text-sm text-[#064232] mb-1">Same-Day Delivery</h4>
                  <p className="text-sm text-gray-600">Order before 2 PM for same-day delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <div className="max-w-3xl">
            <h3 className="text-2xl mb-4 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
              Product Details
            </h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex">
                <span className="w-40 text-[#064232]">Category:</span>
                <span>{product.category}</span>
              </div>
              <div className="flex">
                <span className="w-40 text-[#064232]">Occasion:</span>
                <span>{product.occasion}</span>
              </div>
              <div className="flex">
                <span className="w-40 text-[#064232]">Availability:</span>
                <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="flex">
                <span className="w-40 text-[#064232]">Care Instructions:</span>
                <span>Keep in cool place, change water daily, trim stems every 2-3 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}