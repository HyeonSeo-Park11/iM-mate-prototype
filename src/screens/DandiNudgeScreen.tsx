import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import DandiMascot from '../components/DandiMascot';
import { dandiMerchant, dandiSpendingHistory } from '../data/mockDandi';

type Props = NativeStackScreenProps<RootStackParamList, 'DandiNudge'>;

export default function DandiNudgeScreen({ navigation }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.lockDim} />
      <View style={styles.card}>
        <DandiMascot size={84} />
        <Text style={styles.title}>1초만 생각해봐요</Text>
        <Text style={styles.body}>
          지금 '{dandiMerchant.name}' 근처예요.{'\n'}이번 달 벌써{' '}
          {dandiSpendingHistory.visitsThisMonth}번,{' '}
          {dandiSpendingHistory.totalSpentThisMonth.toLocaleString()}원 쓰셨어요.
        </Text>

        <Pressable
          style={styles.primaryBtn}
          onPress={() => navigation.replace('DandiResult', { reconsidered: true })}
        >
          <Text style={styles.primaryBtnText}>잠깐, 다시 생각해볼게요</Text>
        </Pressable>
        <Pressable
          style={styles.secondaryBtn}
          onPress={() => navigation.replace('DandiResult', { reconsidered: false })}
        >
          <Text style={styles.secondaryBtnText}>그래도 결제할게요</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#05070F',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  lockDim: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.35)' },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#111A33',
    borderRadius: 24,
    padding: 26,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  title: { color: '#fff', fontSize: 19, fontWeight: '700', marginTop: 18, marginBottom: 10 },
  body: {
    color: '#C6D6F2',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#F4C874',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryBtnText: { color: '#0B1633', fontWeight: '700', fontSize: 14 },
  secondaryBtn: {
    width: '100%',
    paddingVertical: 13,
    alignItems: 'center',
  },
  secondaryBtnText: { color: '#8AA0D6', fontSize: 13 },
});
