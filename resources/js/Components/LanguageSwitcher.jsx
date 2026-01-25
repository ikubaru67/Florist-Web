import { router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';

export default function LanguageSwitcher({ currentLocale = 'en' }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'id', name: 'Indonesia', flag: '🇮🇩' }
    ];

    const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

    const handleLanguageChange = (locale) => {
        router.post('/language/switch', { locale }, {
            preserveState: false,
            preserveScroll: true,
            onSuccess: () => {
                setIsOpen(false);
                // Force reload to apply new translations
                window.location.reload();
            }
        });
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors rounded-md hover:bg-gray-100"
                aria-label="Language Switcher"
            >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="hidden sm:inline">{currentLanguage.code.toUpperCase()}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            onClick={() => handleLanguageChange(language.code)}
                            className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-3 hover:bg-pink-50 transition-colors ${
                                currentLocale === language.code
                                    ? 'bg-pink-50 text-pink-600 font-medium'
                                    : 'text-gray-700'
                            }`}
                        >
                            <span className="text-lg">{language.flag}</span>
                            <span>{language.name}</span>
                            {currentLocale === language.code && (
                                <svg
                                    className="w-4 h-4 ml-auto text-pink-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
