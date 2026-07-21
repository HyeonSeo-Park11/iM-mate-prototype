import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import TtokdiMascot from '../components/TtokdiMascot';
import {
  ttokdiMerchant,
  ttokdiOrder,
  ttokdiResidence,
  ttokdiSavings,
} from '../data/mockTtokdi';

type Props = NativeStackScreenProps<RootStackParamList, 'TtokdiResult'>;

const cashbackAmount = Math.round((ttokdiOrder.amount * ttokdiMerchant.cashbackRate) / 100);
const updatedSubsidyBalance = ttokdiResidence.subsidyBalance - ttokdiOrder.amount;
const updatedTotalSaved = ttokdiSavings.totalSavedByTtokdi + cashbackAmount;

export default function TtokdiResultScreen({ navigation, route }: Props) {
  const { usedSubsidy } = route.params;

  return (
    <View style={styles.screen}>
      <TtokdiMascot size={96} />

      {usedSubsidy ? (
        <>
          <Text style={styles.title}>잘하셨어요! 🎉</Text>
          <Text style={styles.subtitle}>
            {ttokdiResidence.localCurrencyName}로 결제해서 {cashbackAmount.toLocaleString()}
            원 캐시백을 받았어요.
          </Text>

          <View style={styles.statCard}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>남은 지원금 잔액</Text>
              <Text style={styles.statValue}>{updatedSubsidyBalance.toLocaleString()}원</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>이번 달 똑디 덕분에 아낀 금액</Text>
              <Text style={styles.statValueAccent}>
                {updatedTotalSaved.toLocaleString()}원
              </Text>
            </View>
          </View>

          <Text style={styles.footnote}>
            잊고 방치되던 지원금을 먼저 소진해서{'\n'}소멸되지 않고 알차게 쓰였어요.
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>알겠어요!</Text>
          <Text style={styles.subtitle}>
            다음에 이 가게에 오시면{'\n'}지원금 카드부터 먼저 써보면 더 아낄 수 있어요.
          </Text>
        </>
      )}

      <Pressable
        style={styles.homeBtn}
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
      >
        <Text style={styles.homeBtnText}>홈으로 돌아가기</Text>
      </Pressable>
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
  title: { fontSize: 20, fontWeight: '700', color: colors.text, marginTop: 20, marginBottom: 8 },
  subtitle: {
    fontSize: 13,
    color: colors.textSub,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  statCard: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  statLabel: { fontSize: 12, color: colors.textSub },
  statValue: { fontSize: 14, fontWeight: '700', color: colors.text },
  statValueAccent: { fontSize: 14, fontWeight: '700', color: '#12805A' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 8 },
  footnote: {
    fontSize: 11,
    color: colors.textSub,
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 10,
  },
  homeBtn: { paddingVertical: 16 },
  homeBtnText: { color: colors.primary, fontSize: 13, fontWeight: '600' },
});
