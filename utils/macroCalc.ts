export interface FoodNutrition {
  calories100: number;
  protein100: number;
  carbs100: number;
  fat100: number;
  fiber100?: number;
}

export function calcMacros(food: FoodNutrition, quantityG: number) {
  const factor = quantityG / 100;
  return {
    calories: Math.round(food.calories100 * factor * 10) / 10,
    protein: Math.round(food.protein100 * factor * 10) / 10,
    carbs: Math.round(food.carbs100 * factor * 10) / 10,
    fat: Math.round(food.fat100 * factor * 10) / 10,
    fiber: food.fiber100 ? Math.round(food.fiber100 * factor * 10) / 10 : 0,
  };
}

export function goalGrams(caloriesTarget: number, proteinPct: number, carbsPct: number, fatPct: number) {
  return {
    protein: Math.round((caloriesTarget * proteinPct / 100) / 4),
    carbs: Math.round((caloriesTarget * carbsPct / 100) / 4),
    fat: Math.round((caloriesTarget * fatPct / 100) / 9),
  };
}
