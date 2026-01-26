import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Settings, Menu, X, Gift, LogOut } from 'lucide-react';

export default function AdminLayout({ children, title, description }) {
    const { auth, currentSection } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
        { 
            icon: LayoutDashboard, 
            label: 'Dashboard', 
            href: route('admin.dashboard'),
            current: 'admin.dashboard'
        },
        { 
            icon: Package, 
            label: 'Products', 
            href: route('admin.products.index'),
            current: 'admin.products.*'
        },
        { 
            icon: Gift, 
            label: 'Add-ons', 
            href: route('admin.addons.index'),
            current: 'admin.addons.*'
        },
        { 
            icon: ShoppingCart, 
            label: 'Orders', 
            href: route('admin.orders.index'),
            current: 'admin.orders.*'
        },
        { 
            icon: Settings, 
            label: 'Settings', 
            href: route('admin.settings.index'),
            current: 'admin.settings.*'
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
            {/* Mobile Menu Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center"
                >
                    {sidebarOpen ? (
                        <X className="w-5 h-5 text-gray-600" />
                    ) : (
                        <Menu className="w-5 h-5 text-gray-600" />
                    )}
                </button>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed top-0 left-0 h-full bg-white/80 backdrop-blur-sm border-r border-gray-200 flex flex-col z-40 transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                w-64
            `}>
                {/* Logo */}
                <div className="p-6 border-b border-gray-200">
                    <Link href={route('admin.dashboard')} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white text-xl">🌸</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Kala Florist</h2>
                            <p className="text-xs text-gray-500">Admin Panel</p>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = route().current(item.current);
                            
                            return (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                            isActive
                                                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                    >
                                        <Icon className="w-5 h-5 flex-shrink-0" />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User Info */}
                <div className="p-4 border-t border-gray-200">
                    <Link 
                        href={route('profile.edit')}
                        className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-medium">
                                {auth.user?.name?.charAt(0).toUpperCase() || 'A'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                                {auth.user?.name || 'Admin'}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                                {auth.user?.email || 'admin@kalaflorist.com'}
                            </div>
                        </div>
                    </Link>
                    
                    {/* Logout Button */}
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all"
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">Logout</span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Header */}
                {(title || description) && (
                    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-20">
                        <div className="px-4 sm:px-6 lg:px-8 py-6">
                            <div className="flex items-center gap-4">
                                <div className="flex-1 min-w-0">
                                    {title && (
                                        <h1 className="text-2xl font-bold text-gray-900 truncate">
                                            {title}
                                        </h1>
                                    )}
                                    {description && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            {description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
