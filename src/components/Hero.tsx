import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../lib/i18n/LanguageContext';

const Hero: React.FC = () => {
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const { t, locale } = useLanguage();

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('info');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
  };

  return (
    <section id="hero" className="relative w-full h-screen mx-auto overflow-hidden">
      {/* Arka Plan Videosu */}
      <video
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/videos/koftevideo.mp4"
        onEnded={handleVideoEnd}
      >
        {locale === 'tr' ? 'Tarayıcınız video etiketini desteklemiyor.' : 'Your browser does not support the video tag.'}
      </video>
      {/* Video Karartma Katmanı */}
      <div 
        className={`absolute inset-0 bg-black z-0 transition-opacity duration-500 ease-in-out ${isVideoEnded ? 'opacity-40' : 'opacity-25'}`}
      ></div>

      {/* İki Sütunlu Ana İçerik Alanı (videonun üzerinde kalması için z-10) */}
      <div className="relative z-10 h-full grid grid-cols-1 md:grid-cols-2 items-center justify-items-center md:justify-items-stretch gap-8 px-6 sm:px-12 lg:px-24">
        {/* Sol Sütun: Metin İçeriği */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left py-12">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-white leading-tight mb-6 animate-fade-in">
            Arafat <span className="text-white">Köfte</span>
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl text-gray-200 max-w-xl mb-10 animate-fade-in-delay">
            {t('slogan')}
          </p>
          <button
            onClick={scrollToAbout}
            className="bg-red-800 animate-fade-in-delay-2 py-3 px-8 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {t('discover_story')}
          </button>
        </div>

        {/* Sağ Sütun: Elfsight Widget Yeri */}
        <div className="flex items-center justify-center w-full h-full py-12">
          <div className="elfsight-app-c2e5c960-d9c8-4d72-bfe1-660106e6f6c2" data-elfsight-app-lazy></div>
        </div>
      </div>
      
      {/* Aşağı Kaydırma Oku (videonun üzerinde kalması için z-20) */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <button 
          onClick={scrollToAbout} 
          className="bg-white bg-opacity-20 rounded-full p-2 backdrop-blur-sm hover:bg-opacity-30 transition-all duration-300"
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>
  );
};

export default Hero;