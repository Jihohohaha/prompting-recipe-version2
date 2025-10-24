// src/pages/gpt-study/components/content/tabs/expanded/tutorial/Recipe1TutorialExplain.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "./BookFlip.css";

const Recipe1TutorialExplain = () => {
  const [leftPageIndex, setLeftPageIndex] = useState(0); // 왼쪽 페이지 인덱스
  const [rightPageIndex, setRightPageIndex] = useState(1); // 오른쪽 페이지 인덱스
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next'); // 'next' or 'prev'
  const navigate = useNavigate();
  const { slug } = useParams();

  // 전체 페이지 배열 (단일 배열)
  const pages = [
    <CoverPage />,           // 0
    <Page2 />,               // 1
    <Page3 />,               // 2
    <Page4 />,               // 3
    <Page5 />,               // 4
    <Page6 />,               // 5
    <Page7 />,               // 6
    <Page8 />,               // 7
    <Page9 />,               // 8
    <FinalPage navigate={navigate} slug={slug} />, // 9
  ];

  const handleNextPage = () => {
    // 더 이상 넘길 페이지가 없으면 리턴
    if (isFlipping || rightPageIndex >= pages.length - 1) return;
    
    setFlipDirection('next');
    setIsFlipping(true);
    
    // ✅ 회전 완료 후 state 업데이트
    setTimeout(() => {
      setLeftPageIndex(prev => prev + 2);
      setRightPageIndex(prev => prev + 2);
    }, 800);
    
    // ✅ 새 페이지 렌더링 후 클래스 제거 (약간 지연)
    setTimeout(() => {
      setIsFlipping(false);
    }, 850);
  };

  const handlePrevPage = () => {
    // 더 이상 이전 페이지가 없으면 리턴
    if (isFlipping || leftPageIndex <= 0) return;
    
    setFlipDirection('prev');
    setIsFlipping(true);
    
    // ✅ 회전 완료 후 state 업데이트
    setTimeout(() => {
      setLeftPageIndex(prev => prev - 2);
      setRightPageIndex(prev => prev - 2);
    }, 800);
    
    // ✅ 새 페이지 렌더링 후 클래스 제거 (약간 지연)
    setTimeout(() => {
      setIsFlipping(false);
    }, 850);
  };

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-black relative">
      {/* Book.png 배경 이미지 */}
      <div className="relative" style={{ width: "1136px", height: "618px" }}>
        <img
          src="/images/gpt-study/Book.png"
          alt="Book Background"
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* 책 컨테이너 - 이미지 정가운데에 배치 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="book-wrapper" style={{ width: "1100px", height: "450px" }}>
            <div className="book-container">
              {/* 왼쪽 페이지 컨테이너 */}
              <div className="page-left-container relative">
                {/* 왼쪽 페이지 - 앞면 */}
                <div className={`page-left-front ${isFlipping && flipDirection === 'prev' ? 'flipping-left' : ''}`}>
                  <div className={`page-wrapper ${isFlipping && flipDirection === 'prev' ? 'fading-out' : ''}`}>
                    <div className="page-content">
                      {pages[leftPageIndex]}
                    </div>
                  </div>
                </div>

                {/* 왼쪽 클릭 영역 - 왼쪽 20%만 */}
                <div 
                  onClick={handlePrevPage}
                  className="absolute left-0 top-0 bottom-0 w-[20%] cursor-pointer z-10"
                  style={{ pointerEvents: leftPageIndex <= 0 ? 'none' : 'auto' }}
                />
              </div>

              {/* 가운데 구분선 */}
              <div className="book-spine"></div>

              {/* 오른쪽 페이지 컨테이너 */}
              <div className="page-right-container relative">
                {/* 오른쪽 페이지 - 앞면 */}
                <div className={`page-right-front ${isFlipping && flipDirection === 'next' ? 'flipping-right' : ''}`}>
                  <div className={`page-wrapper ${isFlipping && flipDirection === 'next' ? 'fading-out' : ''}`}>
                    <div className="page-content">
                      {pages[rightPageIndex]}
                    </div>
                  </div>
                </div>

                {/* 오른쪽 클릭 영역 - 오른쪽 20%만 */}
                <div 
                  onClick={handleNextPage}
                  className="absolute right-0 top-0 bottom-0 w-[20%] cursor-pointer z-10"
                  style={{ pointerEvents: rightPageIndex >= pages.length - 1 ? 'none' : 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CoverPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent relative">
      {/* FE7525 원 (작은) */}
      <div
        className="absolute bg-[#FE7525] rounded-full"
        style={{
          width: "55px",
          height: "55px",
          right: "50px",
          top: "10px",
        }}
      />

      {/* FE7525 링 (큰) */}
      <div
        className="absolute rounded-full ring-8 ring-[#FE7525]"
        style={{
          width: "212px",
          height: "212px",
          left: "20px",
          top: "30px",
        }}
      />

      {/* Role 텍스트 */}
      <div
        className="absolute font-koolegant text-black text-[6rem]"
        style={{
          left: "40px",
          top: "60px",
        }}
      >
        Role
      </div>

      {/* FE7525 원 (중간) */}
      <div
        className="absolute bg-[#FE7525] rounded-full"
        style={{
          width: "119px",
          height: "119px",
          right: "50px",
          bottom: "30px",
        }}
      />

      {/* Prompting 텍스트 */}
      <div
        className="absolute font-koolegant text-black text-[6rem] whitespace-nowrap"
        style={{
          left: "30px",
          bottom: "-70px",
        }}
      >
        Prompting
      </div>

      {/* movie.png 이미지 */}
      <img
        src="/images/gpt-study/role/movie.png"
        alt="Role Prompting"
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "250px",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

// Page 2
const Page2 = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="text-center font-pretendard text-lg pt-24 font-medium leading-none text-black">
        <p className="mb-10">
          영화 배우는{" "}
          <span className="bg-[#FE7525] px-2 py-1 text-xl font-extrabold text-white">
            맡은 역할에 따라 완전히 다른 사람
          </span>
          이 됩니다.
        </p>
        <p className="mb-10">같은 배우라도 어떤 작품에서는 냉철한 형사로, </p>
        <p className="mb-10">다른 작품에서는 따뜻한 아버지로 보이죠.</p>
        <p className="mb-10">
          이처럼 역할이 달라지면 말투와 행동, 표현 방식도 함께 달라집니다.
        </p>
      </div>
    </div>
  );
};

// Page 3
const Page3 = () => {
  const [chatState, setChatState] = useState('initial'); // 'initial', 'loading', 'answered'

  const handleSendMessage = () => {
    // 1. 로딩 상태로 전환
    setChatState('loading');
    
    // 2. 1.5초 후 답변 표시
    setTimeout(() => {
      setChatState('answered');
    }, 1500);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12 bg-transparent relative">
      {/* 초기 상태 */}
      {chatState === 'initial' && (
        <div className="flex flex-col items-center justify-center">
          {/* ThinkingStatue 이미지 */}
          <img
            src="/images/gpt-study/ThinkingStatue.png"
            alt="Thinking Statue"
            className="w-[260px] h-[260px] object-contain"
          />

          {/* 설명 텍스트 */}
          <div className="text-black text-lg font-pretendard text-center leading-tight mt-4">
            직접 예시를 함께 봐볼까요?
            <br />
            먼저 아무 역할도 주지 않고 이렇게 시켜보세요.
          </div>
        </div>
      )}

      {/* 답변 후 평가 텍스트 - absolute 고정 */}
      {chatState === 'answered' && (
        <div 
          className="absolute w-full text-black text-lg font-pretendard text-center leading-tight"
          style={{
            top: '50px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          흠… 계산은 잘 되어 있지만,
          <br />
          삼각형 공식을 처음 배우는 초등학생에게는
          <br />
          설명이 조금 부족해 보이네요.
        </div>
      )}

      {/* 채팅 말풍선 영역 - absolute 고정 */}
      {(chatState === 'loading' || chatState === 'answered') && (
        <div 
          className="absolute w-full space-y-3"
          style={{
            top: '70%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '500px'
          }}
        >
          {/* 사용자 메시지 - 우측 흰색 말풍선 */}
          <div className="flex justify-end">
            <div className="bg-white text-black rounded-3xl px-12 py-4 max-w-[70%] shadow-md">
              <p className="font-pretendard text-sm">
                밑변 6, 높이 4인 삼각형의 넓이를 구해줘.
              </p>
            </div>
          </div>

          {/* GPT 응답 - 좌측 주황색 말풍선 */}
          <div className="flex justify-start">
            {chatState === 'loading' ? (
              // 로딩 애니메이션
              <div className="bg-[#FE7525] text-black rounded-3xl px-12 py-4 shadow-md">
                <div className="flex gap-1">
                  <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                </div>
              </div>
            ) : (
              // 답변
              <div className="bg-[#FE7525] text-black rounded-3xl px-12 py-4 max-w-[70%] shadow-md">
                <p className="font-pretendard text-sm">
                  답: 12
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 챗봇 Input 스타일 박스 - absolute로 하단 고정 */}
      <div 
        className="absolute w-[500px] bg-white rounded-full border-1 border-black py-1 flex items-center justify-center shadow-md"
        style={{
          bottom: '-50px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        {/* 텍스트 - 전체 중앙 */}
        <span className="text-gray-600 text-center font-pretendard text-lg w-full px-12">
          밑변 6, 높이 4인 삼각형의 넓이를 구해줘.
        </span>

        {/* 전송 버튼 - 우측 고정 */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // 페이지 넘김 방지
            handleSendMessage();
          }}
          className="absolute right-2 flex-shrink-0 hover:opacity-80 transition-opacity bg-transparent border-none p-0 cursor-pointer"
        >
          <img
            src="/images/gpt-study/Arrow2.png"
            alt="Send"
            className="w-8 h-8 object-contain"
          />
        </button>
      </div>
    </div>
  );
};

// Page 4
const Page4 = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 bg-transparent">
      <h2 className="font-pretendard text-3xl font-bold text-[#FE7525] mb-6">
        페이지 4
      </h2>
      <p className="font-pretendard text-lg text-gray-800 leading-relaxed">
        여기에 Explain 또는 Example 내용이 들어갑니다.
      </p>
    </div>
  );
};

// Page 5
const Page5 = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 bg-transparent">
      <h2 className="font-pretendard text-3xl font-bold text-[#FE7525] mb-6">
        페이지 5
      </h2>
      <p className="font-pretendard text-lg text-gray-800 leading-relaxed">
        여기에 Explain 또는 Example 내용이 들어갑니다.
      </p>
    </div>
  );
};

// Page 6
const Page6 = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 bg-transparent">
      <h2 className="font-pretendard text-3xl font-bold text-[#FE7525] mb-6">
        페이지 6
      </h2>
      <p className="font-pretendard text-lg text-gray-800 leading-relaxed">
        여기에 Explain 또는 Example 내용이 들어갑니다.
      </p>
    </div>
  );
};

// Page 7
const Page7 = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 bg-transparent">
      <h2 className="font-pretendard text-3xl font-bold text-[#FE7525] mb-6">
        페이지 7
      </h2>
      <p className="font-pretendard text-lg text-gray-800 leading-relaxed">
        여기에 Explain 또는 Example 내용이 들어갑니다.
      </p>
    </div>
  );
};

