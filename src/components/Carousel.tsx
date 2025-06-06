import React, { useState, useEffect } from 'react';

const images = [
  '/dukkan1.JPG', // Görsel yolu public klasörünün kökünden başlar
  '/dukkan2.JPG', // Görsel yolu public klasörünün kökünden başlar
  // Buraya daha fazla görsel ekleyebilirsiniz, örneğin: '/yemek_fotografi.jpg'
];

const Carousel: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // Görsel değişim süresi (milisaniye cinsinden)

    return () => clearInterval(timer); // Component unmount olduğunda interval'ı temizle
  }, []);

  if (images.length === 0) {
    return <div className="text-center text-gray-500">Yüklenecek görsel bulunamadı.</div>;
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto h-64 md:h-96 overflow-hidden rounded-lg shadow-xl">
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Arafat Köfte Görsel ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Görsel ${index + 1}'e git`}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentImageIndex ? 'bg-amber-500' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel; 