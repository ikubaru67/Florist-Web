import { useState } from 'react';
import { Filter, X, ChevronDown, Heart, MapPin } from 'lucide-react';
import { CartItem } from './CartDrawer';
import { AVAILABLE_AREAS } from './AreaSelector';

interface FullCatalogProps {
  onAddToCart: (product: Omit<CartItem, 'quantity'>) => void;
  onViewProduct: (productId: number) => void;
  selectedArea?: string | null;
}

const allProducts = [
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
    availableAreas: ['jakarta-pusat', 'jakarta-selatan', 'jakarta-utara', 'jakarta-barat', 'jakarta-timur', 'tangerang', 'bekasi', 'depok'],
  },
  {
    id: 2,
    name: 'Elegant Orchid',
    price: 1020000,
    category: 'Premium',
    color: 'White',
    occasion: 'Corporate',
    image: 'https://images.unsplash.com/photo-1759549885072-ea7f9fc57bcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmNoaWQlMjBmbG93ZXJzJTIwZWxlZ2FudHxlbnwxfHx8fDE3NjU2ODA2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    availableAreas: ['jakarta-pusat', 'jakarta-selatan', 'jakarta-utara', 'bandung', 'surabaya'],
  },
  {
    id: 3,
    name: 'Peony Collection',
    price: 825000,
    category: 'Bouquets',
    color: 'Pink',
    occasion: 'Wedding',
    image: 'https://images.unsplash.com/photo-1631041871361-eb12496074c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9ueSUyMGJvdXF1ZXR8ZW58MXx8fHwxNzY1NTY2MTg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    availableAreas: ['jakarta-selatan', 'bandung', 'surabaya', 'yogyakarta'],
  },
  {
    id: 4,
    name: 'White Lily',
    price: 630000,
    category: 'Single Type',
    color: 'White',
    occasion: 'Sympathy',
    image: 'https://images.unsplash.com/photo-1653267409726-a77cd6b3aa78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWx5JTIwZmxvd2VycyUyMHdoaXRlfGVufDF8fHx8MTc2NTY4MDY3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    availableAreas: ['jakarta-pusat', 'jakarta-selatan', 'jakarta-utara', 'jakarta-barat', 'jakarta-timur', 'tangerang', 'bekasi', 'depok', 'bogor', 'bandung', 'surabaya', 'yogyakarta'],
  },
  {
    id: 5,
    name: 'Sunflower Joy',
    price: 570000,
    category: 'Single Type',
    color: 'Yellow',
    occasion: 'Birthday',
    image: 'https://images.unsplash.com/photo-1661817216639-b6ff5644e2f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5mbG93ZXIlMjBhcnJhbmdlbWVudHxlbnwxfHx8fDE3NjU2ODA1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    availableAreas: ['jakarta-pusat', 'jakarta-selatan', 'jakarta-barat', 'tangerang', 'bekasi'],
  },
  {
    id: 6,
    name: 'Lavender Dreams',
    price: 630000,
    category: 'Bouquets',
    color: 'Purple',
    occasion: 'Anniversary',
    image: 'https://images.unsplash.com/photo-1541927634837-a7d5c4892527?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXZlbmRlciUyMGZsb3dlcnN8ZW58MXx8fHwxNzY1NjIwNjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    availableAreas: ['jakarta-selatan', 'jakarta-utara', 'depok', 'bogor', 'bandung'],
  },
  {
    id: 7,
    name: 'Tulip Collection',
    price: 780000,
    category: 'Bouquets',
    color: 'Mixed',
    occasion: 'Birthday',
    image: 'https://images.unsplash.com/photo-1615385639736-362b69696227?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dWxpcCUyMGJvdXF1ZXR8ZW58MXx8fHwxNzY1NjMwNDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    availableAreas: ['jakarta-pusat', 'jakarta-selatan', 'bandung', 'surabaya'],
  },
  {
    id: 8,
    name: 'Blue Hydrangea',
    price: 720000,
    category: 'Single Type',
    color: 'Blue',
    occasion: 'Housewarming',
    image: 'https://images.unsplash.com/photo-1629379555555-79c361b3736b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoeWRyYW5nZWElMjBibHVlJTIwZmxvd2Vyc3xlbnwxfHx8fDE3NjU2ODA2NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    availableAreas: ['jakarta-selatan', 'jakarta-timur', 'bekasi', 'bogor'],
  },
  {
    id: 9,
    name: 'Wedding Elegance',
    price: 1875000,
    category: 'Premium',
    color: 'White',
    occasion: 'Wedding',
    image: 'https://images.unsplash.com/photo-1700142611715-8a023c5eb8c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMHdoaXRlfGVufDF8fHx8MTc2NTY4MDUwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    availableAreas: ['jakarta-selatan', 'bandung', 'surabaya', 'yogyakarta'],
  },
  {
    id: 10,
    name: 'Carnation Mix',
    price: 525000,
    category: 'Bouquets',
    color: 'Pink',
    occasion: 'Birthday',
    image: 'https://images.unsplash.com/photo-1703076640155-93a52d329cc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJuYXRpb24lMjBmbG93ZXJzfGVufDF8fHx8MTc2NTY4MTIzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    availableAreas: ['jakarta-pusat', 'jakarta-selatan', 'jakarta-utara', 'jakarta-barat', 'jakarta-timur', 'tangerang', 'bekasi', 'depok', 'bogor'],
  },
  {
    id: 11,
    name: 'Daisy Delight',
    price: 480000,
    category: 'Single Type',
    color: 'White',
    occasion: 'Just Because',
    image: 'https://images.unsplash.com/photo-1665258408070-f4ef8dcdbeca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlzeSUyMGJvdXF1ZXR8ZW58MXx8fHwxNzY1NjgxMjMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    availableAreas: ['jakarta-pusat', 'jakarta-selatan', 'jakarta-utara', 'jakarta-barat', 'jakarta-timur', 'tangerang', 'bekasi', 'depok', 'bogor', 'bandung', 'surabaya', 'yogyakarta'],
  },
  {
    id: 12,
    name: 'Garden Mix',
    price: 870000,
    category: 'Bouquets',
    color: 'Mixed',
    occasion: 'Anniversary',
    image: 'https://images.unsplash.com/photo-1679678109868-cb5bd66d61dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXhlZCUyMGZsb3dlciUyMGFycmFuZ2VtZW50fGVufDF8fHx8MTc2NTY4MTIzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    availableAreas: ['jakarta-selatan', 'bandung', 'yogyakarta'],
  },
];

