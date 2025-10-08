// src/pages/gpt-study/data.js

export const gptStudyData = [
  {
    id: 1,
    title: "FEW SHOT",
    slug: "recipe1",
    displayTitle: "RECEIPT1. FEW SHOT",
    description: "Few-shot 프롬프팅 기법을 학습합니다.",
    images: {
      default: "/images/gpt-study/Recipe1.png",
      selected: "/images/gpt-study/SelectedRecipe1.png"
    },
    tabs: [
      {
        id: "tutorial",
        title: "TUTORIAL",
        pages: [
          {
            pageNum: 1,
            content: "Few-shot 프롬프팅은 예시를 제공하여 AI의 답변 품질을 높이는 기법입니다."
          },
          {
            pageNum: 2,
            content: "예시를 2-3개 제공하면 AI가 패턴을 학습하여 더 정확한 답변을 생성합니다."
          },
          {
            pageNum: 3,
            content: "좋은 예시는 입력과 출력이 명확하고, 원하는 형식을 잘 보여줍니다."
          }
        ]
      },
      {
        id: "chat",
        title: "CHAT"
      },
      {
        id: "quiz",
        title: "QUIZ"
      }
    ]
  },
  {
    id: 2,
    title: "ROLE Prompting",
    slug: "recipe2",
    displayTitle: "RECEIPT2. ROLE Prompting",
    description: "역할 기반 프롬프팅 기법을 학습합니다.",
    images: {
      default: "/images/gpt-study/Recipe2.png",
      selected: "/images/gpt-study/SelectedRecipe2.png"
    },
    tabs: [
      {
        id: "tutorial",
        title: "TUTORIAL",
        pages: [
          {
            pageNum: 1,
            content: "Role Prompting은 AI에게 특정 역할을 부여하는 기법입니다."
          },
          {
            pageNum: 2,
            content: "'전문가처럼 답변해줘'와 같이 역할을 명시하면 더 전문적인 답변을 받을 수 있습니다."
          },
          {
            pageNum: 3,
            content: "역할은 구체적일수록 좋습니다. 예: '10년 경력의 마케팅 전문가'"
          }
        ]
      },
      {
        id: "chat",
        title: "CHAT"
      },
      {
        id: "quiz",
        title: "QUIZ"
      }
    ]
  },
  {
    id: 3,
    title: "HALLUCINATION",
    slug: "recipe3",
    displayTitle: "RECEIPT3. HALLUCINATION",
    description: "환각 현상 방지 기법을 학습합니다.",
    images: {
      default: "/images/gpt-study/Recipe3.png",
      selected: "/images/gpt-study/SelectedRecipe3.png"
    },
    tabs: [
      {
        id: "tutorial",
        title: "TUTORIAL",
        pages: [
          {
            pageNum: 1,
            content: "Hallucination은 AI가 사실이 아닌 내용을 생성하는 현상입니다."
          },
          {
            pageNum: 2,
            content: "이를 방지하려면 '확실한 정보만 사용해줘'와 같은 제약을 명시합니다."
          },
          {
            pageNum: 3,
            content: "출처를 요구하거나, 불확실하면 인정하도록 요청하는 것도 효과적입니다."
          }
        ]
      },
      {
        id: "chat",
        title: "CHAT"
      },
      {
        id: "quiz",
        title: "QUIZ"
      }
    ]
  },
  {
    id: 4,
    title: "Markdown n Template",
    slug: "recipe4",
    displayTitle: "RECEIPT4. Markdown n Template",
    description: "마크다운과 템플릿 활용 기법을 학습합니다.",
    images: {
      default: "/images/gpt-study/Recipe4.png",
      selected: "/images/gpt-study/SelectedRecipe4.png"
    },
    tabs: [
      {
        id: "tutorial",
        title: "TUTORIAL",
        pages: [
          {
            pageNum: 1,
            content: "마크다운 형식으로 프롬프트를 작성하면 구조화된 답변을 받을 수 있습니다."
          },
          {
            pageNum: 2,
            content: "템플릿을 활용하면 일관된 형식의 답변을 반복적으로 생성할 수 있습니다."
          },
          {
            pageNum: 3,
            content: "예: '## 제목\n- 항목1\n- 항목2' 형식으로 요청하기"
          }
        ]
      },
      {
        id: "chat",
        title: "CHAT"
      },
      {
        id: "quiz",
        title: "QUIZ"
      }
    ]
  },
  {
    id: 5,
    title: "RAG",
    slug: "recipe5",
    displayTitle: "RECEIPT5. RAG",
    description: "검색 증강 생성 기법을 학습합니다.",
    images: {
      default: "/images/gpt-study/Recipe5.png",
      selected: "/images/gpt-study/SelectedRecipe5.png"
    },
    tabs: [
      {
        id: "tutorial",
        title: "TUTORIAL",
        pages: [
          {
            pageNum: 1,
            content: "RAG는 외부 지식을 검색하여 답변에 활용하는 기법입니다."
          },
          {
            pageNum: 2,
            content: "최신 정보나 특정 문서 기반 답변이 필요할 때 유용합니다."
          },
          {
            pageNum: 3,
            content: "문서를 제공하고 '이 문서를 참고하여 답변해줘'라고 요청합니다."
          }
        ]
      },
      {
        id: "chat",
        title: "CHAT"
      },
      {
        id: "quiz",
        title: "QUIZ"
      }
    ]
  },
  {
    id: 6,
    title: "Reflection",
    slug: "recipe6",
    displayTitle: "RECEIPT6. Reflection",
    description: "성찰 기반 프롬프팅 기법을 학습합니다.",
    images: {
      default: "/images/gpt-study/Recipe6.png",
      selected: "/images/gpt-study/SelectedRecipe6.png"
    },
    tabs: [
      {
        id: "tutorial",
        title: "TUTORIAL",
        pages: [
          {
            pageNum: 1,
            content: "Reflection은 AI가 자신의 답변을 검토하도록 유도하는 기법입니다."
          },
          {
            pageNum: 2,
            content: "'답변을 검토하고 개선점이 있다면 수정해줘'라고 요청합니다."
          },
          {
            pageNum: 3,
            content: "이를 통해 더 정확하고 완성도 높은 답변을 얻을 수 있습니다."
          }
        ]
      },
      {
        id: "chat",
        title: "CHAT"
      },
      {
        id: "quiz",
        title: "QUIZ"
      }
    ]
  },
  {
    id: 7,
    title: "Today Receipt",
    slug: "recipe7",
    displayTitle: "RECEIPT7. Today Receipt",
    description: "오늘의 레시피를 학습합니다.",
    images: {
      default: "/images/gpt-study/Recipe7.png",
      selected: "/images/gpt-study/SelectedRecipe7.png"
    },
    tabs: [
      {
        id: "tutorial",
        title: "TUTORIAL",
        pages: [
          {
            pageNum: 1,
            content: "오늘의 레시피는 매일 업데이트되는 실전 프롬프팅 기법입니다."
          },
          {
            pageNum: 2,
            content: "다양한 기법을 조합하여 복잡한 문제를 해결합니다."
          },
          {
            pageNum: 3,
            content: "실무에서 바로 활용할 수 있는 고급 패턴을 학습합니다."
          }
        ]
      },
      {
        id: "chat",
        title: "CHAT"
      },
      {
        id: "quiz",
        title: "QUIZ"
      }
    ]
  }
];

// 헬퍼 함수들
export const getRecipeBySlug = (slug) => {
  return gptStudyData.find(recipe => recipe.slug === slug);
};

export const getRecipeById = (id) => {
  return gptStudyData.find(recipe => recipe.id === id);
};

export const getAllSlugs = () => {
  return gptStudyData.map(recipe => recipe.slug);
};