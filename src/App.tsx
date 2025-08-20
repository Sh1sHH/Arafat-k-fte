import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import Menu from './components/Menu';
import ImageGallery from './components/ImageGallery';
import QrMenuPage from './components/QrMenuPage';
import GoogleAdsense from './components/GoogleAdsense';
import NotFound from './components/NotFound';
import Sitemap from './components/Sitemap';
import './styles/index.css';
import { Menu as MenuIcon, X as XIcon } from 'lucide-react';
import { useLanguage } from './lib/i18n/LanguageContext';

const HomePageLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale, setLocale } = useLanguage();
  const location = useLocation();

  // URL'e göre ilgili bölüme scroll et
  useEffect(() => {
    const scrollToSection = () => {
      const path = location.pathname;
      let targetId = '';
      
      if (path.includes('menu')) {
        targetId = 'menu';
      } else if (path.includes('galeri') || path.includes('gallery')) {
        targetId = 'gallery';
      } else if (path.includes('iletisim') || path.includes('contact')) {
        targetId = 'info';
      }
      
      if (targetId) {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    scrollToSection();
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex relative min-h-screen">
      <button 
        className="md:hidden fixed top-4 left-4 z-[60] p-2 bg-white text-neutral-700 rounded-md shadow-lg hover:bg-neutral-100 transition-colors"
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      <Sidebar isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
      
      {/* Dil Seçim Butonları */}
      <div className="fixed top-4 right-4 z-50 flex space-x-2">
        <button
          onClick={() => setLocale('tr')}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 
                    ${locale === 'tr' 
                        ? 'bg-red-700 text-white' 
                        : 'bg-white shadow-sm text-neutral-700 hover:bg-neutral-100'
                    }`}
        >
          TR
        </button>
        <button
          onClick={() => setLocale('en')}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 
                    ${locale === 'en' 
                        ? 'bg-red-700 text-white' 
                        : 'bg-white shadow-sm text-neutral-700 hover:bg-neutral-100'
                    }`}
        >
          EN
        </button>
      </div>
      
      <main id="main-content" className="flex-1 ml-0 md:ml-64 lg:ml-72 overflow-y-auto h-screen">
        <Hero />
        <InfoSection />
        
        {/* AdSense Reklamı - Info ve Menu arasında */}
        {/* <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <GoogleAdsense 
              client="ca-pub-6430440480434971"
              slot="9534281020"
              responsive={true}
              format="auto"
              className="w-full max-w-4xl mx-auto"
            />
          </div>
        </div> */}
        
        <Menu />
        <ImageGallery />
        
        {/* AdSense Reklamı - Sayfanın altında */}
        {/* <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <GoogleAdsense 
              client="ca-pub-6430440480434971"
              slot="9534281020" // Aynı slot ID'sini kullanıyoruz
              responsive={true}
              format="auto"
              className="w-full max-w-4xl mx-auto"
            />
          </div>
        </div> */}
        
        {/* Telif Hakkı Bilgisi */}
        <footer className="py-6 bg-white">
          <div className="container mx-auto px-4 text-center">
            <p className="text-neutral-500 text-sm">
              &copy; {new Date().getFullYear()} Arafat Köfte. {locale === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePageLayout />} />
      <Route path="/qr" element={<QrMenuPage />} />
      
      {/* SEO friendly routes - ana sayfanın ilgili bölümlerine yönlendir */}
      <Route path="/menu" element={<HomePageLayout />} />
      <Route path="/menu.html" element={<HomePageLayout />} />
      <Route path="/iletisim" element={<HomePageLayout />} />
      <Route path="/contact.html" element={<HomePageLayout />} />
      <Route path="/galeri" element={<HomePageLayout />} />
      <Route path="/gallery.html" element={<HomePageLayout />} />
      <Route path="/index.html" element={<HomePageLayout />} />
      
      {/* Sitemap route */}
      <Route path="/sitemap.xml" element={<Sitemap />} />
      
      {/* Catch-all route - tüm diğer URL'ler için 404 sayfası */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;