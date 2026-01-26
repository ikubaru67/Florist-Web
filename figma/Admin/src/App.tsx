import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardPanel } from './components/DashboardPanel';
import { ProductsPanel } from './components/ProductsPanel';
import { ImageEditor } from './components/ImageEditor';
import { SettingsPanel } from './components/SettingsPanel';
import { ProductFormPage } from './components/ProductFormPage';
import { OrdersPanel } from './components/OrdersPanel';
import { AddOn } from './components/AddOnManager';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  additionalImages: string[];
  category: string;
  occasion: string;
  stock: number;
  isAvailable: boolean;
  availableAreas: string[];
}

interface Settings {
  categories: string[];
  occasions: string[];
  deliveryAreas: string[];
  defaultFilter: 'name' | 'latest' | 'best';
  bannerBackgroundImage: string;
  highlightedSectionTitle: string;
  addOns: AddOn[];
}

export default function App() {
  const [currentSection, setCurrentSection] = useState<'dashboard' | 'products' | 'settings' | 'add-product' | 'edit-product' | 'orders'>('dashboard');
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Pink Rose Bouquet', price: 'Rp 450.000', category: 'Romance', occasion: 'Valentine\'s Day', image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400', additionalImages: ['https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400'], stock: 10, isAvailable: true, availableAreas: ['Jakarta', 'Bandung'] },
    { id: 2, name: 'Lavender Fields', price: 'Rp 380.000', category: 'Seasonal', occasion: 'Thanksgiving', image: 'https://images.unsplash.com/photo-1595791204629-aacf7c90b905?w=400', additionalImages: ['https://images.unsplash.com/photo-1595791204629-aacf7c90b905?w=400'], stock: 5, isAvailable: true, availableAreas: ['Surabaya', 'Semarang'] },
    { id: 3, name: 'Sunflower Arrangement', price: 'Rp 420.000', category: 'Cheerful', occasion: 'Graduation', image: 'https://images.unsplash.com/photo-1597848212624-e4c29e3dedc3?w=400', additionalImages: ['https://images.unsplash.com/photo-1597848212624-e4c29e3dedc3?w=400'], stock: 8, isAvailable: true, availableAreas: ['Jakarta', 'Bandung'] },
    { id: 4, name: 'Colorful Tulips', price: 'Rp 520.000', category: 'Cheerful', occasion: 'Anniversary', image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400', additionalImages: ['https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400'], stock: 12, isAvailable: true, availableAreas: ['Surabaya', 'Semarang'] },
    { id: 5, name: 'Elegant Orchids', price: 'Rp 680.000', category: 'Luxury', occasion: 'Wedding', image: 'https://images.unsplash.com/photo-1558603668-6570496b66f8?w=400', additionalImages: ['https://images.unsplash.com/photo-1558603668-6570496b66f8?w=400'], stock: 3, isAvailable: true, availableAreas: ['Jakarta', 'Bandung'] },
    { id: 6, name: 'Wildflower Mix', price: 'Rp 350.000', category: 'Rustic', occasion: 'Birthday', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400', additionalImages: ['https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400'], stock: 7, isAvailable: true, availableAreas: ['Surabaya', 'Semarang'] },
  ]);
  
  const [bannerSettings, setBannerSettings] = useState({
    title: 'Fresh Blooms Daily',
    subtitle: 'Handpicked flowers delivered to your door',
    highlightedProducts: [1, 3, 5]
  });

  const [settings, setSettings] = useState<Settings>({
    categories: ['Romance', 'Seasonal', 'Cheerful', 'Spring', 'Luxury', 'Natural'],
    occasions: ['Birthday', 'Anniversary', 'Thanksgiving', 'Valentine\'s Day', 'Graduation', 'Wedding'],
    deliveryAreas: ['Jakarta', 'Bandung', 'Surabaya', 'Semarang'],
    defaultFilter: 'name',
    bannerBackgroundImage: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400',
    highlightedSectionTitle: 'Featured Products',
    addOns: []
  });

  const getPageTitle = () => {
    switch (currentSection) {
      case 'dashboard': return 'Dashboard';
      case 'products': return 'Product Management';
      case 'settings': return 'Settings';
      case 'add-product': return 'Add New Product';
      case 'edit-product': return 'Edit Product';
      case 'orders': return 'Orders';
      default: return 'Admin Panel';
    }
  };

  const getPageDescription = () => {
    switch (currentSection) {
      case 'dashboard': return 'Overview of your store\'s performance';
      case 'products': return 'Add, edit, and manage your flower products';
      case 'settings': return 'Configure your store settings and preferences';
      case 'add-product': return 'Fill in the details to create a new product';
      case 'edit-product': return 'Update product information';
      case 'orders': return 'Manage and track customer orders';
      default: return '';
    }
  };

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct = {
      ...productData,
      id: Math.max(...products.map(p => p.id), 0) + 1
    };
    setProducts([...products, newProduct]);
    setCurrentSection('products');
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setCurrentSection('products');
    setEditingProductId(null);
  };

  const handleNavigateToAddProduct = () => {
    setCurrentSection('add-product');
  };

  const handleNavigateToEditProduct = (productId: number) => {
    setEditingProductId(productId);
    setCurrentSection('edit-product');
  };

  const handleBackToProducts = () => {
    setCurrentSection('products');
    setEditingProductId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex">
      {(currentSection === 'add-product' || currentSection === 'edit-product') ? (
        <ProductFormPage
          product={currentSection === 'edit-product' && editingProductId ? products.find(p => p.id === editingProductId) || null : null}
          onSave={currentSection === 'add-product' ? handleAddProduct : handleEditProduct}
          onBack={handleBackToProducts}
          categories={settings.categories}
          occasions={settings.occasions}
          deliveryAreas={settings.deliveryAreas}
        />
      ) : (
        <>
          <Sidebar currentSection={currentSection} onSectionChange={setCurrentSection} />
          
          <div className="flex-1">
            <div className="mx-auto max-w-7xl p-6 lg:p-8">
              <div className="mb-8">
                <h1 className="text-gray-900 mb-2">{getPageTitle()}</h1>
                <p className="text-gray-600">{getPageDescription()}</p>
              </div>

              {currentSection === 'dashboard' && (
                <DashboardPanel 
                  products={products} 
                  setProducts={setProducts}
                  settings={settings}
                />
              )}

              {currentSection === 'products' && (
                <ProductsPanel 
                  products={products} 
                  setProducts={setProducts}
                  settings={settings}
                  onAddProduct={handleNavigateToAddProduct}
                  onEditProduct={handleNavigateToEditProduct}
                />
              )}

              {currentSection === 'settings' && (
                <SettingsPanel 
                  settings={settings}
                  setSettings={setSettings}
                />
              )}

              {currentSection === 'orders' && (
                <OrdersPanel products={products} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}