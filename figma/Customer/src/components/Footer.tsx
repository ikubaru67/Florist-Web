import { Flower2, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#064232] text-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flower2 className="w-8 h-8" />
              <span className="text-xl">Kala Florist</span>
            </div>
            <p className="text-gray-400">
              Creating beautiful moments through the art of flowers since 2009
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: 'Merriweather, serif' }}>Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#products" className="hover:text-[#F5BABB] transition-colors">Shop</a></li>
              <li><a href="#services" className="hover:text-[#F5BABB] transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-[#F5BABB] transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-[#F5BABB] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: 'Merriweather, serif' }}>Customer Service</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-[#F5BABB] transition-colors">Delivery Info</a></li>
              <li><a href="#" className="hover:text-[#F5BABB] transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-[#F5BABB] transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-[#F5BABB] transition-colors">Care Guide</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: 'Merriweather, serif' }}>Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-[#568F87] p-3 rounded-full hover:bg-[#F5BABB] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-[#568F87] p-3 rounded-full hover:bg-[#F5BABB] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-[#568F87] p-3 rounded-full hover:bg-[#F5BABB] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Kala Florist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}