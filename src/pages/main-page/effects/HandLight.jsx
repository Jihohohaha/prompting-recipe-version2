import React from 'react';

const HandLight = ({ mousePos }) => {
  return (
    <div
      className="fixed inset-0 z-30 pointer-events-none"
      style={{
        maskImage: `radial-gradient(ellipse 256.5px 231px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)`,
        WebkitMaskImage: `radial-gradient(ellipse 256.5px 231px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)`,
      }}
    >
      <div className="w-full h-full bg-[#f5f5f5]" />
    </div>
  );
};

export default HandLight;