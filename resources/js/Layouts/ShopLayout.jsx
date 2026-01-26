import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Flower2, ShoppingCart, Facebook, Instagram, Twitter } from 'lucide-react';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import { useTranslation } from '@/Hooks/useTranslation';

export default function ShopLayout({ children, auth }) {
    const [cartCount, setCartCount] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { t, locale } = useTranslation();
    
    console.log('ShopLayout - Current locale:', locale);
    console.log('ShopLayout - Translation for home:', t('home'));

    useEffect(() => {
        if (auth?.user) {
            fetch('/cart/count')
                .then(res => res.json())
                .then(data => setCartCount(data.count))
                .catch(err => {});
        }
    }, [auth]);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <nav className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 text-[#064232] hover:text-[#568F87] transition-colors">
                            <Flower2 className="w-8 h-8" />
                            <span className="text-xl font-serif">Kala Florist</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:items-center md:gap-8">
                            <Link
                                href="/"
                                className="text-[#064232] hover:text-[#568F87] transition-colors"
                            >
                                {t('home')}
                            </Link>
                            <Link
                                href="/shop"
                                className="text-[#064232] hover:text-[#568F87] transition-colors"
                            >
                                {t('catalog')}
                            </Link>
                            
                            {/* Language Switcher */}
                            <LanguageSwitcher />

                            {auth?.user ? (
                                <>
                                    {/* Cart Icon */}
                                    <Link
                                        href="/cart"
                                        className="relative p-2 hover:bg-[#FFF5F2] rounded-lg transition-colors"
                                    >
                                        <ShoppingCart className="w-6 h-6 text-[#568F87]" />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-[#F5BABB] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                                {cartCount}
                                            </span>
                                        )}
                                    </Link>
                                    
                                    <Link
                                        href="/orders"
                                        className="text-[#064232] hover:text-[#568F87] transition-colors"
                                    >
                                        {t('orders')}
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className="text-[#064232] hover:text-[#568F87] transition-colors"
                                    >
                                        {t('profile')}
                                    </Link>
                                    {auth.user.is_admin === 1 && (
                                        <Link
                                            href="/admin"
                                            className="text-[#568F87] hover:text-[#064232] transition-colors"
                                        >
                                            {t('dashboard')}
                                        </Link>
                                    )}
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="bg-[#064232] hover:bg-[#568F87] text-white px-6 py-2 rounded-full transition-colors"
                                    >
                                        {t('logout')}
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-[#064232] hover:text-[#568F87] transition-colors"
                                    >
                                        {t('login')}
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-[#064232] hover:bg-[#568F87] text-white px-6 py-2 rounded-full transition-colors"
                                    >
                                        {t('register')}
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden space-x-2">
                            {/* Cart Icon Mobile */}
                            {auth?.user && (
                                <Link
                                    href="/cart"
                                    className="relative p-2 hover:bg-[#FFF5F2] rounded-lg transition-colors"
                                >
                                    <ShoppingCart className="w-6 h-6 text-[#568F87]" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-[#F5BABB] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                            )}
                            
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-md text-[#064232] hover:text-[#568F87]"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {mobileMenuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden pb-4 space-y-1">
                            <Link
                                href="/"
                                className="block px-3 py-2 text-base font-medium text-[#064232] hover:bg-[#FFF5F2] hover:text-[#568F87] rounded-md"
                            >
                                {t('home')}
                            </Link>
                            <Link
                                href="/shop"
                                className="block px-3 py-2 text-base font-medium text-[#064232] hover:bg-[#FFF5F2] hover:text-[#568F87] rounded-md"
                            >
                                {t('catalog')}
                            </Link>
                            
                            {/* Language Switcher Mobile */}
                            <div className="px-3 py-2">
                                <LanguageSwitcher />
                            </div>

                            {auth?.user ? (
                                <>
                                    <Link
                                        href="/orders"
                                        className="block px-3 py-2 text-base font-medium text-[#064232] hover:bg-[#FFF5F2] hover:text-[#568F87] rounded-md"
                                    >
                                        {t('orders')}
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className="block px-3 py-2 text-base font-medium text-[#064232] hover:bg-[#FFF5F2] hover:text-[#568F87] rounded-md"
                                    >
                                        {t('profile')}
                                    </Link>
                                    {auth.user.is_admin === 1 && (
                                        <Link
                                            href="/admin"
                                            className="block px-3 py-2 text-base font-medium text-[#568F87] hover:bg-[#FFF5F2] hover:text-[#064232] rounded-md"
                                        >
                                            {t('dashboard')}
                                        </Link>
                                    )}
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="w-full text-left px-3 py-2 text-base font-medium text-white bg-[#064232] hover:bg-[#568F87] rounded-full text-center"
                                    >
                                        {t('logout')}
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="block px-3 py-2 text-base font-medium text-[#064232] hover:bg-[#FFF5F2] hover:text-[#568F87] rounded-md"
                                    >
                                        {t('login')}
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="block px-3 py-2 text-base font-medium text-white bg-[#064232] hover:bg-[#568F87] rounded-full text-center"
                                    >
                                        {t('register')}
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </nav>
            </header>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-[#064232] text-white py-12 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Flower2 className="w-8 h-8" />
                                <span className="text-xl font-serif">Kala Florist</span>
                            </div>
                            <p className="text-gray-400">
                                Creating beautiful moments through the art of flowers since 2009
                            </p>
                        </div>
                        
                        {/* Quick Links */}
                        <div>
                            <h4 className="mb-4 font-serif">{t('quick_links')}</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="/" className="text-gray-400 hover:text-[#F5BABB] transition-colors">
                                        {t('home')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/shop" className="text-gray-400 hover:text-[#F5BABB] transition-colors">
                                        {t('catalog')}
                                    </Link>
                                </li>
                                {auth?.user && (
                                    <li>
                                        <Link href="/orders" className="text-gray-400 hover:text-[#F5BABB] transition-colors">
                                            {t('my_orders')}
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                        
                        {/* Customer Service */}
                        <div>
                            <h4 className="mb-4 font-serif">Customer Service</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-[#F5BABB] transition-colors">Delivery Info</a></li>
                                <li><a href="#" className="hover:text-[#F5BABB] transition-colors">Returns</a></li>
                                <li><a href="#" className="hover:text-[#F5BABB] transition-colors">FAQ</a></li>
                                <li><a href="#" className="hover:text-[#F5BABB] transition-colors">Care Guide</a></li>
                            </ul>
                        </div>
                        
                        {/* Social Media */}
                        <div>
                            <h4 className="mb-4 font-serif">Follow Us</h4>
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
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400 mt-8">
                        <p>&copy; 2024 Kala Florist. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
