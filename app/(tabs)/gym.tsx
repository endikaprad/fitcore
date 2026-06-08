import { ScrollView, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MotiView } from 'moti';
import { Plus, MagnifyingGlass, CalendarBlank } from 'phosphor-react-native';
import { ExerciseCard, Exercise } from '../../components/gym/ExerciseCard';
import { Card } from '../../components/ui/Card';
import { colors } from '../../constants/colors';

const MOCK_EXERCISES: Exercise[] = [
  { id: 1, name: 'Press de banca', muscleMain: 'chest', equipment: 'barbell' },
  { id: 2, name: 'Sentadilla', muscleMain: 'legs', equipment: 'barbell' },
  { id: 3, name: 'Peso muerto', muscleMain: 'back', equipment: 'barbell' },
  { id: 4, name: 'Press militar', muscleMain: 'shoulders', equipment: 'barbell' },
  { id: 5, name: 'Dominadas', muscleMain: 'back', equipment: 'bodyweight' },
  { id: 6, name: 'Curl bicep', muscleMain: 'arms', equipment: 'dumbbell' },
];

const HISTORY = [
  { id: '1', name: 'Espalda y Biceps', date: 'Hoy', exercises: 6, duration: '58 min', volume: '8.240 kg' },
  { id: '2', name: 'Pecho y Triceps', date: 'Hace 2 dias', exercises: 7, duration: '65 min', volume: '9.120 kg' },
  { id: '3', name: 'Piernas', date: 'Hace 4 dias', exercises: 5, duration: '72 min', volume: '15.400 kg' },
];

export default function GymScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 300 }}>
          <View style={styles.header}>
            <Text style={styles.title}>Gym</Text>
            <TouchableOpacity style={styles.searchBtn} onPress={() => router.push('/exercise/1')}>
              <MagnifyingGlass size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </MotiView>

        <TouchableOpacity style={styles.startBtn} onPress={() => router.push('/workout/session')} activeOpacity={0.85}>
          <Plus size={20} color={colors.bgBase} weight="bold" />
          <Text style={styles.startBtnText}>Nuevo entrenamiento</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Historial reciente</Text>
          <CalendarBlank size={18} color={colors.textSecondary} />
        </View>

        {HISTORY.map((session, i) => (
          <MotiView
            key={session.id}
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 220, delay: i * 60 }}
          >
            <TouchableOpacity onPress={() => router.push(`/workout/${session.id}`)} activeOpacity={0.8}>
              <Card style={styles.sessionCard}>
                <View style={styles.sessionTop}>
                  <Text style={styles.sessionName}>{session.name}</Text>
                  <Text style={styles.sessionDate}>{session.date}</Text>
                </View>
                <View style={styles.sessionStats}>
                  <View style={styles.sessionStat}>
                    <Text style={styles.sessionStatVal}>{session.exercises}</Text>
                    <Text style={styles.sessionStatLabel}>ejercicios</Text>
                  </View>
                  <View style={styles.sessionStat}>
                    <Text style={styles.sessionStatVal}>{session.duration}</Text>
                    <Text style={styles.sessionStatLabel}>duracion</Text>
                  </View>
                  <View style={styles.sessionStat}>
                    <Text style={[styles.sessionStatVal, { color: colors.primary }]}>{session.volume}</Text>
                    <Text style={styles.sessionStatLabel}>volumen</Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          </MotiView>
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ejercicios frecuentes</Text>
        </View>

        {MOCK_EXERCISES.map((ex, i) => (
          <ExerciseCard
            key={ex.id}
            exercise={ex}
            index={i}
            onPress={() => router.push(`/exercise/${ex.id}`)}
          />
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBase },
  scroll: { flex: 1 },
  content: { padding: 20, gap: 12, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
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
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 8,
  },
  startBtnText: { fontSize: 16, fontFamily: 'Inter_700Bold', color: colors.bgBase },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, marginBottom: 4 },
  sectionTitle: { fontSize: 17, fontFamily: 'Inter_700Bold', color: colors.textPrimary },
  sessionCard: { gap: 12 },
  sessionTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sessionName: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: colors.textPrimary },
  sessionDate: { fontSize: 12, fontFamily: 'Inter_400Regular', color: colors.textSecondary },
  sessionStats: { flexDirection: 'row', gap: 20 },
  sessionStat: { gap: 2 },
  sessionStatVal: { fontSize: 18, fontFamily: 'SpaceGrotesk_700Bold', color: colors.textPrimary },
  sessionStatLabel: { fontSize: 11, fontFamily: 'Inter_400Regular', color: colors.textSecondary },
});
