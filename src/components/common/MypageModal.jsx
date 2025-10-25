// src/components/common/MypageModal.jsx
import React, { useEffect, useRef, useMemo } from 'react';

const ORANGE = '#FF6C43';
const STORAGE_KEY = 'rolePromptingCompleted';

function ProgressPill({ label, percent = 0 }) {
  const p = Math.max(0, Math.min(100, percent));
  return (
    <div className="relative w-[260px] h-11 rounded-full border-2 overflow-hidden"
         style={{ borderColor: 'white', background: '#ffffff20' }}>
      <div className="absolute left-0 top-0 h-full rounded-full"
           style={{ width: `${p}%`, backgroundColor: ORANGE, transition: 'width 450ms ease' }} />
      <div className="relative z-10 h-full flex items-center pl-4 pr-16">
        <span className="text-white tracking-wide text-sm font-semibold uppercase">{label}</span>
      </div>
      <div className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-3 rounded-full flex items-center justify-center text-[13px] font-bold"
           style={{ background: 'transparent', color: '#000' }}>
        {p}%
      </div>
    </div>
  );
}

const MypageModal = ({ open, onClose, progressList }) => {
  const panelRef = useRef(null);
  const id = 'mypage-modal';

  const defaults = [
    { label: 'ROLE PROMPTING', percent: 100 },
    { label: 'FEW SHOT',       percent: 100 },
    { label: 'HALLUCINATION',  percent: 100 },
    { label: 'MARKDOWN',       percent: 100 },
    { label: 'RAG',            percent: 100 },
    { label: 'REFLECTION',     percent: 100 },
  ];

  // ✅ defaults + progressList 병합 + localStorage(완료시)로 ROLE PROMPTING=100 덮어쓰기
  const items = useMemo(() => {
    const map = new Map(defaults.map(d => [d.label, d.percent]));

    if (Array.isArray(progressList) && progressList.length) {
      for (const { label, percent } of progressList) {
        if (typeof label === 'string' && Number.isFinite(+percent)) {
          map.set(label, +percent);
        }
      }
    }

    // localStorage가 true면 ROLE PROMPTING을 100으로 고정
    try {
      const done = localStorage.getItem(STORAGE_KEY) === 'true';
      if (done) map.set('ROLE PROMPTING', 100);
    } catch {
      /* storage 접근 불가시 무시 */
    }

    return Array.from(map, ([label, percent]) => ({ label, percent }));
  }, [progressList, open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleOverlayClick = () => onClose?.();
  const stop = (e) => e.stopPropagation();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      id={id}
      className="fixed left-1/2 -translate-x-1/2 top-[20vh] z-[10000] flex items-center justify-center bg-black/50 rounded-2xl backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        ref={panelRef}
        onClick={stop}
        className="w-[90vw] h-[75vh] bg-[#ffffff20] rounded-2xl shadow-2xl relative overflow-hidden flex flex-col"
      >
        {/* 상단 헤더 */}
        <div className="flex items-center justify-between px-5 py-3">
          <h2 id={`${id}-title`} className="text-transparent text-lg font-semibold">.</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-6 rounded-full px-3 py-1 text-sm border text-white/90 hover:bg-white/10"
          >
            닫기
          </button>
        </div>

        {/* 👉 그리드: 상단 정렬 + 동일한 바깥 패딩만 유지 */}
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr] items-start gap-6 p-6">
          {/* 좌측 큰 카드 */}
          <div className="flex flex-col justify-center items-center h-[390px] rounded-xl bg-[#ffffff20] p-6">
            <p className='mb-4 text-[28px] font-desira font-bold'>[RANK]</p>
            <img src="/images/badge.png"/>
          </div>

          {/* 가운데 정보 카드 */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-6">
              <section className="border rounded-xl p-4 w-[300px]">
                <h3 className="text-[20px] font-bold mb-3 text-white/90">이름</h3>
                <p className="text-sm text-white">송승윤</p>
              </section>
              <section className="border rounded-xl p-4 w-[300px]">
                <h3 className="text-[20px] font-bold mb-3 text-white/90">가입 메일</h3>
                <p className="text-sm text-white">singsong9984@khu.ac.kr</p>
              </section>
              <section className="border rounded-xl p-4 w-[300px]">
                <h3 className="text-[20px] font-bold mb-3 text-white/90">학습 시간</h3>
                <p className="text-sm text-white">23h 23m</p>
              </section>
            </div>
          </div>

          {/* 오른쪽 진행도 카드 */}
          <div className="border rounded-xl p-4">
            <section className="w-[320px] p-2 flex flex-col justify-center items-center">
              <h3 className="w-[240px] text-[20px] font-bold mb-3 text-center text-white/90">진행도</h3>
              <div className="flex flex-col gap-2">
                {items.map(({ label, percent }) => (
                  <ProgressPill key={label} label={label} percent={percent} />
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* 하단 액션 */}
        <div className="absolute flex bottom-2 right-4 bg-transparent">
          <button className="px-4 py-2 bg-transparent text-[#ffffff80] underline">로그아웃</button>
          <button onClick={onClose} className="px-4 py-2 bg-transparent text-[#ffffff80] underline">회원 탈퇴</button>
        </div>
      </div>
    </div>
  );
};

export default MypageModal;
