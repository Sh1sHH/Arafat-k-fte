import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../lib/i18n/LanguageContext';

const NotFound: React.FC = () => {
    const { locale } = useLanguage();

    const content = {
        tr: {
            title: 'Sayfa Bulunamadı',
            subtitle: '404',
            description: 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.',
            homeButton: 'Ana Sayfaya Dön',
            backButton: 'Geri Dön'
        },
        en: {
            title: 'Page Not Found',
            subtitle: '404',
            description: 'The page you are looking for does not exist or may have been moved.',
            homeButton: 'Go to Homepage',
            backButton: 'Go Back'
        }
    };

    const text = content[locale as keyof typeof content];

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* Logo */}
                <div className="mb-8">
                    <img
                        src="/logoo.webp"
                        alt="Arafat Köfte Logo"
                        className="w-20 h-20 mx-auto mb-4"
                    />
                </div>

                {/* 404 Numarası */}
                <h1 className="text-8xl md:text-9xl font-bold text-red-700 mb-4">
                    {text.subtitle}
                </h1>

                {/* Başlık */}
                <h2 className="text-2xl md:text-3xl font-semibold text-neutral-800 mb-4">
                    {text.title}
                </h2>

                {/* Açıklama */}
                <p className="text-neutral-600 mb-8 leading-relaxed">
                    {text.description}
                </p>

                {/* Butonlar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        <Home size={20} />
                        {text.homeButton}
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        <ArrowLeft size={20} />
                        {text.backButton}
                    </button>
                </div>

                {/* Popüler Linkler */}
                <div className="mt-12 pt-8 border-t border-neutral-200">
                    <p className="text-neutral-500 text-sm mb-4">
                        {locale === 'tr' ? 'Popüler sayfalar:' : 'Popular pages:'}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link to="/menu" className="text-red-700 hover:text-red-800 transition-colors">
                            {locale === 'tr' ? 'Menü' : 'Menu'}
                        </Link>
                        <Link to="/galeri" className="text-red-700 hover:text-red-800 transition-colors">
                            {locale === 'tr' ? 'Galeri' : 'Gallery'}
                        </Link>
                        <Link to="/iletisim" className="text-red-700 hover:text-red-800 transition-colors">
                            {locale === 'tr' ? 'İletişim' : 'Contact'}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;