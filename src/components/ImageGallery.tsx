import React, { useState } from 'react';
// Eski importlar kaldırıldı
// import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { MasonryPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/masonry.css';

// Public klasöründeki görsellerin yolları
const imageUrls = [
  '/dukkan1.webp',
  '/dukkan2.webp',
  '/dukkan3.webp',
  '/dukkan4.webp',
  '/dukkan5.webp',
  '/dukkan6.webp',
  '/dukkan7.webp',
  '/dukkan8.webp',
  '/dukkan9.webp',
  '/dukkan10.webp',
  '/misafir1.webp',
  '/misafir2.webp',
  '/misafir3.webp',
  '/misafir4.webp',
  '/misafir5.webp',
  '/lezzet1.webp',
  '/lezzet2.webp',
  '/lezzet3.webp',
  '/lezzet4.webp',
  '/lezzet5.webp',
  '/lezzet6.webp',
  '/lezzet7.webp',
  '/lezzet8.webp',
  // İsterseniz daha fazla görsel ekleyebilirsiniz
];

// Resimler için alt metinleri ve başlıkları hazırlayalım
const imagesData = imageUrls.map((src, index) => {
  const fileName = src.substring(src.lastIndexOf('/') + 1).replace(/\.[^/.]+$/, "");
  const isStore = fileName.includes('dukkan');
  
  return {
    src,
    alt: `${isStore ? 'Dükkanımız' : 'Misafirlerimiz'} - ${fileName}`,
    title: isStore ? 'Dükkanımız' : 'Misafirlerimiz',
    description: isStore ? 'Arafat Köfte mekanımızdan görüntüler' : 'Değerli misafirlerimizle anılar'
  };
});

const ImageGallery: React.FC = () => {
  // Seçilen resmi takip etmek için state
  const [selectedImage, setSelectedImage] = useState<null | {
    src: string;
    alt: string;
    title: string;
    description: string;
  }>(null);

  // Resme tıklandığında modalı açacak fonksiyon
  const openModal = (image: typeof selectedImage) => {
    setSelectedImage(image);
    // Modali açtığımızda sayfanın kaymasını engellemek için
    document.body.style.overflow = 'hidden';
  };

  // Modalı kapatacak fonksiyon
  const closeModal = () => {
    setSelectedImage(null);
    // Modalı kapattığımızda sayfanın normal scroll davranışını geri getirmek için
    document.body.style.overflow = 'auto';
  };

  // Klavye erişilebilirliği için
  const handleKeyDown = (e: React.KeyboardEvent, image: typeof selectedImage) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(image);
    }
  };

  return (
    <section id="gallery" className="bg-white py-16 md:py-24 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
      <h2 className="text-5xl md:text-6xl font-tuesday text-neutral-800 mb-4 text-center">
          Galeri
        </h2>
        <div className="w-24 h-1 bg-red-700 mx-auto mb-12 md:mb-16"></div>
        
        {/* Modern CSS-only masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {imagesData.map((image, index) => (
            <div 
              key={index} 
              className="break-inside-avoid relative overflow-hidden rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl group cursor-pointer"
              aria-label={image.alt}
              role="button"
              tabIndex={0}
              onClick={() => openModal(image)}
              onKeyDown={(e) => handleKeyDown(e, image)}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-auto object-cover block group-hover:scale-105 transition-transform duration-500 will-change-transform"
                loading="lazy"
              />
              
              {/* Hover overlay açıklamaları kaldırıldı */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for enlarged image view */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-7xl w-full max-h-screen flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              className="absolute top-0 right-0 z-10 bg-black/50 text-white p-2 rounded-full m-4 hover:bg-black/80 transition-colors"
              onClick={closeModal}
              aria-label="Kapat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {/* Image container */}
            <div className="overflow-hidden h-full flex items-center justify-center relative">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ImageGallery; 