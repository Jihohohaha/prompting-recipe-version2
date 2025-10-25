import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGPTStudyStore from '../../store';

const TABS = Object.freeze([
  { id: 'tutorial', title: 'TUTORIAL' },
  { id: 'chat',     title: 'CHAT' },
  { id: 'quiz',     title: 'QUIZ' },
]);

const hexToRgba = (hex, alpha) => {
  if (!hex) return `rgba(255,255,255,${alpha ?? 1})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const TabInterface = ({ recipe }) => {
  const navigate = useNavigate();
  const { tab: currentTab } = useParams();
  const { expandedContent, collapseContent } = useGPTStudyStore();

  const activeTab = currentTab || null;
  const isExpanded = expandedContent?.recipeId === recipe.id;
  const isTitle = recipe.id === 0;

  const primaryColor = recipe.color;
  const bgWeak = useMemo(() => hexToRgba(primaryColor, 0.3), [primaryColor]);
  const tabBg = useMemo(() => hexToRgba(primaryColor, 0.88), [primaryColor]);

  const handleTabClick = (tabId) => {
    if (isTitle) return;
    if (isExpanded && activeTab === tabId) {
      collapseContent();
      navigate(`/gpt-study/${recipe.slug}`);
      return;
    }
    navigate(`/gpt-study/${recipe.slug}/${tabId}`);
  };

  if (isTitle) {
    return (
      <div id={`tab-interface-${recipe.id}`} className="w-full">
        <div className="mt-7 h-14" />
        <div
          className="relative px-8 py-8 mb-4 h-[75vh] rounded-2xl overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${hexToRgba(primaryColor, 0.95)} 0%, ${hexToRgba(primaryColor, 0.85)} 100%)`,
          }}
        >
          <div className='relative w-full h-full border border-black rounded-2xl'>
            <div className='absolute left-10 top-10 text-black text-[36px] leading-none'>
              TUTORIAL<br />FOR
            </div>
            <div className='absolute left-10 bottom-10 text-black text-[80px] leading-none'>CHAT<br />GPT</div>
            <img src='/images/gpt-study/TitlePic.png' className='absolute right-10 bottom-10 h-3/4' />
          </div>
        </div>

        <div
          className="w-full rounded-full h-8 flex items-center text-mortend justify-left px-6 mb-3"
          style={{ backgroundColor: bgWeak }}
        >
          <div className="text-white/80 font-bold text-sm">
            {`section ${recipe.id}. ${recipe.displayTitle}`}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id={`tab-interface-${recipe.id}`} className="w-full">
      <div className="flex gap-0 mt-10 h-14">
        {TABS.map((tab, index) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
<<<<<<< HEAD
                flex-1 h-14 font-bold text-lg font-mortend justify-left 
                rounded-t-lg transition-all duration-300
                ${!isActive && 'hover:opacity-95'}
=======
                flex-1 h-full font-bold text-lg font-pretendard
                rounded-t-2xl rounded-b-none transition-all duration-300
                ${!isActive ? 'hover:opacity-95' : ''}
>>>>>>> 2be5bc86dcab0c165ce9482e1ad9c9e2afffba14
              `}
              style={{
                backgroundColor: isActive ? primaryColor : tabBg,
                color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.8)',
                borderRight: index !== TABS.length - 1 ? '1px solid rgba(0,0,0,0.2)' : 'none',
              }}
            >
              {tab.title}
            </button>
          );
        })}
      </div>

      <div
        className="px-8 py-12 flex flex-col gap-4 mb-3 min-h-[70vh] rounded-b-2xl"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex justify-center">
          <div className="h-[2px] bg-white" style={{ width: 'calc(100% - 4rem)' }} />
        </div>


        <div className="text-white font-bold text-8xl whitespace-pre-line text-left mt-48">
          {(() => {
            const [prefix, suffix] = recipe.displayTitle.split('.');
            return (
              <>
                <span className="font-koolegant text-7xl">{prefix}.</span>
                <span className="font-mortend">{suffix}</span>
              </>
            );
          })()}

        </div>

        <div className="flex justify-center">
          <div className="h-[2px] bg-white" style={{ width: 'calc(100% - 4rem)' }} />
        </div>
      </div>

      <div
        className="w-full rounded-full h-8 flex items-center justify-start px-6 mb-3"
        style={{ backgroundColor: tabBg }}
      >
        {(() => {
          const [prefix, suffix] = recipe.displayTitle.split('.');
          return (
            <>
              <span className="text-white/80 font-bold font-koolegant text-sm">
                section {recipe.id}.
              </span>
              <span className="text-white font-bold font-mortend text-sm ml-2">
                {suffix?.trim()}
              </span>
            </>
          );
        })()}
      </div>
    </div>
  );
};

export default TabInterface;