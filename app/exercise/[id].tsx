import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { MotiView } from 'moti';
import { ArrowLeft, Trophy, TrendUp } from 'phosphor-react-native';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { colors } from '../../constants/colors';

const RANGE_OPTIONS = ['1M', '3M', '6M', '1A', 'Todo'];

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams();

  const HISTORY = [
    { date: 'Hoy', maxWeight: 100, volume: 2400, sets: 4, reps: '8,8,8,6' },
    { date: 'Hace 5 dias', maxWeight: 97.5, volume: 2340, sets: 4, reps: '8,8,8,7' },
    { date: 'Hace 10 dias', maxWeight: 95, volume: 2280, sets: 4, reps: '8,8,7,7' },
    { date: 'Hace 15 dias', maxWeight: 92.5, volume: 2220, sets: 4, reps: '8,8,7,6' },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <ArrowLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle ejercicio</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220 }}>
          <Text style={styles.name}>Press de banca</Text>
          <View style={styles.tags}>
            <Badge label="Pecho" variant="primary" />
            <Badge label="Barra" />
            <Badge label="Triceps" />
          </View>
        </MotiView>

        <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220, delay: 60 }}>
          <Card style={styles.prCard}>
            <Trophy size={20} weight="fill" color={colors.primary} />
            <View>
              <Text style={styles.prVal}>100 kg</Text>
              <Text style={styles.prLabel}>Record personal</Text>
            </View>
            <View style={styles.prRight}>
              <Text style={styles.oneRM}>108 kg</Text>
              <Text style={styles.oneRMLabel}>1RM estimado</Text>
            </View>
          </Card>
        </MotiView>

        <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220, delay: 120 }}>
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <TrendUp size={16} color={colors.primary} />
              <Text style={styles.chartTitle}>Progresion de peso</Text>
            </View>
            <View style={styles.chartArea}>
              <View style={styles.chartLine}>
                {HISTORY.slice().reverse().map((h, i, arr) => (
                  <View key={i} style={styles.chartPoint}>
                    <View style={[styles.dot, { bottom: ((h.maxWeight - 85) / 20) * 80 }]} />
                    <Text style={styles.chartDateLabel}>{h.date.split(' ').slice(-2).join(' ')}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.chartYLabel}>+5 kg desde hace 1 mes</Text>
            </View>
          </View>
        </MotiView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Historial</Text>
        </View>

        {HISTORY.map((session, i) => (
          <MotiView
            key={session.date}
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 220, delay: 200 + i * 60 }}
          >
            <Card style={styles.historyCard}>
              <View style={styles.historyTop}>
                <Text style={styles.historyDate}>{session.date}</Text>
                <Text style={styles.historyWeight}>{session.maxWeight} kg</Text>
              </View>
              <View style={styles.historyStats}>
                <Text style={styles.historyStat}>{session.sets} series</Text>
                <Text style={styles.historyDot}>-</Text>
                <Text style={styles.historyStat}>Reps: {session.reps}</Text>
                <Text style={styles.historyDot}>-</Text>
                <Text style={styles.historyStat}>{session.volume} kg vol.</Text>
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
  content: { padding: 20, gap: 16, paddingBottom: 40 },
  name: { fontSize: 26, fontFamily: 'SpaceGrotesk_700Bold', color: colors.textPrimary, marginBottom: 10 },
  tags: { flexDirection: 'row', gap: 8 },
  prCard: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  prVal: { fontSize: 28, fontFamily: 'SpaceGrotesk_800ExtraBold', color: colors.primary },
  prLabel: { fontSize: 12, fontFamily: 'Inter_400Regular', color: colors.textSecondary },
  prRight: { marginLeft: 'auto', alignItems: 'flex-end' },
  oneRM: { fontSize: 20, fontFamily: 'SpaceGrotesk_700Bold', color: colors.textPrimary },
  oneRMLabel: { fontSize: 11, fontFamily: 'Inter_400Regular', color: colors.textSecondary },
  chartCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.bgMuted,
    padding: 16,
    gap: 12,
  },
  chartHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  chartTitle: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: colors.textPrimary },
  chartArea: { height: 100, justifyContent: 'flex-end' },
  chartLine: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: colors.bgMuted,
  },
  chartPoint: { alignItems: 'center', flex: 1, height: '100%', justifyContent: 'flex-end', position: 'relative' },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: 20,
  },
  chartDateLabel: { fontSize: 9, fontFamily: 'Inter_400Regular', color: colors.textMuted, marginTop: 4, textAlign: 'center' },
  chartYLabel: { fontSize: 11, fontFamily: 'Inter_500Medium', color: colors.success, marginTop: 8 },
  sectionHeader: { marginBottom: -4 },
  sectionTitle: { fontSize: 17, fontFamily: 'Inter_700Bold', color: colors.textPrimary },
  historyCard: { gap: 8 },
  historyTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  historyDate: { fontSize: 14, fontFamily: 'Inter_500Medium', color: colors.textPrimary },
  historyWeight: { fontSize: 20, fontFamily: 'SpaceGrotesk_700Bold', color: colors.primary },
  historyStats: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  historyStat: { fontSize: 12, fontFamily: 'Inter_400Regular', color: colors.textSecondary },
  historyDot: { fontSize: 12, color: colors.textMuted },
});
