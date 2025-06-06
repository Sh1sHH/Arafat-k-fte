import { useLanguage } from '../lib/i18n/LanguageContext';

const LanguageSwitcher = () => {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex space-x-2">
      <button
        onClick={() => setLocale('tr')}
        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 
                  ${locale === 'tr' 
                      ? 'bg-red-700 text-white' 
                      : 'bg-white text-neutral-700 hover:bg-neutral-100 shadow-sm'
                  }`}
        aria-label="Türkçe"
      >
        TR
      </button>
      <button
        onClick={() => setLocale('en')}
        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 
                  ${locale === 'en' 
                      ? 'bg-red-700 text-white' 
                      : 'bg-white text-neutral-700 hover:bg-neutral-100 shadow-sm'
                  }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher; 