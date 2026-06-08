import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { ArrowLeft, Clock, Fire, Barbell } from 'phosphor-react-native';
import { MotiView } from 'moti';
import { Card } from '../../components/ui/Card';
import { colors } from '../../constants/colors';

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle de sesion</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220 }}>
          <Text style={styles.sessionName}>Espalda y Biceps</Text>
          <Text style={styles.sessionDate}>Hoy a las 09:30</Text>
        </MotiView>

        <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220, delay: 60 }}>
          <View style={styles.statsRow}>
            <Card style={styles.statCard}>
              <Clock size={18} color={colors.primary} weight="fill" />
              <Text style={styles.statVal}>58</Text>
              <Text style={styles.statLabel}>minutos</Text>
            </Card>
            <Card style={styles.statCard}>
              <Barbell size={18} color={colors.primary} weight="fill" />
              <Text style={styles.statVal}>8.240</Text>
              <Text style={styles.statLabel}>kg volumen</Text>
            </Card>
            <Card style={styles.statCard}>
              <Fire size={18} color={colors.warning} weight="fill" />
              <Text style={styles.statVal}>24</Text>
              <Text style={styles.statLabel}>series</Text>
            </Card>
          </View>
        </MotiView>

        {[
          { name: 'Dominadas', sets: [{ kg: '0', reps: 10 }, { kg: '0', reps: 9 }, { kg: '0', reps: 8 }] },
          { name: 'Remo con barra', sets: [{ kg: '80', reps: 8 }, { kg: '80', reps: 8 }, { kg: '80', reps: 7 }] },
          { name: 'Curl bicep', sets: [{ kg: '16', reps: 12 }, { kg: '16', reps: 12 }, { kg: '16', reps: 10 }] },
        ].map((ex, i) => (
          <MotiView
            key={ex.name}
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 220, delay: 120 + i * 60 }}
          >
            <Card>
              <Text style={styles.exerciseName}>{ex.name}</Text>
              <View style={styles.setsList}>
                {ex.sets.map((set, si) => (
                  <View key={si} style={styles.setItem}>
                    <Text style={styles.setNum}>Serie {si + 1}</Text>
                    <Text style={styles.setVal}>{set.kg === '0' ? 'PC' : `${set.kg} kg`}</Text>
                    <Text style={styles.setReps}>{set.reps} reps</Text>
                  </View>
                ))}
              </View>
            </Card>
          </MotiView>
        ))}
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
  content: { padding: 20, gap: 12, paddingBottom: 40 },
  sessionName: { fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold', color: colors.textPrimary },
  sessionDate: { fontSize: 13, fontFamily: 'Inter_400Regular', color: colors.textSecondary, marginTop: 4, marginBottom: 4 },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, alignItems: 'center', gap: 6 },
  statVal: { fontSize: 22, fontFamily: 'SpaceGrotesk_700Bold', color: colors.textPrimary },
  statLabel: { fontSize: 11, fontFamily: 'Inter_400Regular', color: colors.textSecondary, textAlign: 'center' },
  exerciseName: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: colors.textPrimary, marginBottom: 12 },
  setsList: { gap: 8 },
  setItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  setNum: { width: 60, fontSize: 12, fontFamily: 'Inter_400Regular', color: colors.textMuted },
  setVal: { flex: 1, fontSize: 15, fontFamily: 'SpaceGrotesk_700Bold', color: colors.textPrimary },
  setReps: { fontSize: 14, fontFamily: 'Inter_500Medium', color: colors.textSecondary },
});
