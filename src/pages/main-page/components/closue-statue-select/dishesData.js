// 회전/배치 상수 + 데이터 단일 출처
export const ROTATION_FACTOR = 0.045; // 휠/스크롤 delta → 각도 배율(양수)
export const ROTATION_DIR = -1;       // -1: 스크롤 내릴 때 시계 방향(기존 감각)

export const RADIUS = 500;
export const DISH_SIZE = 400;
export const SCROLL_RESET_THRESHOLD = { TOP: 0.1, BOTTOM: 0.9 };

export const DISHES_DATA = [
  { id: 1, title: 'Art & Creativity', subtitle: '예술 & 창작', description: '복잡한 문제를 체계적으로 분석하고 해결하는 능력', kw1: '영감', kw2: '감각', kw3: '자유', kw4: '표현', ekw1: 'Inspiration', ekw2: 'Aesthetic', ekw3: 'Freedom', ekw4: 'Expression' },
  { id: 2, title: 'Engineering',     subtitle: '공학',       description: '최신 기술을 활용한 혁신적인 솔루션 개발',       kw1: '논리', kw2: '기술', kw3: '혁신', kw4: '문제해결', ekw1: 'Logic', ekw2: 'Technology', ekw3: 'Innovation', ekw4: 'Problem-solving' },
  { id: 3, title: 'Essay',           subtitle: '논술',       description: '논리적 사고와 체계적인 접근을 통한 문제 해결',   kw1: '사유', kw2: '설득', kw3: '서사', kw4: '표현력',   ekw1: 'Thinking', ekw2: 'Persuasion', ekw3: 'Narrative', ekw4: 'Expression' },
  { id: 4, title: 'Integration',     subtitle: '통합',       description: '창의적 사고로 새로운 가치 창출',               kw1: '융합', kw2: '협력', kw3: '적응', kw4: '혁신',   ekw1: 'Integration', ekw2: 'Collaboration', ekw3: 'Adaptation', ekw4: 'Innovation' },
];

export const dishes = [
  ...DISHES_DATA,
  ...DISHES_DATA.map(d => ({ ...d, id: d.id + 4 })), // 8개 링 구성
];
