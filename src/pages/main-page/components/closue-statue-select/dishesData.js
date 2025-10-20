export const ROTATION_FACTOR = 0.045; // (호환용)
export const ROTATION_DIR = -1;

export const RADIUS = 500;
export const DISH_SIZE = 400;
export const SCROLL_RESET_THRESHOLD = { TOP: 0.1, BOTTOM: 0.9 };

/** ───────── 프리-틸트에 쓰이는 기본 데이터 ───────── **/
export const DISHES_DATA = [
  { id: 1, title: 'Art & Creativity', subtitle: '예술 & 창작', description: '복잡한 문제를 체계적으로 분석하고 해결하는 능력', kw1: '영감', kw2: '감각', kw3: '자유', kw4: '표현', ekw1: 'Inspiration', ekw2: 'Aesthetic', ekw3: 'Freedom', ekw4: 'Expression' },
  { id: 2, title: 'Engineering',     subtitle: '공학',       description: '최신 기술을 활용한 혁신적인 솔루션 개발',       kw1: '논리', kw2: '기술', kw3: '혁신', kw4: '문제해결', ekw1: 'Logic', ekw2: 'Technology', ekw3: 'Innovation', ekw4: 'Problem-solving' },
  { id: 3, title: 'Essay',           subtitle: '논술',       description: '논리적 사고와 체계적인 접근을 통한 문제 해결',   kw1: '사유', kw2: '설득', kw3: '서사', kw4: '표현력',   ekw1: 'Thinking', ekw2: 'Persuasion', ekw3: 'Narrative', ekw4: 'Expression' },
  { id: 4, title: 'Integration',     subtitle: '통합',       description: '창의적 사고로 새로운 가치 창출',               kw1: '융합', kw2: '협력', kw3: '적응', kw4: '혁신',   ekw1: 'Integration', ekw2: 'Collaboration', ekw3: 'Adaptation', ekw4: 'Innovation' },
];

// 8개 링 구성(4개 x 2세트)
export const dishes = [
  ...DISHES_DATA,
  ...DISHES_DATA.map((d) => ({ ...d, id: d.id + 4 })),
];

/** ───────── AI 로고 경로 ───────── **/
export const AI_LOGOS = {
  chatgpt:     '/images/main-page/ai/chatgpt.png',
  cursor:      '/images/main-page/ai/cursor.png',
  copilot:     '/images/main-page/ai/copilot.png',
  claude:      '/images/main-page/ai/claude.png',
  nexbot:      '/images/main-page/ai/nexbot.png',
  sudowrite:   '/images/main-page/ai/sudowrite.png',
  wrtn:        '/images/main-page/ai/wrtn.png',
  gemini:      '/images/main-page/ai/gemini.png',
  perplexity:  '/images/main-page/ai/perplexity.png',
  midjourney:  '/images/main-page/ai/midjourney.png',
  piclumen:    '/images/main-page/ai/piclumen.png',
};

/** 공통 유틸: 4개 세트를 8개 링으로 복제 */
const makeRing = (arr) => ([
  ...arr,
  ...arr.map((d, i) => ({ ...d, id: (d.id ?? (200 + i)) + 4 })),
]);

/** ───────── 카테고리별 AI 세트 4종 ───────── **/

