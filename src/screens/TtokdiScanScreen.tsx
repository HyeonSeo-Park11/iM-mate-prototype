import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import PipelineTicker from '../components/PipelineTicker';
import TtokdiMascot from '../components/TtokdiMascot';
import { ttokdiMatchSteps, ttokdiMerchant } from '../data/mockTtokdi';

type Props = NativeStackScreenProps<RootStackParamList, 'TtokdiScan'>;

export default function TtokdiScanScreen({ navigation }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TtokdiMascot size={72} />
        <Text style={styles.title}>똑디가 최적 결제를 찾고 있어요</Text>
        <Text style={styles.zone}>
          📍 '{ttokdiMerchant.name}' ({ttokdiMerchant.distanceM}m)
        </Text>
      </View>

      <View style={styles.tickerCard}>
        <PipelineTicker
          steps={ttokdiMatchSteps}
          onDone={() => navigation.replace('TtokdiNudge')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 24, paddingTop: 70 },
  header: { alignItems: 'center', marginBottom: 28 },
  title: { fontSize: 16, fontWeight: '700', color: colors.text, marginTop: 14 },
  zone: { fontSize: 12, color: colors.textSub, marginTop: 8 },
  tickerCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
