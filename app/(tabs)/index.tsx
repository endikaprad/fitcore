import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MotiView } from 'moti';
import { Lightning, Fire, Trophy, Barbell, ForkKnife } from 'phosphor-react-native';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { colors } from '../../constants/colors';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <MotiView from={{ opacity: 0, translateY: -8 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 300 }}>
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Buenos dias</Text>
              <Text style={styles.userName}>Atleta</Text>
            </View>
            <View style={styles.streakBadge}>
              <Fire size={16} weight="fill" color={colors.warning} />
              <Text style={styles.streakNum}>7</Text>
            </View>
          </View>
        </MotiView>

        <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220, delay: 60 }}>
          <TouchableOpacity style={styles.ctaBanner} onPress={() => router.push('/workout/session')} activeOpacity={0.85}>
            <View>
              <Text style={styles.ctaLabel}>Empezar entrenamiento</Text>
              <Text style={styles.ctaSub}>Dia de pecho y triceps</Text>
            </View>
            <View style={styles.ctaIcon}>
              <Lightning size={24} weight="fill" color={colors.bgBase} />
            </View>
          </TouchableOpacity>
        </MotiView>

        <View style={styles.statsRow}>
          {[
            { label: 'Sesiones', value: '23', sub: 'este mes', icon: Barbell },
            { label: 'Kcal hoy', value: '1.840', sub: 'de 2.000', icon: ForkKnife },
            { label: 'Records', value: '3', sub: 'nuevos', icon: Trophy },
          ].map((stat, i) => (
            <MotiView
              key={stat.label}
              from={{ opacity: 0, translateY: 12 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 220, delay: 120 + i * 50 }}
              style={{ flex: 1 }}
            >
              <Card style={styles.statCard}>
                <stat.icon size={20} color={colors.primary} weight="fill" />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statSub}>{stat.sub}</Text>
              </Card>
            </MotiView>
          ))}
        </View>

        <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220, delay: 260 }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ultimo entrenamiento</Text>
            <TouchableOpacity onPress={() => router.push('/gym')}>
              <Text style={styles.seeAll}>Ver todo</Text>
            </TouchableOpacity>
          </View>

          <Card style={styles.lastWorkout}>
            <View style={styles.workoutInfo}>
              <Badge label="Hace 2 dias" variant="muted" />
              <Text style={styles.workoutName}>Espalda y Biceps</Text>
              <Text style={styles.workoutSub}>6 ejercicios - 58 min</Text>
            </View>
            <View style={styles.workoutStats}>
              <View style={styles.workoutStat}>
                <Text style={styles.workoutStatVal}>8.240</Text>
                <Text style={styles.workoutStatLabel}>kg vol.</Text>
              </View>
              <View style={styles.workoutStat}>
                <Text style={styles.workoutStatVal}>24</Text>
                <Text style={styles.workoutStatLabel}>series</Text>
              </View>
            </View>
          </Card>
        </MotiView>

        <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220, delay: 320 }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Records recientes</Text>
          </View>
          {[
            { exercise: 'Press banca', weight: 100, date: 'Ayer' },
            { exercise: 'Sentadilla', weight: 130, date: 'Hace 3 dias' },
          ].map((pr, i) => (
            <View key={pr.exercise} style={[styles.prRow, i > 0 && styles.prBorder]}>
              <Trophy size={16} weight="fill" color={colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={styles.prExercise}>{pr.exercise}</Text>
                <Text style={styles.prDate}>{pr.date}</Text>
              </View>
              <Text style={styles.prWeight}>{pr.weight} kg</Text>
            </View>
          ))}
        </MotiView>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBase },
  scroll: { flex: 1 },
  content: { padding: 20, gap: 20, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 13, fontFamily: 'Inter_400Regular', color: colors.textSecondary },
  userName: { fontSize: 28, fontFamily: 'SpaceGrotesk_700Bold', color: colors.textPrimary },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.warning + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: colors.warning + '40',
  },
  streakNum: { fontSize: 15, fontFamily: 'SpaceGrotesk_700Bold', color: colors.warning },
  ctaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 20,
  },
  ctaLabel: { fontSize: 17, fontFamily: 'Inter_700Bold', color: colors.bgBase },
  ctaSub: { fontSize: 13, fontFamily: 'Inter_400Regular', color: colors.bgBase + 'CC', marginTop: 2 },
  ctaIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.bgBase + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { alignItems: 'center', gap: 6, padding: 14 },
  statValue: { fontSize: 22, fontFamily: 'SpaceGrotesk_700Bold', color: colors.textPrimary },
  statLabel: { fontSize: 12, fontFamily: 'Inter_600SemiBold', color: colors.textSecondary },
  statSub: { fontSize: 10, fontFamily: 'Inter_400Regular', color: colors.textMuted },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontFamily: 'Inter_700Bold', color: colors.textPrimary },
  seeAll: { fontSize: 13, fontFamily: 'Inter_500Medium', color: colors.primary },
  lastWorkout: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  workoutInfo: { gap: 6 },
  workoutName: { fontSize: 17, fontFamily: 'Inter_600SemiBold', color: colors.textPrimary },
  workoutSub: { fontSize: 13, fontFamily: 'Inter_400Regular', color: colors.textSecondary },
  workoutStats: { flexDirection: 'row', gap: 20 },
  workoutStat: { alignItems: 'center' },
  workoutStatVal: { fontSize: 22, fontFamily: 'SpaceGrotesk_700Bold', color: colors.primary },
  workoutStatLabel: { fontSize: 11, fontFamily: 'Inter_400Regular', color: colors.textSecondary },
  prRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  prBorder: { borderTopWidth: 1, borderTopColor: colors.bgMuted },
  prExercise: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: colors.textPrimary },
  prDate: { fontSize: 12, fontFamily: 'Inter_400Regular', color: colors.textSecondary },
  prWeight: { fontSize: 18, fontFamily: 'SpaceGrotesk_700Bold', color: colors.textPrimary },
});
