// src/pages/gpt-study/components/modals/QuizModalContainer.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import useGPTStudyStore from '../store';
import Recipe1QuizMultiple from '../components/content/tabs/expanded/quiz/Recipe1QuizMultiple';
import Recipe1QuizMultipleResult from '../components/content/tabs/expanded/quiz/Recipe1QuizMultipleResult';
import Recipe1QuizEssay from '../components/content/tabs/expanded/quiz/Recipe1QuizEssay';

const QuizModalContainer = () => {
  const {
    isQuizModalOpen,
    isChatModalOpen,
    closeQuizModal,
    closeChatModal,
    toggleChatModal,
    quizStep,
    setQuizStep,
    quizScore,
    currentQuizRecipeId
  } = useGPTStudyStore();

  // 모달 위치 상태
  const [quizPosition, setQuizPosition] = useState({ x: 0, y: 0 });
  const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 });

  // 드래그 제약 ref (퀴즈 모달용 - 화면 안에서만)
  const quizConstraintsRef = useRef(null);

  // 초기 위치 설정
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // 퀴즈 모달: 화면 오른쪽에서 10% 떨어진 위치
    const quizInitialX = window.innerWidth * 0.1;
    const quizInitialY = window.innerHeight * 0.05;
    setQuizPosition({ x: quizInitialX, y: quizInitialY });

    // 챗봇 모달: 화면 왼쪽에서 10% 떨어진 위치
    const chatInitialX = window.innerWidth * 0.1;
    const chatInitialY = window.innerHeight * 0.3;
    setChatPosition({ x: chatInitialX, y: chatInitialY });
  }, []);

  // 채팅 모달 크기 (px 단위) 및 리사이즈 상태
  const [chatSize, setChatSize] = useState({ width: 0, height: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const resizingRef = useRef({ startX: 0, startY: 0, startW: 0, startH: 0 });

  // 초기 chatSize 설정 (47% width, 50vh height as default)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const w = Math.max(260, Math.round(window.innerWidth * 0.47));
    const h = Math.round(window.innerHeight * 0.5);
    setChatSize({ width: w, height: h });

    return () => {
      // cleanup global listeners if any remain
      window.removeEventListener('mousemove', onResizeMove);
      window.removeEventListener('mouseup', endResize);
      window.removeEventListener('touchmove', onResizeMove);
      window.removeEventListener('touchend', endResize);
    };
  }, []);

  const onResizeMove = (e) => {
    if (!isResizing) return;
    e.preventDefault();
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
    const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);
    if (clientX == null || clientY == null) return;

    const dx = clientX - resizingRef.current.startX;
    const dy = clientY - resizingRef.current.startY;
    const minW = 260;
    const maxW = Math.floor(window.innerWidth * 0.9);
    const minH = 180;
    const maxH = Math.floor(window.innerHeight * 0.9);

    let newW = Math.round(resizingRef.current.startW + dx);
    let newH = Math.round(resizingRef.current.startH + dy);
    newW = Math.max(minW, Math.min(maxW, newW));
    newH = Math.max(minH, Math.min(maxH, newH));
    setChatSize({ width: newW, height: newH });
  };

  const endResize = () => {
    setIsResizing(false);
    window.removeEventListener('mousemove', onResizeMove);
    window.removeEventListener('mouseup', endResize);
    window.removeEventListener('touchmove', onResizeMove);
    window.removeEventListener('touchend', endResize);
  };

  const startResize = (ev) => {
    ev.stopPropagation();
    const clientX = ev.clientX ?? (ev.touches && ev.touches[0]?.clientX);
    const clientY = ev.clientY ?? (ev.touches && ev.touches[0]?.clientY);
    if (clientX == null || clientY == null) return;
    resizingRef.current = { startX: clientX, startY: clientY, startW: chatSize.width, startH: chatSize.height };
    setIsResizing(true);
    window.addEventListener('mousemove', onResizeMove);
    window.addEventListener('mouseup', endResize);
    window.addEventListener('touchmove', onResizeMove, { passive: false });
    window.addEventListener('touchend', endResize);
  };

  if (!isQuizModalOpen) return null;

  const handleRetry = () => {
    setQuizStep('multiple');
  };

  const handleNext = () => {
    setQuizStep('essay');
  };

  return (
    <>
      {/* 배경 오버레이 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeQuizModal}
      />

      {/* 드래그 제약 컨테이너 (퀴즈 모달용) */}
      <div ref={quizConstraintsRef} className="fixed inset-0 pointer-events-none z-40" />

      {/* 오른쪽 퀴즈 모달 */}
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={quizConstraintsRef}
        dragElastic={0}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={{
          position: 'fixed',
          right: '1%',
          top: '1%',
          width: '80%', // 9/20
          height: '98vh', // 9/10
          zIndex: 50,
        }}
        className="bg-white rounded-lg shadow-2xl flex flex-col pointer-events-auto cursor-move"
      >
        {/* 닫기 버튼 */}
        <button
          onClick={closeQuizModal}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors z-10"
        >
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 퀴즈 내용 영역 (스크롤 가능) */}
        <div className="flex-1 overflow-y-auto p-6 cursor-auto">
          <AnimatePresence mode="wait">
            {quizStep === 'multiple' && (
              <motion.div
                key="multiple"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Recipe1QuizMultiple />
              </motion.div>
            )}

            {quizStep === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Recipe1QuizMultipleResult 
                  score={quizScore}
                  onRetry={handleRetry}
                  onNext={handleNext}
                />
              </motion.div>
            )}

            {quizStep === 'essay' && (
              <motion.div
                key="essay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Recipe1QuizEssay />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FAB 버튼 (챗봇) - 퀴즈 모달에 종속: 모달 내부에 고정되도록 positive bottom 사용 */}
        <button
          onClick={toggleChatModal}
          aria-label="Open chat"
          className="absolute bottom-6 right-6 w-14 h-14 bg-[#FE7525] hover:bg-[#ff8a45] rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-110 cursor-pointer z-10"
          style={{ pointerEvents: 'auto' }}
        >
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      </motion.div>

      {/* 왼쪽 챗봇 모달 */}
      <AnimatePresence>
        {isChatModalOpen && (
          <motion.div
            // disable drag while resizing to avoid gesture conflicts
            drag={!isResizing}
            dragMomentum={false}
            dragElastic={0.1}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
                  style={{
                    position: 'fixed',
                    left: '5%',
                    top: '25%',
                    // numeric px sizes from state to support drag-resize
                    width: chatSize.width ? `${chatSize.width}px` : '47%',
                    height: chatSize.height ? `${chatSize.height}px` : '50vh',
                    minWidth: '260px',
                    maxWidth: '90%',
                    zIndex: 50,
                  }}
            className="bg-white rounded-lg shadow-2xl flex flex-col pointer-events-auto cursor-move relative"
          >
            {/* 닫기 버튼 */}
            <button
              onClick={closeChatModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors z-10"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* 챗봇 헤더 */}
            <div className="px-6 py-4 border-b border-gray-200 cursor-auto">
              <h2 className="text-xl font-bold text-gray-800">AI 챗봇</h2>
              <p className="text-sm text-gray-500">퀴즈에 대해 질문해보세요</p>
            </div>

            {/* 챗봇 대화 영역 (스크롤 가능) */}
            <div className="flex-1 overflow-y-auto p-6 cursor-auto">
              <div className="flex flex-col gap-4">
                {/* 챗봇 메시지 예시 */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                    <p className="text-sm text-gray-800">
                      안녕하세요! 퀴즈에 대해 궁금한 점이 있으시면 언제든 질문해주세요.
                    </p>
                  </div>
                </div>

                {/* 사용자 메시지 입력 안내 */}
                <div className="text-center text-sm text-gray-400 py-8">
                  챗봇 기능은 준비 중입니다
                </div>
              </div>
            </div>

            {/* 챗봇 입력 영역 */}
            <div className="px-6 py-4 border-t border-gray-200 cursor-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
                <button
                  disabled
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  전송
                </button>
              </div>
            </div>
            {/* Resize handle (bottom-right) */}
            <div
              onMouseDown={startResize}
              onTouchStart={startResize}
              className="absolute bottom-3 right-3 w-4 h-4 z-20 cursor-se-resize rounded-sm bg-gray-300"
              title="Resize"
            />
            {/* optionally show an overlay while resizing to capture pointer events */}
            {isResizing && <div className="fixed inset-0 z-30" style={{ cursor: 'se-resize' }} />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuizModalContainer;