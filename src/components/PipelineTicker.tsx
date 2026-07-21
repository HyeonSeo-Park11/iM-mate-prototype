import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

type Step = { id: string; label: string; service: string };

export default function PipelineTicker({
  steps,
  stepDelayMs = 550,
  onDone,
  variant = 'light',
}: {
  steps: Step[];
  stepDelayMs?: number;
  onDone?: () => void;
  variant?: 'light' | 'dark';
}) {
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    if (doneCount >= steps.length) {
      const t = setTimeout(() => onDone?.(), 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDoneCount((c) => c + 1), stepDelayMs);
    return () => clearTimeout(t);
  }, [doneCount, steps.length, stepDelayMs, onDone]);

  return (
    <View style={styles.container}>
      {steps.map((step, i) => {
        const isDone = i < doneCount;
        const isActive = i === doneCount;
        return (
          <View key={step.id} style={styles.row}>
            <View
              style={[
                styles.iconWrap,
                isDone && styles.iconWrapDone,
                isActive && styles.iconWrapActive,
              ]}
            >
              {isDone ? (
                <Ionicons name="checkmark" size={14} color="#fff" />
              ) : (
                <View style={[styles.dot, isActive && styles.dotActive]} />
              )}
            </View>
            <View style={styles.textWrap}>
              <Text style={[styles.service, variant === 'dark' && styles.serviceDark]}>
                {step.service}
              </Text>
              <Text
                style={[
                  styles.label,
                  variant === 'dark' && styles.labelDark,
                  isDone && (variant === 'dark' ? styles.labelDoneDark : styles.labelDone),
                ]}
              >
                {step.label}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  iconWrap: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#D9DEE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconWrapActive: { backgroundColor: colors.accent },
  iconWrapDone: { backgroundColor: colors.success },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff' },
  dotActive: { backgroundColor: '#fff' },
  textWrap: { flex: 1 },
  service: { fontSize: 11, color: colors.textSub, marginBottom: 2 },
  serviceDark: { color: '#8AA0D6' },
  label: { fontSize: 13, color: colors.text, fontWeight: '500' },
  labelDark: { color: '#E7ECFB' },
  labelDone: { color: colors.textSub },
  labelDoneDark: { color: '#8AA0D6' },
});
