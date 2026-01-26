import { Package, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  additionalImages: string[];
  category: string;
  occasion: string;
}

interface Settings {
  defaultFilter: 'name' | 'latest' | 'best';
  categories: string[];
  occasions: string[];
}

interface DashboardPanelProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  settings: Settings;
}

export function DashboardPanel({ products, settings }: DashboardPanelProps) {
  // Calculate statistics
  const totalProducts = products.length;
  const totalCategories = settings.categories.length;
  const totalOccasions = settings.occasions.length;

  // Calculate average price
  const averagePrice = products.length > 0
    ? Math.round(
        products.reduce((sum, p) => {
          const price = parseFloat(p.price.replace('Rp ', '').replace(/\./g, ''));
          return sum + price;
        }, 0) / products.length
      )
    : 0;

  const formatPrice = (price: number) => {
    return 'Rp ' + price.toLocaleString('id-ID');
  };

  // Get latest products
  const latestProducts = [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Products</p>
              <p className="text-gray-900">{totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Categories</p>
              <p className="text-gray-900">{totalCategories}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Occasions</p>
              <p className="text-gray-900">{totalOccasions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Avg. Price</p>
              <p className="text-gray-900">{formatPrice(averagePrice)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Products */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
        <h2 className="text-gray-900 mb-6">Latest Products</h2>
        
        {latestProducts.length > 0 ? (
          <div className="space-y-3">
            {latestProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50 transition-all"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 truncate mb-1">{product.name}</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-gray-600">{product.price}</span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs">
                      {product.category}
                    </span>
                    <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-md text-xs">
                      {product.occasion}
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

      {/* Category Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
        <h2 className="text-gray-900 mb-6">Category Distribution</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {settings.categories.map((category) => {
            const count = products.filter(p => p.category === category).length;
            return (
              <div
                key={category}
                className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200"
              >
                <p className="text-emerald-900 mb-1">{category}</p>
                <p className="text-emerald-700">{count} product{count !== 1 ? 's' : ''}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
