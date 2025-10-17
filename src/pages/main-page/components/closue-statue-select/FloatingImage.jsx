import React from 'react';

const FloatingImage = React.memo(({ src, alt, className = '' }) => (
  <img src={src} alt={alt} className={`absolute object-contain pointer-events-none ${className}`} />
));

export default FloatingImage;