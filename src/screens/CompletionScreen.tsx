import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { mockProduct, mockUser } from '../data/mock';

type Props = NativeStackScreenProps<RootStackParamList, 'Completion'>;

const updatedBalance = mockUser.mainAccountBalance - mockProduct.monthlyAmount;

export default function CompletionScreen({ navigation }: Props) {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark" size={40} color="#fff" />
        </View>
        <Text style={styles.title}>가입이 완료되었어요!</Text>
        <Text style={styles.subtitle}>
          iM뱅크 계열사 수신 계좌로{'\n'}1:1 매칭 그랜트 이체가 정상 처리되었습니다.
        </Text>

        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>상품명</Text>
            <Text style={styles.cardValue}>{mockProduct.productName}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>내 납입액</Text>
            <Text style={styles.cardValue}>{mockProduct.monthlyAmount.toLocaleString()}원</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>은행 매칭 그랜트</Text>
            <Text style={styles.cardValueAccent}>
              +{mockProduct.matchedAmount.toLocaleString()}원
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>소수점 주식 자동매수</Text>
            <Text style={styles.cardValue}>
              {mockProduct.fractionalStock.ticker} {mockProduct.fractionalStock.amount.toLocaleString()}원
            </Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>약정 기간</Text>
            <Text style={styles.cardValue}>{mockProduct.termMonths}개월</Text>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>iM뱅크 입출금 계좌 잔액</Text>
          <Text style={styles.balanceValue}>{updatedBalance.toLocaleString()}원</Text>
          <Text style={styles.balanceSub}>
            -{mockProduct.monthlyAmount.toLocaleString()}원 (예적금 자동이체)
          </Text>
        </View>

        <Pressable
          style={styles.homeBtn}
          onPress={() =>
            navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
          }
        >
          <Text style={styles.homeBtnText}>홈으로 돌아가기</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: 24, paddingTop: 60, alignItems: 'center' },
  successIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 8 },
  subtitle: {
    fontSize: 13,
    color: colors.textSub,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 26,
  },
  card: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardLabel: { fontSize: 12, color: colors.textSub },
  cardValue: { fontSize: 13, fontWeight: '600', color: colors.text },
  cardValueAccent: { fontSize: 13, fontWeight: '700', color: colors.accent },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 4 },
  balanceCard: {
    width: '100%',
    backgroundColor: colors.primaryDark,
    borderRadius: 16,
    padding: 18,
    marginBottom: 26,
  },
  balanceLabel: { color: '#CFE0FF', fontSize: 12 },
  balanceValue: { color: '#fff', fontSize: 24, fontWeight: '700', marginTop: 6 },
  balanceSub: { color: '#CFE0FF', fontSize: 11, marginTop: 4 },
  homeBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  homeBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
