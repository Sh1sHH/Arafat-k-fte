import React, { useState } from 'react';
import { menuItems, menuCategories } from '../constants';
import { useLanguage } from '../lib/i18n/LanguageContext';
import GoogleAdsense from './GoogleAdsense';

// Sayfa metinleri için bir obje
const pageTexts = {
  mainTitle: { tr: 'Arafat Köfte', en: 'Arafat Köfte' },
  menuSubtitle: { tr: 'Dijital Menü', en: 'Digital Menu' },
  categories: { tr: 'Kategoriler', en: 'Categories' },
  footerText: { tr: 'Arafat Köfte © {year} - Afiyet Olsun!', en: 'Arafat Meatballs © {year} - Enjoy your meal!' },
  address: { tr: 'Hobyar Mahallesi, Kömürcü Bekir Sokak No: 2-D, Eminönü / İstanbul', en: 'Hobyar District, Kömürcü Bekir Street No: 2-D, Eminönü / Istanbul' },
  phone: { tr: '0(212) 511 60 65 & 0(212) 522 33 90', en: '0(212) 511 60 65 & 0(212) 522 33 90' },
};

const QrMenuPage: React.FC = () => {
  const { locale, setLocale } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>(menuCategories[0].id); // Aktif kategori state'i

  // Seçili kategorideki menü öğelerini filtrele
  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Üst Çubuk */}
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-neutral-900">{pageTexts.mainTitle[locale as keyof typeof pageTexts.mainTitle]}</h1>
        
        {/* Dil Seçim Butonları */}
        <div className="flex space-x-2">
          <button
            onClick={() => setLocale('tr')}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 
                      ${locale === 'tr' 
                          ? 'bg-red-700 text-white' 
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
          >
            TR
          </button>
          <button
            onClick={() => setLocale('en')}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 
                      ${locale === 'en' 
                          ? 'bg-red-700 text-white' 
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
          >
            EN
          </button>
        </div>
      </div>

      {/* Ana İçerik */}
      <main className="container mx-auto px-4 py-6">
        {/* Kategori Seçici */}
        <div className="mb-8">
          <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-3">
            {pageTexts.categories[locale as keyof typeof pageTexts.categories]}
          </h2>
          <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-colors duration-200 flex items-center gap-1.5 ${
                  activeCategory === category.id
                    ? 'bg-red-700 text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{locale === 'tr' ? category.name_tr : category.name_en}</span>
              </button>
            ))}
          </div>
        </div>

        {/* AdSense Reklamı - Kategori seçici altında */}
        <div className="py-4 mb-6 bg-gray-50 rounded-lg">
          <GoogleAdsense 
            client="ca-pub-6430440480434971"
            slot="9534281020"
            responsive={true}
            format="auto"
            className="w-full"
          />
        </div>

        {/* Menü Öğeleri */}
        <div className="grid grid-cols-1 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="flex gap-4 border-b border-neutral-100 pb-6"
            >
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-100">
                <img 
                  src={item.image} 
                  alt={locale === 'tr' ? item.name_tr : item.name_en} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-medium text-neutral-900">
                    {locale === 'tr' ? item.name_tr : item.name_en}
                  </h3>
                  <span className="text-sm font-medium text-red-700">{item.price}</span>
                </div>
                <div className="w-8 h-0.5 bg-red-700/40 my-2 rounded-full"></div>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  {locale === 'tr' ? item.description_tr : item.description_en}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* AdSense Reklamı - Menü öğeleri altında */}
        <div className="py-4 mt-6 bg-gray-50 rounded-lg">
          <GoogleAdsense 
            client="ca-pub-6430440480434971"
            slot="9534281020"
            responsive={true}
            format="auto"
            className="w-full"
          />
        </div>
      </main>

      {/* Altbilgi */}
      <footer className="bg-neutral-50 py-6 px-4 mt-8">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center space-y-3">
            <img 
              src="/logoo.webp" 
              alt="Arafat Köfte Logo" 
              className="h-12 w-auto mb-2" 
            />
            <p className="text-neutral-500 text-sm">
              {pageTexts.address[locale as keyof typeof pageTexts.address]}
            </p>
            <p className="text-neutral-500 text-sm">
              {pageTexts.phone[locale as keyof typeof pageTexts.phone]}
            </p>
            <p className="text-neutral-400 text-xs mt-2">
              {pageTexts.footerText[locale as keyof typeof pageTexts.footerText].replace('{year}', new Date().getFullYear().toString())}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QrMenuPage; 