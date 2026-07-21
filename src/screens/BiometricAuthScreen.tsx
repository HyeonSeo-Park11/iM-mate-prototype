import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'BiometricAuth'>;

type Stage = 'ready' | 'scanning' | 'success';

export default function BiometricAuthScreen({ navigation }: Props) {
  const [stage, setStage] = useState<Stage>('ready');
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (stage !== 'scanning') return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.25,
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 500,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    const t = setTimeout(() => setStage('success'), 1700);
    return () => {
      loop.stop();
      clearTimeout(t);
    };
  }, [stage, pulse]);

  useEffect(() => {
    if (stage !== 'success') return;
    const t = setTimeout(() => navigation.replace('Completion'), 900);
    return () => clearTimeout(t);
  }, [stage, navigation]);

  return (
    <View style={styles.screen}>
      <View style={styles.center}>
        <Animated.View
          style={[
            styles.ringOuter,
            stage === 'scanning' && { transform: [{ scale: pulse }] },
          ]}
        >
          <View
            style={[
              styles.ringInner,
              stage === 'success' && styles.ringInnerSuccess,
            ]}
          >
            <Ionicons
              name={stage === 'success' ? 'checkmark' : 'finger-print'}
              size={56}
              color="#fff"
            />
          </View>
        </Animated.View>

        <Text style={styles.title}>
          {stage === 'ready' && '본인 확인이 필요해요'}
          {stage === 'scanning' && '지문을 인식하고 있어요...'}
          {stage === 'success' && '인증 완료!'}
        </Text>
        <Text style={styles.subtitle}>
          {stage !== 'success'
            ? '사전 기입된 신청 내용에 서명하기 위해\n생체 인증을 진행합니다.'
            : '최종 서명이 완료되었습니다.'}
        </Text>

        {stage === 'ready' && (
          <Pressable style={styles.btn} onPress={() => setStage('scanning')}>
            <Text style={styles.btnText}>지문 센서에 손가락 올리기</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.primaryDark },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  ringOuter: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  ringInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringInnerSuccess: { backgroundColor: colors.success },
  title: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 10 },
  subtitle: {
    color: '#C6D6F2',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  btn: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  btnText: { color: colors.primaryDark, fontWeight: '700', fontSize: 14 },
});
