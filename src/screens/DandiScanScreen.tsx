import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import PipelineTicker from '../components/PipelineTicker';
import DandiMascot from '../components/DandiMascot';
import { dandiMerchant, dandiScanSteps } from '../data/mockDandi';

type Props = NativeStackScreenProps<RootStackParamList, 'DandiScan'>;

export default function DandiScanScreen({ navigation }: Props) {
  const [ready, setReady] = useState(false);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <View style={styles.lockHeader}>
        <DandiMascot size={56} />
        <Text style={styles.clock}>19:42</Text>
        <Text style={styles.date}>7월 21일 금요일</Text>
        <Text style={styles.zone}>
          📍 '{dandiMerchant.name}' 반경 {dandiMerchant.distanceM}m
        </Text>
      </View>

      <View style={styles.tickerCard}>
        <Text style={styles.tickerTitle}>
          {ready ? 'Trigger Ready · 화면 켬 이벤트 대기 중' : '단디 저전력 분석 진행 중'}
        </Text>
        <PipelineTicker
          steps={dandiScanSteps}
          variant="dark"
          onDone={() => setReady(true)}
        />
      </View>

      {ready && (
        <View style={styles.readyBox}>
          <Ionicons name="lock-closed" size={22} color="#8AA0D6" />
          <Text style={styles.readyText}>
            이제 화면을 껐다가 켜면{'\n'}단디가 잠금화면 위에 나타나요.
          </Text>
          <Pressable
            style={styles.unlockBtn}
            onPress={() => navigation.replace('DandiNudge')}
          >
            <Ionicons name="phone-portrait" size={18} color="#0B1633" />
            <Text style={styles.unlockBtnText}>화면 켜기 시뮬레이션 (USER_PRESENT)</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0B1220' },
  scrollContent: { padding: 24, paddingTop: 60, paddingBottom: 50 },
  lockHeader: { alignItems: 'center', marginBottom: 36 },
  clock: { color: '#fff', fontSize: 44, fontWeight: '300', marginTop: 14 },
  date: { color: '#8AA0D6', fontSize: 13, marginTop: 4 },
  zone: { color: '#BFD2FF', fontSize: 12, marginTop: 14 },
  tickerCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tickerTitle: { color: '#fff', fontSize: 14, fontWeight: '700', marginBottom: 18 },
  readyBox: { alignItems: 'center', marginTop: 40 },
  readyText: {
    color: '#C6D6F2',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 24,
  },
  unlockBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4C874',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 8,
  },
  unlockBtnText: { color: '#0B1633', fontWeight: '700', fontSize: 13 },
});
