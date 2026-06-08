import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { useState } from 'react';
import { User, Barbell, ForkKnife, Bell, Shield, SignOut, CaretRight, Ruler, Scales } from 'phosphor-react-native';
import { Card } from '../../components/ui/Card';
import { colors } from '../../constants/colors';

interface MenuItem {
  icon: any;
  label: string;
  value?: string;
  hasSwitch?: boolean;
  danger?: boolean;
}

const MENU_ITEMS: { section: string; items: MenuItem[] }[] = [
  {
    section: 'Cuerpo',
    items: [
      { icon: Ruler, label: 'Altura', value: '178 cm' },
      { icon: Scales, label: 'Peso', value: '82 kg' },
    ],
  },
  {
    section: 'Objetivos',
    items: [
      { icon: Barbell, label: 'Objetivo gym', value: 'Volumen' },
      { icon: ForkKnife, label: 'Calorias objetivo', value: '2.000 kcal' },
    ],
  },
  {
    section: 'Preferencias',
    items: [
      { icon: Bell, label: 'Notificaciones', hasSwitch: true },
    ],
  },
  {
    section: 'Cuenta',
    items: [
      { icon: Shield, label: 'Privacidad' },
      { icon: SignOut, label: 'Cerrar sesion', danger: true },
    ],
  },
];

export default function ProfileScreen() {
  const [notif, setNotif] = useState(true);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 300 }}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <User size={36} color={colors.primary} weight="fill" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Atleta FitCore</Text>
              <Text style={styles.profileEmail}>atleta@fitcore.app</Text>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>Nivel Intermedio</Text>
              </View>
            </View>
          </View>
        </MotiView>

        <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 220, delay: 60 }}>
          <View style={styles.statsRow}>
            {[
              { val: '8 meses', label: 'En FitCore' },
              { val: '142', label: 'Sesiones' },
              { val: '12', label: 'Records' },
            ].map((s) => (
              <View key={s.label} style={styles.statItem}>
                <Text style={styles.statVal}>{s.val}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </MotiView>

        {MENU_ITEMS.map((section, si) => (
          <MotiView
            key={section.section}
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 220, delay: 120 + si * 60 }}
          >
            <Text style={styles.sectionLabel}>{section.section}</Text>
            <Card style={{ overflow: 'hidden', padding: 0 }}>
              {section.items.map((item, ii) => (
                <View key={item.label}>
                  {ii > 0 && <View style={styles.divider} />}
                  <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                    <item.icon size={20} color={item.danger ? colors.danger : colors.textSecondary} />
                    <Text style={[styles.menuLabel, item.danger && styles.menuLabelDanger]}>{item.label}</Text>
                    <View style={{ flex: 1 }} />
                    {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
                    {item.hasSwitch && (
                      <Switch
                        value={notif}
                        onValueChange={setNotif}
                        trackColor={{ false: colors.bgMuted, true: colors.primary + '60' }}
                        thumbColor={notif ? colors.primary : colors.textMuted}
                      />
                    )}
                    {!item.hasSwitch && !item.danger && (
                      <CaretRight size={16} color={colors.textMuted} />
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </Card>
          </MotiView>
        ))}

        <Text style={styles.version}>FitCore v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBase },
  scroll: { flex: 1 },
  content: { padding: 20, gap: 16, paddingBottom: 100 },
  profileHeader: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 4 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.bgSurface,
    borderWidth: 2,
    borderColor: colors.primary + '40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: { flex: 1, gap: 4 },
  profileName: { fontSize: 20, fontFamily: 'SpaceGrotesk_700Bold', color: colors.textPrimary },
  profileEmail: { fontSize: 13, fontFamily: 'Inter_400Regular', color: colors.textSecondary },
  levelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: colors.primary + '40',
    marginTop: 4,
  },
  levelText: { fontSize: 11, fontFamily: 'Inter_600SemiBold', color: colors.primary },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.bgSurface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.bgMuted,
    padding: 16,
  },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statVal: { fontSize: 20, fontFamily: 'SpaceGrotesk_700Bold', color: colors.textPrimary },
  statLabel: { fontSize: 11, fontFamily: 'Inter_400Regular', color: colors.textSecondary },
  sectionLabel: { fontSize: 12, fontFamily: 'Inter_600SemiBold', color: colors.textMuted, letterSpacing: 0.5, marginBottom: 6, marginLeft: 4 },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  menuLabel: { fontSize: 15, fontFamily: 'Inter_400Regular', color: colors.textPrimary },
  menuLabelDanger: { color: colors.danger },
  menuValue: { fontSize: 14, fontFamily: 'Inter_400Regular', color: colors.textSecondary },
  divider: { height: 1, backgroundColor: colors.bgMuted, marginHorizontal: 16 },
  version: { fontSize: 12, fontFamily: 'Inter_400Regular', color: colors.textMuted, textAlign: 'center', marginTop: 8 },
});
