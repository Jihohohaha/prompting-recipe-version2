// src/pages/gpt-study/components/content/tabs/expanded/tutorial/Recipe1TutorialExample.jsx
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import useGPTStudyStore from "../../../../../store";
import { useState, useEffect, useRef } from "react";
import { useContentContext } from '../../../ContentContext';

const Recipe1TutorialExample = ({ recipeId, index }) => {
  const rootRef = useRef(null);
  const { contentRef } = useContentContext();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Aggregate mutation counts and filter out noisy style attribute changes
    let aggCount = 0;
    let flushTimer = null;
    const MAX_MUTATIONS = 20000; // safety cap

    const flush = () => {
      try {
        if (aggCount > 0) console.info('[Example] aggregated mutations count=', aggCount);
      } catch (e) {}
      aggCount = 0;
      flushTimer = null;
    };

    const mo = new MutationObserver(muts => {
      for (const m of muts) {
        // ignore frequent inline style changes produced by animations
        if (m.type === 'attributes' && m.attributeName === 'style') continue;
        // also ignore attribute-only changes that are not meaningful
        if (m.type === 'attributes' && m.attributeName && ['class'].includes(m.attributeName)) {
          // class changes may be relevant sometimes; count them
        }
        aggCount += 1;
        if (aggCount > MAX_MUTATIONS) {
          try { console.warn('[Example] mutation flood exceeded cap, disconnecting observer'); } catch (e) {}
          try { mo.disconnect(); } catch (e) {}
          break;
        }
      }
      if (!flushTimer) flushTimer = setTimeout(flush, 300);
    });

    // Observe child list and subtree changes; watch only meaningful attributes
    mo.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'alt', 'class', 'id'] });

    // Log image load events under this example (still useful)
    const imgs = Array.from(root.querySelectorAll('img'));
    const onLoad = (e) => {
      try { console.info('[Example] image loaded', e.target && e.target.src); } catch (e) {}
    };
    imgs.forEach(img => img.addEventListener('load', onLoad));

    return () => {
      try { mo.disconnect(); } catch (e) {}
      if (flushTimer) clearTimeout(flushTimer);
      imgs.forEach(img => img.removeEventListener('load', onLoad));
    };
  }, []);
  return (
  <div className="bg-white rounded-3xl" ref={rootRef}>
      {/* Section 1 */}
      <DebugFadeSection id="s1">
        <Section1 />
      </DebugFadeSection>

      {/* Section 2 */}
      <DebugFadeSection id="s2">
        <Section2 />
      </DebugFadeSection>

      {/* Section 3 */}
      <DebugFadeSection id="s3">
        <Section3 />
      </DebugFadeSection>

      {/* Section 4 */}
      <DebugFadeSection id="s4">
        <Section4 />
      </DebugFadeSection>

      {/* Section 5 */}
      <DebugFadeSection id="s5">
        <Section5 />
      </DebugFadeSection>

      {/* Section 6 */}
      <DebugFadeSection id="s6">
        <Section6 />
      </DebugFadeSection>

      {/* Section 7 */}
      <DebugFadeSection id="s7">
        <Section7 />
      </DebugFadeSection>

      {/* Section 8 */}
      <DebugFadeSection id="s8">
        <Section8 />
      </DebugFadeSection>

      {/* Section 9 */}
      <DebugFadeSection id="s9">
        <Section9 />
      </DebugFadeSection>

      {/* Section 10 */}
      <DebugFadeSection id="s10">
        <Section10 />
      </DebugFadeSection>

      {/* Section 11 */}
      <DebugFadeSection id="s11">
        <Section11 />
      </DebugFadeSection>

      {/* Section 12 - 버튼 포함 */}
      <DebugFadeSection id="s12">
        <Section12 />
      </DebugFadeSection>

      {/* Section 13 */}
      <DebugFadeSection id="s13">
        <Section13 recipeId={recipeId} index={index} />
      </DebugFadeSection>
    </div>
  );
};

