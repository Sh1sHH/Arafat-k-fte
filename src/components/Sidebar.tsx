import React, { useState, useEffect } from 'react';
import { navLinks, musicList } from '../constants';
import { Instagram, Facebook } from 'lucide-react';
import MusicArtwork from './MusicArtwork';

// Sidebar için props arayüzü
interface SidebarProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleMenu }) => {
  const [randomMusic, setRandomMusic] = useState(musicList[0]);

  // Sayfa yüklendiğinde rastgele bir müzik seç
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * musicList.length);
    setRandomMusic(musicList[randomIndex]);
  }, []);

  const handleNavClick = (id: string) => {
    // Kaydırma işlemini yapacak olan ana fonksiyon
    const performScroll = () => {
      const mainContainer = document.getElementById('main-content');
      if (!mainContainer) return;

      if (id === 'hero') {
        // Ana Sayfa için ana konteyneri en üste kaydır
        mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Diğer linkler için ilgili elemente kaydır
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Eğer mobil menü açıksa, menüyü kapat ve animasyonun bitmesini bekle
    if (isOpen) {
      toggleMenu();
      setTimeout(performScroll, 300); // 300ms, menü kapanma süresiyle eşleşmelidir
    } else {
      // Menü kapalıysa direkt kaydır
      performScroll();
    }
  };

  // Müziği değiştir
  const changeMusic = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * musicList.length);
    } while (musicList[newIndex].id === randomMusic.id && musicList.length > 1);
    
    setRandomMusic(musicList[newIndex]);
  };

  return (
    <aside 
      className={[
        "w-64 md:w-72 h-screen bg-white text-neutral-700 p-6 md:p-8 shadow-lg flex flex-col fixed top-0 left-0 z-50 overflow-y-auto", // z-index artırıldı ve overflow-y-auto eklendi
        "transform transition-transform duration-300 ease-in-out md:translate-x-0", // Temel transform ve masaüstü görünürlüğü
        isOpen ? "translate-x-0" : "-translate-x-full" // Mobil için aç/kapa
      ].join(" ")}
      aria-hidden={!isOpen && typeof window !== 'undefined' && window.innerWidth < 768} // Ekran okuyucular için mobil gizliliğini belirt
    >
      {/* Logo */}
      <div className="mb-8 text-center">
        <a 
          href="#"
          onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
          className="inline-block mb-2 group"
          aria-label="Ana Sayfa"
        >
          <img 
            src="/logooo.webp" 
            alt="Arafat Köfte Logo" 
            className="w-24 h-24 mx-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>
        <p className="text-xs text-neutral-500">1986'dan Beri Lezzet Durağınız</p>
        <p className="text-xs text-neutral-500 mt-1">
        Hobyar Mahallesi, Kömürcü Bekir Sokak No: 2-D, Eminönü / İstanbul
        </p>
      </div>

      {/* Navigasyon Linkleri */}
      <nav className="mb-9">
        <ul className="space-y-5">
          {navLinks.map((link) => (
            <li key={link.id} className="text-center">
              <button
                onClick={() => handleNavClick(link.id)}
                className="w-full text-center px-3 py-2.5 rounded-md text-3xl font-tuesday text-neutral-600 hover:bg-red-100 hover:text-red-700 focus:bg-red-100 focus:text-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label={link.title}
              >
                {link.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Müzik Önerisi */}
      <div className="mb-1 px-3 flex flex-col items-center">
        <MusicArtwork 
          artist={randomMusic.artist} 
          music={randomMusic.title} 
          albumArt={randomMusic.albumArt}
          audioSrc={randomMusic.audioSrc}
          isSong={randomMusic.isSong} 
        />
      </div>

      {/* Alt Kısım / E-posta Butonu (Örnek) */}
      <div className="mt-auto pt-6 border-t border-neutral-200">
        
        {/* Sosyal Medya Linkleri */}
        <div className="flex justify-center space-x-4 mt-6">
          <a 
            href="https://instagram.com/arafatkofte" // Instagram linkinizi buraya ekleyin
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-neutral-500 hover:text-red-700 transition-colors duration-300"
            aria-label="Instagram sayfamızı ziyaret edin"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a 
            href="https://facebook.com/arafatkofte" // Facebook linkinizi buraya ekleyin
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-neutral-500 hover:text-red-700 transition-colors duration-300"
            aria-label="Facebook sayfamızı ziyaret edin"
          >
            <Facebook className="w-6 h-6" />
          </a>
        </div>
        {/* Sosyal Medya Linkleri Bitiş */}

        <p className="text-xs text-neutral-400 text-center mt-6">
          &copy; {new Date().getFullYear()} Arafat Köfte.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar; 