export const mockUser = {
  name: '박현서',
  maskedRRN: '9506**-2*****',
  address: '대구광역시 수성구 범어동 123-4',
  phone: '010-****-5678',
  mainAccountNo: '004-**-1234567',
  mainAccountBalance: 1284300,
};

export const mockMerchant = {
  name: '범어동 청년마을 카페',
  category: '카페',
  distanceM: 42,
  localCurrencyName: '대구행복페이',
};

export const mockSubsidy = {
  localCurrencyBalance: 32000,
  subsidyName: '청년 문화누리 지원금',
  subsidyBalance: 50000,
};

export const mockPrediction = {
  patternSummary: '최근 4주간 이 근처에서 평균 6,800원 카페 소비',
  predictedAmount: 6800,
  confidence: 87,
};

export const mockProduct = {
  productName: '1:1 매칭 그랜트 예적금',
  matchRate: 100,
  monthlyAmount: 30000,
  matchedAmount: 30000,
  termMonths: 12,
  fractionalStock: {
    ticker: 'KODEX 200',
    amount: 3000,
  },
};

export const pipelineSteps = [
  { id: 'pattern', label: '과거 소비 시계열 모델 가중치 조회', service: '패턴 모델 추론 엔진' },
  { id: 'public', label: '전국 지자체 가맹점 오픈 API 캐시 파싱', service: '공공데이터 연동 서비스' },
  { id: 'address', label: '주민등록 주소지 식별', service: '마이데이터 연동 서비스' },
  { id: 'balance', label: '지원금·지역화폐 실시간 잔액 동기화', service: '마이데이터 연동 서비스' },
];
