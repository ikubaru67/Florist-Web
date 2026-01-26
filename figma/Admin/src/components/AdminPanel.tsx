import { Settings } from 'lucide-react';
import { ProductSelector } from './ProductSelector';

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

interface AdminPanelProps {
  bannerSettings: BannerSettings;
  setBannerSettings: (settings: BannerSettings) => void;
  products: Product[];
}

export function AdminPanel({ bannerSettings, setBannerSettings, products }: AdminPanelProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBannerSettings({ ...bannerSettings, title: e.target.value });
  };

  const handleSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBannerSettings({ ...bannerSettings, subtitle: e.target.value });
  };

  const handleProductToggle = (productId: number) => {
    const currentProducts = bannerSettings.highlightedProducts;
    const isSelected = currentProducts.includes(productId);
    
    let newProducts;
    if (isSelected) {
      newProducts = currentProducts.filter(id => id !== productId);
    } else {
      if (currentProducts.length >= 3) {
        newProducts = [...currentProducts.slice(1), productId];
      } else {
        newProducts = [...currentProducts, productId];
      }
    }
    
    setBannerSettings({ ...bannerSettings, highlightedProducts: newProducts });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-8 h-fit sticky top-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <Settings className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-gray-900">Banner Settings</h2>
          <p className="text-gray-500 text-sm">Configure homepage banner content</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-700 mb-2.5">
            Banner Title
          </label>
          <input
            id="title"
            type="text"
            value={bannerSettings.title}
            onChange={handleTitleChange}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm hover:border-emerald-300"
            placeholder="Enter banner title"
          />
        </div>

        <div>
          <label htmlFor="subtitle" className="block text-gray-700 mb-2.5">
            Banner Subtitle
          </label>
          <input
            id="subtitle"
            type="text"
            value={bannerSettings.subtitle}
            onChange={handleSubtitleChange}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm hover:border-emerald-300"
            placeholder="Enter banner subtitle"
          />
        </div>

        <div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1.5">
              Highlighted Products
            </label>
            <div className="flex items-center justify-between">
              <p className="text-gray-500 text-sm">
                Select up to 3 products to feature
              </p>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                {bannerSettings.highlightedProducts.length}/3
              </span>
            </div>
          </div>
          <ProductSelector
            selectedProducts={bannerSettings.highlightedProducts}
            onProductToggle={handleProductToggle}
            products={products}
          />
        </div>
      </div>
    </div>
  );
}