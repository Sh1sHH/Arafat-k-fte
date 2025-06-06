import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './lib/i18n/LanguageContext';

// Update the document title
document.title = 'Arafat Köfte - 1986\'dan Beri';

// Dil tercihini sıfırla
localStorage.removeItem('language');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider defaultLocale="tr">
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);