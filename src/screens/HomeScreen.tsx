import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors, gradients } from '../theme/colors';
import PipelineTicker from '../components/PipelineTicker';
import DandiMascot from '../components/DandiMascot';
import TtokdiMascot from '../components/TtokdiMascot';
import {
  mockMerchant,
  mockPrediction,
  mockSubsidy,
  mockUser,
  pipelineSteps,
} from '../data/mock';
import { dandiMerchant, dandiSavings } from '../data/mockDandi';
import { ttokdiMerchant, ttokdiSavings } from '../data/mockTtokdi';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type Phase = 'idle' | 'scanning' | 'widget';

export default function HomeScreen({ navigation }: Props) {
  const [phase, setPhase] = useState<Phase>('idle');

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.brand}>iM MATE</Text>
        <Text style={styles.greeting}>{mockUser.name}님, 안녕하세요 👋</Text>

        <LinearGradient colors={gradients.primary} style={styles.accountCard}>
          <Text style={styles.accountLabel}>iM뱅크 입출금 계좌</Text>
          <Text style={styles.accountNo}>{mockUser.mainAccountNo}</Text>
          <Text style={styles.accountBalance}>
            {mockUser.mainAccountBalance.toLocaleString()}원
          </Text>
        </LinearGradient>

        <View style={styles.row}>
          <View style={styles.smallCard}>
            <Text style={styles.smallCardLabel}>{mockMerchant.localCurrencyName}</Text>
            <Text style={styles.smallCardValue}>
              {mockSubsidy.localCurrencyBalance.toLocaleString()}원
            </Text>
          </View>
          <View style={styles.smallCard}>
            <Text style={styles.smallCardLabel}>{mockSubsidy.subsidyName}</Text>
            <Text style={styles.smallCardValue}>
              {mockSubsidy.subsidyBalance.toLocaleString()}원
            </Text>
          </View>
        </View>

        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>🎬 시나리오 데모 컨트롤</Text>
          <Text style={styles.demoDesc}>
            실제로는 지오펜스 진입 + 화면 켬 이벤트로 자동 트리거됩니다. 목업에서는
            아래 버튼으로 수동 재현합니다.
          </Text>
          <Pressable
            style={styles.triggerBtn}
            onPress={() => setPhase('scanning')}
          >
            <Ionicons name="location" size={18} color="#fff" />
            <Text style={styles.triggerBtnText}>
              '{mockMerchant.name}' 근처 도착 시뮬레이션
            </Text>
          </Pressable>
        </View>

        <View style={styles.dandiBox}>
          <View style={styles.dandiHeaderRow}>
            <DandiMascot size={48} />
            <View style={styles.dandiHeaderText}>
              <Text style={styles.dandiTitle}>단디가 지켜보고 있어요</Text>
              <Text style={styles.dandiDesc}>
                과소비 위험 존에서 결제 직전, 1초만 다시 생각해보도록 도와드려요.
              </Text>
            </View>
          </View>
          <View style={styles.dandiStatRow}>
            <Text style={styles.dandiStatLabel}>이번 달 단디 덕분에 아낀 금액</Text>
            <Text style={styles.dandiStatValue}>
              {dandiSavings.totalSavedByDandi.toLocaleString()}원
            </Text>
          </View>
          <Pressable
            style={styles.dandiTriggerBtn}
            onPress={() => navigation.navigate('DandiScan')}
          >
            <Ionicons name="shield-checkmark" size={18} color="#fff" />
            <Text style={styles.dandiTriggerBtnText}>
              '{dandiMerchant.name}' 위험 존 진입 시뮬레이션 (금요일 저녁)
            </Text>
          </Pressable>
        </View>

        <View style={styles.ttokdiBox}>
          <View style={styles.dandiHeaderRow}>
            <TtokdiMascot size={48} />
            <View style={styles.dandiHeaderText}>
              <Text style={styles.ttokdiTitle}>똑디가 최적 결제를 찾아줘요</Text>
              <Text style={styles.ttokdiDesc}>
                지원금·지역화폐를 받는 가맹점이면, 현금 대신 먼저 쓰도록 알려드려요.
              </Text>
            </View>
          </View>
          <View style={styles.ttokdiStatRow}>
            <Text style={styles.ttokdiStatLabel}>이번 달 똑디 덕분에 아낀 금액</Text>
            <Text style={styles.ttokdiStatValue}>
              {ttokdiSavings.totalSavedByTtokdi.toLocaleString()}원
            </Text>
          </View>
          <Pressable
            style={styles.ttokdiTriggerBtn}
            onPress={() => navigation.navigate('TtokdiScan')}
          >
            <Ionicons name="pricetag" size={18} color="#fff" />
            <Text style={styles.ttokdiTriggerBtnText}>
              '{ttokdiMerchant.name}' 가맹점 도착 시뮬레이션
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal visible={phase !== 'idle'} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          {phase === 'scanning' && (
            <View style={styles.scanCard}>
              <Text style={styles.scanTitle}>실시간 소비 패턴 분석 중</Text>
              <PipelineTicker
                steps={pipelineSteps}
                onDone={() => setPhase('widget')}
              />
            </View>
          )}

          {phase === 'widget' && (
            <View style={styles.widgetWrap}>
              <View style={styles.widgetHandle} />
              <LinearGradient colors={gradients.widget} style={styles.widgetCard}>
                <View style={styles.widgetHeaderRow}>
                  <Ionicons name="sparkles" size={16} color="#FFD866" />
                  <Text style={styles.widgetHeader}>iM MATE 위젯</Text>
                </View>
                <Text style={styles.widgetMerchant}>
                  📍 {mockMerchant.name} ({mockMerchant.distanceM}m)
                </Text>
                <Text style={styles.widgetPattern}>{mockPrediction.patternSummary}</Text>
                <Text style={styles.widgetPredict}>
                  예상 지출 {mockPrediction.predictedAmount.toLocaleString()}원 · 예측
                  신뢰도 {mockPrediction.confidence}%
                </Text>
                <Pressable
                  style={styles.widgetCta}
                  onPress={() => {
                    setPhase('idle');
                    navigation.navigate('Chat');
                  }}
                >
                  <Text style={styles.widgetCtaText}>대화로 확인하기</Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.primaryDark} />
                </Pressable>
              </LinearGradient>
              <Pressable style={styles.dismiss} onPress={() => setPhase('idle')}>
                <Text style={styles.dismissText}>나중에</Text>
              </Pressable>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  brand: { fontSize: 14, fontWeight: '700', color: colors.primary, letterSpacing: 1 },
  greeting: { fontSize: 22, fontWeight: '700', color: colors.text, marginTop: 6, marginBottom: 20 },
  accountCard: { borderRadius: 20, padding: 20, marginBottom: 14 },
  accountLabel: { color: '#CFE0FF', fontSize: 13 },
  accountNo: { color: '#CFE0FF', fontSize: 12, marginTop: 4 },
  accountBalance: { color: '#fff', fontSize: 28, fontWeight: '700', marginTop: 10 },
  row: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  smallCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  smallCardLabel: { fontSize: 12, color: colors.textSub },
  smallCardValue: { fontSize: 16, fontWeight: '700', color: colors.text, marginTop: 6 },
  demoBox: {
    backgroundColor: '#FFF7ED',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFE3C2',
  },
  demoTitle: { fontWeight: '700', color: '#9A5B00', marginBottom: 6 },
  demoDesc: { fontSize: 12, color: '#9A5B00', lineHeight: 18, marginBottom: 14 },
  triggerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
  },
  triggerBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  dandiBox: {
    backgroundColor: '#0B1220',
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
  },
  dandiHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  dandiHeaderText: { flex: 1, marginLeft: 12 },
  dandiTitle: { color: '#fff', fontWeight: '700', fontSize: 14, marginBottom: 4 },
  dandiDesc: { color: '#8AA0D6', fontSize: 11, lineHeight: 16 },
  dandiStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  dandiStatLabel: { color: '#8AA0D6', fontSize: 11 },
  dandiStatValue: { color: '#F4C874', fontSize: 15, fontWeight: '700' },
  dandiTriggerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D2B57',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
  },
  dandiTriggerBtnText: { color: '#fff', fontWeight: '700', fontSize: 12, flexShrink: 1 },
  ttokdiBox: {
    backgroundColor: '#0E1F17',
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
  },
  ttokdiTitle: { color: '#fff', fontWeight: '700', fontSize: 14, marginBottom: 4 },
  ttokdiDesc: { color: '#7FCBA3', fontSize: 11, lineHeight: 16 },
  ttokdiStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  ttokdiStatLabel: { color: '#7FCBA3', fontSize: 11 },
  ttokdiStatValue: { color: '#6EE7A8', fontSize: 15, fontWeight: '700' },
  ttokdiTriggerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2EB87A',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
  },
  ttokdiTriggerBtnText: { color: '#fff', fontWeight: '700', fontSize: 12, flexShrink: 1 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  scanCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  scanTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 18 },
  widgetWrap: { paddingHorizontal: 16, paddingBottom: 30, alignItems: 'center' },
  widgetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginBottom: 10,
  },
  widgetCard: { width: '100%', borderRadius: 22, padding: 20 },
  widgetHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  widgetHeader: { color: '#FFD866', fontSize: 12, fontWeight: '700' },
  widgetMerchant: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 8 },
  widgetPattern: { color: '#D7E3FF', fontSize: 13, marginBottom: 4, lineHeight: 19 },
  widgetPredict: { color: '#D7E3FF', fontSize: 12, marginBottom: 16 },
  widgetCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 4,
  },
  widgetCtaText: { color: colors.primaryDark, fontWeight: '700', fontSize: 14 },
  dismiss: { marginTop: 14 },
  dismissText: { color: '#fff', fontSize: 13 },
});
