import React, { useEffect } from 'react';

const Sitemap: React.FC = () => {
  useEffect(() => {
    // Sayfa title'ını değiştir
    document.title = 'Sitemap';
    
    // XML response header'ı simüle et
    const metaTag = document.createElement('meta');
    metaTag.httpEquiv = 'Content-Type';
    metaTag.content = 'application/xml; charset=utf-8';
    document.head.appendChild(metaTag);
    
    // Body'ye XML class ekle
    document.body.className = 'xml-response';
    
    return () => {
      if (document.head.contains(metaTag)) {
        document.head.removeChild(metaTag);
      }
      document.body.className = '';
    };
  }, []);

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Ana Sayfa -->
  <url>
    <loc>https://arafatkofte.com/</loc>
    <lastmod>2025-01-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.arafatkofte.com/</loc>
    <lastmod>2025-01-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Index.html -->
  <url>
    <loc>https://arafatkofte.com/index.html</loc>
    <lastmod>2025-01-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Menü Sayfaları -->
  <url>
    <loc>https://arafatkofte.com/menu</loc>
    <lastmod>2025-01-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://arafatkofte.com/menu.html</loc>
    <lastmod>2025-01-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Galeri Sayfaları -->
  <url>
    <loc>https://arafatkofte.com/galeri</loc>
    <lastmod>2025-01-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://arafatkofte.com/gallery.html</loc>
    <lastmod>2025-01-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- İletişim Sayfaları -->
  <url>
    <loc>https://arafatkofte.com/iletisim</loc>
    <lastmod>2025-01-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://arafatkofte.com/contact.html</loc>
    <lastmod>2025-01-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- QR Menü -->
  <url>
    <loc>https://arafatkofte.com/qr</loc>
    <lastmod>2025-01-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;

  return (
    <pre style={{ 
      fontFamily: 'monospace', 
      fontSize: '12px', 
      whiteSpace: 'pre-wrap',
      margin: 0,
      padding: '20px',
      backgroundColor: '#f5f5f5'
    }}>
      {sitemapXML}
    </pre>
  );
};

export default Sitemap;