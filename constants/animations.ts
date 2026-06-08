import { Easing } from 'react-native-reanimated';

export const easings = {
  easeOut: [0.23, 1, 0.32, 1] as const,
  easeInOut: [0.77, 0, 0.175, 1] as const,
  drawer: [0.32, 0.72, 0, 1] as const,
  spring: { damping: 15, stiffness: 300 },
};

export const durations = {
  microFeedback: 100,
  tooltip: 150,
  dropdown: 200,
  card: 220,
  modal: 300,
  pageTransition: 350,
  celebration: 600,
};

export const enterAnimation = {
  from: { opacity: 0, translateY: 12 },
  animate: { opacity: 1, translateY: 0 },
  transition: { duration: 220, type: 'timing' as const },
};
