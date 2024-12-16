import React, { useEffect, useState } from 'react';

function BackgroundOverlay() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/2.jpg';
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1]">
      {!imageLoaded && <div className="text-white">Loading image...</div>}
      
      <img 
        src="/2.jpg"
        alt="background"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500
                   ${imageLoaded ? 'opacity-30' : 'opacity-0'}`}
        style={{
          filter: 'brightness(0.5) contrast(1.2)',
        }}
      />

      <div 
        className="absolute inset-0 bg-gradient-to-b 
                   from-gray-900/30 
                   via-gray-900/40 
                   to-gray-900/50"
      />
    </div>
  );
}

export default React.memo(BackgroundOverlay);