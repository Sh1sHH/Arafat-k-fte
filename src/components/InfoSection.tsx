import React from 'react';
// import Carousel from './Carousel'; // Karusel kaldırıldı
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { galleryImages } from '../constants'; // Resimler için eklendi
import { useLanguage } from '../lib/i18n/LanguageContext';

const InfoSection: React.FC = () => {
  const { t } = useLanguage();
  
  // Görseller - sabit olarak public klasöründen alınıyor
  const image1 = '/dukkan2.webp';
  const altText1 = 'Arafat Köfte Dükkan Görünümü';
  // İletişim görseli - sabit olarak public klasöründen alınıyor
  const image2 = '/iletisim.webp';
  const altText2 = 'İletişim Görseli';

  const handleMenuScroll = () => {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // pattern-bg kaldırıldı, padding ayarlandı
    <section id="info" className="py-16 md:py-24 bg-white"> 
      <div className="container mx-auto px-4">
        {/* Ana Başlık - referans tasarımda bölüm başlığı yok, içerik blokları kendi başlıklarına sahip */}
        {/* <h2 className="section-title text-center mb-20 text-neutral-800">Hakkımızda & İletişim</h2> */}

        {/* Yeni Grid Yapısı: 2x2 benzeri bir akış */}
        {/* Mobil için tek sütun, orta ve büyük ekranlar için iki sütun */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch"> 
          
          {/* 1. Blok: Hakkımızda Metni (Referanstaki Menus bloğu gibi) */}
          <div className="flex flex-col justify-center p-6 md:p-8 order-1">
            <h3 className="text-3xl md:text-4xl font-semibold text-neutral-800 mb-6 text-left">
              {t('info_welcome_title')}
            </h3>
            <p className="text-neutral-600 mb-4 leading-relaxed text-left text-lg">
              {t('info_welcome_text1')}
            </p>
            <p className="text-neutral-500 mb-8 leading-relaxed text-left text-sm">
              {t('info_welcome_text2')}
            </p>
            <div className="text-left mt-10">
              <button 
                onClick={handleMenuScroll}
                className="inline-block bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-md shadow-md hover:shadow-lg transition-all duration-300 text-base"
                aria-label={t('discover_menu')}
              >
                {t('discover_menu')}
              </button>
            </div>
          </div>

          {/* 2. Blok: Resim */}
          <div className="order-2 md:order-2 rounded-lg overflow-hidden shadow-lg h-80 md:h-auto">
            <img 
              src={image1} 
              alt={altText1} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* 3. Blok: Resim */}
          {/* Mobil için 3. sırada, md ve üzeri için 3. sırada (sol altta) */}
          <div className="order-3 md:order-3 rounded-lg overflow-hidden shadow-lg h-80 md:h-auto">
            <img 
              src={image2} 
              alt={altText2} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* 4. Blok: İletişim Detayları ve Harita (Referanstaki Reservations bloğu gibi) */}
          {/* Mobil için 4. sırada, md ve üzeri için 4. sırada (sağ altta) */}
          <div className="flex flex-col justify-center p-6 md:p-8 order-4 md:order-4">
            <h3 className="text-3xl md:text-4xl font-semibold text-neutral-800 mb-6 text-left">
              {t('contact_title')}
            </h3>
            <div className="space-y-5 mb-6 text-left">
              {/* Adres */}
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-red-700 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-neutral-700">{t('address_label')}</p>
                  <p className="text-neutral-500 text-sm">{t('address_content')}</p>
                </div>
              </div>
              {/* Telefon */}
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-red-700 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-neutral-700">{t('phone_label')}</p>
                  <a href="tel:+902125116065" className="text-neutral-500 hover:text-red-700 transition-colors duration-300 text-sm">0(212) 511 60 65
                  <br />
0(212) 522 33 90</a>
                </div>
              </div>
              {/* E-posta */}
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-red-700 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-neutral-700">{t('email_label')}</p>
                  <a href="mailto:arafatkofte@gmail.com" className="text-neutral-500 hover:text-red-700 transition-colors duration-300 text-sm">arafatkofte@gmail.com</a>
                </div>
              </div>
              {/* Çalışma Saatleri */}
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-red-700 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-neutral-700">{t('hours_label')}</p>
                  <p className="text-neutral-500 text-sm whitespace-pre-line">
                    {t('hours_content')}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-md border border-neutral-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.39307550881!2d28.97091037642534!3d41.0166555189084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9ea54c254bd%3A0xc653a019c7dd51ab!2sArafat%20K%C3%B6fte!5e0!3m2!1str!2str!4v1749174978637!5m2!1str!2str" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Arafat Köfte Konumu"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InfoSection; 