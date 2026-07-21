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
import {
  mockMerchant,
  mockPrediction,
  mockSubsidy,
  mockUser,
  pipelineSteps,
} from '../data/mock';

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
