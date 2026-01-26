import { LayoutDashboard, Package, ShoppingCart, Settings } from 'lucide-react';

interface SidebarProps {
  currentSection: 'dashboard' | 'products' | 'settings' | 'orders';
  onSectionChange: (section: 'dashboard' | 'products' | 'settings' | 'orders') => void;
}

export function Sidebar({ currentSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', section: 'dashboard' as const },
    { icon: Package, label: 'Products', section: 'products' as const },
    { icon: ShoppingCart, label: 'Orders', section: 'orders' as const },
    { icon: Settings, label: 'Settings', section: 'settings' as const },
  ];

  return (
    <div className="w-20 lg:w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white">🌸</span>
          </div>
          <div className="hidden lg:block">
            <h2 className="text-gray-900">Kala Florist</h2>
            <p className="text-gray-500 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.section === currentSection;
            return (
              <li key={item.label}>
                <button
                  onClick={() => item.section && onSectionChange(item.section)}
                  disabled={!item.section}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                      : item.section
                      ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="hidden lg:block">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm">A</span>
          </div>
          <div className="hidden lg:block">
            <div className="text-gray-900 text-sm">Admin</div>
            <div className="text-gray-500 text-xs">admin@kalaflorist.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}