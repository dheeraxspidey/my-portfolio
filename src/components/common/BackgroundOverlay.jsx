import React from 'react';

function BackgroundOverlay() {
  return (
    <div className="fixed inset-0 z-0">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/2.jpg)`,
          opacity: 0.9
        }}
      />
      
      {/* Lighter gradient overlay with reduced opacity */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-gray-900/30 to-gray-900/40" />
    </div>
  );
}

export default BackgroundOverlay;