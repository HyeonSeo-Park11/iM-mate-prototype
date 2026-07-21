import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import TtokdiMascot from '../components/TtokdiMascot';
import { ttokdiMerchant, ttokdiOrder, ttokdiResidence } from '../data/mockTtokdi';

type Props = NativeStackScreenProps<RootStackParamList, 'TtokdiNudge'>;

const cashbackAmount = Math.round((ttokdiOrder.amount * ttokdiMerchant.cashbackRate) / 100);

export default function TtokdiNudgeScreen({ navigation }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <TtokdiMascot size={84} />
        <Text style={styles.title}>최적 결제 안내</Text>
        <Text style={styles.body}>
          이 가게는 '{ttokdiResidence.localCurrencyName}' 등록 가맹점이에요.{'\n'}
          지원금 카드로 결제하면 {ttokdiMerchant.cashbackRate}% 추가 혜택이 붙어요.
        </Text>

        <View style={styles.compareRow}>
          <View style={styles.compareCol}>
            <Text style={styles.compareLabel}>현금 통장으로 결제</Text>
            <Text style={styles.compareAmount}>-{ttokdiOrder.amount.toLocaleString()}원</Text>
            <Text style={styles.compareSub}>추가 혜택 없음</Text>
          </View>
          <View style={[styles.compareCol, styles.compareColBest]}>
            <Text style={styles.compareLabelBest}>{ttokdiResidence.localCurrencyName}로 결제</Text>
            <Text style={styles.compareAmountBest}>-{ttokdiOrder.amount.toLocaleString()}원</Text>
            <Text style={styles.compareSubBest}>+{cashbackAmount.toLocaleString()}원 캐시백</Text>
          </View>
        </View>

        <Text style={styles.hint}>
          잔여 지원금 {ttokdiResidence.subsidyBalance.toLocaleString()}원 · 소멸 전에 먼저
          써보세요
        </Text>

        <Pressable
          style={styles.primaryBtn}
          onPress={() => navigation.replace('TtokdiResult', { usedSubsidy: true })}
        >
          <Ionicons name="card" size={18} color="#fff" />
          <Text style={styles.primaryBtnText}>
            {ttokdiResidence.localCurrencyName} 카드로 결제할게요
          </Text>
        </Pressable>
        <Pressable
          style={styles.secondaryBtn}
          onPress={() => navigation.replace('TtokdiResult', { usedSubsidy: false })}
        >
          <Text style={styles.secondaryBtnText}>그냥 현금으로 결제할게요</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: { fontSize: 18, fontWeight: '700', color: colors.text, marginTop: 16, marginBottom: 10 },
  body: {
    fontSize: 13,
    color: colors.textSub,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  compareRow: { flexDirection: 'row', width: '100%', gap: 10, marginBottom: 16 },
  compareCol: {
    flex: 1,
    backgroundColor: colors.bg,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  compareColBest: { backgroundColor: '#E8F8EF', borderColor: '#B7EBC9' },
  compareLabel: { fontSize: 11, color: colors.textSub, marginBottom: 8, textAlign: 'center' },
  compareLabelBest: {
    fontSize: 11,
    color: '#12805A',
    marginBottom: 8,
    fontWeight: '700',
    textAlign: 'center',
  },
  compareAmount: { fontSize: 15, fontWeight: '700', color: colors.text },
  compareAmountBest: { fontSize: 15, fontWeight: '700', color: '#12805A' },
  compareSub: { fontSize: 10, color: colors.textSub, marginTop: 6 },
  compareSubBest: { fontSize: 10, color: '#12805A', marginTop: 6, fontWeight: '700' },
  hint: { fontSize: 11, color: colors.textSub, marginBottom: 20, textAlign: 'center' },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2EB87A',
    borderRadius: 14,
    paddingVertical: 15,
    width: '100%',
    gap: 8,
    marginBottom: 8,
  },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 13, flexShrink: 1 },
  secondaryBtn: { paddingVertical: 12 },
  secondaryBtnText: { color: colors.textSub, fontSize: 13 },
});
