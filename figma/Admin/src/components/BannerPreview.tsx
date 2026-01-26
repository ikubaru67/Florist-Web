import { Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

interface BannerSettings {
  title: string;
  subtitle: string;
  highlightedProducts: number[];
}

interface Settings {
  bannerBackgroundImage: string;
  defaultFilter: 'name' | 'latest' | 'best';
  highlightedSectionTitle: string;
}

interface BannerPreviewProps {
  bannerSettings: BannerSettings;
  products: Product[];
  settings: Settings;
}

export function BannerPreview({ bannerSettings, products, settings }: BannerPreviewProps) {
  const highlightedProducts = products.filter(p => 
    bannerSettings.highlightedProducts.includes(p.id)
  );

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30">
          <Eye className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-gray-900">Live Preview</h2>
          <p className="text-gray-500 text-sm">See how your banner will look</p>
        </div>
      </div>

      <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-lg bg-white">
        {/* Banner Hero Section */}
        <div 
          className="relative h-96 bg-gradient-to-br from-emerald-600 via-teal-500 to-green-600 flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url(${settings.bannerBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-teal-900/50 to-green-900/60"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white/90 text-sm mb-6 border border-white/30">
              <Sparkles className="w-4 h-4" />
              <span>Premium Quality Flowers</span>
            </div>
            <h1 className="text-white mb-4 drop-shadow-2xl">
              {bannerSettings.title || 'Your Banner Title'}
            </h1>
            <p className="text-white/95 mb-8 drop-shadow-lg max-w-2xl mx-auto text-lg">
              {bannerSettings.subtitle || 'Your banner subtitle goes here'}
            </p>
            <div className="flex items-center justify-center gap-4">
              <button className="bg-white text-emerald-700 px-8 py-3.5 rounded-xl hover:bg-emerald-50 transition-all shadow-2xl hover:shadow-xl hover:scale-105 duration-300">
                Shop Now
              </button>
              <button className="bg-white/20 backdrop-blur-md text-white px-8 py-3.5 rounded-xl hover:bg-white/30 transition-all border border-white/40">
                View Collection
              </button>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        {highlightedProducts.length > 0 && (
          <div className="bg-gradient-to-b from-gray-50 to-white p-10">
            <div className="mb-8 text-center">
              <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm mb-3">
                Featured Collection
              </div>
              <h2 className="text-gray-900 mb-2">{settings.highlightedSectionTitle}</h2>
              <p className="text-gray-600">Our most beautiful arrangements</p>
            </div>

            <div className={`grid gap-6 ${
              highlightedProducts.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' :
              highlightedProducts.length === 2 ? 'grid-cols-2 max-w-3xl mx-auto' :
              'grid-cols-3'
            }`}>
              {highlightedProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100 hover:-translate-y-2"
                >
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs text-emerald-700 shadow-lg">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">{product.price}</span>
                      <button className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center group-hover:scale-110 duration-300">
                        <ShoppingBag className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {highlightedProducts.length === 0 && (
          <div className="bg-gradient-to-b from-gray-50 to-white p-16 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
              <ShoppingBag className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-gray-900 mb-2">No Products Selected</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Choose up to 3 products from the left panel to feature them on your homepage banner.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}