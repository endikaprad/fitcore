import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { colors } from '../../constants/colors';

interface MacroBarProps {
  label: string;
  current: number;
  target: number;
  color: string;
  unit?: string;
}

export function MacroBar({ label, current, target, color, unit = 'g' }: MacroBarProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(Math.min(current / target, 1), { duration: 600 });
  }, [current, target]);

  const barStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%` as any,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          <Text style={{ color }}>{Math.round(current)}</Text>
          <Text style={styles.target}>/{Math.round(target)}{unit}</Text>
        </Text>
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { backgroundColor: color }, barStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: 13, fontFamily: 'Inter_500Medium', color: colors.textSecondary },
  value: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  target: { color: colors.textMuted },
  track: { height: 4, borderRadius: 2, backgroundColor: colors.bgMuted },
  fill: { height: 4, borderRadius: 2 },
});
