// src/components/CommunityButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const CommunityButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleHover = () =>
      setIsHovered(document.body.classList.contains("hover-left"));
    window.addEventListener("mousemove", handleHover);
    return () => window.removeEventListener("mousemove", handleHover);
  }, []);

  return (
    <motion.div
      className="fixed top-1/2 left-16 transform -translate-y-1/2 z-[9999] flex items-center select-none"
      animate={{ filter: isHovered ? "brightness(1.3)" : "brightness(1)" }}
      transition={{ duration: 0.2 }}
    >
      <motion.span
        className={`text-5xl mr-2 font-light transition-colors duration-300 ${
          isHovered ? "text-[#FF6C43]" : "text-gray-400 opacity-50"
        }`}
        animate={{ x: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      >
        〈
      </motion.span>
      <span className="text-gray-200 text-3xl font-bold font-pretendard">
        커뮤니티
      </span>
    </motion.div>
  );
};

export default CommunityButton;
