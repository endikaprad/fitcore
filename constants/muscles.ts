export const MuscleGroup = {
  CHEST: 'chest',
  BACK: 'back',
  LEGS: 'legs',
  SHOULDERS: 'shoulders',
  ARMS: 'arms',
  CORE: 'core',
} as const;

export type MuscleGroupType = typeof MuscleGroup[keyof typeof MuscleGroup];

export const muscleLabels: Record<MuscleGroupType, string> = {
  chest: 'Pecho',
  back: 'Espalda',
  legs: 'Piernas',
  shoulders: 'Hombros',
  arms: 'Brazos',
  core: 'Core',
};

export const Equipment = {
  BARBELL: 'barbell',
  DUMBBELL: 'dumbbell',
  CABLE: 'cable',
  BODYWEIGHT: 'bodyweight',
  MACHINE: 'machine',
} as const;

export type EquipmentType = typeof Equipment[keyof typeof Equipment];

export const equipmentLabels: Record<EquipmentType, string> = {
  barbell: 'Barra',
  dumbbell: 'Mancuerna',
  cable: 'Cable',
  bodyweight: 'Peso corporal',
  machine: 'Maquina',
};
