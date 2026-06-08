import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MotiView } from 'moti';
import { X, Plus, Timer, Lightning } from 'phosphor-react-native';
import * as Haptics from 'expo-haptics';
import { SetRow, SetData } from '../../components/gym/SetRow';
import { PRBadge } from '../../components/gym/PRBadge';
import { RestTimer } from '../../components/gym/RestTimer';
import { Card } from '../../components/ui/Card';
import { colors } from '../../constants/colors';

interface ExerciseInSession {
  id: string;
  name: string;
  sets: SetData[];
  expanded: boolean;
  showPR: boolean;
}

const INITIAL_EXERCISES: ExerciseInSession[] = [
  {
    id: '1',
    name: 'Press de banca',
    sets: [
      { setNumber: 0, weight: '60', reps: '10', isWarmup: true, completed: false },
      { setNumber: 1, weight: '80', reps: '8', isWarmup: false, completed: false },
      { setNumber: 2, weight: '80', reps: '8', isWarmup: false, completed: false },
      { setNumber: 3, weight: '80', reps: '8', isWarmup: false, completed: false },
    ],
    expanded: true,
    showPR: false,
  },
  {
    id: '2',
    name: 'Aperturas con mancuernas',
    sets: [
      { setNumber: 1, weight: '14', reps: '12', isWarmup: false, completed: false },
      { setNumber: 2, weight: '14', reps: '12', isWarmup: false, completed: false },
      { setNumber: 3, weight: '14', reps: '12', isWarmup: false, completed: false },
    ],
    expanded: false,
    showPR: false,
  },
];

