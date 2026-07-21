import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import PipelineTicker from '../components/PipelineTicker';
import WoodyMascot from '../components/WoodyMascot';
import { woodyProfile, woodyRagSteps } from '../data/mockWoody';

type Props = NativeStackScreenProps<RootStackParamList, 'WoodyScan'>;

export default function WoodyScanScreen({ navigation }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <WoodyMascot size={72} />
        <Text style={styles.title}>우디가 맞춤 정책을 찾고 있어요</Text>
        <View style={styles.profileRow}>
          <View style={styles.profileChip}>
            <Text style={styles.profileChipText}>만 {woodyProfile.age}세</Text>
          </View>
          <View style={styles.profileChip}>
            <Text style={styles.profileChipText}>{woodyProfile.region}</Text>
          </View>
          <View style={styles.profileChip}>
            <Text style={styles.profileChipText}>{woodyProfile.incomeBracket}</Text>
          </View>
        </View>
      </View>

      <View style={styles.tickerCard}>
        <PipelineTicker
          steps={woodyRagSteps}
          onDone={() => navigation.replace('WoodyChat')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 24, paddingTop: 70 },
  header: { alignItems: 'center', marginBottom: 28 },
  title: { fontSize: 16, fontWeight: '700', color: colors.text, marginTop: 14, marginBottom: 14 },
  profileRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  profileChip: {
    backgroundColor: '#EFE9FF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  profileChipText: { fontSize: 11, color: '#6C4FD1', fontWeight: '600' },
  tickerCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
