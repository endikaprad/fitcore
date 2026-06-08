import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { CaretDown, Plus } from 'phosphor-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { FoodRow, FoodEntry } from './FoodRow';
import { colors } from '../../constants/colors';

interface MealSectionProps {
  title: string;
  entries: FoodEntry[];
  onAddFood: () => void;
  onDeleteEntry: (id: number) => void;
}

export function MealSection({ title, entries, onAddFood, onDeleteEntry }: MealSectionProps) {
  const [expanded, setExpanded] = useState(true);
  const rotate = useSharedValue(expanded ? 1 : 0);
  const totalKcal = entries.reduce((sum, e) => sum + e.calories, 0);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value * 180}deg` }],
  }));

  function toggle() {
    const next = !expanded;
    rotate.value = withTiming(next ? 1 : 0, { duration: 200 });
    setExpanded(next);
  }

  return (
    <View style={styles.section}>
      <TouchableOpacity style={styles.header} onPress={toggle} activeOpacity={0.8}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.headerRight}>
          <Text style={styles.kcalSum}>{Math.round(totalKcal)} kcal</Text>
          <Animated.View style={chevronStyle}>
            <CaretDown size={16} color={colors.textSecondary} />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {expanded && (
        <>
          {entries.length === 0 && (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Sin alimentos registrados</Text>
            </View>
          )}
          {entries.map((entry) => (
            <View key={entry.id}>
              <FoodRow entry={entry} onDelete={() => onDeleteEntry(entry.id)} />
              <View style={styles.divider} />
            </View>
          ))}
          <TouchableOpacity style={styles.addBtn} onPress={onAddFood}>
            <Plus size={16} color={colors.primary} />
            <Text style={styles.addText}>Anadir alimento</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.bgSurface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.bgMuted,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: colors.textPrimary,
  },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  kcalSum: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: colors.textSecondary,
  },
  empty: { paddingHorizontal: 12, paddingBottom: 8 },
  emptyText: { fontSize: 13, fontFamily: 'Inter_400Regular', color: colors.textMuted },
  divider: { height: 1, backgroundColor: colors.bgMuted, marginHorizontal: 12 },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary + '30',
    backgroundColor: colors.primary + '08',
  },
  addText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: colors.primary,
  },
});