export function FullCatalog({ onAddToCart, onViewProduct, selectedArea }: FullCatalogProps) {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);

  const categories = ['Bouquets', 'Single Type', 'Premium'];
  const colors = ['Pink', 'White', 'Yellow', 'Purple', 'Blue', 'Mixed'];
  const occasions = ['Romance', 'Wedding', 'Birthday', 'Anniversary', 'Corporate', 'Sympathy', 'Housewarming', 'Just Because'];

  // Format harga Rupiah
  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString('id-ID')}`;
  };

  const toggleFilter = (value: string, selected: string[], setSelected: (arr: string[]) => void) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(item => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const filteredProducts = allProducts.filter(product => {
    const categoryMatch = selectedCategory.length === 0 || selectedCategory.includes(product.category);
    const colorMatch = selectedColor.length === 0 || selectedColor.includes(product.color);
    const occasionMatch = selectedOccasion.length === 0 || selectedOccasion.includes(product.occasion);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const areaMatch = !selectedArea || product.availableAreas.includes(selectedArea);
    return categoryMatch && colorMatch && occasionMatch && priceMatch && areaMatch;
  });

  const clearAllFilters = () => {
    setSelectedCategory([]);
    setSelectedColor([]);
    setSelectedOccasion([]);
    setPriceRange([0, 2000000]);
  };

  const FilterSection = () => (
    <div className="space-y-6">
      {/* Clear Filters */}
      <div className="flex items-center justify-between">
        <h3 className="text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>Filters</h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-[#568F87] hover:text-[#064232] transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <div className="border-b border-gray-200 pb-6">
        <h4 className="mb-4 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>Price Range</h4>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="2000000"
            step="50000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full accent-[#064232]"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Category */}
      <div className="border-b border-gray-200 pb-6">
        <h4 className="mb-4 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>Category</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategory.includes(category)}
                onChange={() => toggleFilter(category, selectedCategory, setSelectedCategory)}
                className="w-4 h-4 accent-[#064232]"
              />
              <span className="text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="border-b border-gray-200 pb-6">
        <h4 className="mb-4 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>Color</h4>
        <div className="space-y-2">
          {colors.map(color => (
            <label key={color} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedColor.includes(color)}
                onChange={() => toggleFilter(color, selectedColor, setSelectedColor)}
                className="w-4 h-4 accent-[#064232]"
              />
              <span className="text-gray-700">{color}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div className="pb-6">
        <h4 className="mb-4 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>Occasion</h4>
        <div className="space-y-2">
          {occasions.map(occasion => (
            <label key={occasion} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedOccasion.includes(occasion)}
                onChange={() => toggleFilter(occasion, selectedOccasion, setSelectedOccasion)}
                className="w-4 h-4 accent-[#064232]"
              />
              <span className="text-gray-700">{occasion}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl mb-4 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
            Shop All Flowers
          </h2>
          <p className="text-gray-600">
            Temukan bunga sempurna untuk setiap momen spesial Anda
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="flex items-center gap-2 bg-[#064232] text-white px-4 py-2 rounded-lg"
          >
            <Filter className="w-5 h-5" />
            Filter ({filteredProducts.length} products)
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filter */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-[#FFF5F2] p-6 rounded-lg sticky top-6">
              <FilterSection />
            </div>
          </aside>

          {/* Mobile Filter Modal */}
          {showMobileFilter && (
            <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>Filters</h3>
                  <button
                    onClick={() => setShowMobileFilter(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <FilterSection />
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {allProducts.length} products
              </p>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064232]">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Name: A-Z</option>
              </select>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => {
                  const isAvailable = !selectedArea || product.availableAreas.includes(selectedArea);
                  const areaData = selectedArea ? AVAILABLE_AREAS.find(a => a.id === selectedArea) : null;
                  
                  return (
                    <div
                      key={product.id}
                      className={`group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${!isAvailable ? 'opacity-60' : ''}`}
                    >
                      <div
                        onClick={() => onViewProduct(product.id)}
                        className="relative overflow-hidden aspect-square cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="text-xs text-white bg-[#064232] px-3 py-1 rounded-full">
                            {product.category}
                          </span>
                        </div>
                        
                        {/* Availability Badge */}
                        {selectedArea && !isAvailable && (
                          <div className="absolute top-3 right-3">
                            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              Not Available
                            </div>
                          </div>
                        )}
                        
                        {/* Heart Button */}
                        {isAvailable && (
                          <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <Heart className="w-5 h-5 text-[#064232]"/>
                          </button>
                        )}
                      </div>
                      <div className="p-5">
                        <h3
                          onClick={() => onViewProduct(product.id)}
                          className="text-lg mb-1 text-[#064232] cursor-pointer hover:text-[#568F87] transition-colors"
                          style={{ fontFamily: 'Merriweather, serif' }}
                        >
                          {product.name}
                        </h3>
                        {/* Occasion */}
                        <p className="text-xs text-gray-500 mb-2">{product.occasion}</p>
                        
                        {/* Area availability info */}
                        {selectedArea && !isAvailable && areaData && (
                          <div className="mb-3 text-xs text-red-600 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            Not available in {areaData.name}
                          </div>
                        )}
                        
                        {/* Price */}
                        <div className="mb-4">
                          <span className="text-xl text-[#568F87]">{formatPrice(product.price)}</span>
                        </div>
                        
                        <button
                          onClick={() => isAvailable && onAddToCart(product)}
                          disabled={!isAvailable}
                          className={`w-full py-2 rounded-lg transition-colors ${
                            isAvailable
                              ? 'bg-[#064232] hover:bg-[#568F87] text-white'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {isAvailable ? 'Add to Cart' : 'Unavailable'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg">No products found matching your filters.</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 text-[#568F87] hover:text-[#064232] underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}