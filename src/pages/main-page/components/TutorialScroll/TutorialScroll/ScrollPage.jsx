import React, { useEffect, useRef, useState } from "react";
import "./ScrollPage.css";
import orange_line from "../../TutorialScroll/orange_line.png";
import orange_book from "../../TutorialScroll/orange_book.png";
import book from "../../TutorialScroll/book.png";
import gookja from "../../TutorialScroll/gookja.png";
import star from "../../TutorialScroll/star.png";
import lightbulb from "../../TutorialScroll/lightbulb.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ScrollPage() {
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  // 🔸 페이지 닫힘 (커튼 모션 후 이동)
  const handleStartClick = () => {
    setClosing(true);
    setTimeout(() => navigate("/select"), 850);
  };

  // 🔸 스냅 스크롤 제어
  useEffect(() => {
    const container = containerRef.current;
    const sections = sectionsRef.current;
    let isScrolling = false;
    let current = 0;

    const handleWheel = (e) => {
      if (isScrolling) return;
      e.preventDefault();

      const delta = e.deltaY;
      if (delta > 0 && current < sections.length - 1) current++;
      else if (delta < 0 && current > 0) current--;

      setActiveIndex(current);
      sections[current].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      isScrolling = true;
      setTimeout(() => {
        isScrolling = false;
      }, 400); // ← 스크롤 속도 조절 (느리게 하려면 ↑ 값 증가)
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div ref={containerRef} className="scroll-container">
      {/* 🔥 커튼 닫히는 애니메이션 */}
      {closing && (
        <>
          <motion.div
            className="curtain left"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.0, ease: [0.83, 0, 0.17, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "50vw",
              height: "100vh",
              background: "black",
              zIndex: 9999,
            }}
          />
          <motion.div
            className="curtain right"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.0, ease: [0.83, 0, 0.17, 1] }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "50vw",
              height: "100vh",
              background: "black",
              zIndex: 9999,
            }}
          />
        </>
      )}

      {/* 영어 문단 1 */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className={`fade-section ${activeIndex === 0 ? "active" : ""}`}
      >
        <motion.div
          className="intro-text"
          initial={{ opacity: 0, y: 40 }} // 👈 처음엔 투명 + 아래쪽
          animate={{ opacity: 1, y: 0 }} // 👈 자연스럽게 올라오면서 등장
          transition={{
            duration: 1.2, // 부드럽게 1.2초 동안
            ease: [0.25, 0.8, 0.25, 1], // cubic-bezier ease-out
          }}
        >
          <p>"AI is the ingredient, the user is the chef.</p>
          <p>
            Prompt engineering is the <span className="highlight">recipe.</span>
          </p>
          <p>
            Only with a good <span className="highlight">recipe</span> can you
            create a great dish."
          </p>
        </motion.div>
        <div className="scroll-hint">
          <p className="scroll-text"></p>
          <div className="arrow-down"></div>
          <div className="bottom-fade"></div>
        </div>
      </section>

      {/* 한국어 문단 2 */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className={`fade-section ${activeIndex === 1 ? "active" : ""}`}
      >
        <img src={orange_line} alt="왼쪽 라인" className="side-line left" />
        <img src={orange_line} alt="오른쪽 라인" className="side-line right" />
        <div className="korean-group">
          <p>
            AI는 <span className="highlight">재료</span>이고, 사용자는{" "}
            <span className="highlight">요리사</span>입니다.
          </p>
          <p>
            프롬프트 엔지니어링은 <span className="highlight">레시피</span>죠.
          </p>
          <p>
            좋은 <span className="highlight">레시피</span>로 요리해야, 좋은
            결과가 나옵니다.
          </p>
        </div>
      </section>

      {/* 책 아이콘 섹션 */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className={`fade-section ${activeIndex === 2 ? "active" : ""}`}
      >
        <img src={orange_book} alt="레시피북 이미지" className="book-image" />
        <p>AI가 처음이라도 괜찮아요.</p>
        <p className="highlight2">이론부터 실전까지 이어지는 프롬프트 코스</p>
      </section>

      {/* 프롬프트 소개 문구 */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className={`fade-section ${activeIndex === 3 ? "active" : ""}`}
      >
        <div className="prompt-intro">
          <p>이곳은 처음 프롬프팅을 배우는 사람들을 위한 주방입니다.</p>
          <p>
            AI 프롬프팅, 이제 <span className="highlight">'요리하듯'</span> 쉽고
            재미있게 익혀보세요.
          </p>
        </div>
      </section>

      {/* 4단계 구성 문구 */}
      <section
        ref={(el) => (sectionsRef.current[4] = el)}
        className={`fade-section ${activeIndex === 4 ? "active" : ""}`}
      >
        <div className="step-intro">
          <p className="step-title">누구나 따라 할 수 있도록</p>
          <p>
            읽고, 만들고, 평가받고, 나누는{" "}
            <span className="highlight">4단계</span>로 구성되어 있습니다.
          </p>
        </div>
      </section>

      {/* 튜토리얼 단계 */}
      <section
        ref={(el) => (sectionsRef.current[5] = el)}
        className={`fade-section ${activeIndex === 5 ? "active" : ""}`}
      >
        <div className="step-row">
          <p>
            첫번째, 프롬프팅 기법을 <span className="highlight">챗봇</span>과
          </p>
          <img src={book} alt="책 아이콘" className="step-icon" />
          <p>함께 익히며 감을 잡아요.</p>
        </div>
      </section>

      {/* 퀴즈 단계 */}
      <section
        ref={(el) => (sectionsRef.current[6] = el)}
        className={`fade-section ${activeIndex === 6 ? "active" : ""}`}
      >
        <div className="step-row">
          <p>두번째, 학습한 프롬프팅 기법을</p>
          <img src={gookja} alt="국자 아이콘" className="step-icon" />
          <p>
            간단한 <span className="highlight">객관식</span>으로 복습해요.
          </p>
        </div>
      </section>

      {/* 테스트 단계 */}
      <section
        ref={(el) => (sectionsRef.current[7] = el)}
        className={`fade-section ${activeIndex === 7 ? "active" : ""}`}
      >
        <div className="step-row">
          <p>
            세번째, <span className="highlight">직접</span> 프롬프트를 써봐요!
          </p>
          <img src={star} alt="별 아이콘" className="step-icon" />
          <p>AI가 결과를 평가해줍니다.</p>
        </div>
      </section>

      {/* 커뮤니티 단계 */}
      <section
        ref={(el) => (sectionsRef.current[8] = el)}
        className={`fade-section ${activeIndex === 8 ? "active" : ""}`}
      >
        <div className="step-row">
          <p>마지막, 다른 학습자들과 함께</p>
          <img src={lightbulb} alt="전구 아이콘" className="step-icon" />
          <p>
            내 프롬프트를 <span className="highlight">공유</span>해봐요.
          </p>
        </div>
      </section>

      {/* 마무리 문단 */}
      <section
        ref={(el) => (sectionsRef.current[9] = el)}
        className={`fade-section ${activeIndex === 9 ? "active" : ""}`}
      >
        <div className="ending-text">
          <p>AI 프롬프팅의 전 과정을 한 곳에서.</p>
          <p className="highlight-final">
            지금, 당신의 첫 번째 AI 레시피를 완성해보세요.
          </p>
          <button className="start-button" onClick={handleStartClick}>
            학습 시작하기
          </button>
        </div>
      </section>
    </div>
  );
}
