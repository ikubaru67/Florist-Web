import { Flower2 } from 'lucide-react';

interface HeroProps {
  onNavigateToCatalog: () => void;
}

export function Hero({ onNavigateToCatalog }: HeroProps) {
  return (
    <div className="relative h-screen">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1620136584057-841cd38b6e2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXIlMjBib3VxdWV0JTIwc2hvcHxlbnwxfHx8fDE3NjU2ODA1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Beautiful flower bouquets"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-2 text-white">
          <Flower2 className="w-8 h-8" />
          <span className="text-xl">Kala Florist</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-white">
          <button onClick={onNavigateToCatalog} className="hover:text-[#F5BABB] transition-colors">Shop</button>
          <a href="#services" className="hover:text-[#F5BABB] transition-colors">Services</a>
          <a href="#about" className="hover:text-[#F5BABB] transition-colors">About</a>
          <a href="#contact" className="hover:text-[#F5BABB] transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 h-[calc(100vh-88px)] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-5xl md:text-7xl mb-6 max-w-4xl" style={{ fontFamily: 'Merriweather, serif' }}>
          Fresh Flowers for Every Occasion
        </h1>
        <p className="text-white/90 text-xl md:text-2xl mb-8 max-w-2xl">
          Handcrafted arrangements made with love and delivered with care
        </p>
        <button onClick={onNavigateToCatalog} className="bg-[#064232] hover:bg-[#568F87] text-white px-8 py-4 rounded-full transition-colors">
          Shop Our Collection
        </button>
      </div>
    </div>
  );
}