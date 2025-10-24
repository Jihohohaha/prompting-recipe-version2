import "../../../src/styles/App.css"
// src/pages/gpt-study/data.js

// 방법론별 색상 배열
export const recipeColors = [
  '#FE7525', // Recipe 1
  '#FFC300', // Recipe 2
  '#87CA34', // Recipe 3
  '#C6D96A', // Recipe 4
  '#29D069', // Recipe 5
  '#0278ED', // Recipe 6
  '#A05BF9',  // Recipe 7
  '#FFFFFF'
];

export const gptStudyData = [
  {
    id: 0,
    title: "TUTORIAL\nfor\nCHATGPT",
    slug: "Prompt Chaining",
    displayTitle: "Title.\n(PROMPT\nCHAINING)",
    description: "여러 개의 프롬프트를 단계적으로 연결해 복잡한 문제를 해결합니다.",
    color: recipeColors[7],
    images: {
      // 이미지 스위처를 안 쓰더라도 구조상 필요하면 경로 유지
      // 없으면 임시로 7번 이미지 재사용해도 무방
      default: "/images/gpt-study/Recipe7.png",
      selected: ""
    },
    tabs: [
      {
        id: "tutorial",
        title: "TUTORIAL",
        sections: [
          {
            type: "explain",
            content: [
              { type: "text", content: "큰 문제를 작은 단계로 쪼개어 각 단계의 출력을 다음 단계의 입력으로 활용합니다." },
              { type: "text", content: "각 단계마다 목표/형식/평가 기준을 명시하면 체인 안정성이 높아집니다." },
            ]
          },
          {
            type: "example",
            content: [
              { type: "text", content: "예: ①요구사항 추출 → ②설계안 도출 → ③코드 스켈레톤 → ④테스트 케이스 생성" }
            ]
          }
        ]
      },
      {
        id: "quiz",
        title: "QUIZ",
        multipleChoice: {
          question: "Prompt Chaining의 핵심 가치는?",
          options: [
            "모델 파라미터를 줄인다",
            "문제를 단계별로 분해해 안정적 품질을 얻는다",
            "추론 속도를 무조건 높인다",
            "프롬프트 길이를 항상 줄인다"
          ],
          answer: 1
        },
        essay: {
          question: "4단계 이상의 체인을 설계해보고 각 단계의 입/출력을 간단히 적어보세요.",
          placeholder: "예: 1) 문제정의 → 2) 정보수집 → 3) 초안 생성 → 4) 검토/개선 ..."
        }
      },
      { id: "chat", title: "CHAT" }
    ]
  },
  {
    id: 1,
    title: "FEW SHOT",
    font: "Koolegant",
    slug: "recipe1",
    displayTitle: "RECIPE 1.\n(ROLE\nPROMPTING)",
    description: "Few-shot 프롬프팅 기법을 학습합니다.",
    color: recipeColors[0],
    images: {
      default: "/images/gpt-study/Recipe1.png",
      selected: "/images/gpt-study/SelectedRecipe1.png"
    },
    tabs: [
      {
        id: "tutorial",
        title: "TUTORIAL",
        sections: [
          {
            type: "explain",
            content: [
              {
                type: "text",
                content: "Few-shot 프롬프팅은 예시를 제공하여 AI의 답변 품질을 높이는 기법입니다."
              },
              {
                type: "text",
                content: "예시를 2-3개 제공하면 AI가 패턴을 학습하여 더 정확한 답변을 생성합니다."
              }
            ]
          },
          {
            type: "example",
            content: [
              {
                type: "text",
                content: "좋은 예시는 입력과 출력이 명확하고, 원하는 형식을 잘 보여줍니다."
              },
              {
                type: "text",
                content: "예: '문장: 오늘 날씨가 좋다 → 감정: 긍정'"
              }
            ]
          }
        ]
      },
      {
        id: "quiz",
        title: "QUIZ",
        multipleChoice: {
          question: "Few-shot 프롬프팅의 주요 장점은 무엇인가요?",
          options: [
            "AI의 답변 속도를 높인다",
            "예시를 통해 답변 품질을 개선한다",
            "프롬프트 길이를 줄인다",
            "AI의 창의성을 제한한다"
          ],
          answer: 1
        },
        essay: {
          question: "Few-shot 프롬프팅을 활용한 실제 사례를 작성해주세요.",
          placeholder: "예시를 포함한 프롬프트를 작성해보세요..."
        }
      },
      {
        id: "chat",
        title: "CHAT"
      }
    ]
  },
  {
    id: 2,
    title: "ROLE Prompting",
    slug: "recipe2",
    displayTitle: "RECIPE 2.\n(FEW-SHOT)",
    font: "Mortend",
    fontWeight: "bold",
    description: "역할 기반 프롬프팅 기법을 학습합니다.",
    color: recipeColors[1],
    images: {
      default: "/images/gpt-study/Recipe2.png",
      selected: "/images/gpt-study/SelectedRecipe2.png"
    },
    tabs: [
      {
        id: "tutorial",
        title: "TUTORIAL",
        sections: [
          {
            type: "explain",
            content: [
              {
                type: "text",
                content: "Role Prompting은 AI에게 특정 역할을 부여하는 기법입니다."
              },
              {
                type: "text",
                content: "'전문가처럼 답변해줘'와 같이 역할을 명시하면 더 전문적인 답변을 받을 수 있습니다."
              }
            ]
          },
          {
            type: "example",
            content: [
              {
                type: "text",
                content: "역할은 구체적일수록 좋습니다. 예: '10년 경력의 마케팅 전문가'"
              }
            ]
          }
        ]
      },
      {
        id: "quiz",
        title: "QUIZ",
        multipleChoice: {
          question: "Role Prompting의 핵심은 무엇인가요?",
          options: [
            "AI에게 구체적인 역할을 부여한다",
            "답변 길이를 제한한다",
            "예시를 많이 제공한다",
            "질문을 짧게 한다"
          ],
          answer: 0
        },
        essay: {
          question: "효과적인 역할 프롬프트를 작성해보세요.",
          placeholder: "구체적인 역할과 요청을 포함해주세요..."
        }
      },
      {
        id: "chat",
        title: "CHAT"
      }
    ]
  },
  {
    id: 3,
    title: "HALLUCINATION",
    slug: "recipe3",
    displayTitle: "RECIPE 3.\n(HALLUCINATION\nPREVENTION)",
    description: "환각 현상 방지 기법을 학습합니다.",
    color: recipeColors[2],
    images: {
      default: "/images/gpt-study/Recipe3.png",
      selected: "/images/gpt-study/SelectedRecipe3.png"
    },
    tabs: [
      {
        id: "tutorial",
        title: "TUTORIAL",
        sections: [
          {
            type: "explain",
            content: [
              {
                type: "text",
                content: "Hallucination은 AI가 사실이 아닌 내용을 생성하는 현상입니다."
              },
              {
                type: "text",
                content: "이를 방지하려면 '확실한 정보만 사용해줘'와 같은 제약을 명시합니다."
              }
            ]
          },
          {
            type: "example",
            content: [
              {
                type: "text",
                content: "출처를 요구하거나, 불확실하면 인정하도록 요청하는 것도 효과적입니다."
              }
            ]
          }
        ]
      },
      {
        id: "quiz",
        title: "QUIZ",
        multipleChoice: {
          question: "Hallucination을 방지하는 방법은?",
          options: [
            "AI에게 창의성을 요구한다",
            "제약 조건을 명시한다",
            "짧은 질문을 한다",
            "예시를 제공하지 않는다"
          ],
          answer: 1
        },
        essay: {
          question: "Hallucination 방지 프롬프트를 작성해보세요.",
          placeholder: "제약 조건을 포함해주세요..."
        }
      },
      {
        id: "chat",
        title: "CHAT"
      }
    ]
  },
  {
    id: 4,
    title: "Markdown n Template",
    slug: "recipe4",
    displayTitle: "RECIPE 4.\n(MARKDOWN &\nTEMPLATE)",
    description: "마크다운과 템플릿 활용 기법을 학습합니다.",
    color: recipeColors[3],
    images: {
      default: "/images/gpt-study/Recipe4.png",
      selected: "/images/gpt-study/SelectedRecipe4.png"
    },
    tabs: [
      {
        id: "tutorial",
        title: "TUTORIAL",
        sections: [
          {
            type: "explain",
            content: [
              {
                type: "text",
                content: "마크다운 형식으로 프롬프트를 작성하면 구조화된 답변을 받을 수 있습니다."
              },
              {
                type: "text",
                content: "템플릿을 활용하면 일관된 형식의 답변을 반복적으로 생성할 수 있습니다."
              }
            ]
          },
          {
            type: "example",
            content: [
              {
                type: "text",
                content: "예: '## 제목\\n- 항목1\\n- 항목2' 형식으로 요청하기"
              }
            ]
          }
        ]
      },
      {
        id: "quiz",
        title: "QUIZ",
        multipleChoice: {
          question: "마크다운을 사용하는 이유는?",
          options: [
            "답변 속도를 높인다",
            "구조화된 답변을 받는다",
            "AI의 창의성을 높인다",
            "질문 길이를 줄인다"
          ],
          answer: 1
        },
        essay: {
          question: "마크다운 형식의 프롬프트를 작성해보세요.",
          placeholder: "마크다운 문법을 활용해주세요..."
        }
      },
      {
        id: "chat",
        title: "CHAT"
      }
    ]
  },
  {
    id: 5,
    title: "RAG",
    slug: "recipe5",
    displayTitle: "RECIPE 5.\n(RAG)",
    description: "검색 증강 생성 기법을 학습합니다.",
    color: recipeColors[4],
    images: {
      default: "/images/gpt-study/Recipe5.png",
      selected: "/images/gpt-study/SelectedRecipe5.png"
    },
    tabs: [
      {
        id: "tutorial",
        title: "TUTORIAL",
        sections: [
          {
            type: "explain",
            content: [
              {
                type: "text",
                content: "RAG는 외부 지식을 검색하여 답변에 활용하는 기법입니다."
              },
              {
                type: "text",
                content: "최신 정보나 특정 문서 기반 답변이 필요할 때 유용합니다."
              }
            ]
          },
          {
            type: "example",
            content: [
              {
                type: "text",
                content: "문서를 제공하고 '이 문서를 참고하여 답변해줘'라고 요청합니다."
              }
            ]
          }
        ]
      },
      {
        id: "quiz",
        title: "QUIZ",
        multipleChoice: {
          question: "RAG의 주요 활용 사례는?",
          options: [
            "일반적인 질문 답변",
            "특정 문서 기반 답변",
            "창의적인 글쓰기",
            "코드 생성"
          ],
          answer: 1
        },
        essay: {
          question: "RAG를 활용한 프롬프트를 작성해보세요.",
          placeholder: "문서 참조를 포함해주세요..."
        }
      },
      {
        id: "chat",
        title: "CHAT"
      }
    ]
  },
  {
    id: 6,
    title: "Reflection",
    slug: "recipe6",
    displayTitle: "RECIPE 6.\n(REFLECTION)",
    description: "성찰 기반 프롬프팅 기법을 학습합니다.",
    color: recipeColors[5],
    images: {
      default: "/images/gpt-study/Recipe6.png",
      selected: "/images/gpt-study/SelectedRecipe6.png"
    },
    tabs: [
      {
        id: "tutorial",
        title: "TUTORIAL",
        sections: [
          {
            type: "explain",
            content: [
              {
                type: "text",
                content: "Reflection은 AI가 자신의 답변을 검토하도록 유도하는 기법입니다."
              },
              {
                type: "text",
                content: "'답변을 검토하고 개선점이 있다면 수정해줘'라고 요청합니다."
              }
            ]
          },
          {
            type: "example",
            content: [
              {
                type: "text",
                content: "이를 통해 더 정확하고 완성도 높은 답변을 얻을 수 있습니다."
              }
            ]
          }
        ]
      },
      {
        id: "quiz",
        title: "QUIZ",
        multipleChoice: {
          question: "Reflection의 목적은?",
          options: [
            "답변 속도 향상",
            "답변 품질 개선",
            "프롬프트 단순화",
            "비용 절감"
          ],
          answer: 1
        },
        essay: {
          question: "Reflection을 활용한 프롬프트를 작성해보세요.",
          placeholder: "검토 요청을 포함해주세요..."
        }
      },
      {
        id: "chat",
        title: "CHAT"
      }
    ]
  },
  {
    id: 7,
    title: "Today Recipe",
    slug: "recipe7",
    displayTitle: "RECIPE 7.\n(TODAY'S RECIPE)",
    description: "오늘의 레시피를 학습합니다.",
    color: recipeColors[6],
    images: {
      default: "/images/gpt-study/Recipe7.png",
      selected: "/images/gpt-study/SelectedRecipe7.png"
    },
    tabs: [
      {
        id: "tutorial",
        title: "TUTORIAL",
        sections: [
          {
            type: "explain",
            content: [
              {
                type: "text",
                content: "오늘의 레시피는 매일 업데이트되는 실전 프롬프팅 기법입니다."
              },
              {
                type: "text",
                content: "다양한 기법을 조합하여 복잡한 문제를 해결합니다."
              }
            ]
          },
          {
            type: "example",
            content: [
              {
                type: "text",
                content: "실무에서 바로 활용할 수 있는 고급 패턴을 학습합니다."
              }
            ]
          }
        ]
      },
      {
        id: "quiz",
        title: "QUIZ",
        multipleChoice: {
          question: "Today Recipe의 특징은?",
          options: [
            "기본 기법만 다룬다",
            "고급 패턴을 조합한다",
            "이론만 학습한다",
            "단일 기법만 사용한다"
          ],
          answer: 1
        },
        essay: {
          question: "여러 기법을 조합한 프롬프트를 작성해보세요.",
          placeholder: "다양한 기법을 활용해주세요..."
        }
      },
      {
        id: "chat",
        title: "CHAT"
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

export const getRecipeColor = (recipeId) => {
  return recipeColors[recipeId - 1] || recipeColors[0];
};