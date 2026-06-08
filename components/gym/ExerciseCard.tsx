import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ArrowRight } from 'phosphor-react-native';
import { MotiView } from 'moti';
import { Badge } from '../ui/Badge';
import { colors } from '../../constants/colors';
import { muscleLabels, MuscleGroupType } from '../../constants/muscles';

export interface Exercise {
  id: number;
  name: string;
  muscleMain: MuscleGroupType;
  equipment: string;
  gifUrl?: string;
}

interface ExerciseCardProps {
  exercise: Exercise;
  onPress: () => void;
  index?: number;
}

export function ExerciseCard({ exercise, onPress, index = 0 }: ExerciseCardProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 220, delay: index * 50 }}
    >
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
        <View style={styles.gifContainer}>
          {exercise.gifUrl ? (
            <Image source={{ uri: exercise.gifUrl }} style={styles.gif} />
          ) : (
            <View style={styles.gifPlaceholder} />
          )}
        </View>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{exercise.name}</Text>
          <View style={styles.tags}>
            <Badge label={muscleLabels[exercise.muscleMain] ?? exercise.muscleMain} variant="primary" />
            <Badge label={exercise.equipment} />
          </View>
        </View>
        <ArrowRight size={18} color={colors.textMuted} />
      </TouchableOpacity>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: colors.bgSurface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.bgMuted,
  },
  gifContainer: {
    width: 52,
    height: 52,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.bgElevated,
  },
  gif: { width: '100%', height: '100%' },
  gifPlaceholder: { flex: 1, backgroundColor: colors.bgMuted },
  info: { flex: 1, gap: 6 },
  name: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: colors.textPrimary,
  },
  tags: { flexDirection: 'row', gap: 6 },
});
