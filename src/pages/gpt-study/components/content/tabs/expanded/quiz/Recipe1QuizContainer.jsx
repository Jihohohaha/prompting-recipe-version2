// src/pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizContainer.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Recipe1QuizMultiple from './Recipe1QuizMultiple';
import Recipe1QuizMultipleResult from './Recipe1QuizMultipleResult';
import Recipe1QuizEssay from './Recipe1QuizEssay';

const Recipe1QuizContainer = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const step = searchParams.get('step') || 'multiple';
  const score = parseInt(searchParams.get('score')) || 0;

  console.log('📦 Container state:', { step, score });

  // Retry 핸들러 (Fail → Multiple)
  const handleRetry = () => {
    console.log('🔄 Retry: Result → Multiple');
    navigate('/gpt-study/recipe1/quiz?step=multiple');
  };

  // Next 핸들러 (Success → Essay)
  const handleNext = () => {
    console.log('➡️ Next: Result → Essay');
    navigate('/gpt-study/recipe1/quiz?step=essay');
  };

  return (
    <div className="relative w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 'multiple' && (
          <motion.div
            key="multiple"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Recipe1QuizMultiple />
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Recipe1QuizMultipleResult 
              score={score}
              onRetry={handleRetry}
              onNext={handleNext}
            />
          </motion.div>
        )}

        {step === 'essay' && (
          <motion.div
            key="essay"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Recipe1QuizEssay />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Recipe1QuizContainer;