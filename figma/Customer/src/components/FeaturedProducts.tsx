import { Star } from 'lucide-react';

const featuredProducts = [
  {
    id: 1,
    name: 'Pink Rose Bouquet',
    price: 'Rp675.000',
    image: 'https://images.unsplash.com/photo-1672243691196-9b7f64cce1c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZXMlMjBib3VxdWV0fGVufDF8fHx8MTc2NTYyMDYzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'Elegant Orchid',
    price: 'Rp1.020.000',
    image: 'https://images.unsplash.com/photo-1759549885072-ea7f9fc57bcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmNoaWQlMjBmbG93ZXJzJTIwZWxlZ2FudHxlbnwxfHx8fDE3NjU2ODA2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badge: 'Premium',
  },
  {
    id: 3,
    name: 'Peony Collection',
    price: 'Rp825.000',
    image: 'https://images.unsplash.com/photo-1631041871361-eb12496074c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9ueSUyMGJvdXF1ZXR8ZW58MXx8fHwxNzY1NTY2MTg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badge: 'New Arrival',
  },
  {
    id: 4,
    name: 'White Lily',
    price: 'Rp630.000',
    image: 'https://images.unsplash.com/photo-1653267409726-a77cd6b3aa78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWx5JTIwZmxvd2VycyUyMHdoaXRlfGVufDF8fHx8MTc2NTY4MDY3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    badge: 'Featured',
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Produk pilihan terbaik kami dengan kualitas premium
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10 bg-[#064232] text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                {product.badge}
              </div>

              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl mb-2 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>{product.name}</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl text-[#568F87]">{product.price}</span>
                </div>
                <button className="w-full bg-[#064232] hover:bg-[#568F87] text-white py-3 rounded-lg transition-colors">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}