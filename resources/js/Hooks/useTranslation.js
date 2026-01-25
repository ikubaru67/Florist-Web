import { usePage } from '@inertiajs/react';

/**
 * Translation Hook
 * 
 * Usage:
 * import { useTranslation } from '@/Hooks/useTranslation';
 * 
 * const { t, locale } = useTranslation();
 * 
 * <button>{t('add_to_cart')}</button>
 */
export function useTranslation() {
    const { locale, translations } = usePage().props;
    
    const t = (key, fallback = null) => {
        return translations?.[key] || fallback || key;
    };
    
    return {
        t,
        locale,
        isEnglish: locale === 'en',
        isIndonesian: locale === 'id'
    };
}
