import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Platform, StyleSheet, View } from 'react-native';
import { House, Barbell, ForkKnife, ChartLineUp, User } from 'phosphor-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors } from '../../constants/colors';

function TabBarIcon({ focused, icon: Icon }: { focused: boolean; icon: any }) {
  const scale = useSharedValue(focused ? 1 : 0.9);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(focused ? 1 : 0.9, { damping: 15, stiffness: 300 }) }],
  }));

  return (
    <Animated.View style={[styles.iconContainer, style]}>
      <Icon
        size={24}
        weight={focused ? 'fill' : 'regular'}
        color={focused ? colors.primary : colors.textMuted}
      />
      {focused && <View style={styles.dot} />}
    </Animated.View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
        ),
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={House} />,
        }}
      />
      <Tabs.Screen
        name="gym"
        options={{
          title: 'Gym',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={Barbell} />,
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: 'Nutricion',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={ForkKnife} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progreso',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={ChartLineUp} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={User} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    elevation: 0,
    height: Platform.OS === 'ios' ? 88 : 68,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
    marginTop: 2,
  },
});
