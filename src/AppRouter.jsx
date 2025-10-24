// src/routes/AppRouter.jsx
import MainPage from "./pages/main-page/MainPage";
import GPTStudy from "./pages/gpt-study/GPTStudy";
import Recipe1QuizMultipleResult from "./pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizMultipleResult";
import Recipe1QuizEssay from "./pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizEssay";
import ScrollPage from "./pages/main-page/components/TutorialScroll/TutorialScroll/ScrollPage";
import ClosueStatueSelect from "./pages/main-page/components/closue-statue-select/ClosueStatueSelect";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const AppRouter = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/gpt-study" element={<GPTStudy />} />
      <Route path="/tutorial" element={<ScrollPage />} />
      <Route path="/test" element={<Recipe1QuizMultipleResult />} />
      <Route path="/test2" element={<Recipe1QuizEssay />} />
      <Route path="/select" element={<ClosueStatueSelect />} />
    </Routes>
  );
};

/* ✅ iOS 스타일 슬라이드 애니메이션 컴포넌트 */
const PageTransition = ({ children, direction = "forward" }) => {
  const slideVariants = {
    initial: {
      x: direction === "forward" ? "100%" : "-100%",
      opacity: 0.8,
      scale: 0.98,
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1], // 부드러운 iOS 느낌
      },
    },
    exit: {
      x: direction === "forward" ? "-15%" : "100%",
      opacity: 0,
      scale: 0.97,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        position: "relative", // ✅ absolute → relative
        width: "100%",
        minHeight: "100vh", // ✅ height 대신 minHeight 사용
        overflow: "visible", // ✅ scroll 막지 않도록 변경
        background: "transparent",
      }}
    >
      {children}
    </motion.div>
  );
};

export default AppRouter;