// Page 8
const Page8 = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 bg-transparent">
      <h2 className="font-pretendard text-3xl font-bold text-[#FE7525] mb-6">
        페이지 8
      </h2>
      <p className="font-pretendard text-lg text-gray-800 leading-relaxed">
        여기에 Explain 또는 Example 내용이 들어갑니다.
      </p>
    </div>
  );
};

// Page 9
const Page9 = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 bg-transparent">
      <h2 className="font-pretendard text-3xl font-bold text-[#FE7525] mb-6">
        페이지 9
      </h2>
      <p className="font-pretendard text-lg text-gray-800 leading-relaxed">
        여기에 Explain 또는 Example 내용이 들어갑니다.
      </p>
    </div>
  );
};

// Final Page
const FinalPage = ({ navigate, slug }) => {
  const handleGoToChat = () => {
    navigate(`/gpt-study/${slug}/chat`);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 bg-transparent">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <h2 className="font-pretendard text-3xl font-bold text-white">
          Role Prompting
          <br />
          마스터 완료! 🎉
        </h2>
        <div className="w-24 h-1 bg-white mx-auto"></div>
        <p className="font-pretendard text-lg text-white/90 leading-relaxed">
          이제 연습으로
          <br />
          실력을 키워보세요!
        </p>
        <button
          onClick={handleGoToChat}
          className="bg-white border-2 border-white rounded-full px-6 py-3 text-lg font-pretendard font-semibold text-[#FE7525] hover:bg-[#FE7525] hover:text-white transition-all mt-4"
        >
          레시피 연습하러 가기
        </button>
      </motion.div>
    </div>
  );
};

export default Recipe1TutorialExplain;