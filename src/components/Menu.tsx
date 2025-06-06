import React, { useState } from 'react';
import { menuItems, menuCategories } from '../constants';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('ana-yemekler');

  // Seçili kategorideki menü öğelerini filtrele
  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-tuesday text-neutral-800 mb-4 text-center">
          Menü
        </h2>
        <div className="w-24 h-1 bg-red-700 mx-auto mb-6"></div>
        
        <p className="text-center text-neutral-600 max-w-2xl mx-auto mb-12">
          Üç kuşaktır değişmeyen tariflerimizle hazırlanan özel köftelerimiz ve yan lezzetlerimiz...
        </p>
        
        {/* Kategori Seçici Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-2 md:gap-4">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.id
                  ? 'bg-red-700 text-white shadow-md'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.name_tr}</span>
            </button>
          ))}
        </div>
        
        {/* Menü Öğeleri */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl mb-3 bg-neutral-100">
                <img 
                  src={item.image} 
                  alt={item.name_tr}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 will-change-transform"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="px-1">
                <h3 className="text-[15px] tracking-tight font-medium text-neutral-900">{item.name_tr}</h3>
                <div className="w-6 h-0.5 bg-red-700/60 my-2 rounded-full"></div>
                <p className="text-neutral-600 text-xs leading-relaxed font-light max-w-prose">
                  {item.description_tr}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Menü Altı Not */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-neutral-500 italic mb-4 text-sm">
            * Tüm ürünlerimiz günlük olarak hazırlanmaktadır.
          </p>
          
        </div>
      </div>
    </section>
  );
};

export default Menu;