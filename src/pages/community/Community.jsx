import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CommunityBackground from '../../components/community/CommunityBackground'
import CommunityHeader from '../../components/community/CommunityHeader'
import CommunityButton from '../../components/community/CommunityButton'

import aboutAiBg from '../../assets/images/about-ai-bg.png'

import aiArtGalleryBg from '../../assets/images/ai-art-gallery.png'

const Community = () => {
  const navigate = useNavigate()
  const [hoveredButton, setHoveredButton] = useState(null)

  const communityButtons = [
    
    {
      id: 'about-ai',
      title: 'AI에 관한 글',
      backgroundImage: aboutAiBg
    },
    {
      id: 'ai-art-gallery',
      title: 'AI 아트 갤러리',
      backgroundImage: aiArtGalleryBg
    }
  ]

  const handleButtonHover = (buttonId) => {
    setHoveredButton(buttonId)
  }

  const handleButtonLeave = () => {
    setHoveredButton(null)
  }

  const handleButtonClick = (buttonId) => {
    console.log(`${buttonId} 클릭됨`)
    // 여기에 라우팅 로직 추가
    switch(buttonId) {
      
      case 'about-ai':
        navigate('/community/ai-articles')
        break
      case 'ai-art-gallery':
        navigate('/community/ai-gallery')
        break
      default:
        console.log('알 수 없는 버튼입니다.')
    }
  }

  return (
    <div className="w-full h-screen object-contain relative">
      {/* 배경 레이어 */}
      <CommunityBackground
        hoveredButton={hoveredButton} 
        communityButtons={communityButtons} 
      />

      

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-8">
        {/* 헤더 */}
        <CommunityHeader />

        {/* 버튼들 */}
        <div className="flex flex-col items-center space-y-0 w-full mt-6">
          {communityButtons.map((button, index) => (
            <CommunityButton
              key={button.id}
              id={button.id}
              title={button.title}
              index={index}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onClick={() => handleButtonClick(button.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Community