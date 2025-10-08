// src/pages/gpt-study/components/image-switcher/ImageSwitcher.jsx
import { motion } from 'framer-motion';

/**
 * ImageSwitcher - 이미지 전환 애니메이션 컴포넌트
 * 
 * @param {string} defaultImage - 기본 이미지 경로
 * @param {string} selectedImage - 선택된 이미지 경로
 * @param {boolean} isActive - 활성화 상태
 * @param {boolean} isHovered - 호버 상태
 * @param {'top' | 'bottom'} expandDirection - 확장 방향
 * @param {function} onClick - 클릭 핸들러
 * @param {string} alt - 이미지 alt 텍스트
 */
const ImageSwitcher = ({
  defaultImage,
  selectedImage,
  isActive = false,
  isHovered = false,
  expandDirection = 'bottom',
  onClick,
  alt = ''
}) => {
  // transform-origin 설정
  const transformOrigin = expandDirection === 'bottom' 
    ? 'top center' 
    : 'bottom center';

  return (
    <motion.div
      className="cursor-pointer relative"
      onClick={onClick}
      layout="position"
      transition={{
        layout: {
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
    >
      <motion.img
        src={isActive ? selectedImage : defaultImage}
        alt={alt}
        className={`
          w-full h-auto object-contain
          ${isHovered && !isActive ? 'border border-black' : ''}
        `}
        style={{
          transformOrigin: transformOrigin
        }}
        initial={false}
        animate={{
          scale: 1,
          opacity: 1
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        }}
      />
    </motion.div>
  );
};

export default ImageSwitcher;