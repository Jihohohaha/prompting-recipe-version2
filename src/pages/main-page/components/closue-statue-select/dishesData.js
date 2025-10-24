export const ROTATION_FACTOR = 0.045; // (호환용)
export const ROTATION_DIR = -1;

export const RADIUS = 500;
export const DISH_SIZE = 400;
export const SCROLL_RESET_THRESHOLD = { TOP: 0.1, BOTTOM: 0.9 };

/** ───────── 프리-틸트에 쓰이는 기본 데이터 ───────── **/
export const DISHES_DATA = [
  { id: 1, title: 'Art & Creativity', subtitle: '예술 & 창작', description: '복잡한 문제를 체계적으로 분석하고 해결하는 능력', kw1: '영감', kw2: '감각', kw3: '자유', kw4: '표현', ekw1: 'Inspiration', ekw2: 'Aesthetic', ekw3: 'Freedom', ekw4: 'Expression' },
  { id: 2, title: 'Programming',     subtitle: '공학',       description: '최신 기술을 활용한 혁신적인 솔루션 개발',       kw1: '논리', kw2: '기술', kw3: '혁신', kw4: '문제해결', ekw1: 'Logic', ekw2: 'Technology', ekw3: 'Innovation', ekw4: 'Problem-solving' },
  { id: 3, title: 'Essay & Writing', subtitle: '논술',       description: '논리적 사고와 체계적인 접근을 통한 문제 해결',   kw1: '사유', kw2: '설득', kw3: '서사', kw4: '표현력',   ekw1: 'Thinking', ekw2: 'Persuasion', ekw3: 'Narrative', ekw4: 'Expression' },
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
  kiro:        '/images/main-page/ai/kiro.png',
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

// 1) Programming (요청: ChatGPT, Cursor, Kiro, Claude)
const AI_PROGRAMMING = makeRing([
  {
    id: 201,
    title: 'ChatGPT',
    subtitle: '범용 생성형 AI',
    description: `요구사항 정리부터 설계/테스트 코드 초안까지 전 과정을 빠르게 가속합니다.
명세(README, 이슈 템플릿)와 커밋 메시지를 일관화하고, 복잡한 버그 리포트를 재현 단계로 재구성합니다.
알고리즘/자료구조 설명을 실전 코드와 함께 제공해 학습-적용 사이클을 단축합니다.
특히 신규 스택 레퍼런스 탐색, 코드 리뷰 대안 초안, 리팩토링 전략 수립에 강합니다.`,
    kw1: '대화', kw2: '코딩', kw3: '요약', kw4: '번역',
    ekw1: 'Chat', ekw2: 'Coding', ekw3: 'Summarize', ekw4: 'Translate',
    logo: AI_LOGOS.chatgpt,
    address: '/gpt-study',
  },
  {
    id: 202,
    title: 'Cursor',
    subtitle: 'AI 코드 에디터',
    description: `레포 전역 맥락을 활용해 파일 간 의존성까지 고려한 수정 제안을 수행합니다.
반복 보일러플레이트/CRUD/형 변환/타입 보강에 탁월하며, 리팩토링 후 빌드 오류 점검 루프를 단축합니다.
대화형 inline 편집과 커밋 단위 제안을 통해 팀 코딩 컨벤션에 맞춘 변경을 빠르게 누적할 수 있습니다.`,
    kw1: '자동완성', kw2: '리팩토링', kw3: '맥락', kw4: '속도',
    ekw1: 'Autocomplete', ekw2: 'Refactor', ekw3: 'Context', ekw4: 'Speed',
    logo: AI_LOGOS.cursor,
    address: '/cursor-study',
  },
  {
    id: 203,
    title: 'Kiro',
    subtitle: '깃허브 코파일럿',
    description: `IDE에 깊이 통합된 실시간 자동완성으로 함수 시그니처/테스트 케이스를 즉시 제안합니다.
반복적인 패턴 코드, 인터페이스 맞춤 구현, 주석 기반 보강에 효율적이며 페어 프로그래밍 경험을 제공합니다.
짧은 지연으로 문맥에 맞는 스니펫을 공급해 집중 흐름을 유지하는 데 강점이 있습니다.`,
    kw1: 'IDE', kw2: '자동완성', kw3: '테스트', kw4: '생산성',
    ekw1: 'IDE', ekw2: 'Completion', ekw3: 'Tests', ekw4: 'Productivity',
    logo: AI_LOGOS.kiro,
    address: '/kiro-study',
  },
  {
    id: 204,
    title: 'Claude',
    subtitle: '긴 컨텍스트·문해',
    description: `대규모 스펙/회의록/이슈 스레드를 통째로 읽고 일관된 설계 결정을 도출합니다.
경계 사례와 실패 시나리오를 목록화해 리스크를 선제적으로 정리하고, 정책/보안 측면도 함께 점검합니다.
아키텍처 비교표, 마이그레이션 플랜, PR 설명문 등 문서 품질을 높이는 데 강합니다.`,
    kw1: '장문', kw2: '분석', kw3: '안전', kw4: '글쓰기',
    ekw1: 'Long', ekw2: 'Analysis', ekw3: 'Safety', ekw4: 'Writing',
    logo: AI_LOGOS.claude,
    address: '/claude-study',
  },
]);

// 2) Essay (요청: ChatGPT, Nexbot AI, Sudowrite, 뤼튼)
const AI_ESSAY = makeRing([
  {
    id: 211,
    title: 'ChatGPT',
    subtitle: '범용 글쓰기/요약',
    description: `목적-독자-톤(POV)에 맞춰 개요를 생성하고, 주장-근거-예시 구조로 문단을 재배열합니다.
길이를 보존한 재작성, 오탈자/문흐름 교정, 핵심만 뽑은 요약 등 편집 작업에 강합니다.
입시·리포트·블로그처럼 서로 다른 규격을 신속히 전환하는 데 유용합니다.`,
    kw1: '개요', kw2: '톤', kw3: '요약', kw4: '교정',
    ekw1: 'Outline', ekw2: 'Tone', ekw3: 'Summarize', ekw4: 'Edit',
    logo: AI_LOGOS.chatgpt,
    address: '/gpt-study',
  },
  {
    id: 212,
    title: 'Nexbot AI',
    subtitle: '아이디어 발상',
    description: `키워드 기반 브레인스토밍으로 메타포/관점 전환/반전 포인트를 대량 제시합니다.
짧은 브리프를 바탕으로 제목·소제목·후킹 문장을 확장해 초안 생산 속도를 올립니다.
창작 장벽 해소와 콘셉트 후보 탐색에 특화되어 초반 기획 시간을 줄여줍니다.`,
    kw1: '아이디어', kw2: '확장', kw3: '브리프', kw4: '키워드',
    ekw1: 'Ideas', ekw2: 'Expand', ekw3: 'Brief', ekw4: 'Keyword',
    logo: AI_LOGOS.nexbot,
    address: '/nexbot-study',
  },
  {
    id: 213,
    title: 'Sudowrite',
    subtitle: '창작 도우미',
    description: `서사 톤과 장르 문법을 반영해 문장을 ‘늘리고(Expand)’ ‘바꾸고(Rewrite)’ ‘이어가는’ 작업에 강합니다.
캐릭터 감정선, 장면 전환, 묘사 밀도를 조절하며 작가의 개성을 해치지 않고 초고를 다듬습니다.
장편 연재/단편 구상 모두에서 블로커를 해제하는 실전 보조도구입니다.`,
    kw1: '창작', kw2: '프롬프트', kw3: '확장', kw4: '리라이트',
    ekw1: 'Creative', ekw2: 'Prompt', ekw3: 'Expand', ekw4: 'Rewrite',
    logo: AI_LOGOS.sudowrite,
    address: '/sudowrite-study',
  },
  {
    id: 214,
    title: '뤼튼',
    subtitle: '국내 글쓰기 보조',
    description: `한국어 문맥에 최적화된 템플릿으로 마케팅 카피/메일/요약을 신속히 생산합니다.
톤 가이드와 문장 다듬기를 통해 전달력을 높이고, 국내 트렌드에 맞춘 표현 선택을 도와줍니다.
짧은 납기 작업, 초안 다변화, 반복 카피 생산에 특히 효율적입니다.`,
    kw1: '한글', kw2: '카피', kw3: '요약', kw4: '템플릿',
    ekw1: 'Korean', ekw2: 'Copy', ekw3: 'Summary', ekw4: 'Template',
    logo: AI_LOGOS.wrtn,
    address: '/wrtn-study',
  },
]);

// 3) Integration (요청: ChatGPT, Claude, Gemini, Perplexity)
const AI_INTEGRATION = makeRing([
  {
    id: 221,
    title: 'ChatGPT',
    subtitle: '다목적 통합',
    description: `워크플로 허브로서 다양한 도구와 연결되어 요약·자동화·코딩을 한 곳에서 조율합니다.
API 설계 보조, 스크립트 생성, 봇 자동화 시나리오(트리거-액션-검증)를 신속히 만들어줍니다.
프로세스 문서화와 팀 온보딩 자료 생산까지 한 번에 정리할 수 있습니다.`,
    kw1: '허브', kw2: '자동화', kw3: '요약', kw4: '코딩',
    ekw1: 'Hub', ekw2: 'Automation', ekw3: 'Summarize', ekw4: 'Coding',
    logo: AI_LOGOS.chatgpt,
    address: '/gpt-study',
  },
  {
    id: 222,
    title: 'Claude',
    subtitle: '정확성/안전성',
    description: `규정/정책/계약서 같은 민감 문서를 길이 제한 없이 읽고 핵심 쟁점을 구조화합니다.
의사결정 기록(ADR), 리스크 평가표, 승인 절차 체크리스트를 생성해 거버넌스를 강화합니다.
팀 간 공유가 필요한 장문 산출물에서 신뢰도 높고 균형 잡힌 요약을 제공합니다.`,
    kw1: '정책', kw2: '문서', kw3: '검토', kw4: '분석',
    ekw1: 'Policy', ekw2: 'Docs', ekw3: 'Review', ekw4: 'Analysis',
    logo: AI_LOGOS.claude,
    address: '/claude-study',
  },
  {
    id: 223,
    title: 'Gemini',
    subtitle: '멀티모달',
    description: `텍스트·이미지·코드·표 데이터를 한 화면에서 엮어 문제를 입체적으로 풉니다.
스크린샷/다이어그램을 읽어 과업을 정의하고, 코드와 설명을 왕복하며 프로토타입을 신속히 만듭니다.
리서치 결과의 시각적 요약, 프롬프트-이미지 상호보강 같은 통합 시나리오에 강합니다.`,
    kw1: '멀티모달', kw2: '검색', kw3: '코드', kw4: '확장',
    ekw1: 'Multimodal', ekw2: 'Search', ekw3: 'Code', ekw4: 'Extend',
    logo: AI_LOGOS.gemini,
    address: '/gemini-study',
  },
  {
    id: 224,
    title: 'Perplexity',
    subtitle: '실시간 검색형',
    description: `웹 인용을 바탕으로 최신 사실을 빠르게 수집/교차검증합니다.
출처 링크와 핵심 문장을 함께 제공해 재현 가능한 리서치 노트를 만듭니다.
트렌드 파악, 비교표 생성, 근거 기반 결론 도출에 특화되어 팀 의사결정을 가속합니다.`,
    kw1: '검색', kw2: '인용', kw3: '요약', kw4: '사실성',
    ekw1: 'Search', ekw2: 'Citations', ekw3: 'Summary', ekw4: 'Factual',
    logo: AI_LOGOS.perplexity,
    address: '/perplexity-study',
  },
]);

// 4) Art & Creativity (요청: ChatGPT, Midjourney, Piclumen, Gemini)
const AI_ART = makeRing([
  {
    id: 231,
    title: 'ChatGPT',
    subtitle: '콘셉트/브리프',
    description: `키워드 몇 개로 아트 디렉션을 구조화하고, 무드·레퍼런스·제약조건을 명확히 정의합니다.
스타일 가이드/프로젝트 브리프/촬영 리스트를 생성해 시각 작업의 방향을 고정합니다.
팀 협업용 내러티브와 네이밍을 함께 설계해 브랜드 일관성을 높입니다.`,
    kw1: '콘셉트', kw2: '브리프', kw3: '네이밍', kw4: '스토리',
    ekw1: 'Concept', ekw2: 'Brief', ekw3: 'Naming', ekw4: 'Story',
    logo: AI_LOGOS.chatgpt,
    address: '/gpt-study',
  },
  {
    id: 232,
    title: 'Midjourney',
    subtitle: '이미지 생성',
    description: `고해상도 스타일 이미지 합성에 특화되어 컨셉 보드/키 비주얼을 신속히 만듭니다.
참조 이미지/스타일 문구를 조합해 다양한 변주를 탐색하고, 룩앤필을 빠르게 고도화합니다.
아트 시퀀스/시리즈 작업 초반의 방향성 검증에 특히 유리합니다.`,
    kw1: '스타일', kw2: '합성', kw3: '레퍼런스', kw4: '프롬프트',
    ekw1: 'Style', ekw2: 'Synthesis', ekw3: 'Reference', ekw4: 'Prompt',
    logo: AI_LOGOS.midjourney,
    address: '/midjourney-study',
  },
  {
    id: 233,
    title: 'Piclumen',
    subtitle: '비주얼 툴',
    description: `픽셀/라이트 기반 감성 비주얼을 빠르게 구성해 무드 실험에 적합합니다.
타이포/쉐이프/그레인 효과를 조합해 아트보드 반복 제작을 단축하며, 모션 초안까지 연결됩니다.
소규모 캠페인·소셜 콘텐츠용 그래픽 생산에 효율적입니다.`,
    kw1: '픽셀', kw2: '라이트', kw3: '무드', kw4: '모션',
    ekw1: 'Pixel', ekw2: 'Light', ekw3: 'Mood', ekw4: 'Motion',
    logo: AI_LOGOS.piclumen,
    address: '/piclumen-study',
  },
  {
    id: 234,
    title: 'Gemini',
    subtitle: '멀티모달 구상',
    description: `이미지와 텍스트를 함께 이해해 콘셉트 설명/피드백 루프를 단축합니다.
스케치/촬영 컷을 해석해 보완 프롬프트를 제안하고, 아이디어-시각 결과를 왕복으로 고도화합니다.
프레젠테이션용 요약 슬라이드와 설명 문구 생성에도 유용합니다.`,
    kw1: '구상', kw2: '설명', kw3: '연결', kw4: '확장',
    ekw1: 'Ideate', ekw2: 'Explain', ekw3: 'Connect', ekw4: 'Extend',
    logo: AI_LOGOS.gemini,
    address: '/gemini-study',
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
