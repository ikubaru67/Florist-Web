import { useState } from 'react';
import { Package, Plus, Pencil, Trash2, AlertCircle, CheckCircle, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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
  defaultFilter: 'name' | 'latest' | 'best';
}

interface ProductsPanelProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  settings: Settings;
  onAddProduct: () => void;
  onEditProduct: (productId: number) => void;
}

export function ProductsPanel({ products, setProducts, settings, onAddProduct, onEditProduct }: ProductsPanelProps) {
  // Sort products based on settings
  const sortedProducts = [...products].sort((a, b) => {
    switch (settings.defaultFilter) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'latest':
        return b.id - a.id; // Higher ID = newer product
      case 'best':
        // For demo purposes, sort by price (higher = better)
        const priceA = parseFloat(a.price.replace('Rp ', '').replace(/\./g, ''));
        const priceB = parseFloat(b.price.replace('Rp ', '').replace(/\./g, ''));
        return priceB - priceA;
      default:
        return 0;
    }
  });

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleToggleAvailability = (id: number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, isAvailable: !p.isAvailable } : p
    ));
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-700 border-red-200' };
    if (stock <= 5) return { label: `Low Stock (${stock})`, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
    return { label: `In Stock (${stock})`, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900">Products</h2>
              <p className="text-gray-500 text-sm">Manage your flower catalog</p>
            </div>
          </div>
          <button
            onClick={onAddProduct}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
        <div className="space-y-2">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group"
            >
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-900 truncate mb-1">{product.name}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-gray-900">{product.price}</span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs">
                    {product.category}
                  </span>
                  <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-md text-xs">
                    {product.occasion}
                  </span>
                  <span className={`px-2 py-1 rounded-md text-xs border ${getStockStatus(product.stock).color}`}>
                    {getStockStatus(product.stock).label}
                  </span>
                  {!product.isAvailable && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs border border-gray-300">
                      Hidden
                    </span>
                  )}
                </div>
                {product.availableAreas && product.availableAreas.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span className="text-xs text-blue-700">
                      {product.availableAreas.join(', ')}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleToggleAvailability(product.id)}
                  className={`px-3 py-2 rounded-lg text-xs transition-colors ${
                    product.isAvailable
                      ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title={product.isAvailable ? 'Hide from customers' : 'Show to customers'}
                >
                  {product.isAvailable ? 'Visible' : 'Hidden'}
                </button>
                <button
                  onClick={() => onEditProduct(product.id)}
                  className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-16 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
            <Package className="w-10 h-10 text-emerald-600" />
          </div>
          <h3 className="text-gray-900 mb-2">No Products Yet</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Start building your flower catalog by adding your first product.
          </p>
          <button
            onClick={onAddProduct}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Add Your First Product</span>
          </button>
        </div>
      )}
    </div>
  );
}