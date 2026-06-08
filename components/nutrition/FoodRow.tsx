import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Trash } from 'phosphor-react-native';
import { colors } from '../../constants/colors';

export interface FoodEntry {
  id: number;
  name: string;
  brand?: string;
  quantity: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FoodRowProps {
  entry: FoodEntry;
  onDelete: () => void;
}

export function FoodRow({ entry, onDelete }: FoodRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{entry.name}</Text>
        <Text style={styles.sub}>{entry.quantity}g{entry.brand ? ` - ${entry.brand}` : ''}</Text>
        <View style={styles.macros}>
          <Text style={[styles.macro, styles.protein]}>P: {Math.round(entry.protein)}g</Text>
          <Text style={[styles.macro, styles.carbs]}>C: {Math.round(entry.carbs)}g</Text>
          <Text style={[styles.macro, styles.fat]}>G: {Math.round(entry.fat)}g</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.kcal}>{Math.round(entry.calories)}</Text>
        <Text style={styles.kcalLabel}>kcal</Text>
        <TouchableOpacity onPress={onDelete} hitSlop={8}>
          <Trash size={16} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 12,
  },
  info: { flex: 1, gap: 3 },
  name: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: colors.textPrimary,
  },
  sub: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: colors.textSecondary,
  },
  macros: { flexDirection: 'row', gap: 8, marginTop: 2 },
  macro: { fontSize: 11, fontFamily: 'Inter_500Medium' },
  protein: { color: colors.info },
  carbs: { color: colors.warning },
  fat: { color: colors.success },
  right: { alignItems: 'center', gap: 2 },
  kcal: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: colors.textPrimary,
  },
  kcalLabel: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    color: colors.textMuted,
  },
});
