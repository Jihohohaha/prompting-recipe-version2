import React from 'react';

/**
 * 텍스트 길이가 바뀌어도 레이아웃 흔들리지 않도록 고정 박스에 중앙정렬.
 * 동적 강조(스케일/불투명도 변화) 제거 → 항상 동일 스타일.
 */
const KeywordText = React.memo(
  ({
    children,
    className = '',
    boxWidth = 160,
    boxHeight = 36,
    fontSizeClass = 'text-lg',
  }) => {
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(children);
    const fontClass = hasKorean ? 'font-pretendard' : 'font-sacramento';

    return (
      <div
        className={`absolute pointer-events-none ${className}`}
        style={{ width: boxWidth, height: boxHeight }}
      >
        <div
          className={[
            'w-full h-full flex items-center justify-center',
            'leading-none whitespace-nowrap select-none',
            fontClass,
            fontSizeClass,
          ].join(' ')}
          style={{ opacity: 1 }}
        >
          {children}
        </div>
      </div>
    );
  }
);

export default KeywordText;
