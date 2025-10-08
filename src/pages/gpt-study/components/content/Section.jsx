// src/pages/gpt-study/components/content/Section.jsx
import TabInterface from './TabInterface';

const Section = ({ recipe, index }) => {
  return (
    <section 
      id={`section-${index}`}
      className="min-h-screen flex flex-col gap-6 p-12 snap-start"
    >
      {/* 탭 인터페이스 */}
      <TabInterface recipe={recipe} />

      {/* Rounded Div */}
      <div className="bg-[#FF9E4A] rounded-xl px-20 py-8 w-full">
        <h3 className="text-black text-2xl font-bold font-pretendard">
          {recipe.displayTitle}
        </h3>
      </div>
    </section>
  );
};

export default Section;