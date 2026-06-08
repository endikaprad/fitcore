import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import { MotiView } from 'moti';
import { ArrowLeft, Plus } from 'phosphor-react-native';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { MacroBar } from '../../components/nutrition/MacroBar';
import { colors } from '../../constants/colors';

export default function FoodDetailScreen() {
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState('100');

  const food = {
    name: 'Pollo a la plancha',
    brand: 'Generico',
    calories100: 165,
    protein100: 31,
    carbs100: 0,
    fat100: 3.6,
    fiber100: 0,
  };

  const qty = parseFloat(quantity) || 0;
  const factor = qty / 100;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle nutricional</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220 }}>
          <Text style={styles.foodName}>{food.name}</Text>
          <Text style={styles.foodBrand}>{food.brand}</Text>
        </MotiView>

        <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220, delay: 60 }}>
          <View style={styles.quantityRow}>
            <Input
              label="Cantidad (g)"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              containerStyle={{ flex: 1 }}
            />
          </View>
        </MotiView>

        <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220, delay: 100 }}>
          <View style={styles.kcalCard}>
            <Text style={styles.kcalNum}>{Math.round(food.calories100 * factor)}</Text>
            <Text style={styles.kcalLabel}>kcal</Text>
          </View>
        </MotiView>

        <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220, delay: 140 }}>
          <View style={styles.macrosCard}>
            <MacroBar label="Proteina" current={food.protein100 * factor} target={50} color={colors.info} />
            <MacroBar label="Carbohidratos" current={food.carbs100 * factor} target={200} color={colors.warning} />
            <MacroBar label="Grasa" current={food.fat100 * factor} target={65} color={colors.success} />
            {food.fiber100 > 0 && (
              <MacroBar label="Fibra" current={food.fiber100 * factor} target={25} color={colors.textSecondary} />
            )}
          </View>
        </MotiView>

        <View style={styles.nutritionTable}>
          <Text style={styles.tableTitle}>Informacion nutricional por 100g</Text>
          {[
            { label: 'Calorias', value: `${food.calories100} kcal` },
            { label: 'Proteina', value: `${food.protein100} g` },
            { label: 'Carbohidratos', value: `${food.carbs100} g` },
            { label: 'Grasa total', value: `${food.fat100} g` },
            { label: 'Fibra', value: `${food.fiber100} g` },
          ].map((row, i) => (
            <View key={row.label} style={[styles.tableRow, i > 0 && styles.tableRowBorder]}>
              <Text style={styles.tableLabel}>{row.label}</Text>
              <Text style={styles.tableValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        <Button
          label="Anadir a la comida"
          onPress={() => router.back()}
          size="lg"
          leftIcon={<Plus size={18} color={colors.bgBase} weight="bold" />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBase },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: colors.textPrimary },
  scroll: { flex: 1 },
  content: { padding: 20, gap: 16, paddingBottom: 40 },
  foodName: { fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold', color: colors.textPrimary },
  foodBrand: { fontSize: 14, fontFamily: 'Inter_400Regular', color: colors.textSecondary, marginTop: 2 },
  quantityRow: { flexDirection: 'row', gap: 12 },
  kcalCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.bgMuted,
    padding: 24,
    alignItems: 'center',
    gap: 4,
  },
  kcalNum: { fontSize: 56, fontFamily: 'SpaceGrotesk_800ExtraBold', color: colors.primary, lineHeight: 60 },
  kcalLabel: { fontSize: 15, fontFamily: 'Inter_400Regular', color: colors.textSecondary },
  macrosCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.bgMuted,
    padding: 16,
    gap: 16,
  },
  nutritionTable: {
    backgroundColor: colors.bgSurface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.bgMuted,
    overflow: 'hidden',
    padding: 16,
    gap: 0,
  },
  tableTitle: { fontSize: 12, fontFamily: 'Inter_600SemiBold', color: colors.textMuted, marginBottom: 12, letterSpacing: 0.3 },
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  tableRowBorder: { borderTopWidth: 1, borderTopColor: colors.bgMuted },
  tableLabel: { fontSize: 14, fontFamily: 'Inter_400Regular', color: colors.textPrimary },
  tableValue: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: colors.textSecondary },
});
