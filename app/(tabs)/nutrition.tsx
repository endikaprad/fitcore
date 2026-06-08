import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { MagnifyingGlass } from 'phosphor-react-native';
import { MacroRings } from '../../components/nutrition/MacroRings';
import { MacroBar } from '../../components/nutrition/MacroBar';
import { MealSection } from '../../components/nutrition/MealSection';
import { Card } from '../../components/ui/Card';
import { useNutritionStore } from '../../store/nutritionStore';
import { colors } from '../../constants/colors';

const MEAL_LABELS: Record<string, string> = {
  breakfast: 'Desayuno',
  mid_morning: 'Media manana',
  lunch: 'Comida',
  snack: 'Merienda',
  dinner: 'Cena',
};

export default function NutritionScreen() {
  const { goals, totals, meals, addFood, removeFood } = useNutritionStore();

  const proteinTarget = (goals.caloriesTarget * goals.proteinPct / 100) / 4;
  const carbsTarget = (goals.caloriesTarget * goals.carbsPct / 100) / 4;
  const fatTarget = (goals.caloriesTarget * goals.fatPct / 100) / 9;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 300 }}>
          <View style={styles.header}>
            <Text style={styles.title}>Nutricion</Text>
            <TouchableOpacity style={styles.searchBtn}>
              <MagnifyingGlass size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </MotiView>

        <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220, delay: 60 }}>
          <MacroRings
            calories={{ current: totals.calories, target: goals.caloriesTarget }}
            protein={{ current: totals.protein, target: proteinTarget }}
            carbs={{ current: totals.carbs, target: carbsTarget }}
            fat={{ current: totals.fat, target: fatTarget }}
          />
        </MotiView>

        <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220, delay: 120 }}>
          <Card style={styles.macroCard}>
            <MacroBar label="Proteina" current={totals.protein} target={proteinTarget} color={colors.info} />
            <MacroBar label="Carbohidratos" current={totals.carbs} target={carbsTarget} color={colors.warning} />
            <MacroBar label="Grasa" current={totals.fat} target={fatTarget} color={colors.success} />
          </Card>
        </MotiView>

        {(Object.keys(MEAL_LABELS) as Array<keyof typeof meals>).map((meal, i) => (
          <MotiView
            key={meal}
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 220, delay: 180 + i * 50 }}
          >
            <MealSection
              title={MEAL_LABELS[meal]}
              entries={meals[meal]}
              onAddFood={() => {}}
              onDeleteEntry={(id) => removeFood(meal, id)}
            />
          </MotiView>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBase },
  scroll: { flex: 1 },
  content: { padding: 20, gap: 16, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 28, fontFamily: 'SpaceGrotesk_700Bold', color: colors.textPrimary },
  searchBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.bgSurface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.bgMuted,
  },
  macroCard: { gap: 16 },
});
