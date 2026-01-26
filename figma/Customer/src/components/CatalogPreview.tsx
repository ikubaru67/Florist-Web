import { ArrowRight, Heart } from 'lucide-react';

interface CatalogPreviewProps {
  onNavigateToCatalog: () => void;
}

const catalogProducts = [
  {
    id: 1,
    name: 'Sunflower Joy',
    price: 'Rp570.000',
    image: 'https://images.unsplash.com/photo-1661817216639-b6ff5644e2f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5mbG93ZXIlMjBhcnJhbmdlbWVudHxlbnwxfHx8fDE3NjU2ODA1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    name: 'Lavender Dreams',
    price: 'Rp630.000',
    image: 'https://images.unsplash.com/photo-1541927634837-a7d5c4892527?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXZlbmRlciUyMGZsb3dlcnN8ZW58MXx8fHwxNzY1NjIwNjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    name: 'Tulip Collection',
    price: 'Rp780.000',
    image: 'https://images.unsplash.com/photo-1615385639736-362b69696227?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dWxpcCUyMGJvdXF1ZXR8ZW58MXx8fHwxNzY1NjMwNDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 4,
    name: 'Blue Hydrangea',
    price: 'Rp720.000',
    image: 'https://images.unsplash.com/photo-1629379555555-79c361b3736b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoeWRyYW5nZWElMjBibHVlJTIwZmxvd2Vyc3xlbnwxfHx8fDE3NjU2ODA2NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 5,
    name: 'Wedding Elegance',
    price: 'Rp1.875.000',
    image: 'https://images.unsplash.com/photo-1700142611715-8a023c5eb8c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMHdoaXRlfGVufDF8fHx8MTc2NTY4MDUwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 6,
    name: 'Spring Mix',
    price: 'Rp720.000',
    image: 'https://images.unsplash.com/photo-1620136584057-841cd38b6e2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXIlMjBib3VxdWV0JTIwc2hvcHxlbnwxfHx8fDE3NjU2ODA1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function CatalogPreview({ onNavigateToCatalog }: CatalogPreviewProps) {
  return (
    <section className="py-20 px-6 md:px-12 bg-[#FFF5F2]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl mb-4 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>Our Catalog</h2>
            <p className="text-gray-600">
              Jelajahi koleksi lengkap bunga kami
            </p>
          </div>
          <button onClick={onNavigateToCatalog} className="hidden md:flex items-center gap-2 bg-[#064232] hover:bg-[#568F87] text-white px-6 py-3 rounded-full transition-colors">
            Lihat Semua
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {catalogProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-4 h-4 text-[#064232]" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>{product.name}</h3>
                <p className="text-[#568F87]">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 md:hidden">
          <button onClick={onNavigateToCatalog} className="w-full flex items-center justify-center gap-2 bg-[#064232] hover:bg-[#568F87] text-white px-6 py-3 rounded-full transition-colors">
            Lihat Semua
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}