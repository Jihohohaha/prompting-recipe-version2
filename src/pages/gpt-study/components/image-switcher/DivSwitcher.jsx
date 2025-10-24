// src/pages/gpt-study/components/image-switcher/DivSwitcher.jsx
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

const isRolePrompting = (recipe) => /role\s*prompting/i.test(recipe?.title || '');
const getProgressPercent = (recipe) => {
  // Role Prompting만 100% 예외(기본 60%), 나머지는 100%
  if (isRolePrompting(recipe)) return recipe?.progress ?? 60;
  return 100;
};
const getProgressColors = (recipe) => {
  const textColor = getContrastText(recipe?.color || '#777');
  return {
    track: 'rgba(0,0,0,0.28)',
    fill: textColor === '#111111' ? '#111111' : '#FFFFFF',
  };
};

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
        <div
          className="absolute left-1/2 -translate-x-1/2 top-3 tracking-wide text-[14px] font-semibold"
          style={{ color: isVeryLight ? color : textColor }}
        >
          {topLabel}
        </div>
        <div
          className="absolute left-1/2 -translate-x-1/2 text-center top-10 font-pretendard font-semibold leading-[1.15] break-words"
          style={{ color: isVeryLight ? '#111' : textColor, fontSize: 22 }}
        >
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

  // 이미지/프로그레스 바 치수
  const IMG_W = 180;
  const IMG_H = 180;
  const BAR_H = 10;

  // 진행률/색
  const percent = getProgressPercent(recipe);
  const { track, fill } = getProgressColors(recipe);

  return (
    <motion.div
      className={`cursor-pointer relative ${className}`}
      onClick={onClick}
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
        initial={false}
        animate={{ height: isActive ? expandedHeight : baseHeight, opacity: 1, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        layout
      >
        {/* 1) 항상 배경색 */}
        <BackgroundLayer recipe={recipe} />

        {/* 2) 비활성 카드 */}
        {!isActive && <DesignedCard recipe={recipe} index={index} />}

        {/* 3) 활성 + 이미지 있을 때: 좌하단 이미지 + 바로 아래 프로그레스바 */}
        {isActive && hasActiveImage && (
          <>
            <motion.img
              key={activeSrc}
              src={activeSrc}
              alt=""
              aria-hidden
              className="absolute bottom-6 left-5 select-none pointer-events-none"
              style={{ width: IMG_W, height: IMG_H, objectFit: 'contain' }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
              layout
            />

            <motion.div
              className="absolute left-[22px]"
              style={{
                bottom: '10px',
                width: IMG_W,
                height: BAR_H,
                borderRadius: 9999,
                background: track,
                overflow: 'hidden',
              }}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1], delay: 0.02 }}
            >
              <motion.div
                className="h-full"
                style={{ background: fill }}
                initial={{ width: '0%' }}
                animate={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
                transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              />
            </motion.div>
          </>
        )}

        {/* 4) 활성인데 이미지가 없으면 카드 유지 (프로그레스바 미표시) */}
        {isActive && !hasActiveImage && <DesignedCard recipe={recipe} index={index} />}

        {/* 5) 비활성 hover 살짝 확대 */}
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
