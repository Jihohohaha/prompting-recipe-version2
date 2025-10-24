import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/* ───────── 유틸 ───────── */
const hexToRgb = (hex) => {
  const h = hex?.replace('#', '');
  if (!h || (h.length !== 6 && h.length !== 3)) return { r: 255, g: 255, b: 255 };
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
};

const luminance = ({ r, g, b }) => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};

const getContrastText = (hex) => {
  const L = luminance(hexToRgb(hex));
  return L > 0.6 ? '#111111' : '#FFFFFF';
};

const titleCase = (s = '') => s.toLowerCase().replace(/\b([a-z])/g, (m) => m.toUpperCase());

/* ───────── 비활성 카드 UI ───────── */
const DesignedCard = React.memo(function DesignedCard({ recipe, index }) {
  const color = recipe?.color || '#777';
  const rgb = useMemo(() => hexToRgb(color), [color]);
  const isVeryLight = useMemo(() => luminance(rgb) > 0.82, [rgb]);
  const textColor = useMemo(() => getContrastText(color), [color]);

  const topLabel = `RECIPE ${recipe?.id ?? index}.`;
  const mainLabel = titleCase(recipe?.title || '');

  return (
    <div
      className={`absolute inset-0 rounded-[14px] overflow-hidden ${isVeryLight ? 'bg-white' : ''}`}
      style={{
        background: isVeryLight
          ? undefined
          : `linear-gradient(180deg, rgba(${rgb.r},${rgb.g},${rgb.b},0.95) 0%, rgba(${rgb.r},${rgb.g},${rgb.b},0.90) 100%)`,
        border: isVeryLight ? `1px solid ${color}` : 'none',
        boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
      }}
      aria-hidden
    >
      <div className="h-full w-full relative">
        <div className="absolute left-4 top-3 tracking-wide text-[14px] font-semibold" style={{ color: isVeryLight ? color : textColor }}>
          {topLabel}
        </div>
        <div className="absolute left-4 right-4 top-10 font-pretendard font-semibold leading-[1.15] break-words" style={{ color: isVeryLight ? '#111' : textColor, fontSize: 22 }}>
          {mainLabel}
        </div>
      </div>
    </div>
  );
});

/* ───────── 항상 깔리는 배경 레이어 ───────── */
const BackgroundLayer = React.memo(function BackgroundLayer({ recipe }) {
  const color = recipe?.color || '#777';
  return <div className="absolute inset-0" style={{ backgroundColor: color }} aria-hidden />;
});

/* ───────── 메인 컴포넌트 ───────── */
const DivSwitcher = React.memo(function DivSwitcher({
  isActive = false,
  isHovered = false,
  expandDirection = 'bottom',
  onClick,
  baseHeight = 120,     // 접힘 높이
  expandedHeight = 260, // 펼침 높이 (필요시 SidebarItem에서 넘겨 튜닝)
  className = '',
  activeSrc,            // 선택 시 표시할 이미지 경로(옵션)
  recipe,
  index,
}) {
  const transformOrigin = expandDirection === 'bottom' ? 'top center' : 'bottom center';
  const hasActiveImage = Boolean(activeSrc);

  return (
    <motion.div
      className={`cursor-pointer relative ${className}`}
      onClick={onClick}
      // ⬇️ 크기+위치 레이아웃 보간(예전처럼 부드럽게 확장)
      layout
      transition={{ layout: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } }}
    >
      <motion.div
        className={`
          w-full rounded-[14px] overflow-hidden relative
          ${isHovered && !isActive ? 'ring-1 ring-black/70' : ''}
          shadow-[0_6px_16px_rgba(0,0,0,0.25)]
        `}
        style={{ transformOrigin }}
        // ⬇️ 높이 자체 애니메이션 (확장/축소의 핵심)
        initial={false}
        animate={{ height: isActive ? expandedHeight : baseHeight, opacity: 1, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        // ⬇️ 레이아웃 변화도 함께 보간
        layout
      >
        {/* 1) 항상 배경색 */}
        <BackgroundLayer recipe={recipe} />

        {/* 2) 비활성 카드 */}
        {!isActive && <DesignedCard recipe={recipe} index={index} />}

        {/* 3) 활성 + 이미지 있을 때: 좌측 정렬 이미지 */}
        {isActive && hasActiveImage && (
          <motion.img
            key={activeSrc}
            src={activeSrc}
            alt=""
            aria-hidden
            className="
              absolute top-1/2 left-1 -translate-y-1/2
              select-none pointer-events-none
            "
            style={{ width: 180, height: 180, objectFit: 'contain' }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            layout
          />
        )}

        {/* 4) 활성인데 이미지가 없으면 카드 디자인 유지 */}
        {isActive && !hasActiveImage && <DesignedCard recipe={recipe} index={index} />}

        {/* (옵션) 비활성 hover 시 살짝 확대 */}
        {!isActive && (
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.02 : 1 }}
            transition={{ duration: 0.18 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
});

export default DivSwitcher;
