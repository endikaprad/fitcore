import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Check } from 'phosphor-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { colors } from '../../constants/colors';

export interface SetData {
  setNumber: number;
  weight: string;
  reps: string;
  isWarmup: boolean;
  completed: boolean;
  isPR?: boolean;
}

interface SetRowProps {
  set: SetData;
  onWeightChange: (val: string) => void;
  onRepsChange: (val: string) => void;
  onToggleComplete: () => void;
  suggestedWeight?: number;
}

export function SetRow({ set, onWeightChange, onRepsChange, onToggleComplete, suggestedWeight }: SetRowProps) {
  const bg = useSharedValue(set.completed ? 1 : 0);

  const rowStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(232, 255, 71, ${bg.value * 0.06})`,
  }));

  function handleToggle() {
    bg.value = withTiming(set.completed ? 0 : 1, { duration: 200 });
    onToggleComplete();
  }

  return (
    <Animated.View style={[styles.row, rowStyle]}>
      <View style={styles.setNum}>
        {set.isWarmup ? (
          <Text style={styles.warmupLabel}>C</Text>
        ) : (
          <Text style={styles.setNumText}>{set.setNumber}</Text>
        )}
      </View>

      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          value={set.weight}
          onChangeText={onWeightChange}
          keyboardType="numeric"
          placeholder={suggestedWeight ? String(suggestedWeight) : '0'}
          placeholderTextColor={suggestedWeight ? colors.primary + '80' : colors.textMuted}
          selectionColor={colors.primary}
        />
        <Text style={styles.unit}>kg</Text>
      </View>

      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          value={set.reps}
          onChangeText={onRepsChange}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={colors.textMuted}
          selectionColor={colors.primary}
        />
        <Text style={styles.unit}>reps</Text>
      </View>

      <TouchableOpacity
        style={[styles.checkBtn, set.completed && styles.checkBtnDone]}
        onPress={handleToggle}
      >
        <Check size={16} weight="bold" color={set.completed ? colors.bgBase : colors.textMuted} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    borderRadius: 8,
  },
  setNum: {
    width: 28,
    alignItems: 'center',
  },
  setNumText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: colors.textSecondary,
  },
  warmupLabel: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
    color: colors.warning,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgElevated,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.bgMuted,
    paddingHorizontal: 10,
    height: 48,
    gap: 4,
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: colors.textPrimary,
    textAlign: 'center',
    paddingVertical: 0,
  },
  unit: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: colors.textMuted,
  },
  checkBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.bgMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBtnDone: {
    backgroundColor: colors.primary,
  },
});
