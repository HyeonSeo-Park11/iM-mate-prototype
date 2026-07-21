export const ttokdiResidence = {
  region: '대구광역시 수성구',
  localCurrencyName: '대구행복페이',
  subsidyBalance: 32000,
};

export const ttokdiMerchant = {
  name: '범어동 청년마을 카페',
  distanceM: 42,
  acceptsLocalCurrency: true,
  cashbackRate: 10,
};

export const ttokdiOrder = {
  amount: 6800,
};

export const ttokdiSavings = {
  totalSavedByTtokdi: 21400,
  timesUsedSubsidyFirst: 9,
};

export const ttokdiMatchSteps = [
  { id: 'mydata', label: '주민등록 주소지 및 지원금 잔액 조회', service: '마이데이터 연동 서비스' },
  { id: 'merchant', label: '공공데이터포털 가맹점 오픈 API 매칭', service: '공공데이터 연동 서비스' },
  { id: 'cashback', label: '캐시백율 파싱 및 실질 보존 가치 계산', service: '똑디 추천 엔진' },
  { id: 'nudge', label: '최적 결제 넛지 전송 준비', service: 'API 게이트웨이' },
];