// DebugFadeSection: wraps FadeSection and logs intersection/visibility
const DebugFadeSection = ({ children, id }) => {
  const ref = useRef(null);
  const { isManualScrollRef, contentRef } = useContentContext();
  const disableIO = typeof window !== 'undefined' && !!window.__GPT_STUDY_AB_disableIO;

  useEffect(() => {
    if (disableIO) {
      try { console.info(`[Example] disableIO is true - skipping IntersectionObserver for ${id}`); } catch (e) {}
      return;
    }
    if (!ref.current) return;
    const el = ref.current;

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const now = Date.now();
        const ratio = entry.intersectionRatio;
        const rect = entry.boundingClientRect || {};
        const elTop = el ? el.offsetTop : null;
        const containerTop = contentRef && contentRef.current ? contentRef.current.scrollTop : null;
        const containerH = contentRef && contentRef.current ? contentRef.current.clientHeight : null;
        const containerScrollH = contentRef && contentRef.current ? contentRef.current.scrollHeight : null;

        if (entry.isIntersecting) {
          try {
            console.info(`[Example] visible ${id} time=${now} ratio=${ratio.toFixed(3)} rectTop=${Math.round(rect.top)} rectH=${Math.round(rect.height)} elOffsetTop=${elTop} containerScrollTop=${containerTop} containerH=${containerH} containerScrollH=${containerScrollH} manual=${!!(isManualScrollRef && isManualScrollRef.current)}`);
          } catch (e) {}
        } else {
          try {
            console.debug(`[Example] hidden ${id} time=${now} ratio=${ratio.toFixed ? ratio.toFixed(3) : ratio} rectTop=${Math.round(rect.top || 0)} rectH=${Math.round(rect.height || 0)} elOffsetTop=${elTop} manual=${!!(isManualScrollRef && isManualScrollRef.current)}`);
          } catch (e) {}
        }
      });
    }, { root: contentRef ? contentRef.current : null, threshold: [0,0.25,0.5,0.75,1] });

    io.observe(el);
    return () => io.disconnect();
  }, [id, isManualScrollRef, contentRef]);

  // If AB variant requests disabling IO/animation, render a plain div wrapper.
  if (disableIO) {
    return (
      <div ref={ref} className="w-full relative">
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="w-full relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 1.2 }}
    >
      {children}
    </motion.div>
  );
};

// Fade Section Wrapper
const FadeSection = ({ children }) => {
  return (
    <motion.div
      className="w-full relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 1.2 }}
    >
      {children}
    </motion.div>
  );
};

// Section 1
const Section1 = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="bg-[#FE7525] rounded-b-full w-[1200px] h-[400px] pt-16">
        <div className="text-center text-5xl font-pretendard leading-loose font-semibold">
          <p>삼각형 넓이 공식은 밑변 x 높이 ÷ 2야.</p>
          <p>그래서 6 x 4 ÷ 2 = 12. </p>
          <p>따라서 정답은 12란다.</p>
        </div>
      </div>
    </div>
  );
};

// Section 2
const Section2 = () => {
  return (
    <div className="pt-[100px] w-full flex items-center justify-center">
      <img
        src="/images/gpt-study/role/teacher.png"
        alt="선생석상"
        style={{
          left: "0px",
          top: "0px",
          width: "1077px",
          height: "935px",
        }}
      />
    </div>
  );
};

// Section 3
const Section3 = () => {
  return (
    <div className="pb-[250px] font-semibold text-black w-full flex items-center justify-center pt-30">
      <div className="text-center text-4xl font-pretendard leading-loose">
        <p className="text-4xl font-bold pb-[80px]">GPT의 답변</p>
        <p>어떤 차이가 느껴지나요?</p>
        <p>
          같은 문제지만, 이번에는{" "}
          <span className="text-5xl bg-[#FE7525] px-2 py-1 font-extrabold text-white">
            교사의 말투
          </span>
          와{" "}
          <span className="text-5xl bg-[#FE7525] px-2 py-1 font-extrabold text-white">
            관점
          </span>
          으로 바뀌었죠.
        </p>

        <p>이게 바로 Role Prompting의 힘이에요.</p>
      </div>
    </div>
  );
};

// Section 4
const Section4 = () => {
  return (
    <div className="text-black w-full h-[700px] flex items-center justify-center bg-[#FE7525]">
      <div className="rounded-full w-[600px] h-[600px] bg-white flex items-center justify-center font-pretendard text-3xl">
        <div className="text-center p-8 leading-loose">
          <span className="font-extrabold underline underline-offset-8 decoration-[#FE7525] decoration-4 text-4xl">
            {" "}
            Role Prompting{" "}
          </span>
          이 좋은 이유는 <br />
          모델이 단순히 문맥에 맞게 대답하는 데서
          <br />
          그치지 않고{" "}
          <span className="font-extrabold underline underline-offset-8 decoration-[#FE7525] decoration-4 text-4xl">
            정확하면서도
          </span>
          <span className="underline underline-offset-8 decoration-[#FE7525] decoration-4">
            <br />
          </span>
          <span className="font-extrabold underline underline-offset-8 decoration-[#FE7525] decoration-4 text-4xl">
            맥락에 맞는 사고
          </span>
          와
          <br />
          <span className="font-extrabold underline underline-offset-8 decoration-[#FE7525] decoration-4 text-4xl">
            표현을 유도
          </span>
          하기 때문이에요.
        </div>
      </div>
    </div>
  );
};

