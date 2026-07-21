import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import WoodyMascot from '../components/WoodyMascot';
import { woodySavedStats, woodyTopPolicy } from '../data/mockWoody';

type Props = NativeStackScreenProps<RootStackParamList, 'WoodyResult'>;

export default function WoodyResultScreen({ navigation }: Props) {
  return (
    <View style={styles.screen}>
      <WoodyMascot size={96} />
      <Text style={styles.title}>관심 정책에 저장했어요! 📌</Text>
      <Text style={styles.subtitle}>
        '{woodyTopPolicy.name}' 신청 마감 전에{'\n'}다시 알려드릴게요.
      </Text>

      <View style={styles.statCard}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>우디가 지금까지 찾아준 정책</Text>
          <Text style={styles.statValue}>{woodySavedStats.totalPoliciesFound}건</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>예상 누적 혜택 금액</Text>
          <Text style={styles.statValueAccent}>
            {woodySavedStats.totalEstimatedBenefit.toLocaleString()}원
          </Text>
        </View>
      </View>

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
  statValueAccent: { fontSize: 14, fontWeight: '700', color: '#6C4FD1' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 8 },
  homeBtn: { paddingVertical: 16 },
  homeBtnText: { color: colors.primary, fontSize: 13, fontWeight: '600' },
});
