import { useEffect, useState } from 'react'
import galleryForkImage from '../../assets/images/gallery_fork.png' // 경로 변경

const ArtworkModal = ({ artwork, onClose }) => {
  const [showFullPrompt, setShowFullPrompt] = useState(false)
  const [showPromptPopup, setShowPromptPopup] = useState(false) // New state

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

  // 사용된 AI 목록을 포맷팅하는 함수 (ArtworkTicker에서 가져옴)
  const formatUsedAI = (usedAI) => {
    if (!usedAI || typeof usedAI !== 'string') {
      return 'AI Generated' // 기본값
    }
    return usedAI // 이미 AIGallery에서 포맷팅된 문자열
  }

  // 제목의 첫 번째 글자와 나머지를 분리하는 함수 (ArtworkTicker에서 가져옴)
  const renderStyledTitle = (title) => {
    if (!title) return '';
    const firstChar = title.charAt(0);
    const restChars = title.slice(1);
    
    return (
      <>
        <span className="text-[#FF6C43]">{firstChar}</span>
        <span className="text-white">{restChars}</span>
      </>
    );
  };

  return (
    <>
      {/* 메인 모달 */}
      <div 
        className="fixed inset-0 z-50 bg-gray-900 overflow-auto" // 배경색 변경
        onClick={handleBackdropClick}
      >
        {/* 배경 텍스트 - 가장 아래 레이어 */}
        <div className="absolute flex flex-col inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="text-gray-600 font-stretch text-[300px] font-bold opacity-60 select-none text-center">
            PRompting
          </div>
          <div className="text-gray-600 font-stretch text-[300px] font-bold opacity-60 select-none text-center">
            [RECIPE]
          </div>
        </div>

        {/* 컨텐츠 레이어 */}
        <div className="relative z-10 h-full flex flex-col">
          {/* 상단 영역 - X 버튼 */}
          <div className="flex justify-end p-8 z-40">
            <button
              onClick={onClose}
              className="w-14 h-14 bg-gray-800 bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white transition-all duration-200"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 작품 제목 - 이미지 위에 겹치게 (메인 컨텐츠 영역 밖으로 이동) */}
          <div className="absolute top-[140px] left-0 right-0 text-center z-50 transform -translate-y-1/2">
            <h2 className="font-bold text-8xl uppercase tracking-[0.2em]" title={artwork.title}>
              {renderStyledTitle(artwork.title)}
            </h2>
          </div>

          {/* 메인 컨텐츠 영역 */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 pb-6 relative pt-4">

            {/* 작품 이미지 */}
            <div className="w-full max-w-6xl h-[700px] bg-gray-200 rounded-none overflow-hidden flex items-center justify-center relative rounded-[20px]">
              {artwork.image ? (
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDYwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHwid2lkdGg9IjYwMCIgImhlaWdodD0iNDUwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0yNzAgMjI1SDIxMFYxNjVIMjcwVjIyNVpNMzMwIDIyNUgzOTBWMTY1SDMzMFYyMjVaTTI3MCAyODVIMjEwVjM0NUgyNzBWMjg1Wk0zMzAgMjg1SDM5MFYzNDVIMzMwVjI4NVoiIGZpbGw9IiM2Mzc0OEYiLz4KPC9zdmc+';
                  }}
                />
              ) : (
                <div className="text-gray-400 text-center">
                  <div className="text-8xl mb-4">🖼️</div>
                  <div className="text-xl">이미지가 없습니다</div>
                </div>
              )}
            </div>

            {/* 아티스트 및 AI 정보 */}
            <div className="flex flex-col items-center space-y-1 text-white text-base font-pretendard mt-6">
              <p className="font-medium">ARTIST | {artwork.user?.name || '익명'}</p>
              <p className="text-sm text-gray-400">AI | {formatUsedAI(artwork.usedAI)}</p>
            </div>

            {/* 프롬프트 전체 보기 버튼 */}
            <button
              onClick={() => setShowPromptPopup(true)} // Changed to open popup
              className="bg-[#FF6C43] hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200 mt-6 text-lg"
            >
              프롬프트 전체 보기
            </button>

            {/* 포크 이미지 */}
            <img
              src={galleryForkImage}
              alt="Gallery Fork"
              className="absolute bottom-8 right-8 w-64 h-auto z-30"
            />
          </div>
        </div>
      </div>

      {showPromptPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="bg-white/10 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative shadow-xl">
            <h3 className="text-white text-xl font-bold mb-4">프롬프트</h3>
            <p className="text-gray-300 text-base leading-relaxed whitespace-pre-wrap">
              {artwork.prompt || '프롬프트 정보가 없습니다.'}
            </p>
            <button
              onClick={() => setShowPromptPopup(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-sm bg-transparent"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ArtworkModal