// Section 5
const Section5 = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-[300px] pb-[300px] relative">
      {/* Vector 1 - 상단 */}
      <motion.img
        src="/images/gpt-study/role/star.png"
        alt="Vector 1"
        className="relative mt-[0px] ml-[-1050px]"
        style={{
          left: "280px",
          top: "-30px",
          width: "45px",
          height: "65px",
        }}
        animate={{ rotateY: [0, -360] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* 1. 텍스트 */}
      <div className="text-black text-3xl font-pretendard text-center">
        그래서{" "}
        <span className="text-4xl font-extrabold">
          정답률이 높고, 결과의 일관성
        </span>{" "}
        이 유지돼요.
      </div>

      {/* 2. Underline */}
      <img
        src="/images/gpt-study/role/orange_line.png"
        alt="Underline"
        className="w-full mt-[-50px]"
        style={{ height: "86.76px", width: "1473.5px", top: "140px" }}
      />

      {/* Vector 2 - 하단 */}
      <motion.img
        src="/images/gpt-study/role/star.png"
        alt="Vector 2"
        className="relative mt-[-200px] ml-[1050px]"
        style={{
          right: "320px",
          top: "230px",
          width: "45px",
          height: "65px",
        }}
        animate={{ rotateY: [0, -360] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// Section 6
const Section6 = () => {
  return (
    <div className="relative text-black w-full flex flex-col justify-center pt-[200px] px-6">
      {/* 제목 */}
      <p className="flex items-left px-12 text-3xl mb-4 font-pretendard pb-4">
        정리하자면!
        <span className="font-bold font-pretendard mx-2">
          {" "}
          Role Prompting{" "}
        </span>{" "}
        은
      </p>

      {/* 탭 + 박스 */}
      <div className="relative w-full px-12">
        {/* 상단 탭 */}
        <div className="h-14 w-60 bg-[#FE7525] rounded-t-2xl border-x border-t border-black"></div>
        {/* 메인 박스 */}
        <div className="flex flex-col items-center justify-center leading-extra-loose bg-[#FE7525] py-20 px-2 rounded-b-2xl border-2 border-black shadow-lg font-pretendard">
          {/* 1. 예시 몇 개를 보여주고 문제를 풀게 하는 방법 부분 */}
          <div className="text-3xl font-semibold mb-6">
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              모델이 특정 인격이나 역할을 맡아 답변하도록
            </div>
          </div>
          {/* 2. 장점은 / 규칙을 따르게 만들기 쉽고 부분 */}
          <div className="text-3xl font-semibold mb-6">
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              지시하는 방법
            </div>
            이에요. 이 방식을 사용하면 답변의
          </div>

          <div className="text-3xl font-semibold mb-6">
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              스타일과 관점을 원하는 방향으로 조정
            </div>
            할 수 있지만,
          </div>

          {/* 3. 대신, / 예시를 잘못 주면 부분 */}
          <div className="text-3xl font-semibold mb-6">
            반대로{" "}
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              역할을 너무 과하게 지정하면
            </div>
          </div>

          {/* 4. 패턴을 그대로 따라가서 오답 부분 */}
          <div className="text-3xl font-semibold">
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              어색한 말투로 굳어질 수도{" "}
            </div>
            있습니다.
          </div>
        </div>
      </div>
    </div>
  );
};

// Section 7
const Section7 = () => {
  return (
    <div className="font-semibold text-black w-full flex flex-col items-center justify-center pt-32 pb-32 gap-6">
      {/* 1. 아까랑 뭐가 다르냐고요? */}
      <div className="text-4xl font-pretendard">
        또한{" "}
        <span className="font-bold text-[#FE7525]">
          '30년 경력의 베테랑 디자이너'
        </span>
        처럼 구체적인 역할을 지정하면
      </div>

      {/* 2. 여기서는 예시 2개를 주니, */}
      <div className="text-4xl font-pretendard">
        더{" "}
        <span className="font-bold text-[#FE7525]">
          깊이 있고 퀄리티 높은 답변
        </span>
        을 얻을 수 있습니다.
      </div>
      <br />

      <div className="text-4xl font-pretendard">
        어때요, 이제 Role Prompting이 어떤 개념인지 감이 오나요?
      </div>

      <img
        src="/images/gpt-study/role/movie.png"
        alt="Underline"
        className="w-full pt-[50px]"
        style={{ width: "901px", height: "601px" }}
      />
    </div>
  );
};

// Section 8
const Section8 = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const handleGoToChat = () => {
    navigate(`/gpt-study/${slug}/chat`);
  };

  return (
    <div className="text-black font-pretendard w-full flex flex-col items-center justify-center pt-72 relative font-semibold">
      {/* FirstLine2 */}
      <img
        src="/images/gpt-study/role/FirstLine2.png"
        alt="First Line 2"
        className="absolute"
        style={{
          left: "0px",
          top: "120px",
          width: "310px",
          height: "250px",
        }}
      />

      {/* SecondLine2 */}
      <img
        src="/images/gpt-study/role/SecondLine2.png"
        alt="Second Line 2"
        className="absolute"
        style={{
          right: "0px",
          top: "200px",
          width: "350px",
          height: "250px",
        }}
      />

      {/* Star 1 - '그럼' 좌측 하단 */}
      <img
        src="/images/gpt-study/role/Star2.png"
        alt="Star 1"
        className="absolute"
        style={{
          left: "250px",
          top: "480px",
          width: "105px",
          height: "89px",
        }}
      />

      {/* Star 2 - '감이' 위 */}
      <img
        src="/images/gpt-study/role/Star2.png"
        alt="Star 2"
        className="absolute"
        style={{
          left: "700px",
          top: "145px",
          width: "105px",
          height: "89px",
        }}
      />

      {/* 텍스트 */}
      <div className="text-3xl font-pretendard leading-[2.5] text-center z-10">
        <p className="md-20">
          어때요? <span className="font-bold text-4xl">Role Prompting</span> 에
          대해 이제 감이 오죠?
        </p>
        <p>
          좋아요! 하지만{" "}
          <span className="underline underline-offset-8 decoration-[#FE7525] decoration-4">
            진짜 셰프가 되려면 조금 더 학습
          </span>
          이 필요하답니다.
        </p>
        <p>그럼 이제 다음 단계로 넘어가 볼까요?</p>
      </div>

      {/* 버튼 + SpoonAndChopsticks */}
      <div className="w-full flex items-center justify-center gap-4 mt-12 z-10">
        <button
          onClick={handleGoToChat}
          className="bg-[#FE7525] border-2 border-black rounded-full px-12 py-4 text-3xl font-medium font-pretendard text-white hover:bg-[#D46100] transition-colors"
        >
          레시피 연습하러 가기
        </button>
      </div>
      {/* SpoonAndChopsticks */}
      <img
        src="/images/gpt-study/few-shot/SpoonAndChopsticks.png"
        alt="Spoon and Chopsticks"
        style={{
          right: "0px",
          top: "350px",
          position: "absolute",
          width: "400px",
          height: "500px",
        }}
      />
    </div>
  );
};

//S.9
const Section9 = () => {};

// Section 10
const Section10 = () => {};

// Section 11
const Section11 = () => {};

// Section 12
const Section12 = () => {};

// Section 13
const Section13 = ({ recipeId, index }) => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { collapseContent, setActiveSection } = useGPTStudyStore();
  // Prefer using the ContentContext's contentRef to perform smooth, scoped
  // scrolling. If the contentRef isn't available (edge cases), fall back to
  // document.getElementById so the handler never throws.
  let contentRefSafe = null;
  try {
    // require at runtime to avoid hook-call mistakes when this file is used
    // in a non-React render context by tooling.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { useContentContext } = require('../../../ContentContext');
    try {
      contentRefSafe = useContentContext().contentRef;
    } catch (e) {
      contentRefSafe = null;
    }
  } catch (e) {
    contentRefSafe = null;
  }

  const handleCloseTutorial = () => {
    console.info('🔼 Closing Tutorial with smooth collapse (safe handler)');

    // 1. Section 시작점으로 스크롤 (prefer container-scoped query)
    const container = contentRefSafe && contentRefSafe.current ? contentRefSafe.current : null;
    const sectionElement = container ? container.querySelector(`#section-${index}`) : document.getElementById(`section-${index}`);
    try {
      if (sectionElement) {
        // If we have the container, prefer scrolling that container so the
        // smooth behavior is scoped and doesn't unexpectedly affect the
        // top-level document scroll.
        if (container && typeof container.scrollTo === 'function') {
          const top = Math.max(0, sectionElement.offsetTop - (container === document.body ? 0 : 0));
          container.scrollTo({ top, behavior: 'smooth' });
        } else {
          sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } catch (e) {
      console.warn('scroll-to-section failed, falling back to element.scrollIntoView', e);
      try { sectionElement && sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) {}
    }

    // 2. 약간의 딜레이 후 접기
    setTimeout(() => {
      try { collapseContent(); } catch (e) { console.warn('collapseContent failed', e); }
      try { setActiveSection(recipeId - 1); } catch (e) {}

      // 3. 애니메이션이 끝난 후 URL 변경 (1.2초 후)
      setTimeout(() => {
        try { navigate(`/gpt-study/${slug}`); } catch (e) { console.warn('navigate failed', e); }
      }, 1200);
    }, 300);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center pt-72 pb-12">
      {/* 버튼 영역 제거: '다른 레시피 더 알아보기' 삭제 per request */}
    </div>
  );
};

export default Recipe1TutorialExample;
