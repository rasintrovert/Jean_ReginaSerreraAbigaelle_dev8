import {
  ThemedCard,
  ThemedText,
  ThemedView
} from '@/components/ThemedComponents';
import { PressableButton } from '@/components/PressableButton';
import { useResponsive } from '@/hooks/useResponsive';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguageStore } from '@/store/languageStore';
import { useThemeStore } from '@/store/themeStore';
import { useTheme } from '@/theme';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Switch, StyleSheet, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { isTablet } = useResponsive();
  const t = useTranslation();
  const { language, setLanguage } = useLanguageStore();
  const { appTheme, setAppTheme } = useThemeStore();

  // États pour les notifications
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [alertSound, setAlertSound] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  // États pour la synchronisation
  const [autoSync, setAutoSync] = useState(true);
  const [wifiOnly, setWifiOnly] = useState(false);

  const handleClearCache = () => {
    Alert.alert(
      t('agent.settings.clearCache'),
      t('agent.settings.clearCacheConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' as const },
        {
          text: t('agent.settings.clearCache'),
          style: 'destructive' as const,
          onPress: () => {
            // TODO: Implémenter l'effacement du cache
            Alert.alert(t('common.success'), t('agent.settings.clearCacheSuccess'));
          },
        },
      ]
    );
  };

  const handleHelpPress = () => {
    router.push('/(dashboard)/agent/help' as any);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityLabel={t('common.back')}
          accessibilityRole="button"
        >
          <FontAwesome
            name="arrow-left"
            size={20}
            color={theme.colors.text}
          />
        </Pressable>
        <ThemedView variant="transparent" style={styles.headerText}>
          <ThemedText size="xl" weight="bold" style={styles.headerTitle}>
            {t('agent.settings.title')}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.scrollContentTablet
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Langue */}
        <ThemedCard style={styles.sectionCard}>
          <ThemedView variant="transparent" style={styles.sectionHeader}>
            <FontAwesome
              name="language"
              size={20}
              color={theme.colors.primary}
              style={styles.sectionIcon}
            />
            <ThemedView variant="transparent" style={styles.sectionHeaderText}>
              <ThemedText size="lg" weight="semibold" style={styles.sectionTitle}>
                {t('agent.settings.languageTitle')}
              </ThemedText>
              <ThemedText variant="secondary" size="sm" style={styles.sectionSubtitle}>
                {t('agent.settings.languageSubtitle')}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <View style={styles.optionsContainer}>
            <PressableButton
              variant={language === 'ht' ? 'primary' : 'outline'}
              size="md"
              fullWidth
              onPress={() => setLanguage('ht')}
              accessibilityLabel={t('agent.settings.languageKreyol')}
              style={styles.languageButton}
            >
              <ThemedText
                size="base"
                weight="semibold"
                style={{
                  color: language === 'ht' ? '#fff' : theme.colors.primary,
                }}
              >
                {t('agent.settings.languageKreyol')}
              </ThemedText>
            </PressableButton>

            <PressableButton
              variant={language === 'fr' ? 'primary' : 'outline'}
              size="md"
              fullWidth
              onPress={() => setLanguage('fr')}
              accessibilityLabel={t('agent.settings.languageFrench')}
              style={styles.languageButton}
            >
              <ThemedText
                size="base"
                weight="semibold"
                style={{
                  color: language === 'fr' ? '#fff' : theme.colors.primary,
                }}
              >
                {t('agent.settings.languageFrench')}
              </ThemedText>
            </PressableButton>
          </View>
        </ThemedCard>

        {/* Section Notifications */}
        <ThemedCard style={styles.sectionCard}>
          <ThemedView variant="transparent" style={styles.sectionHeader}>
            <FontAwesome
              name="bell"
              size={20}
              color={theme.colors.primary}
              style={styles.sectionIcon}
            />
            <ThemedView variant="transparent" style={styles.sectionHeaderText}>
              <ThemedText size="lg" weight="semibold" style={styles.sectionTitle}>
                {t('agent.settings.notificationsTitle')}
              </ThemedText>
              <ThemedText variant="secondary" size="sm" style={styles.sectionSubtitle}>
                {t('agent.settings.notificationsSubtitle')}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <View style={styles.switchList}>
            <View style={styles.switchItem}>
              <ThemedText size="base" weight="medium" style={styles.switchLabel}>
                {t('agent.settings.enableNotifications')}
              </ThemedText>
              <Switch
                value={enableNotifications}
                onValueChange={setEnableNotifications}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.switchItem}>
              <ThemedText size="base" weight="medium" style={styles.switchLabel}>
                {t('agent.settings.alertSound')}
              </ThemedText>
              <Switch
                value={alertSound}
                onValueChange={setAlertSound}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.switchItem}>
              <ThemedText size="base" weight="medium" style={styles.switchLabel}>
                {t('agent.settings.emailNotifications')}
              </ThemedText>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </ThemedCard>

        {/* Section Synchronisation */}
        <ThemedCard style={styles.sectionCard}>
          <ThemedView variant="transparent" style={styles.sectionHeader}>
            <FontAwesome
              name="wifi"
              size={20}
              color={theme.colors.primary}
              style={styles.sectionIcon}
            />
            <ThemedView variant="transparent" style={styles.sectionHeaderText}>
              <ThemedText size="lg" weight="semibold" style={styles.sectionTitle}>
                {t('agent.settings.syncTitle')}
              </ThemedText>
              <ThemedText variant="secondary" size="sm" style={styles.sectionSubtitle}>
                {t('agent.settings.syncSubtitle')}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <View style={styles.switchList}>
            <View style={styles.switchItem}>
              <ThemedText size="base" weight="medium" style={styles.switchLabel}>
                {t('agent.settings.autoSync')}
              </ThemedText>
              <Switch
                value={autoSync}
                onValueChange={setAutoSync}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.switchItem}>
              <ThemedText size="base" weight="medium" style={styles.switchLabel}>
                {t('agent.settings.wifiOnly')}
              </ThemedText>
              <Switch
                value={wifiOnly}
                onValueChange={setWifiOnly}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </ThemedCard>

        {/* Section Apparence */}
        <ThemedCard style={styles.sectionCard}>
          <ThemedView variant="transparent" style={styles.sectionHeader}>
            <FontAwesome
              name="moon-o"
              size={20}
              color={theme.colors.primary}
              style={styles.sectionIcon}
            />
            <ThemedView variant="transparent" style={styles.sectionHeaderText}>
              <ThemedText size="lg" weight="semibold" style={styles.sectionTitle}>
                {t('agent.settings.appearanceTitle')}
              </ThemedText>
              <ThemedText variant="secondary" size="sm" style={styles.sectionSubtitle}>
                {t('agent.settings.appearanceSubtitle')}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <View style={styles.optionsContainer}>
            <PressableButton
              variant={appTheme === 'light' ? 'primary' : 'outline'}
              size="sm"
              style={styles.themeButton}
              onPress={() => setAppTheme('light')}
              accessibilityLabel={t('agent.settings.lightMode')}
            >
              <ThemedText
                size="sm"
                weight="semibold"
                style={{
                  color: appTheme === 'light' ? '#fff' : theme.colors.primary,
                }}
              >
                {t('agent.settings.lightMode')}
              </ThemedText>
            </PressableButton>

            <PressableButton
              variant={appTheme === 'dark' ? 'primary' : 'outline'}
              size="sm"
              style={styles.themeButton}
              onPress={() => setAppTheme('dark')}
              accessibilityLabel={t('agent.settings.darkMode')}
            >
              <ThemedText
                size="sm"
                weight="semibold"
                style={{
                  color: appTheme === 'dark' ? '#fff' : theme.colors.primary,
                }}
              >
                {t('agent.settings.darkMode')}
              </ThemedText>
            </PressableButton>

            <PressableButton
              variant={appTheme === 'system' ? 'primary' : 'outline'}
              size="sm"
              style={styles.themeButton}
              onPress={() => setAppTheme('system')}
              accessibilityLabel={t('agent.settings.autoMode')}
            >
              <ThemedText
                size="sm"
                weight="semibold"
                style={{
                  color: appTheme === 'system' ? '#fff' : theme.colors.primary,
                }}
              >
                {t('agent.settings.autoMode')}
              </ThemedText>
            </PressableButton>
          </View>
        </ThemedCard>

        {/* Section À propos */}
        <ThemedCard style={styles.sectionCard}>
          <ThemedView variant="transparent" style={styles.sectionHeader}>
            <FontAwesome
              name="info-circle"
              size={20}
              color={theme.colors.primary}
              style={styles.sectionIcon}
            />
            <ThemedView variant="transparent" style={styles.sectionHeaderText}>
              <ThemedText size="lg" weight="semibold" style={styles.sectionTitle}>
                {t('agent.settings.aboutTitle')}
              </ThemedText>
              <ThemedText variant="secondary" size="sm" style={styles.sectionSubtitle}>
                {t('agent.settings.aboutSubtitle')}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <PressableButton
            variant="outline"
            size="md"
            fullWidth
            onPress={handleHelpPress}
            accessibilityLabel={t('agent.settings.help')}
            style={styles.helpButton}
          >
            <FontAwesome name="question-circle" size={16} color={theme.colors.primary} />
            <ThemedText size="base" weight="semibold" style={{ color: theme.colors.primary, marginLeft: 8 }}>
              {t('agent.settings.help')}
            </ThemedText>
          </PressableButton>

          <ThemedView variant="transparent" style={styles.versionContainer}>
            <ThemedText variant="secondary" size="sm" style={styles.versionText}>
              {t('agent.settings.version')}
            </ThemedText>
          </ThemedView>
        </ThemedCard>

        {/* Section Cache */}
        <ThemedCard style={styles.sectionCard}>
          <ThemedView variant="transparent" style={styles.sectionHeader}>
            <FontAwesome
              name="trash"
              size={20}
              color={theme.colors.error}
              style={styles.sectionIcon}
            />
            <ThemedView variant="transparent" style={styles.sectionHeaderText}>
              <ThemedText size="lg" weight="semibold" style={styles.sectionTitle}>
                {t('agent.settings.cacheTitle')}
              </ThemedText>
              <ThemedText variant="secondary" size="sm" style={styles.sectionSubtitle}>
                {t('agent.settings.cacheSubtitle')}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <PressableButton
            variant="primary"
            size="md"
            fullWidth
            onPress={handleClearCache}
            accessibilityLabel={t('agent.settings.clearCache')}
            style={{ backgroundColor: theme.colors.error }}
          >
            <FontAwesome name="trash" size={16} color="#fff" />
            <ThemedText size="base" weight="semibold" style={{ color: '#fff', marginLeft: 8 }}>
              {t('agent.settings.clearCache')}
            </ThemedText>
          </PressableButton>
        </ThemedCard>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    // No specific styles needed
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  scrollContentTablet: {
    paddingHorizontal: 32,
    maxWidth: 800,
    alignSelf: 'center',
  },
  sectionCard: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  sectionIcon: {
    marginTop: 2,
  },
  sectionHeaderText: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: 4,
  },
  sectionSubtitle: {
    // No specific styles needed, inherits from ThemedText variant="secondary"
  },
  optionsContainer: {
    gap: 12,
  },
  languageButton: {
    // Styles handled by PressableButton
  },
  switchList: {
    gap: 16,
  },
  switchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  switchLabel: {
    flex: 1,
    marginRight: 16,
  },
  themeButton: {
    flex: 1,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  versionContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  versionText: {
    // No specific styles needed
  },
});

