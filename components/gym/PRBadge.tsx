import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, withSpring, withSequence, withTiming } from 'react-native-reanimated';
import { Trophy } from 'phosphor-react-native';
import { colors } from '../../constants/colors';

export function PRBadge() {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 });
    scale.value = withSequence(
      withSpring(1.1, { damping: 8, stiffness: 300 }),
      withSpring(1, { damping: 15, stiffness: 300 })
    );
  }, []);

  return (
    <Animated.View style={[styles.badge, { transform: [{ scale }], opacity }]}>
      <Trophy size={14} weight="fill" color={colors.bgBase} />
      <Text style={styles.text}>Nuevo Record</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9999,
  },
  text: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
    color: colors.bgBase,
  },
});
