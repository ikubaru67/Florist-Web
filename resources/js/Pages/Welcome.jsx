import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Flower2, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import { useTranslation } from '@/Hooks/useTranslation';
import ProductCard from '@/Components/ProductCard';

export default function Welcome({ auth, featuredProducts = [], latestProducts = [], categories = [], bannerImage }) {
    const [cartCount, setCartCount] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (auth?.user) {
            fetch('/cart/count')
                .then(res => res.json())
                .then(data => setCartCount(data.count))
                .catch(err => {});
        }
    }, [auth]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Head title="Welcome to Kala Florist" />
            
            {/* Fixed Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-white shadow-md' 
                    : 'bg-transparent'
            }`}>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <img 
                        src="/images/Logo.png" 
                        alt="Kala Florist Logo" 
                        className="h-10 w-auto object-contain"
                    />
                    <span className={`text-xl font-serif transition-colors ${
                        isScrolled ? 'text-[#064232]' : 'text-white'
                    }`}>Kala Florist</span>
                </Link>

                {/* Desktop Navigation */}
                <div className={`hidden md:flex md:items-center md:gap-8 relative z-50 transition-colors ${
                    isScrolled ? 'text-[#064232]' : 'text-white'
                }`}>
                        <Link
                            href="/"
                            className="hover:text-[#F5BABB] transition-colors"
                        >
                            {t('home')}
                        </Link>
                        <Link
                            href="/shop"
                            className="hover:text-[#F5BABB] transition-colors"
                        >
                            {t('catalog')}
                        </Link>
                        
                        {/* Language Switcher */}
                        <LanguageSwitcher variant={isScrolled ? 'light' : 'dark'} />

                        {auth?.user ? (
                            <>
                                {/* Cart Icon */}
                                <Link
                                    href="/cart"
                                    className={`relative p-2 rounded-lg transition-colors ${
                                        isScrolled ? 'hover:bg-[#FFF5F2]' : 'hover:bg-white/10'
                                    }`}
                                >
                                    <ShoppingCart className="w-6 h-6" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-[#F5BABB] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                
                                <Link
                                    href="/orders"
                                    className="hover:text-[#F5BABB] transition-colors"
                                >
                                    {t('orders')}
                                </Link>
                                <Link
                                    href="/profile"
                                    className="hover:text-[#F5BABB] transition-colors"
                                >
                                    {t('profile')}
                                </Link>
                                {auth.user.is_admin === 1 && (
                                    <Link
                                        href="/admin"
                                        className="hover:text-[#F5BABB] transition-colors"
                                    >
                                        {t('dashboard')}
                                    </Link>
                                )}
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className={`px-6 py-2 rounded-full transition-colors ${
                                        isScrolled 
                                            ? 'bg-[#064232] hover:bg-[#568F87] text-white' 
                                            : 'bg-white/20 hover:bg-white/30 text-white'
                                    }`}
                                >
                                    {t('logout')}
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="hover:text-[#F5BABB] transition-colors"
                                >
                                    {t('login')}
                                </Link>
                                <Link
                                    href="/register"
                                    className={`px-6 py-2 rounded-full transition-colors ${
                                        isScrolled 
                                            ? 'bg-[#064232] hover:bg-[#568F87] text-white' 
                                            : 'bg-white/20 hover:bg-white/30 text-white'
                                    }`}
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
                                className={`relative p-2 rounded-lg transition-colors ${
                                    isScrolled ? 'hover:bg-[#FFF5F2]' : 'hover:bg-white/10'
                                }`}
                            >
                                <ShoppingCart className={`w-6 h-6 ${isScrolled ? 'text-[#064232]' : 'text-white'}`} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#F5BABB] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        )}
                        
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`p-2 rounded-md transition-colors ${
                                isScrolled ? 'text-[#064232] hover:text-[#568F87]' : 'text-white hover:text-[#F5BABB]'
                            }`}
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

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="absolute top-full left-0 right-0 md:hidden bg-white/95 backdrop-blur-sm shadow-lg">
                            <div className="px-6 py-4 space-y-4">
                            <Link
                                href="/"
                                className="block text-[#064232] hover:text-[#568F87] transition-colors"
                            >
                                {t('home')}
                            </Link>
                            <Link
                                href="/shop"
                                className="block text-[#064232] hover:text-[#568F87] transition-colors"
                            >
                                {t('catalog')}
                            </Link>
                            
                            <div className="pt-2 border-t border-gray-200">
                                <LanguageSwitcher />
                            </div>

                            {auth?.user ? (
                                <>
                                    <Link
                                        href="/orders"
                                        className="block text-[#064232] hover:text-[#568F87] transition-colors"
                                    >
                                        {t('orders')}
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className="block text-[#064232] hover:text-[#568F87] transition-colors"
                                    >
                                        {t('profile')}
                                    </Link>
                                    {auth.user.is_admin === 1 && (
                                        <Link
                                            href="/admin"
                                            className="block text-[#064232] hover:text-[#568F87] transition-colors"
                                        >
                                            {t('dashboard')}
                                        </Link>
                                    )}
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="block w-full text-left bg-[#064232] hover:bg-[#568F87] text-white px-6 py-2 rounded-full transition-colors"
                                    >
                                        {t('logout')}
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="block text-[#064232] hover:text-[#568F87] transition-colors"
                                    >
                                        {t('login')}
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="block bg-[#064232] hover:bg-[#568F87] text-white px-6 py-2 rounded-full text-center transition-colors"
                                    >
                                        {t('register')}
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen">
                {/* Hero Image */}
                <div className="absolute inset-0">
                    <img 
                        src={bannerImage || 'https://images.unsplash.com/photo-1620136584057-841cd38b6e2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXIlMjBib3VxdWV0JTIwc2hvcHxlbnwxfHx8fDE3NjU2ODA1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'} 
                        alt="Beautiful flower bouquets"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1620136584057-841cd38b6e2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXIlMjBib3VxdWV0JTIwc2hvcHxlbnwxfHx8fDE3NjU2ODA1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
                        }}
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                    <h1 className="text-white text-5xl md:text-7xl font-serif mb-6 max-w-4xl">
                        {t('hero_title')}
                    </h1>
                    <p className="text-white/90 text-xl md:text-2xl mb-8 max-w-2xl">
                        {t('hero_subtitle')}
                    </p>
                    <Link 
                        href="/shop" 
                        className="bg-[#064232] hover:bg-[#568F87] text-white px-8 py-4 rounded-full transition-colors"
                    >
                        {t('shop_now')}
                    </Link>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-20 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl mb-4 text-[#064232] font-serif">
                            {t('featured_products')}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Produk pilihan terbaik kami dengan kualitas premium
                        </p>
                    </div>

                    {featuredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {featuredProducts.slice(0, 4).map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No featured products available</p>
                    )}
                </div>
            </section>

            {/* Latest Products Section */}
            <section className="py-20 px-6 md:px-12 bg-[#FFF5F2]">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-4xl md:text-5xl mb-4 text-[#064232] font-serif">
                                {t('latest_products')}
                            </h2>
                            <p className="text-gray-600">
                                Jelajahi koleksi lengkap bunga kami
                            </p>
                        </div>
                        <Link 
                            href="/shop"
                            className="hidden md:flex items-center gap-2 bg-[#064232] hover:bg-[#568F87] text-white px-6 py-3 rounded-full transition-colors"
                        >
                            {t('view_all')}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Grid */}
                    {latestProducts.length > 0 ? (
                        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {latestProducts.slice(0, 8).map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No products available</p>
                    )}

                    {/* Mobile View All Button */}
                    <div className="mt-8 md:hidden text-center">
                        <Link 
                            href="/shop"
                            className="inline-flex items-center justify-center gap-2 bg-[#064232] hover:bg-[#568F87] text-white px-6 py-3 rounded-full transition-colors"
                        >
                            {t('view_all')}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#064232] text-white py-12 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <img 
                                    src="/images/LogoWhite.png" 
                                    alt="Kala Florist Logo" 
                                    className="h-10 w-auto object-contain"
                                />
                                <span className="text-xl font-serif">Kala Florist</span>
                            </div>
                            <p className="text-gray-400">
                                {t('footer_tagline')}
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="mb-4 font-serif">{t('footer_quick_links')}</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/shop" className="hover:text-[#F5BABB] transition-colors">{t('catalog')}</Link></li>
                                <li><Link href="/about" className="hover:text-[#F5BABB] transition-colors">{t('footer_about')}</Link></li>
                                <li><Link href="/contact" className="hover:text-[#F5BABB] transition-colors">{t('footer_contact')}</Link></li>
                            </ul>
                        </div>

                        {/* Customer Service */}
                        <div>
                            <h4 className="mb-4 font-serif">{t('footer_customer_service')}</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/delivery-info" className="hover:text-[#F5BABB] transition-colors">{t('footer_delivery_info')}</Link></li>
                                <li><Link href="/returns" className="hover:text-[#F5BABB] transition-colors">{t('footer_returns')}</Link></li>
                                <li><Link href="/faq" className="hover:text-[#F5BABB] transition-colors">{t('footer_faq')}</Link></li>
                                <li><Link href="/care-guide" className="hover:text-[#F5BABB] transition-colors">{t('footer_care_guide')}</Link></li>
                            </ul>
                        </div>

                        {/* Social */}
                        <div>
                            <h4 className="mb-4 font-serif">{t('footer_follow_us')}</h4>
                            <div className="flex gap-4">
                                <a href="#" className="bg-[#568F87] p-3 rounded-full hover:bg-[#F5BABB] transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a href="#" className="bg-[#568F87] p-3 rounded-full hover:bg-[#F5BABB] transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                                <a href="#" className="bg-[#568F87] p-3 rounded-full hover:bg-[#F5BABB] transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                        <p>&copy; 2026 Kala Florist. {t('footer_rights_reserved')}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
