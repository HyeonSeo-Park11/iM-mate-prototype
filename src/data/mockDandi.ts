export const dandiMerchant = {
  name: '동성로 감성포차',
  category: '술집',
  distanceM: 18,
};

export const dandiPatternCheck = {
  dayLabel: '금요일',
  peakTimeLabel: '오후 7시~9시, 외식·술자리 지출 피크 시간대',
  currentTimeLabel: '오후 7:42',
};

export const dandiSpendingHistory = {
  visitsThisMonth: 4,
  totalSpentThisMonth: 82000,
  averagePerVisit: 20500,
};

export const dandiSavings = {
  totalSavedByDandi: 156000,
  timesReconsidered: 7,
};

export const dandiScanSteps = [
  { id: 'coords', label: '가맹점 좌표 로컬 DB 동기화 확인', service: '단디 로컬 엔진' },
  { id: 'zone', label: '기지국·Wi-Fi 신호 분석 → 반경 50m 존 진입 판정', service: '저전력 지오펜싱' },
  { id: 'pattern', label: '개인 맞춤 지출 피크 시간대 대조', service: '로컬 행동 패턴 DB' },
  { id: 'ready', label: 'Trigger Ready 전환 (화면 켬 이벤트 대기)', service: 'PendingIntent 등록' },
];
