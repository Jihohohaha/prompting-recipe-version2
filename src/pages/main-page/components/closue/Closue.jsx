import React, { useState } from 'react';
import AssetsHandLightClosue from './transition/AssetHandLightClosue';
import OpenedClosue from './transition/OpenedClosue';

const Closue = ({ onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [mousePos, setMousePos] = useState(null);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleAnimationComplete = () => {
    setIsCompleted(true);
  };

  return (
    <div 
      className="relative w-screen h-screen"
      onMouseMove={handleMouseMove}
    >
      {!isCompleted ? (
        <AssetsHandLightClosue 
          mousePos={mousePos}
          onAnimationComplete={handleAnimationComplete}
        />
      ) : (
        <OpenedClosue onComplete={onComplete} />
      )}
    </div>
  );
};

export default Closue;