import { useState, useRef, useEffect } from 'react';

// Component-specific styles
const spinAnimation = `
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

interface MusicArtworkProps {
  artist: string;
  music: string;
  albumArt: string;
  audioSrc?: string;
  isSong?: boolean;
}

export default function MusicArtwork({
  artist,
  music,
  albumArt,
  audioSrc,
  isSong = true
}: MusicArtworkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [rotation, setRotation] = useState(0);
  const vinylRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Bileşen yüklendiğinde audio elementi oluştur
  useEffect(() => {
    if (!audioRef.current && audioSrc) {
      audioRef.current = new Audio(audioSrc);
      
      // Şarkı bitince durumu güncelle
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }
    
    // Temizleme fonksiyonu
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', () => {
          setIsPlaying(false);
        });
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  // Daha hızlı bir dönüş süresi
  const spinDuration = isSong ? 3 : 4; // saniye cinsinden dönüş süresi

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      // Şarkıyı durdur
      audioRef.current.pause();
      
      // Plak rotasyonunu kaydet
      if (vinylRef.current) {
        const computedStyle = window.getComputedStyle(vinylRef.current);
        const transform = computedStyle.transform;
        if (transform && transform !== 'none') {
          const matrix = new DOMMatrix(transform);
          const angle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
          setRotation(angle < 0 ? angle + 360 : angle);
        }
      }
    } else {
      // Şarkıyı çal
      audioRef.current.play().catch(error => {
        console.error("Ses dosyası oynatılamadı:", error);
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative">
      {/* Component-specific styles */}
      <style>{spinAnimation}</style>
      
      {/* Ana konteyner */}
      <div className="relative group">
        {/* Plak görseli */}
        <div
          className={`absolute -left-8 top-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${
            isHovered
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-6'
          }`}
        >
          <div className="relative w-16 h-16">
           <div
             ref={vinylRef}
             className="w-full h-full"
             style={{
               transform: isPlaying ? undefined : `rotate(${rotation}deg)`,
               animation: isPlaying ? `spin ${spinDuration}s linear infinite` : 'none',
               animationDelay: isPlaying ? `${-rotation / (360 / spinDuration)}s` : undefined
             }}
           >
             <img
               src="https://pngimg.com/d/vinyl_PNG95.png"
               alt="Plak"
               className="w-full h-full object-contain"
             />
           </div>
         </div>
        </div>

        {/* Albüm kapağı */}
        <div
          className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-out hover:scale-105 cursor-pointer w-36 h-36 mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handlePlayPause}
        >
          <img
            src={albumArt}
            alt={`${music} Kapak`}
            className={`w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-110 ${
              !imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageLoaded(true);
            }}
          />
          
          {/* Yükleme durumu katmanı */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
          )}
          
          {/* Oynat/Duraklat butonu */}
          <div className={`absolute bottom-2 left-2 transition-opacity duration-300 ${
            isHovered || isPlaying ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              {isPlaying ? (
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-3 bg-white rounded"></div>
                  <div className="w-0.5 h-3 bg-white rounded"></div>
                </div>
              ) : (
                <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5"></div>
              )}
            </div>
          </div>
          
          {/* Hover katmanı */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
      
      {/* Müzik bilgisi - Ortalanmış */}
      <div className="mt-3 text-center">
        <p className="font-semibold text-sm text-neutral-700">{music}</p>
        <p className="text-xs text-neutral-500">{artist}</p>
      </div>
    </div>
  );
} 