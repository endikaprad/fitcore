import { create } from 'zustand';

export interface WorkoutSet {
  id: string;
  setNumber: number;
  weight: string;
  reps: string;
  isWarmup: boolean;
  completed: boolean;
  isPR?: boolean;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: number;
  exerciseName: string;
  sets: WorkoutSet[];
  restSeconds: number;
}

interface WorkoutStore {
  sessionId: string | null;
  sessionName: string;
  startedAt: Date | null;
  exercises: WorkoutExercise[];
  activeTimerId: string | null;
  timerSeconds: number;

  startSession: (name: string) => void;
  finishSession: () => void;
  addExercise: (exercise: Omit<WorkoutExercise, 'sets'>) => void;
  removeExercise: (exerciseId: string) => void;
  addSet: (exerciseId: string, set: WorkoutSet) => void;
  updateSet: (exerciseId: string, setId: string, data: Partial<WorkoutSet>) => void;
  removeSet: (exerciseId: string, setId: string) => void;
  startTimer: (exerciseId: string, seconds: number) => void;
  tickTimer: () => void;
  stopTimer: () => void;
}

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  sessionId: null,
  sessionName: 'Entrenamiento',
  startedAt: null,
  exercises: [],
  activeTimerId: null,
  timerSeconds: 0,

  startSession: (name) => set({ sessionId: Date.now().toString(), sessionName: name, startedAt: new Date(), exercises: [] }),
  finishSession: () => set({ sessionId: null, startedAt: null, exercises: [], activeTimerId: null }),

  addExercise: (exercise) => set((s) => ({
    exercises: [...s.exercises, { ...exercise, sets: [] }],
  })),
  removeExercise: (exerciseId) => set((s) => ({
    exercises: s.exercises.filter((e) => e.id !== exerciseId),
  })),

  addSet: (exerciseId, setData) => set((s) => ({
    exercises: s.exercises.map((e) =>
      e.id === exerciseId ? { ...e, sets: [...e.sets, setData] } : e
    ),
  })),
  updateSet: (exerciseId, setId, data) => set((s) => ({
    exercises: s.exercises.map((e) =>
      e.id === exerciseId
        ? { ...e, sets: e.sets.map((set) => (set.id === setId ? { ...set, ...data } : set)) }
        : e
    ),
  })),
  removeSet: (exerciseId, setId) => set((s) => ({
    exercises: s.exercises.map((e) =>
      e.id === exerciseId ? { ...e, sets: e.sets.filter((s) => s.id !== setId) } : e
    ),
  })),

  startTimer: (exerciseId, seconds) => set({ activeTimerId: exerciseId, timerSeconds: seconds }),
  tickTimer: () => set((s) => ({ timerSeconds: Math.max(0, s.timerSeconds - 1) })),
  stopTimer: () => set({ activeTimerId: null, timerSeconds: 0 }),
}));
