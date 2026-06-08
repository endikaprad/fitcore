import { create } from 'zustand';
import { FoodEntry } from '../components/nutrition/FoodRow';

type MealType = 'breakfast' | 'mid_morning' | 'lunch' | 'snack' | 'dinner';

interface NutritionGoals {
  caloriesTarget: number;
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
}

interface NutritionStore {
  date: string;
  goals: NutritionGoals;
  meals: Record<MealType, FoodEntry[]>;
  totals: { calories: number; protein: number; carbs: number; fat: number };

  addFood: (meal: MealType, entry: FoodEntry) => void;
  removeFood: (meal: MealType, id: number) => void;
  setGoals: (goals: NutritionGoals) => void;
}

function calcTotals(meals: Record<MealType, FoodEntry[]>) {
  let calories = 0, protein = 0, carbs = 0, fat = 0;
  Object.values(meals).forEach((entries) => {
    entries.forEach((e) => {
      calories += e.calories;
      protein += e.protein;
      carbs += e.carbs;
      fat += e.fat;
    });
  });
  return { calories, protein, carbs, fat };
}

const emptyMeals: Record<MealType, FoodEntry[]> = {
  breakfast: [],
  mid_morning: [],
  lunch: [],
  snack: [],
  dinner: [],
};

export const useNutritionStore = create<NutritionStore>((set, get) => ({
  date: new Date().toISOString().split('T')[0],
  goals: { caloriesTarget: 2000, proteinPct: 30, carbsPct: 40, fatPct: 30 },
  meals: emptyMeals,
  totals: { calories: 0, protein: 0, carbs: 0, fat: 0 },

  addFood: (meal, entry) => set((s) => {
    const meals = { ...s.meals, [meal]: [...s.meals[meal], entry] };
    return { meals, totals: calcTotals(meals) };
  }),

  removeFood: (meal, id) => set((s) => {
    const meals = { ...s.meals, [meal]: s.meals[meal].filter((e) => e.id !== id) };
    return { meals, totals: calcTotals(meals) };
  }),

  setGoals: (goals) => set({ goals }),
}));
