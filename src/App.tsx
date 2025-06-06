import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import Menu from './components/Menu';
import ImageGallery from './components/ImageGallery';
import QrMenuPage from './components/QrMenuPage';
import './styles/index.css';
import { Menu as MenuIcon, X as XIcon } from 'lucide-react';

const HomePageLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      
      <main id="main-content" className="flex-1 ml-0 md:ml-64 lg:ml-72 overflow-y-auto h-screen">
        <Hero />
        <InfoSection />
        <Menu />
        <ImageGallery />
      </main>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePageLayout />} />
      <Route path="/qr-menu" element={<QrMenuPage />} />
    </Routes>
  );
}

export default App;