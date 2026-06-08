import { View, Text, StyleSheet } from 'react-native';
import { ProgressRing } from '../ui/ProgressRing';
import { colors } from '../../constants/colors';

interface MacroRingsProps {
  calories: { current: number; target: number };
  protein: { current: number; target: number };
  carbs: { current: number; target: number };
  fat: { current: number; target: number };
}

export function MacroRings({ calories, protein, carbs, fat }: MacroRingsProps) {
  const calProgress = calories.current / calories.target;
  const isOver = calProgress > 1;
  const remaining = calories.target - calories.current;

  return (
    <View style={styles.container}>
      <ProgressRing
        progress={Math.min(calProgress, 1)}
        size={200}
        strokeWidth={14}
        color={isOver ? colors.danger : colors.primary}
      >
        <View style={styles.center}>
          <Text style={[styles.kcalNum, isOver && styles.kcalOver]}>
            {Math.abs(remaining)}
          </Text>
          <Text style={styles.kcalLabel}>
            {isOver ? 'excedidas' : 'kcal restantes'}
          </Text>
          <Text style={styles.kcalSub}>de {calories.target} kcal</Text>
        </View>
      </ProgressRing>

      <View style={styles.macros}>
        <MacroRing label="Proteina" value={protein.current} target={protein.target} color={colors.info} unit="g" />
        <MacroRing label="Carbos" value={carbs.current} target={carbs.target} color={colors.warning} unit="g" />
        <MacroRing label="Grasa" value={fat.current} target={fat.target} color={colors.success} unit="g" />
      </View>
    </View>
  );
}

function MacroRing({ label, value, target, color, unit }: { label: string; value: number; target: number; color: string; unit: string }) {
  return (
    <View style={styles.macroItem}>
      <ProgressRing progress={value / target} size={68} strokeWidth={6} color={color}>
        <Text style={[styles.macroVal, { color }]}>{Math.round(value)}</Text>
      </ProgressRing>
      <Text style={styles.macroLabel}>{label}</Text>
      <Text style={styles.macroTarget}>{Math.round(target)}{unit}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 24 },
  center: { alignItems: 'center', gap: 2 },
  kcalNum: {
    fontSize: 44,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: colors.textPrimary,
    lineHeight: 48,
  },
  kcalOver: { color: colors.danger },
  kcalLabel: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  kcalSub: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: colors.textMuted,
  },
  macros: { flexDirection: 'row', gap: 24 },
  macroItem: { alignItems: 'center', gap: 6 },
  macroVal: {
    fontSize: 15,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  macroLabel: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: colors.textSecondary,
  },
  macroTarget: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: colors.textMuted,
  },
});
