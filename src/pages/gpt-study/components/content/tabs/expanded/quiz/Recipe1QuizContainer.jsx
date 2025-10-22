// src/pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizContainer.jsx
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Recipe1QuizMultiple from './Recipe1QuizMultiple';
import Recipe1QuizMultipleResult from './Recipe1QuizMultipleResult';
import Recipe1QuizEssay from './Recipe1QuizEssay';

gsap.registerPlugin(ScrollTrigger);

const Recipe1QuizContainer = () => {
  const [step, setStep] = useState('multiple'); // 'multiple' | 'result' | 'essay'
  const [score, setScore] = useState(0);
  
  const timelineRef = useRef(null);
  const multipleRef = useRef(null);
  const resultRef = useRef(null);
  const essayRef = useRef(null);

  // ✅ Reference 패턴: GSAP Timeline으로 열림/닫힘 관리
  useEffect(() => {
    // 기존 timeline 정리
    if (timelineRef.current) {
      timelineRef.current.pause();
      timelineRef.current.kill();
    }

    // 새 timeline 생성
    timelineRef.current = gsap.timeline({
      onComplete: () => {
        ScrollTrigger.refresh();
        console.log(`✅ Quiz step ${step} animation complete`);
      }
    });

    const container = document.querySelector('main'); // Content의 스크롤 컨테이너

    // Multiple 처리
    if (multipleRef.current && container) {
      if (step === 'multiple') {
        console.log(`📝 Opening Multiple`);
        
        // ✅ 즉시 열림
        timelineRef.current.to(multipleRef.current, {
          height: "auto",
          overflow: "unset",
          ease: "circ.in",
          duration: 0
        }, 0);
        
      } else if (multipleRef.current.offsetHeight > 0) {
        const shouldCloseImmediately = container.scrollTop > multipleRef.current.offsetTop;
        
        if (shouldCloseImmediately) {
          console.log(`🔽 Closing Multiple immediately`);
          
          // 스크롤 위치 보정
          timelineRef.current.set(container, {
            scrollTop: container.scrollTop - multipleRef.current.offsetHeight
          }, 0);
          
          timelineRef.current.set(multipleRef.current, {
            height: 0,
            overflow: "hidden"
          }, 0);
          
        } else {
          console.log(`🔽 Closing Multiple with animation`);
          
          timelineRef.current.to(multipleRef.current, {
            height: 0,
            ease: "circ.out",
            duration: 0.5,
            overflow: "hidden"
          }, 0);
        }
      }
    }

    // Result 처리
    if (resultRef.current && container) {
      if (step === 'result') {
        console.log(`📊 Opening Result (score: ${score})`);
        
        timelineRef.current.to(resultRef.current, {
          height: "auto",
          overflow: "unset",
          ease: "circ.in",
          duration: 0
        }, 0);
        
      } else if (resultRef.current.offsetHeight > 0) {
        const shouldCloseImmediately = container.scrollTop > resultRef.current.offsetTop;
        
        if (shouldCloseImmediately) {
          console.log(`🔽 Closing Result immediately`);
          
          timelineRef.current.set(container, {
            scrollTop: container.scrollTop - resultRef.current.offsetHeight
          }, 0);
          
          timelineRef.current.set(resultRef.current, {
            height: 0,
            overflow: "hidden"
          }, 0);
          
        } else {
          console.log(`🔽 Closing Result with animation`);
          
          timelineRef.current.to(resultRef.current, {
            height: 0,
            ease: "circ.out",
            duration: 0.5,
            overflow: "hidden"
          }, 0);
        }
      }
    }

    // Essay 처리
    if (essayRef.current && container) {
      if (step === 'essay') {
        console.log(`✍️ Opening Essay`);
        
        timelineRef.current.to(essayRef.current, {
          height: "auto",
          overflow: "unset",
          ease: "circ.in",
          duration: 0
        }, 0);
        
      } else if (essayRef.current.offsetHeight > 0) {
        const shouldCloseImmediately = container.scrollTop > essayRef.current.offsetTop;
        
        if (shouldCloseImmediately) {
          console.log(`🔽 Closing Essay immediately`);
          
          timelineRef.current.set(container, {
            scrollTop: container.scrollTop - essayRef.current.offsetHeight
          }, 0);
          
          timelineRef.current.set(essayRef.current, {
            height: 0,
            overflow: "hidden"
          }, 0);
          
        } else {
          console.log(`🔽 Closing Essay with animation`);
          
          timelineRef.current.to(essayRef.current, {
            height: 0,
            ease: "circ.out",
            duration: 0.5,
            overflow: "hidden"
          }, 0);
        }
      }
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [step, score]);

  // Multiple → Result
  const handleSubmit = (calculatedScore) => {
    console.log('📊 Quiz submitted with score:', calculatedScore);
    setScore(calculatedScore);
    setStep('result');
  };

  // Result (Fail) → Multiple
  const handleRetry = () => {
    console.log('🔄 Retry: Result → Multiple');
    setStep('multiple');
  };

  // Result (Success) → Essay
  const handleNext = () => {
    console.log('➡️ Next: Result → Essay');
    setStep('essay');
  };

  return (
    <div className="relative w-full">
      {/* Multiple - 항상 DOM에 존재 */}
      <div
        ref={multipleRef}
        style={{
          height: 0,
          overflow: "hidden"
        }}
      >
        <Recipe1QuizMultiple onSubmit={handleSubmit} />
      </div>

      {/* Result - 항상 DOM에 존재 */}
      <div
        ref={resultRef}
        style={{
          height: 0,
          overflow: "hidden"
        }}
      >
        <Recipe1QuizMultipleResult 
          score={score}
          onRetry={handleRetry}
          onNext={handleNext}
        />
      </div>

      {/* Essay - 항상 DOM에 존재 */}
      <div
        ref={essayRef}
        style={{
          height: 0,
          overflow: "hidden"
        }}
      >
        <Recipe1QuizEssay />
      </div>
    </div>
  );
};

export default Recipe1QuizContainer;