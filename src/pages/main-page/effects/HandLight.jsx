// src/pages/main-page/effects/HandLight.jsx
import { useState } from 'react';

const HandLight = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="fixed inset-0 z-20 pointer-events-none"
      onMouseMove={handleMouseMove}
      style={{
        maskImage: `radial-gradient(ellipse 256.5px 231px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)`,
        WebkitMaskImage: `radial-gradient(ellipse 256.5px 231px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)`,
      }}
    >
      <div className="w-full h-full bg-black" />
    </div>
  );
};

export default HandLight;