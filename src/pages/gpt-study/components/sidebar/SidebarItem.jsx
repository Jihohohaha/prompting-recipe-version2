// src/pages/gpt-study/components/sidebar/SidebarItem.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useGPTStudyStore from '../../store';

const SidebarItem = ({ recipe, index }) => {
  const navigate = useNavigate();
  const { activeSection, setActiveSection } = useGPTStudyStore(); // ✅ setActiveSection 추가
  const isActive = activeSection === index;
  const [isHovered, setIsHovered] = useState(false);

  const currentImage = isActive ? recipe.images.selected : recipe.images.default;

  const handleClick = () => {
    setActiveSection(index); // ✅ store 업데이트
    navigate(`/gpt-study/${recipe.slug}`); // ✅ URL 변경
  };

  return (
    <motion.div
      className={`cursor-pointer relative ${
        isActive ? '' : 'opacity-100'
      }`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={{
        scale: 1
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
    >
      <motion.img
        src={currentImage}
        alt={recipe.title}
        className={`w-full h-auto object-contain ${
          isHovered && !isActive ? 'border border-black' : ''
        }`}
        initial={false}
        animate={{
          height: 'auto'
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      />
    </motion.div>
  );
};

export default SidebarItem;