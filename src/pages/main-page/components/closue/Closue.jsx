import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AssetsHandLightClosue from "./transition/AssetHandLightClosue";
import OpenedClosue from "./transition/OpenedClosue";

const Closue = ({ onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [mousePos, setMousePos] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleAnimationComplete = () => {
    setIsCompleted(true);
  };

  const handleVideoEnd = () => {
    setIsCompleted(true);
  };

  const handleSkip = () => {
    setIsCompleted(true);
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence mode="wait">
        {!isCompleted ? (
          <motion.div
            key="video"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative w-screen h-screen"
          >
            {/* 로딩 중 배경 */}
            {!isVideoLoaded && (
              <div className="absolute inset-0 bg-[#F5F5F5]" />
            )}

            <video
              src="/videos/closue.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              onEnded={handleVideoEnd}
              onLoadedData={handleVideoLoaded}
              playsInline
            />

            {/* 스킵 버튼 */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: isVideoLoaded ? 0.7 : 0 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={handleSkip}
              className="absolute top-8 right-8 z-50 px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-pretendard rounded-lg hover:bg-white/30 transition-colors"
            >
              건너뛰기
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-screen h-screen"
          >
            <OpenedClosue onComplete={onComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Closue;

{
  /* <div
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
    </div> */
}
