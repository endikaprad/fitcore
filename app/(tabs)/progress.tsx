import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { Trophy, TrendUp, Calendar } from 'phosphor-react-native';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { colors } from '../../constants/colors';

const RANGES = ['1M', '3M', '6M', '1A', 'Todo'];

const PR_DATA = [
  { exercise: 'Press banca', weight: 100, oneRM: 108, date: 'Ayer', improvement: '+5 kg' },
  { exercise: 'Sentadilla', weight: 130, oneRM: 142, date: 'Hace 3 dias', improvement: '+7.5 kg' },
  { exercise: 'Peso muerto', weight: 160, oneRM: 177, date: 'Hace 1 semana', improvement: '+10 kg' },
  { exercise: 'Press militar', weight: 70, oneRM: 76, date: 'Hace 2 semanas', improvement: '+2.5 kg' },
];

export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 300 }}>
          <Text style={styles.title}>Progreso</Text>
        </MotiView>

        <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220, delay: 60 }}>
          <View style={styles.statsGrid}>
            <Card style={styles.bigStat}>
              <TrendUp size={20} color={colors.primary} weight="fill" />
              <Text style={styles.bigStatVal}>+18%</Text>
              <Text style={styles.bigStatLabel}>Fuerza media</Text>
              <Text style={styles.bigStatSub}>vs mes anterior</Text>
            </Card>
            <View style={styles.smallStats}>
              <Card style={styles.smallStat}>
                <Text style={styles.smallStatVal}>23</Text>
                <Text style={styles.smallStatLabel}>Sesiones</Text>
              </Card>
              <Card style={styles.smallStat}>
                <Text style={styles.smallStatVal}>142h</Text>
                <Text style={styles.smallStatLabel}>Entreno</Text>
              </Card>
            </View>
          </View>
        </MotiView>

        <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220, delay: 120 }}>
          <View style={styles.sectionHeader}>
            <Trophy size={18} weight="fill" color={colors.primary} />
            <Text style={styles.sectionTitle}>Tablero de Records</Text>
          </View>

          {PR_DATA.map((pr, i) => (
            <MotiView
              key={pr.exercise}
              from={{ opacity: 0, translateX: -12 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'timing', duration: 220, delay: 160 + i * 60 }}
            >
              <Card style={styles.prCard}>
                <View style={styles.prTop}>
                  <Text style={styles.prName}>{pr.exercise}</Text>
                  <Badge label={pr.improvement} variant="success" />
                </View>
                <View style={styles.prBottom}>
                  <View style={styles.prStat}>
                    <Text style={styles.prStatVal}>{pr.weight} kg</Text>
                    <Text style={styles.prStatLabel}>Record</Text>
                  </View>
                  <View style={styles.prDivider} />
                  <View style={styles.prStat}>
                    <Text style={styles.prStatVal}>{pr.oneRM} kg</Text>
                    <Text style={styles.prStatLabel}>1RM est.</Text>
                  </View>
                  <View style={styles.prDivider} />
                  <View style={styles.prStat}>
                    <Text style={[styles.prStatVal, styles.prDate]}>{pr.date}</Text>
                    <Text style={styles.prStatLabel}>Fecha</Text>
                  </View>
                </View>
              </Card>
            </MotiView>
          ))}
        </MotiView>

        <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220, delay: 400 }}>
          <View style={styles.sectionHeader}>
            <Calendar size={18} color={colors.textSecondary} />
            <Text style={styles.sectionTitle}>Actividad semanal</Text>
          </View>
          <Card style={styles.weekCard}>
            <View style={styles.weekRow}>
              {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, i) => (
                <View key={day} style={styles.weekDay}>
                  <View style={[styles.weekBar, [0, 2, 4].includes(i) && styles.weekBarActive, { height: [60, 40, 80, 30, 90, 20, 0][i] }]} />
                  <Text style={styles.weekDayLabel}>{day}</Text>
                </View>
              ))}
            </View>
          </Card>
        </MotiView>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBase },
  scroll: { flex: 1 },
  content: { padding: 20, gap: 16, paddingBottom: 100 },
  title: { fontSize: 28, fontFamily: 'SpaceGrotesk_700Bold', color: colors.textPrimary, marginBottom: 4 },
  statsGrid: { flexDirection: 'row', gap: 10 },
  bigStat: { flex: 1, gap: 6, alignItems: 'flex-start' },
  bigStatVal: { fontSize: 36, fontFamily: 'SpaceGrotesk_700Bold', color: colors.primary },
  bigStatLabel: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: colors.textPrimary },
  bigStatSub: { fontSize: 11, fontFamily: 'Inter_400Regular', color: colors.textMuted },
  smallStats: { flex: 1, gap: 10 },
  smallStat: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 },
  smallStatVal: { fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold', color: colors.textPrimary },
  smallStatLabel: { fontSize: 12, fontFamily: 'Inter_500Medium', color: colors.textSecondary },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  sectionTitle: { fontSize: 17, fontFamily: 'Inter_700Bold', color: colors.textPrimary },
  prCard: { gap: 12, marginBottom: 2 },
  prTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  prName: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: colors.textPrimary },
  prBottom: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  prStat: { flex: 1, alignItems: 'center', gap: 2 },
  prStatVal: { fontSize: 18, fontFamily: 'SpaceGrotesk_700Bold', color: colors.textPrimary },
  prDate: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  prStatLabel: { fontSize: 10, fontFamily: 'Inter_400Regular', color: colors.textMuted },
  prDivider: { width: 1, height: 30, backgroundColor: colors.bgMuted },
  weekCard: { paddingVertical: 20 },
  weekRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', height: 100 },
  weekDay: { alignItems: 'center', gap: 6 },
  weekBar: { width: 28, borderRadius: 4, backgroundColor: colors.bgMuted, minHeight: 4 },
  weekBarActive: { backgroundColor: colors.primary },
  weekDayLabel: { fontSize: 11, fontFamily: 'Inter_500Medium', color: colors.textSecondary },
});