// 1) Programming (요청: ChatGPT, Cursor, Copilot, Claude)
//   - 기본 카테고리 이름: Engineering(프로그래밍/개발로 매핑)
const AI_PROGRAMMING = makeRing([
  {
    id: 201,
    title: 'ChatGPT',
    subtitle: '범용 생성형 AI',
    description: `ChatGPT는 아이디어를 정리하고 구조화하는 데 가장 강한 AI예요.
막연한 상상이나 주제를 스토리나 콘셉트로 만들어주는 데 탁월하죠.
초보자라면 이 AI부터 시작하는 게 좋아요. 아이디어를 말로 표현하고,
그걸 하나의 방향으로 잡아가는 법을 배울 수 있으니까요.`,
    kw1: '대화', kw2: '코딩', kw3: '요약', kw4: '번역',
    ekw1: 'Chat', ekw2: 'Coding', ekw3: 'Summarize', ekw4: 'Translate',
    logo: AI_LOGOS.chatgpt,
  },
  {
    id: 202,
    title: 'Cursor',
    subtitle: 'AI 코드 에디터',
    description: '레포 맥락 기반 수정/리팩토링·자동완성에 강점.',
    kw1: '자동완성', kw2: '리팩토링', kw3: '맥락', kw4: '속도',
    ekw1: 'Autocomplete', ekw2: 'Refactor', ekw3: 'Context', ekw4: 'Speed',
    logo: AI_LOGOS.cursor,
  },
  {
    id: 203,
    title: 'Copilot',
    subtitle: '깃허브 코파일럿',
    description: 'IDE 통합 자동완성 특화. 보일러플레이트에 효율적.',
    kw1: 'IDE', kw2: '자동완성', kw3: '테스트', kw4: '생산성',
    ekw1: 'IDE', ekw2: 'Completion', ekw3: 'Tests', ekw4: 'Productivity',
    logo: AI_LOGOS.copilot,
  },
  {
    id: 204,
    title: 'Claude',
    subtitle: '긴 컨텍스트·문해',
    description: '장문 이해/분석·안전성 중시. 설계 문서 협업에 유리.',
    kw1: '장문', kw2: '분석', kw3: '안전', kw4: '글쓰기',
    ekw1: 'Long', ekw2: 'Analysis', ekw3: 'Safety', ekw4: 'Writing',
    logo: AI_LOGOS.claude,
  },
]);

// 2) Essay (요청: ChatGPT, Nexbot AI, Sudowrite, 뤼튼)
const AI_ESSAY = makeRing([
  {
    id: 211,
    title: 'ChatGPT',
    subtitle: '범용 글쓰기/요약',
    description: '구성/톤 조절·요약·재작성 등 전방위 글쓰기 지원.',
    kw1: '개요', kw2: '톤', kw3: '요약', kw4: '교정',
    ekw1: 'Outline', ekw2: 'Tone', ekw3: 'Summarize', ekw4: 'Edit',
    logo: AI_LOGOS.chatgpt,
  },
  {
    id: 212,
    title: 'Nexbot AI',
    subtitle: '아이디어 발상',
    description: '아이디어 스케치/확장에 초점. 브레인스토밍 용이.',
    kw1: '아이디어', kw2: '확장', kw3: '브리프', kw4: '키워드',
    ekw1: 'Ideas', ekw2: 'Expand', ekw3: 'Brief', ekw4: 'Keyword',
    logo: AI_LOGOS.nexbot,
  },
  {
    id: 213,
    title: 'Sudowrite',
    subtitle: '창작 도우미',
    description: '소설·에세이 문장 생성/확장에 특화.',
    kw1: '창작', kw2: '프롬프트', kw3: '확장', kw4: '리라이트',
    ekw1: 'Creative', ekw2: 'Prompt', ekw3: 'Expand', ekw4: 'Rewrite',
    logo: AI_LOGOS.sudowrite,
  },
  {
    id: 214,
    title: '뤼튼',
    subtitle: '국내 글쓰기 보조',
    description: '한글 글감/마케팅 카피·요약 보조에 편리.',
    kw1: '한글', kw2: '카피', kw3: '요약', kw4: '템플릿',
    ekw1: 'Korean', ekw2: 'Copy', ekw3: 'Summary', ekw4: 'Template',
    logo: AI_LOGOS.wrtn,
  },
]);

