// src/components/gallery/ArtworkModal.jsx
import { useEffect, useState } from 'react'



const ArtworkModal = ({ artwork, onClose }) => {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') { // Simplified: no nested modal check needed
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden' // 스크롤 방지
    
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [onClose]) // Simplified dependencies

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) { // Simplified: no nested modal check needed
      onClose()
    }
  }

  // 사용된 AI 목록을 포맷팅하는 함수
  const formatUsedAI = (usedAI) => {
    if (!usedAI || !Array.isArray(usedAI)) {
      return 'AI CHAT GPT, KLING AI' // 기본값
    }
    return `AI ${usedAI.join(', ').toUpperCase()}`
  }

  return (
    <>
      {/* 메인 모달 */}
      <div 
        className="fixed inset-0 z-50 bg-black"
        onClick={handleBackdropClick}
      >
        {/* 배경 텍스트 - 가장 아래 레이어 */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="text-gray-600 font-stretch text-[8rem] font-bold opacity-60 select-none">
            PRompting RECIPE
          </div>
        </div>

        {/* 컨텐츠 레이어 */}
        <div className="relative z-10 h-full flex flex-col">
          {/* 상단 영역 - X 버튼 */}
          <div className="flex justify-end p-8">
            <button
              onClick={onClose}
              className="w-14 h-14 bg-gray-800 bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white transition-all duration-200"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 메인 컨텐츠 영역 */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 pb-6 space-y-6">

            {/* 작품 이미지 */}
            <div className="w-full max-w-4xl aspect-video bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
              {artwork.image ? (
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDYwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0yNzAgMjI1SDIxMFYxNjVIMjcwVjIyNVpNMzMwIDIyNUgzOTBWMTY1SDMzMFYyMjVaTTI3MCAyODVIMjEwVjM0NUgyNzBWMjg1Wk0zMzAgMjg1SDM5MFYzNDVIMzMwVjI4NVoiIGZpbGw9IiM2Mzc0OEYiLz4KPC9zdmc+'
                  }}
                />
              ) : (
                <div className="text-gray-400 text-center">
                  <div className="text-8xl mb-4">🖼️</div>
                  <div className="text-xl">이미지가 없습니다</div>
                </div>
              )}
            </div>

            {/* 프롬프트 표시 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 w-full max-w-4xl overflow-y-auto max-h-48">
              <h3 className="text-white text-xl font-bold mb-4">프롬프트</h3>
              <p className="text-gray-300 text-base leading-relaxed whitespace-pre-wrap">
                {artwork.prompt || '프롬프트 정보가 없습니다.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArtworkModal