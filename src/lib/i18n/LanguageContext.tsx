import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Locale, translations } from './locales';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLocale?: Locale;
}

export const LanguageProvider = ({ 
  children, 
  defaultLocale = 'tr' 
}: LanguageProviderProps) => {
  const [locale, setLocale] = useState<Locale>(() => {
    // Tarayıcıdan kaydedilmiş dil tercihini kontrol et, yoksa her zaman TR
    const savedLocale = localStorage.getItem('language') as Locale;
    // Her zaman varsayılan olarak Türkçe kullan (tr)
    return savedLocale || defaultLocale;
  });

  const handleSetLocale = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('language', newLocale);
  }, []);

  const translate = useCallback((key: string) => {
    return translations[locale][key] || key;
  }, [locale]);

  const value = {
    locale,
    setLocale: handleSetLocale,
    t: translate
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 