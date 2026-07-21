import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import DandiMascot from '../components/DandiMascot';
import { dandiSavings, dandiSpendingHistory } from '../data/mockDandi';

type Props = NativeStackScreenProps<RootStackParamList, 'DandiResult'>;

export default function DandiResultScreen({ navigation, route }: Props) {
  const { reconsidered } = route.params;
  const updatedTotalSaved = dandiSavings.totalSavedByDandi + dandiSpendingHistory.averagePerVisit;

  return (
    <View style={styles.screen}>
      <DandiMascot size={96} />

      {reconsidered ? (
        <>
          <Text style={styles.title}>잘 참으셨어요! 🎉</Text>
          <Text style={styles.subtitle}>
            단디 덕분에 오늘{' '}
            {dandiSpendingHistory.averagePerVisit.toLocaleString()}원을 아꼈어요.
          </Text>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>이번 달 단디 덕분에 아낀 금액</Text>
            <Text style={styles.statValue}>{updatedTotalSaved.toLocaleString()}원</Text>
            <Text style={styles.statSub}>
              총 {dandiSavings.timesReconsidered + 1}번 다시 생각했어요
            </Text>
          </View>

          <Pressable
            style={styles.primaryBtn}
            onPress={() => navigation.navigate('PrefilledForm')}
          >
            <Ionicons name="trending-up" size={18} color="#fff" />
            <Text style={styles.primaryBtnText}>아낀 돈, 매칭 그랜트 예적금에 넣기</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.title}>알겠어요!</Text>
          <Text style={styles.subtitle}>
            대신 다음에 비슷한 순간이 오면{'\n'}단디가 또 한 번 알려드릴게요.
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
    backgroundColor: '#0B1220',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: { color: '#fff', fontSize: 20, fontWeight: '700', marginTop: 20, marginBottom: 8 },
  subtitle: {
    color: '#C6D6F2',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 26,
  },
  statCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 24,
  },
  statLabel: { color: '#8AA0D6', fontSize: 12, marginBottom: 8 },
  statValue: { color: '#F4C874', fontSize: 26, fontWeight: '700' },
  statSub: { color: '#8AA0D6', fontSize: 11, marginTop: 8 },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B5ED7',
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 18,
    gap: 8,
    width: '100%',
    marginBottom: 14,
  },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 13, flexShrink: 1 },
  homeBtn: { paddingVertical: 12 },
  homeBtnText: { color: '#8AA0D6', fontSize: 13 },
});
