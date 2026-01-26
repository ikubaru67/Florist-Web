import { useState } from 'react';
import { Hero } from './components/Hero';
import { FeaturedProducts } from './components/FeaturedProducts';
import { CatalogPreview } from './components/CatalogPreview';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FullCatalog } from './components/FullCatalog';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { Receipt } from './components/Receipt';
import { ProductDetail } from './components/ProductDetail';
import { CartItem } from './components/CartDrawer';
import { AreaSelector } from './components/AreaSelector';
import { Flower2, ShoppingCart } from 'lucide-react';
import { toast, Toaster } from 'sonner@2.0.3';

// Product data with full details
const productsData = [
  {
    id: 1,
    name: 'Pink Rose Bouquet',
    price: 675000,
    category: 'Bouquets',
    color: 'Pink',
    occasion: 'Romance',
    image: 'https://images.unsplash.com/photo-1672243691196-9b7f64cce1c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZXMlMjBib3VxdWV0fGVufDF8fHx8MTc2NTYyMDYzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'A stunning arrangement of premium pink roses, carefully selected and hand-tied by our expert florists. Perfect for expressing romance and love. Each bouquet contains 12-15 fresh roses with complementary greenery and elegant wrapping.',
    images: [
      'https://images.unsplash.com/photo-1672243691196-9b7f64cce1c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZXMlMjBib3VxdWV0fGVufDF8fHx8MTc2NTYyMDYzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1712258093579-190d48841a93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZXMlMjBjbG9zZXVwfGVufDF8fHx8MTc2NTY4NDIwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1760373071337-183f5ca5171b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZSUyMGJvdXF1ZXQlMjBkZXRhaWx8ZW58MXx8fHwxNzY1Njg0MjA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1610021684263-9da72ff8211d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3NlJTIwYXJyYW5nZW1lbnQlMjB0b3AlMjB2aWV3fGVufDF8fHx8MTc2NTY4NDIwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1753982861953-9d83250dc213?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZXMlMjB3cmFwcGVkfGVufDF8fHx8MTc2NTY4NDIwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  // Add more products as needed with default values for missing properties
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalog' | 'cart' | 'checkout' | 'receipt' | 'product'>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderData, setOrderData] = useState<any>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [showAreaSelector, setShowAreaSelector] = useState(false);

  // Add to cart function
  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        toast.success(`Increased quantity of ${product.name}`);
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success(`${product.name} added to cart!`);
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Update quantity
  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Remove item
  const removeItem = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      toast.success(`${item.name} removed from cart`);
    }
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Handle order complete
  const handleOrderComplete = (data: any) => {
    setOrderData(data);
    setCartItems([]); // Clear cart
    setCurrentPage('receipt');
  };

  // Cart Page
  if (currentPage === 'cart') {
    return (
      <div className="min-h-screen bg-white">
        <Toaster position="top-right" richColors />
        
        {/* Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
            <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-[#064232] hover:text-[#568F87] transition-colors">
              <Flower2 className="w-8 h-8" />
              <span className="text-xl" style={{ fontFamily: 'Merriweather, serif' }}>Kala Florist</span>
            </button>
            <div className="hidden md:flex items-center gap-8 text-[#064232]">
              <button onClick={() => setCurrentPage('home')} className="hover:text-[#568F87] transition-colors">Home</button>
              <button onClick={() => setCurrentPage('catalog')} className="hover:text-[#568F87] transition-colors">Shop</button>
              <a href="#services" className="hover:text-[#568F87] transition-colors">Services</a>
              <a href="#about" className="hover:text-[#568F87] transition-colors">About</a>
              <a href="#contact" className="hover:text-[#568F87] transition-colors">Contact</a>
            </div>
            {/* Cart Icon */}
            <button 
              onClick={() => setCurrentPage('cart')}
              className="relative p-2 hover:bg-[#FFF5F2] rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-[#568F87]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F5BABB] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </nav>

        <Cart 
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onBackToShop={() => setCurrentPage('catalog')}
          onCheckout={() => setCurrentPage('checkout')}
        />
        <Footer />
      </div>
    );
  }

  // Checkout Page
  if (currentPage === 'checkout') {
    return (
      <div className="min-h-screen bg-white">
        <Toaster position="top-right" richColors />
        
        {/* Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
            <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-[#064232] hover:text-[#568F87] transition-colors">
              <Flower2 className="w-8 h-8" />
              <span className="text-xl" style={{ fontFamily: 'Merriweather, serif' }}>Kala Florist</span>
            </button>
            <div className="hidden md:flex items-center gap-8 text-[#064232]">
              <button onClick={() => setCurrentPage('home')} className="hover:text-[#568F87] transition-colors">Home</button>
              <button onClick={() => setCurrentPage('catalog')} className="hover:text-[#568F87] transition-colors">Shop</button>
              <a href="#services" className="hover:text-[#568F87] transition-colors">Services</a>
              <a href="#about" className="hover:text-[#568F87] transition-colors">About</a>
              <a href="#contact" className="hover:text-[#568F87] transition-colors">Contact</a>
            </div>
            {/* Cart Icon */}
            <button 
              onClick={() => setCurrentPage('cart')}
              className="relative p-2 hover:bg-[#FFF5F2] rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-[#568F87]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F5BABB] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </nav>

        <Checkout 
          cartItems={cartItems}
          onBack={() => setCurrentPage('cart')}
          onOrderComplete={handleOrderComplete}
        />
        <Footer />
      </div>
    );
  }

  // Receipt Page
  if (currentPage === 'receipt' && orderData) {
    return (
      <div className="min-h-screen bg-white print:bg-white">
        <Receipt 
          orderData={orderData}
          onBackToHome={() => setCurrentPage('home')}
        />
      </div>
    );
  }

  if (currentPage === 'catalog') {
    return (
      <div className="min-h-screen bg-white">
        <Toaster position="top-right" richColors />
        
        {/* Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
            <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-[#064232] hover:text-[#568F87] transition-colors">
              <Flower2 className="w-8 h-8" />
              <span className="text-xl" style={{ fontFamily: 'Merriweather, serif' }}>Kala Florist</span>
            </button>
            <div className="hidden md:flex items-center gap-8 text-[#064232]">
              <button onClick={() => setCurrentPage('home')} className="hover:text-[#568F87] transition-colors">Home</button>
              <button className="text-[#568F87]">Shop</button>
              <a href="#services" className="hover:text-[#568F87] transition-colors">Services</a>
              <a href="#about" className="hover:text-[#568F87] transition-colors">About</a>
              <a href="#contact" className="hover:text-[#568F87] transition-colors">Contact</a>
            </div>
            <div className="flex items-center gap-4">
              {/* Area Selector */}
              <AreaSelector 
                selectedArea={selectedArea}
                onAreaChange={setSelectedArea}
                showModal={showAreaSelector}
                onCloseModal={() => setShowAreaSelector(false)}
              />
              
              {/* Cart Icon */}
              <button 
                onClick={() => setCurrentPage('cart')}
                className="relative p-2 hover:bg-[#FFF5F2] rounded-lg transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-[#064232]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#F5BABB] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>

        <FullCatalog 
          onAddToCart={addToCart} 
          onViewProduct={(id) => {
            setSelectedProductId(id);
            setCurrentPage('product');
          }} 
          selectedArea={selectedArea}
        />
        <Footer />
      </div>
    );
  }

  if (currentPage === 'product' && selectedProductId !== null) {
    const product = productsData.find(p => p.id === selectedProductId);
    if (product) {
      return (
        <div className="min-h-screen bg-white">
          <Toaster position="top-right" richColors />
          
          {/* Navigation */}
          <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
              <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-[#064232] hover:text-[#568F87] transition-colors">
                <Flower2 className="w-8 h-8" />
                <span className="text-xl" style={{ fontFamily: 'Merriweather, serif' }}>Kala Florist</span>
              </button>
              <div className="hidden md:flex items-center gap-8 text-[#064232]">
                <button onClick={() => setCurrentPage('home')} className="hover:text-[#568F87] transition-colors">Home</button>
                <button onClick={() => setCurrentPage('catalog')} className="hover:text-[#568F87] transition-colors">Shop</button>
                <a href="#services" className="hover:text-[#568F87] transition-colors">Services</a>
                <a href="#about" className="hover:text-[#568F87] transition-colors">About</a>
                <a href="#contact" className="hover:text-[#568F87] transition-colors">Contact</a>
              </div>
              {/* Cart Icon */}
              <button 
                onClick={() => setCurrentPage('cart')}
                className="relative p-2 hover:bg-[#FFF5F2] rounded-lg transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-[#568F87]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#F5BABB] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </nav>

          <ProductDetail 
            product={product}
            onAddToCart={addToCart}
            onBack={() => setCurrentPage('catalog')}
          />
          <Footer />
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero onNavigateToCatalog={() => setCurrentPage('catalog')} />
      <FeaturedProducts />
      <CatalogPreview onNavigateToCatalog={() => setCurrentPage('catalog')} />
      <Contact />
      <Footer />
    </div>
  );
}