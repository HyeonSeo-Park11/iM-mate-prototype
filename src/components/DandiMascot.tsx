import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function DandiMascot({ size = 96 }: { size?: number }) {
  const penguinSize = size * 0.56;
  const piggySize = size * 0.4;
  const sparkleSize = size * 0.16;

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <LinearGradient
        colors={['#0B1633', '#122A5C']}
        style={[styles.orb, { width: size, height: size, borderRadius: size / 2 }]}
      >
        <Text style={{ fontSize: penguinSize }}>🐧</Text>
        <View
          style={[
            styles.piggyBadge,
            {
              width: piggySize,
              height: piggySize,
              borderRadius: piggySize / 2,
              right: size * 0.02,
              bottom: size * 0.02,
            },
          ]}
        >
          <Text style={{ fontSize: piggySize * 0.62 }}>🐷</Text>
        </View>
        <Text style={[styles.sparkle, { fontSize: sparkleSize, top: size * 0.06, left: size * 0.08 }]}>
          ✦
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  orb: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  piggyBadge: {
    position: 'absolute',
    backgroundColor: '#F4C874',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0B1633',
  },
  sparkle: {
    position: 'absolute',
    color: '#BFD2FF',
  },
});