// 3) Integration (요청: ChatGPT, Claude, Gemini, Perplexity)
const AI_INTEGRATION = makeRing([
  {
    id: 221,
    title: 'ChatGPT',
    subtitle: '다목적 통합',
    description: '플러그인·자동화 연계 등 범용 허브 역할.',
    kw1: '허브', kw2: '자동화', kw3: '요약', kw4: '코딩',
    ekw1: 'Hub', ekw2: 'Automation', ekw3: 'Summarize', ekw4: 'Coding',
    logo: AI_LOGOS.chatgpt,
  },
  {
    id: 222,
    title: 'Claude',
    subtitle: '정확성/안전성',
    description: '긴 문서/정책 판단·협업 워크플로에 적합.',
    kw1: '정책', kw2: '문서', kw3: '검토', kw4: '분석',
    ekw1: 'Policy', ekw2: 'Docs', ekw3: 'Review', ekw4: 'Analysis',
    logo: AI_LOGOS.claude,
  },
  {
    id: 223,
    title: 'Gemini',
    subtitle: '멀티모달',
    description: '텍스트·이미지·코드 연계 통합 처리.',
    kw1: '멀티모달', kw2: '검색', kw3: '코드', kw4: '확장',
    ekw1: 'Multimodal', ekw2: 'Search', ekw3: 'Code', ekw4: 'Extend',
    logo: AI_LOGOS.gemini,
  },
  {
    id: 224,
    title: 'Perplexity',
    subtitle: '실시간 검색형',
    description: '웹 인용 기반 사실 탐색·요약에 강점.',
    kw1: '검색', kw2: '인용', kw3: '요약', kw4: '사실성',
    ekw1: 'Search', ekw2: 'Citations', ekw3: 'Summary', ekw4: 'Factual',
    logo: AI_LOGOS.perplexity,
  },
]);

// 4) Art & Creativity (요청: ChatGPT, Midjourney, Piclumen, Gemini)
const AI_ART = makeRing([
  {
    id: 231,
    title: 'ChatGPT',
    subtitle: '콘셉트/브리프',
    description: '아트 디렉션·콘셉트 문구·프로젝트 브리프 작성.',
    kw1: '콘셉트', kw2: '브리프', kw3: '네이밍', kw4: '스토리',
    ekw1: 'Concept', ekw2: 'Brief', ekw3: 'Naming', ekw4: 'Story',
    logo: AI_LOGOS.chatgpt,
  },
  {
    id: 232,
    title: 'Midjourney',
    subtitle: '이미지 생성',
    description: '하이퀄리티 스타일 이미지 합성.',
    kw1: '스타일', kw2: '합성', kw3: '레퍼런스', kw4: '프롬프트',
    ekw1: 'Style', ekw2: 'Synthesis', ekw3: 'Reference', ekw4: 'Prompt',
    logo: AI_LOGOS.midjourney,
  },
  {
    id: 233,
    title: 'Piclumen',
    subtitle: '비주얼 툴',
    description: '픽셀·라이트 기반 감성 비주얼 제작.',
    kw1: '픽셀', kw2: '라이트', kw3: '무드', kw4: '모션',
    ekw1: 'Pixel', ekw2: 'Light', ekw3: 'Mood', ekw4: 'Motion',
    logo: AI_LOGOS.piclumen,
  },
  {
    id: 234,
    title: 'Gemini',
    subtitle: '멀티모달 구상',
    description: '이미지·텍스트 조합 발상/설명에 활용.',
    kw1: '구상', kw2: '설명', kw3: '연결', kw4: '확장',
    ekw1: 'Ideate', ekw2: 'Explain', ekw3: 'Connect', ekw4: 'Extend',
    logo: AI_LOGOS.gemini,
  },
]);

/** ───────── 카테고리 → AI 세트 매핑 ───────── **/
export const aiMenus = {
  programming: AI_PROGRAMMING,
  essay:       AI_ESSAY,
  integration: AI_INTEGRATION,
  art:         AI_ART,
};

/** 기본 카테고리 제목으로 세트 선택 */
export function getAIMenuFor(baseTitle = '') {
  const key = baseTitle.toLowerCase().replace(/\s+/g, '');
  if (key.includes('engineer') || key.includes('program')) return aiMenus.programming;
  if (key.includes('essay'))                              return aiMenus.essay;
  if (key.includes('integration'))                        return aiMenus.integration;
  if (key.includes('art&creativity') || key.includes('art') || key.includes('creativity')) return aiMenus.art;
  // 기본값: 프로그래밍 세트
  return aiMenus.programming;
}

/** ───────── 기존 단일 AI 세트(호환 필요 시) ───────── **/
export const DISHES_AI_DATA = AI_PROGRAMMING.slice(0, 4).map((d, i) => ({ ...d, id: 101 + i }));
export const dishes_ai = makeRing(DISHES_AI_DATA);
