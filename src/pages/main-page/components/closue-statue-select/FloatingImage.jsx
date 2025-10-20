import React from 'react';

const FloatingImage = React.memo(function FloatingImage({ src, alt, className = '' }) {
  return <img src={src} alt={alt} className={`absolute object-contain pointer-events-none ${className}`} />;
});

export default FloatingImage;
