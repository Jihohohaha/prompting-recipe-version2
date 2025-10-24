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
      <video 
        src="/videos/Closue.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
      />
    </div>
  );
};

export default Closue;


{/* <div
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
    </div> */}