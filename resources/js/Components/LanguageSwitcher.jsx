import { router, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

export default function LanguageSwitcher({ variant = 'light' }) {
    const { locale, translations } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    console.log('Current locale:', locale);
    console.log('Translations:', translations);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const switchLanguage = (newLocale) => {
        if (newLocale === locale) {
            setIsOpen(false);
            return;
        }
        
        console.log('Switching to:', newLocale);
        router.post('/locale', { locale: newLocale }, {
            preserveState: false,
            preserveScroll: false,
            onSuccess: () => {
                console.log('Language switched, reloading...');
                window.location.reload();
            }
        });
    };

    const languages = {
        id: { flag: '🇮🇩', name: '🇮🇩 Indonesia', code: 'ID' },
        en: { flag: '🇺🇸', name: '🇺🇸 English', code: 'EN' }
    };

    const currentLang = languages[locale];

    // Style variants for different backgrounds
    const buttonStyles = variant === 'dark' 
        ? "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
        : "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors";
    
    const iconStyles = variant === 'dark' 
        ? "w-4 h-4 text-white"
        : "w-4 h-4 text-gray-600";
    
    const textStyles = variant === 'dark' 
        ? "text-sm font-medium text-white"
        : "text-sm font-medium text-gray-700";

    return (
        <div className="relative z-[100]" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={buttonStyles}
            >
                <Globe className={iconStyles} />
                <span className={textStyles}>{currentLang.flag} {currentLang.code}</span>
                <ChevronDown className={`${iconStyles} transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-[100]">
                    {Object.entries(languages).map(([key, lang]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => switchLanguage(key)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors ${
                                locale === key ? 'bg-pink-50 text-pink-600' : 'text-gray-700'
                            }`}
                        >
                            <span className="text-xl">{lang.flag}</span>
                            <div className="flex-1">
                                <div className="text-sm font-medium">{lang.name}</div>
                                <div className="text-xs text-gray-500">{lang.code}</div>
                            </div>
                            {locale === key && (
                                <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
