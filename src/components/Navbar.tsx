"use client";

import React, { useState, useEffect } from "react";
import { navLinks } from '../constants';

const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos;
      
      // Sadece scroll pozisyonu belirli bir eşiği geçtikten sonra göster/gizle
      if (currentScrollPos > 50) {
        setVisible(!isScrollingDown);
      } else {
        setVisible(true);
      }
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveTab(id);
    }
  };
  
  const handleLogoClick = () => {
    const homeElement = document.getElementById('home');
    if (homeElement) {
      homeElement.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(null);
    }
  };

  return (
    <nav 
      className={`w-full flex items-center justify-center py-4 fixed top-0 z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto flex w-fit bg-white shadow-md">
        <ul className="flex">
          {navLinks.map((link) => (
            <li
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`relative cursor-pointer px-5 py-3 text-base transition-colors duration-200 hover:bg-gray-100 ${
                activeTab === link.id ? 'bg-red-800 text-white' : 'text-gray-800'
              }`}
            >
              {link.title}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;