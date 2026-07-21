import { Image, StyleSheet, View } from 'react-native';

export default function TtokdiMascot({ size = 96 }: { size?: number }) {
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Image
        source={require('../../assets/ttokdi-mascot.png')}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
});