export default function WorkoutSessionScreen() {
  const [exercises, setExercises] = useState<ExerciseInSession[]>(INITIAL_EXERCISES);
  const [elapsed, setElapsed] = useState(0);
  const [restTimer, setRestTimer] = useState<{ active: boolean; seconds: number; total: number }>({ active: false, seconds: 0, total: 90 });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const restRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  function formatElapsed(s: number) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }

  function startRest(seconds = 90) {
    if (restRef.current) clearInterval(restRef.current);
    setRestTimer({ active: true, seconds, total: seconds });
    restRef.current = setInterval(() => {
      setRestTimer((prev) => {
        if (prev.seconds <= 1) {
          clearInterval(restRef.current!);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          return { ...prev, active: false, seconds: 0 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);
  }

  function skipRest() {
    if (restRef.current) clearInterval(restRef.current);
    setRestTimer({ active: false, seconds: 0, total: 90 });
  }

  function toggleSet(exerciseId: string, setIdx: number) {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        const sets = ex.sets.map((s, i) => {
          if (i !== setIdx) return s;
          const completed = !s.completed;
          if (completed) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            // Check PR (mock: weight > 95 is a PR for bench)
            if (!s.isWarmup && parseFloat(s.weight) > 95 && exerciseId === '1') {
              setTimeout(() => {
                setExercises((e) => e.map((ex2) => ex2.id === exerciseId ? { ...ex2, showPR: true } : ex2));
                setTimeout(() => {
                  setExercises((e) => e.map((ex2) => ex2.id === exerciseId ? { ...ex2, showPR: false } : ex2));
                }, 3000);
              }, 200);
            }
            if (!s.isWarmup) startRest(90);
          }
          return { ...s, completed };
        });
        return { ...ex, sets };
      })
    );
  }

  function updateSet(exerciseId: string, setIdx: number, field: 'weight' | 'reps', value: string) {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === exerciseId
          ? { ...ex, sets: ex.sets.map((s, i) => i === setIdx ? { ...s, [field]: value } : s) }
          : ex
      )
    );
  }

  function addSet(exerciseId: string) {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        const lastSet = ex.sets.filter((s) => !s.isWarmup).slice(-1)[0];
        const newSetNum = ex.sets.filter((s) => !s.isWarmup).length + 1;
        return {
          ...ex,
          sets: [...ex.sets, {
            setNumber: newSetNum,
            weight: lastSet?.weight ?? '0',
            reps: lastSet?.reps ?? '8',
            isWarmup: false,
            completed: false,
          }],
        };
      })
    );
  }

  function toggleExpand(exerciseId: string) {
    setExercises((prev) =>
      prev.map((ex) => ex.id === exerciseId ? { ...ex, expanded: !ex.expanded } : ex)
    );
  }

  function handleFinish() {
    Alert.alert('Finalizar entrenamiento', '¿Deseas guardar este entrenamiento?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Guardar', onPress: () => router.back() },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <X size={24} color={colors.textSecondary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.sessionName}>Pecho y Triceps</Text>
          <Text style={styles.timer}>{formatElapsed(elapsed)}</Text>
        </View>
        <TouchableOpacity style={styles.finishBtn} onPress={handleFinish}>
          <Text style={styles.finishBtnText}>Finalizar</Text>
        </TouchableOpacity>
      </View>

      {restTimer.active && (
        <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 300 }}>
          <Card style={styles.restCard} elevated>
            <View style={styles.restHeader}>
              <Timer size={16} color={colors.primary} />
              <Text style={styles.restTitle}>Descanso</Text>
            </View>
            <RestTimer
              seconds={restTimer.seconds}
              totalSeconds={restTimer.total}
              onSkip={skipRest}
              onAddTime={() => setRestTimer((prev) => ({ ...prev, seconds: prev.seconds + 30, total: prev.total + 30 }))}
            />
          </Card>
        </MotiView>
      )}

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {exercises.map((exercise, ei) => (
          <MotiView
            key={exercise.id}
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 220, delay: ei * 80 }}
          >
            <Card style={styles.exerciseCard}>
              <TouchableOpacity style={styles.exerciseHeader} onPress={() => toggleExpand(exercise.id)} activeOpacity={0.8}>
                <View style={styles.exerciseIcon}>
                  <Lightning size={18} weight="fill" color={colors.primary} />
                </View>
                <View style={styles.exerciseTitleWrap}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseSub}>{exercise.sets.filter((s) => !s.isWarmup).length} series</Text>
                </View>
                {exercise.showPR && <PRBadge />}
              </TouchableOpacity>

              {exercise.expanded && (
                <>
                  <View style={styles.setHeader}>
                    <Text style={[styles.setHeaderText, { width: 28 }]}>Set</Text>
                    <Text style={[styles.setHeaderText, { flex: 1 }]}>Kg</Text>
                    <Text style={[styles.setHeaderText, { flex: 1 }]}>Reps</Text>
                    <Text style={[styles.setHeaderText, { width: 40 }]}></Text>
                  </View>

                  {exercise.sets.map((set, si) => (
                    <SetRow
                      key={si}
                      set={set}
                      onWeightChange={(val) => updateSet(exercise.id, si, 'weight', val)}
                      onRepsChange={(val) => updateSet(exercise.id, si, 'reps', val)}
                      onToggleComplete={() => toggleSet(exercise.id, si)}
                      suggestedWeight={set.setNumber === 1 && !set.isWarmup ? 82.5 : undefined}
                    />
                  ))}

                  <TouchableOpacity style={styles.addSetBtn} onPress={() => addSet(exercise.id)}>
                    <Plus size={16} color={colors.primary} />
                    <Text style={styles.addSetText}>Anadir serie</Text>
                  </TouchableOpacity>
                </>
              )}
            </Card>
          </MotiView>
        ))}

        <TouchableOpacity style={styles.addExerciseBtn} activeOpacity={0.8}>
          <Plus size={20} color={colors.primary} weight="bold" />
          <Text style={styles.addExerciseText}>Anadir ejercicio</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBase },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.bgMuted,
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  sessionName: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: colors.textPrimary },
  timer: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', color: colors.primary },
  finishBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  finishBtnText: { fontSize: 13, fontFamily: 'Inter_700Bold', color: colors.bgBase },
  restCard: { margin: 16, marginBottom: 0 },
  restHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  restTitle: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: colors.textSecondary },
  scroll: { flex: 1 },
  content: { padding: 16, gap: 12, paddingBottom: 40 },
  exerciseCard: { overflow: 'hidden', padding: 0 },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  exerciseIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseTitleWrap: { flex: 1 },
  exerciseName: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: colors.textPrimary },
  exerciseSub: { fontSize: 12, fontFamily: 'Inter_400Regular', color: colors.textSecondary, marginTop: 2 },
  setHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 4,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.bgMuted,
    paddingTop: 10,
  },
  setHeaderText: { fontSize: 11, fontFamily: 'Inter_600SemiBold', color: colors.textMuted, textAlign: 'center' },
  addSetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 12,
    margin: 8,
    marginTop: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary + '30',
    backgroundColor: colors.primary + '08',
    justifyContent: 'center',
  },
  addSetText: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: colors.primary },
  addExerciseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.bgMuted,
    borderRadius: 12,
    paddingVertical: 16,
    borderStyle: 'dashed',
    marginTop: 4,
  },
  addExerciseText: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: colors.textSecondary },
});
