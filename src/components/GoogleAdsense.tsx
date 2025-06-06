import React, { useEffect } from 'react';

// TypeScript için window.adsbygoogle tanımı
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface GoogleAdsenseProps {
  client: string;
  slot: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const GoogleAdsense: React.FC<GoogleAdsenseProps> = ({
  client,
  slot,
  format = 'auto',
  responsive = true,
  style = {},
  className = '',
}) => {
  useEffect(() => {
    // AdSense kodunu sayfaya yerleştirdiğimizde Google'ın kodu işlemesi için
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense yerleştirme hatası:', error);
    }
  }, []);

  // Prop'ları AdSense'in beklediği formata dönüştür
  const adStyle = {
    display: 'block',
    ...style,
  };

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default GoogleAdsense; 