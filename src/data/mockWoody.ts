export const woodyProfile = {
  age: 29,
  region: '대구광역시 수성구',
  incomeBracket: '중위소득 80% 이하',
};

export const woodyPolicyCandidates = [
  { id: 1, name: '청년 월세 특별지원', agency: '국토교통부', similarity: 0.91 },
  { id: 2, name: '청년내일저축계좌', agency: '보건복지부', similarity: 0.87 },
  { id: 3, name: '대구청년 취업사관학교', agency: '대구광역시', similarity: 0.79 },
];

export const woodyTopPolicy = {
  name: '청년 월세 특별지원',
  agency: '국토교통부 · 대구광역시',
  amount: '월 최대 20만원 · 최대 12개월',
  deadline: '2026년 8월 31일까지',
  summaryLines: [
    '만 19~34세 무주택 청년이면 소득 조건 충족 시 신청할 수 있어요.',
    '월세 20만원까지, 최대 12개월간 지원받을 수 있어요.',
    '온라인으로 5분이면 신청서 작성이 끝나요.',
  ],
};

export const woodyRagSteps = [
  { id: 'collect', label: '전국 지자체 청년 정책 오픈 API 수집', service: '오픈 API 파이프라인' },
  { id: 'embed', label: '공문서 텍스트 청킹 및 벡터 임베딩', service: 'SentenceTransformers' },
  { id: 'search', label: '마이데이터 프로필 기반 코사인 유사도 검색', service: 'Chroma DB' },
  { id: 'summarize', label: 'LLM 3줄 핵심 요약 생성', service: 'sLLM 요약 엔진' },
];

export const woodySavedStats = {
  totalPoliciesFound: 12,
  totalEstimatedBenefit: 2400000,
};
