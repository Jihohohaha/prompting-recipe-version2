// src/pages/gpt-study/components/content/Section.jsx
import TabInterface from './TabInterface';

const Section = ({ recipe, index }) => {
  return (
    <section 
      id={`section-${index}`}
      className="min-h-screen flex flex-col gap-6 px-12 snap-start"
    >
      <div className="py-12 gap-6 flex flex-col">
        {/* 탭 인터페이스 */}
        <TabInterface recipe={recipe} />

        {/* Rounded Div */}
        <div className="bg-[#FF9E4A] rounded-xl px-20 py-2 w-full">
            <h3 className="text-black text-lg font-bold font-pretendard text-center">
            {recipe.displayTitle}
            </h3>
        </div>
      </div>
    </section>
  );
};

export default Section;