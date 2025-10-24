// src/pages/Community/AIGallery.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import ArtworkTicker from '../../components/gallery/ArtworkTicker'
import ArtworkModal from '../../components/gallery/ArtworkModal'
import apiService from '../../services/apiService'
import aiGallerySuksangImage from '../../assets/images/ai_gallery_suksang.png'; // Import the image
import aiGalleryBgImage from '../../assets/images/ai_gallery_bgg.png'; // Import background image

const AIGallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 제목 생성 헬퍼 함수 - 프롬프트에서 의미있는 제목 추출
  const generateTitleFromPrompt = (prompt) => {
    if (!prompt || typeof prompt !== 'string') {
      return 'UNTITLED'
    }

    // 프롬프트가 너무 짧으면 그대로 사용
    if (prompt.length <= 15) {
      return prompt.toUpperCase()
    }

    // 첫 번째 문장이나 쉼표 전까지 사용
    const firstSentence = prompt.split(/[.!?]|,/)[0].trim()
    
    // 적절한 길이로 자르기 (10-20 글자 정도)
    if (firstSentence.length > 20) {
      return firstSentence.substring(0, 17).trim() + '...'
    }

    return firstSentence.toUpperCase()
  }

  // 사용된 AI를 기반으로 스타일 생성
  const generateStyleFromAI = (usedAI) => {
    if (!usedAI || typeof usedAI !== 'string') {
      return 'AI Generated';
    }
    // 예: "AI CHATGPT, DALL-E" -> "CHATGPT + DALL-E Art"
    const aiNames = usedAI.replace(/^AI\s*/, '').replace(/, /g, ' + ');
    return `${aiNames} Art`;
  };

  // 백엔드 데이터를 프론트엔드 형식으로 변환
  const transformBackendData = (backendData) => {
    return backendData.map(item => ({
      id: item.gallery_board_id,
      title: item.title || generateTitleFromPrompt(item.prompt),
      artist: item.user?.name || '익명',
      image: item.images && item.images.length > 0 ? item.images[0].image_url : null,
      prompt: item.prompt || '프롬프트 정보가 없습니다.',
      style: generateStyleFromAI(item.used_ai), // 이제 문자열을 직접 전달
      usedAI: item.used_ai || 'AI Generated', // 이제 문자열을 직접 저장
      createdAt: item.created_at,
      updated_at: item.updated_at,
      user: item.user
    }));
  };

  // 컴포넌트 마운트 시 갤러리 데이터 로드
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // 새로운 API 엔드포인트 사용
        const response = await apiService.getGalleryBoards(1, 20) // 첫 페이지, 20개 항목
        
        console.log('API Response:', response.data)
        
        if (response.data && response.data.data && response.data.data.data) {
          const transformedData = transformBackendData(response.data.data.data)
          console.log('Transformed Data:', transformedData)
          setArtworks(transformedData)
        } else {
          console.warn('예상하지 못한 API 응답 구조:', response.data)
          setError('데이터 형식이 예상과 다릅니다.')
          setArtworks([])
        }
      } catch (error) {
        console.error('갤러리 데이터 로드 실패:', error)
        
        // 에러 메시지 개선
        if (error.response?.status === 404) {
          setError('갤러리 API를 찾을 수 없습니다. 서버 상태를 확인해주세요.')
        } else if (error.response?.status === 500) {
          setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
        } else if (error.code === 'ECONNABORTED') {
          setError('요청 시간이 초과되었습니다. 인터넷 연결을 확인해주세요.')
        } else {
          setError('갤러리 데이터를 불러오는데 실패했습니다.')
        }
        
        setArtworks([])
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryData()
  }, [])

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork)
  }

  const handleCloseModal = () => {
    setSelectedArtwork(null)
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-white text-xl mb-4">갤러리를 불러오는 중...</div>
            <div className="flex space-x-2 justify-center">
              <motion.div
                className="w-3 h-3 bg-red-600 rounded-full"
                animate={{ y: [-10, 0, -10] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-3 h-3 bg-red-600 rounded-full"
                animate={{ y: [-10, 0, -10] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-3 h-3 bg-red-600 rounded-full"
                animate={{ y: [-10, 0, -10] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md">
            <div className="text-red-500 text-xl mb-4">{error}</div>
            <div className="space-y-2">
              <button 
                onClick={handleRefresh}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors mr-2"
              >
                다시 시도
              </button>
              <Link 
                to="/community"
                className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                커뮤니티로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-cover bg-left" // Removed bg-black, added bg-cover bg-center
      style={{
      backgroundImage: `url(${aiGalleryBgImage})`}}
    >
      
      {/* 메인 레이아웃 - 좌우 분할 */}
      <div className="flex h-screen relative z-10">
        {/* 왼쪽 정보 섹션 */}
        <div className="w-1/3 flex flex-col justify-center items-center relative"
            style={{transform: 'translateY(57px)'}}>


          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-center"
          >

            {/* 설명 텍스트 */}
            <div className=" text-white text-lg font-pretendard leading-normal text-center"
            style={{transform: 'translateY(10px)'}}>
              <p>
                열심히 학습한 뒤 생성형 AI를 통해<br />
                다양한 아트 결과물들을 만들어낼 수 있습니다.<br />
                이제 그 결과물들을 갤러리에서 만나보세요 !<br />
                프롬프트도 확인할 수 있답니다
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            {/* ai_gallery_suksang.png 이미지 */}
            <img
              src={aiGallerySuksangImage} // Use the imported image
              alt="AI Gallery Suksang"
              className="mt-8 mx-auto" // Center the image
            />
          </motion.div>
        </div>

        {/* 오른쪽 Ticker 섹션 */}
        <div className="w-2/3 flex items-center justify-center relative">
          <div
            className="absolute top-16 bg-gray-500 text-[_#FF6C43_] border-[_#FF6C43_] border 
             rounded-2xl left-8 py-2 px-8 w-fit 
             transform -rotate-1.75 z-50"
          >
            AI 아트 갤러리
          </div>
          {artworks.length > 0 ? (
            <ArtworkTicker 
              artworks={artworks} 
              onArtworkClick={handleArtworkClick}
            />
          ) : (
            <div className="text-center text-gray-400">
              <div className="text-6xl mb-4">🎨</div>
              <div className="text-xl mb-2">아직 등록된 작품이 없습니다</div>
              <div className="text-sm">첫 번째 작품을 등록해보세요!</div>
            </div>
          )}
        </div>
      </div>

      {/* 작품 상세 모달 */}
      <AnimatePresence>
        {selectedArtwork && (
          <ArtworkModal 
            artwork={selectedArtwork} 
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default AIGallery