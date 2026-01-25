import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import LanguageSwitcher from '@/Components/LanguageSwitcher';

export default function ShopLayout({ children, auth }) {
    const [cartCount, setCartCount] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { locale, translations } = usePage().props;

    // Helper function to get translation
    const t = (key) => translations?.[key] || key;

    useEffect(() => {
        if (auth?.user) {
            fetch('/cart/count')
                .then(res => res.json())
                .then(data => setCartCount(data.count))
                .catch(err => {});
        }
    }, [auth]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <span className="text-xl sm:text-2xl font-bold text-pink-600">🌸 Florist</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:items-center md:space-x-4">
                            <Link
                                href="/"
                                className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-pink-600 transition-colors"
                            >
                                {t('home')}
                            </Link>
                            <Link
                                href="/shop"
                                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
                            >
                                {t('catalog')}
                            </Link>

                            {/* Language Switcher - Desktop */}
                            <LanguageSwitcher currentLocale={locale} />

                            {auth?.user ? (
                                <>
                                    {/* Cart Icon */}
                                    <Link
                                        href="/cart"
                                        className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        {cartCount > 0 && (
                                            <span className="absolute top-0 right-0 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                                {cartCount}
                                            </span>
                                        )}
                                    </Link>
                                    
                                    <Link
                                        href="/orders"
                                        className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
                                    >
                                        {t('orders')}
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
                                    >
                                        {t('profile')}
                                    </Link>
                                    {auth.user.is_admin === 1 && (
                                        <Link
                                            href="/admin"
                                            className="px-3 py-2 text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
                                        >
                                            {t('admin_panel')}
                                        </Link>
                                    )}
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                                    >
                                        {t('logout')}
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
                                    >
                                        {t('login')}
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="px-4 py-2 text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 transition-colors"
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
                                    className="relative p-2 text-gray-700 hover:text-pink-600"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    {cartCount > 0 && (
                                        <span className="absolute top-0 right-0 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                            )}
                            
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-md text-gray-700 hover:text-pink-600 hover:bg-gray-100"
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
                                className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-pink-50 hover:text-pink-600 rounded-md"
                            >
                                {t('home')}
                            </Link>
                            <Link
                                href="/shop"
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md"
                            >
                                {t('catalog')}
                            </Link>

                            {/* Language Switcher - Mobile */}
                            <div className="px-3 py-2">
                                <LanguageSwitcher currentLocale={locale} />
                            </div>

                            {auth?.user ? (
                                <>
                                    <Link
                                        href="/orders"
                                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md"
                                    >
                                        {t('orders')}
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md"
                                    >
                                        {t('profile')}
                                    </Link>
                                    {auth.user.is_admin === 1 && (
                                        <Link
                                            href="/admin"
                                            className="block px-3 py-2 text-base font-medium text-purple-600 hover:bg-purple-50 hover:text-purple-800 rounded-md"
                                        >
                                            {t('admin_panel')}
                                        </Link>
                                    )}
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
                                    >
                                        {t('logout')}
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md"
                                    >
                                        {t('login')}
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="block px-3 py-2 text-base font-medium text-white bg-pink-600 hover:bg-pink-700 rounded-md text-center"
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
            <footer className="bg-gray-800 text-white mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Florist Shop</h3>
                            <p className="text-gray-400 text-sm">
                                {t('footer_description')}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">{t('quick_links')}</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/" className="text-gray-400 hover:text-white">{t('home')}</Link></li>
                                <li><Link href="/shop" className="text-gray-400 hover:text-white">{t('catalog')}</Link></li>
                                {auth?.user && <li><Link href="/orders" className="text-gray-400 hover:text-white">{t('orders')}</Link></li>}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
                            <p className="text-gray-400 text-sm">Email: info@florist.com</p>
                            <p className="text-gray-400 text-sm">Phone: +62 123 4567 890</p>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
                        <p>&copy; 2025 Florist Shop. {t('all_rights_reserved')}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
