import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { colors } from '../../constants/colors';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  leftIcon?: React.ReactNode;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function Button({ label, onPress, variant = 'primary', size = 'md', loading, disabled, style, leftIcon }: ButtonProps) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePressIn() {
    scale.value = withTiming(0.96, { duration: 100 });
  }

  function handlePressOut() {
    scale.value = withTiming(1, { duration: 100 });
  }

  return (
    <AnimatedTouchable
      style={[styles.base, styles[variant], styles[`size_${size}`], disabled && styles.disabled, style, animStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.bgBase : colors.primary} size="small" />
      ) : (
        <>
          {leftIcon}
          <Text style={[styles.label, styles[`label_${variant}`], styles[`labelSize_${size}`]]}>{label}</Text>
        </>
      )}
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.bgMuted,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: colors.danger,
  },
  disabled: {
    opacity: 0.4,
  },
  size_sm: { paddingHorizontal: 12, paddingVertical: 8, height: 36 },
  size_md: { paddingHorizontal: 20, paddingVertical: 12, height: 48 },
  size_lg: { paddingHorizontal: 24, paddingVertical: 16, height: 56 },
  label: {
    fontFamily: 'Inter_600SemiBold',
  },
  label_primary: { color: colors.bgBase },
  label_secondary: { color: colors.textPrimary },
  label_ghost: { color: colors.primary },
  label_danger: { color: '#fff' },
  labelSize_sm: { fontSize: 13 },
  labelSize_md: { fontSize: 15 },
  labelSize_lg: { fontSize: 17 },
});
