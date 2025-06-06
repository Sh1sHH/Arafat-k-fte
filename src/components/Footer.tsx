import React from 'react';
import { Utensils, Instagram, Facebook, Twitter } from 'lucide-react';
import { navLinks } from '../constants';

const Footer: React.FC = () => {
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="container mx-auto px-4">
        {/* Üst bölüm: Logo, Navigasyon, Sosyal Medya */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 text-center md:text-left">
          
          {/* Sütun 1: Logo ve Marka */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-4">
              <Utensils className="w-10 h-10 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-white">Arafat Köfte</p>
                <p className="text-xs text-red-400">1986'dan Beri Lezzet Durağınız</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-xs mx-auto md:mx-0">
              Geleneksel tariflerimiz ve kaliteli malzemelerimizle, unutulmaz bir köfte deneyimi sunuyoruz.
            </p>
          </div>

          {/* Sütun 2: Hızlı Erişim Linkleri */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Hızlı Erişim</h3>
            <ul className="space-y-2">
              {navLinks.map((nav) => (
                <li key={nav.id}>
                  <button
                    onClick={() => handleNavClick(nav.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300"
                    aria-label={nav.title}
                  >
                    {nav.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sütun 3: Sosyal Medya ve İletişim İpucu */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Bizi Takip Edin</h3>
            <div className="flex justify-center md:justify-start gap-5 mb-4">
              <a 
                href="#" 
                aria-label="Instagram sayfamız" 
                className="text-gray-300 hover:text-red-400 transition-colors duration-300"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                aria-label="Facebook sayfamız" 
                className="text-gray-300 hover:text-red-400 transition-colors duration-300"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                aria-label="Twitter sayfamız" 
                className="text-gray-300 hover:text-red-400 transition-colors duration-300"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Sorularınız mı var? <button onClick={() => handleNavClick('info')} className="text-red-400 hover:underline">İletişim Bilgileri</button> bölümünden bize ulaşın.
            </p>
          </div>
        </div>

        {/* Alt bölüm: Telif Hakkı */}
        <div className="border-t border-red-800/40 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Arafat Köfte. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;