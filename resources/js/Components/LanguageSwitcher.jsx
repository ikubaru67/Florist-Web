import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSwitcher() {
    const { language, changeLanguage } = useLanguage();

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={() => changeLanguage('id')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    language === 'id'
                        ? 'bg-pink-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                }`}
                title="Bahasa Indonesia"
            >
                ID
            </button>
            <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    language === 'en'
                        ? 'bg-pink-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                }`}
                title="English"
            >
                EN
            </button>
        </div>
    );
}
