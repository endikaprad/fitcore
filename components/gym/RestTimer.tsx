import { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ProgressRing } from '../ui/ProgressRing';
import { colors } from '../../constants/colors';

interface RestTimerProps {
  seconds: number;
  totalSeconds: number;
  onSkip: () => void;
  onAddTime: () => void;
}

export function RestTimer({ seconds, totalSeconds, onSkip, onAddTime }: RestTimerProps) {
  const progress = 1 - seconds / totalSeconds;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <View style={styles.container}>
      <ProgressRing progress={progress} size={120} strokeWidth={8} color={colors.primary}>
        <Text style={styles.time}>
          {mins > 0 ? `${mins}:${String(secs).padStart(2, '0')}` : String(secs)}
        </Text>
        <Text style={styles.label}>descanso</Text>
      </ProgressRing>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.addBtn} onPress={onAddTime}>
          <Text style={styles.addBtnText}>+30s</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipBtn} onPress={onSkip}>
          <Text style={styles.skipBtnText}>Saltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 16,
    paddingVertical: 20,
  },
  time: {
    fontSize: 28,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: colors.textPrimary,
  },
  label: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  addBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.bgMuted,
  },
  addBtnText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: colors.textPrimary,
  },
  skipBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: colors.primary,
  },
  skipBtnText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: colors.bgBase,
  },
});
