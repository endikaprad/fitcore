import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../constants/colors';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'muted';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

export function Badge({ label, variant = 'muted', style }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[variant], style]}>
      <Text style={[styles.text, styles[`text_${variant}`]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
  primary: { backgroundColor: colors.primary + '20', borderWidth: 1, borderColor: colors.primary + '40' },
  success: { backgroundColor: colors.success + '20', borderWidth: 1, borderColor: colors.success + '40' },
  warning: { backgroundColor: colors.warning + '20', borderWidth: 1, borderColor: colors.warning + '40' },
  danger: { backgroundColor: colors.danger + '20', borderWidth: 1, borderColor: colors.danger + '40' },
  muted: { backgroundColor: colors.bgMuted },
  text: { fontSize: 11, fontFamily: 'Inter_600SemiBold', letterSpacing: 0.2 },
  text_primary: { color: colors.primary },
  text_success: { color: colors.success },
  text_warning: { color: colors.warning },
  text_danger: { color: colors.danger },
  text_muted: { color: colors.textSecondary },
});
