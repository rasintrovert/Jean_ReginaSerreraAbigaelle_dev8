import {
    ThemedButton,
    ThemedCard,
    ThemedInput,
    ThemedText,
    ThemedView
} from '@/components/ThemedComponents';
import { useResponsive } from '@/hooks/useResponsive';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguageStore } from '@/store/languageStore';
import { useThemeStore } from '@/store/themeStore';
import { useTheme } from '@/theme';
import { FontAwesome } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { z } from 'zod';

// Schémas de validation
const profileSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(8, 'Le numéro de téléphone est requis'),
  address: z.string().min(10, 'L\'adresse doit contenir au moins 10 caractères'),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Le mot de passe actuel est requis'),
  newPassword: z.string().min(6, 'Le nouveau mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z.string().min(6, 'La confirmation est requise'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function AgentProfile() {
  const router = useRouter();
  const theme = useTheme();
  const { isTablet } = useResponsive();
  const { appTheme, setAppTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const t = useTranslation();
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'settings'>('profile');
  const [isSaving, setIsSaving] = useState(false);

  // Données simulées du profil
  const mockProfile = {
    firstName: 'Jean',
    lastName: 'Pierre',
    email: 'jean.pierre@graceregistry.ht',
    phone: '+509 1234 5678',
    address: 'Port-au-Prince, Haïti',
    role: 'Agent de terrain',
    registrationDate: '15/01/2024',
    totalRecords: 45,
  };

  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: mockProfile.firstName,
      lastName: mockProfile.lastName,
      email: mockProfile.email,
      phone: mockProfile.phone,
      address: mockProfile.address,
    },
  });

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onProfileSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    
    try {
      // Simulation de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(t('common.success'), t('agent.profile.saved'));
    } catch (error) {
      Alert.alert(t('common.error'), t('agent.profile.updateError'));
    } finally {
      setIsSaving(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setIsSaving(true);
    
    try {
      // Simulation de changement de mot de passe
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(t('common.success'), t('agent.profile.passwordChanged'));
      resetPasswordForm();
    } catch (error) {
      Alert.alert(t('common.error'), t('agent.profile.passwordError'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      t('agent.profile.logout'),
      t('agent.profile.logoutConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { 
          text: t('agent.profile.logout'), 
          style: 'destructive',
          onPress: () => {
            // TODO: Implémenter la déconnexion
            router.replace('/(auth)/login' as any);
          }
        },
      ]
    );
  };

  const tabs = [
    { key: 'profile', label: t('agent.profile.tabs.profile'), icon: 'user' as const },
    { key: 'password', label: t('agent.profile.tabs.password'), icon: 'lock' as const },
    { key: 'settings', label: t('agent.profile.tabs.settings'), icon: 'cog' as const },
  ];

  const languages = [
    { key: 'ht', label: 'Kreyòl', code: 'ht' as const },
    { key: 'fr', label: 'Français', code: 'fr' as const },
  ];

  const themes = [
    { key: 'light', label: t('agent.profile.themes.light'), icon: 'sun-o' as const },
    { key: 'dark', label: t('agent.profile.themes.dark'), icon: 'moon-o' as const },
    { key: 'system', label: t('agent.profile.themes.system'), icon: 'circle-o' as const },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.scrollContentTablet
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <ThemedCard style={styles.headerCard}>
          <ThemedView variant="transparent" style={styles.headerContent}>
            <FontAwesome 
              name="user-circle" 
              size={isTablet ? 60 : 50} 
              color={theme.colors.primary} 
            />
            <ThemedView variant="transparent" style={styles.headerText}>
              <ThemedText 
                size="xl" 
                weight="bold" 
                style={styles.title}
                accessibilityLabel={t('agent.profile.title')}
              >
                {t('agent.profile.title')}
              </ThemedText>
              <ThemedText 
                variant="secondary" 
                size="sm"
                accessibilityLabel={t('agent.profile.subtitle')}
              >
                {t('agent.profile.subtitle')}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedCard>

        {/* Onglets */}
        <ThemedCard style={styles.tabsCard}>
          <ThemedView variant="transparent" style={styles.tabsContainer}>
            {tabs.map((tab) => (
              <ThemedButton
                key={tab.key}
                variant={activeTab === tab.key ? 'primary' : 'ghost'}
                size="sm"
                onPress={() => setActiveTab(tab.key as any)}
                accessibilityLabel={`Onglet ${tab.label}`}
                accessibilityHint={`Affiche la section ${tab.label}`}
                style={styles.tabButton}
              >
                <FontAwesome 
                  name={tab.icon} 
                  size={14} 
                  color={activeTab === tab.key ? '#fff' : theme.colors.primary} 
                  style={styles.tabIcon}
                />
                <ThemedText 
                  size="xs" 
                  weight="semibold"
                  style={{ 
                    color: activeTab === tab.key ? '#fff' : theme.colors.primary 
                  }}
                >
                  {tab.label}
                </ThemedText>
              </ThemedButton>
            ))}
          </ThemedView>
        </ThemedCard>

        {/* Informations générales */}
        <ThemedCard style={styles.infoCard}>
          <ThemedText 
            size="lg" 
            weight="semibold" 
            style={styles.sectionTitle}
            accessibilityLabel={t('agent.profile.generalInfo')}
          >
            {t('agent.profile.generalInfo')}
          </ThemedText>
          
          <ThemedView variant="transparent" style={styles.infoGrid}>
            <ThemedView variant="transparent" style={styles.infoItem}>
              <ThemedText variant="secondary" size="sm">
                {t('agent.profile.role')}
              </ThemedText>
              <ThemedText size="base" weight="medium">
                {mockProfile.role}
              </ThemedText>
            </ThemedView>
            
            <ThemedView variant="transparent" style={styles.infoItem}>
              <ThemedText variant="secondary" size="sm">
                {t('agent.profile.registeredOn')}
              </ThemedText>
              <ThemedText size="base" weight="medium">
                {mockProfile.registrationDate}
              </ThemedText>
            </ThemedView>
            
            <ThemedView variant="transparent" style={styles.infoItem}>
              <ThemedText variant="secondary" size="sm">
                {t('agent.profile.totalRecords')}
              </ThemedText>
              <ThemedText size="base" weight="medium" style={{ color: theme.colors.success }}>
                {mockProfile.totalRecords}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedCard>

        {/* Onglet Profil */}
        {activeTab === 'profile' && (
          <ThemedCard style={styles.formCard}>
            <ThemedText 
              size="lg" 
              weight="semibold" 
              style={styles.sectionTitle}
              accessibilityLabel={t('agent.profile.editProfile')}
            >
              {t('agent.profile.editProfile')}
            </ThemedText>

            {/* Prénom */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel={t('agent.profile.firstName')}
              >
                {t('agent.profile.firstName')} *
              </ThemedText>
              <Controller
                control={profileControl}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t('agent.profile.firstName')}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={profileErrors.firstName ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    accessibilityLabel={t('agent.profile.firstName')}
                    accessibilityHint={t('agent.profile.firstName')}
                    style={styles.input}
                  />
                )}
              />
              {profileErrors.firstName && (
                <ThemedText variant="error" size="xs" style={styles.errorText}>
                  {profileErrors.firstName.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Nom */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel={t('agent.profile.lastName')}
              >
                {t('agent.profile.lastName')} *
              </ThemedText>
              <Controller
                control={profileControl}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t('agent.profile.lastName')}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={profileErrors.lastName ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    accessibilityLabel={t('agent.profile.lastName')}
                    accessibilityHint={t('agent.profile.lastName')}
                    style={styles.input}
                  />
                )}
              />
              {profileErrors.lastName && (
                <ThemedText variant="error" size="xs" style={styles.errorText}>
                  {profileErrors.lastName.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Email */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel={t('agent.profile.email')}
              >
                {t('agent.profile.email')} *
              </ThemedText>
              <Controller
                control={profileControl}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t('agent.profile.email')}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={profileErrors.email ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    keyboardType="email-address"
                    accessibilityLabel={t('agent.profile.email')}
                    accessibilityHint={t('agent.profile.email')}
                    style={styles.input}
                  />
                )}
              />
              {profileErrors.email && (
                <ThemedText variant="error" size="xs" style={styles.errorText}>
                  {profileErrors.email.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Téléphone */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel={t('agent.profile.phone')}
              >
                {t('agent.profile.phone')} *
              </ThemedText>
              <Controller
                control={profileControl}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t('agent.profile.phone')}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={profileErrors.phone ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    keyboardType="phone-pad"
                    accessibilityLabel={t('agent.profile.phone')}
                    accessibilityHint={t('agent.profile.phone')}
                    style={styles.input}
                  />
                )}
              />
              {profileErrors.phone && (
                <ThemedText variant="error" size="xs" style={styles.errorText}>
                  {profileErrors.phone.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Adresse */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel={t('agent.profile.address')}
              >
                {t('agent.profile.address')} *
              </ThemedText>
              <Controller
                control={profileControl}
                name="address"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t('agent.profile.address')}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={profileErrors.address ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    multiline
                    numberOfLines={3}
                    accessibilityLabel={t('agent.profile.address')}
                    accessibilityHint={t('agent.profile.address')}
                    style={{ ...styles.input, ...styles.multilineInput }}
                  />
                )}
              />
              {profileErrors.address && (
                <ThemedText variant="error" size="xs" style={styles.errorText}>
                  {profileErrors.address.message}
                </ThemedText>
              )}
            </ThemedView>

            <ThemedButton
              variant="primary"
              size="lg"
              fullWidth
              onPress={handleProfileSubmit(onProfileSubmit)}
              disabled={isSaving}
              accessibilityLabel={t('common.save')}
              accessibilityHint={t('common.save')}
              style={styles.saveButton}
            >
              {isSaving ? t('agent.profile.saving') : t('agent.profile.savingText')}
            </ThemedButton>
          </ThemedCard>
        )}

        {/* Onglet Mot de passe */}
        {activeTab === 'password' && (
          <ThemedCard style={styles.formCard}>
            <ThemedText 
              size="lg" 
              weight="semibold" 
              style={styles.sectionTitle}
              accessibilityLabel={t('agent.profile.changePassword')}
            >
              {t('agent.profile.changePassword')}
            </ThemedText>

            {/* Mot de passe actuel */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel={t('agent.profile.currentPassword')}
              >
                {t('agent.profile.currentPassword')} *
              </ThemedText>
              <Controller
                control={passwordControl}
                name="currentPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t('agent.profile.currentPassword')}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={passwordErrors.currentPassword ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    secureTextEntry
                    accessibilityLabel={t('agent.profile.currentPassword')}
                    accessibilityHint={t('agent.profile.currentPassword')}
                    style={styles.input}
                  />
                )}
              />
              {passwordErrors.currentPassword && (
                <ThemedText variant="error" size="xs" style={styles.errorText}>
                  {passwordErrors.currentPassword.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Nouveau mot de passe */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel={t('agent.profile.newPassword')}
              >
                {t('agent.profile.newPassword')} *
              </ThemedText>
              <Controller
                control={passwordControl}
                name="newPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t('agent.profile.newPassword')}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={passwordErrors.newPassword ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    secureTextEntry
                    accessibilityLabel={t('agent.profile.newPassword')}
                    accessibilityHint={t('agent.profile.newPassword')}
                    style={styles.input}
                  />
                )}
              />
              {passwordErrors.newPassword && (
                <ThemedText variant="error" size="xs" style={styles.errorText}>
                  {passwordErrors.newPassword.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Confirmation */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel={t('agent.profile.confirmPassword')}
              >
                {t('agent.profile.confirmPassword')} *
              </ThemedText>
              <Controller
                control={passwordControl}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t('agent.profile.confirmPassword')}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={passwordErrors.confirmPassword ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    secureTextEntry
                    accessibilityLabel={t('agent.profile.confirmPassword')}
                    accessibilityHint={t('agent.profile.confirmPassword')}
                    style={styles.input}
                  />
                )}
              />
              {passwordErrors.confirmPassword && (
                <ThemedText variant="error" size="xs" style={styles.errorText}>
                  {passwordErrors.confirmPassword.message}
                </ThemedText>
              )}
            </ThemedView>

            <ThemedButton
              variant="primary"
              size="lg"
              fullWidth
              onPress={handlePasswordSubmit(onPasswordSubmit)}
              disabled={isSaving}
              accessibilityLabel={t('agent.profile.changePassword')}
              accessibilityHint={t('agent.profile.changePassword')}
              style={styles.saveButton}
            >
              {isSaving ? t('agent.profile.changing') : t('agent.profile.changingPassword')}
            </ThemedButton>
          </ThemedCard>
        )}

        {/* Onglet Paramètres */}
        {activeTab === 'settings' && (
          <ThemedCard style={styles.formCard}>
            <ThemedText 
              size="lg" 
              weight="semibold" 
              style={styles.sectionTitle}
              accessibilityLabel={t('agent.profile.appSettings')}
            >
              {t('agent.profile.appSettings')}
            </ThemedText>

            {/* Langue */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel={t('agent.profile.language')}
              >
                {t('agent.profile.language')}
              </ThemedText>
              <ThemedView variant="transparent" style={styles.optionsContainer}>
                {languages.map((lang) => (
                  <ThemedButton
                    key={lang.key}
                    variant={language === lang.code ? 'primary' : 'outline'}
                    size="sm"
                    onPress={() => setLanguage(lang.code)}
                    style={styles.optionButton}
                    accessibilityLabel={`${t('agent.profile.language')} ${lang.label}`}
                    accessibilityHint={`Change lang a ${lang.label}`}
                  >
                    <ThemedText 
                      size="sm"
                      style={{ 
                        color: language === lang.code ? '#fff' : theme.colors.primary 
                      }}
                    >
                      {lang.label}
                    </ThemedText>
                  </ThemedButton>
                ))}
              </ThemedView>
            </ThemedView>

            {/* Thème */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel={t('agent.profile.theme')}
              >
                {t('agent.profile.theme')}
              </ThemedText>
              <ThemedView variant="transparent" style={styles.optionsContainer}>
                {themes.map((themeOption) => (
                  <ThemedButton
                    key={themeOption.key}
                    variant={appTheme === themeOption.key ? 'primary' : 'outline'}
                    size="sm"
                    onPress={() => setAppTheme(themeOption.key as any)}
                    style={styles.optionButton}
                    accessibilityLabel={`Thème ${themeOption.label}`}
                    accessibilityHint={`Change le thème vers ${themeOption.label}`}
                  >
                    <FontAwesome 
                      name={themeOption.icon} 
                      size={12} 
                      color={appTheme === themeOption.key ? '#fff' : theme.colors.primary} 
                      style={styles.optionIcon}
                    />
                    <ThemedText 
                      size="sm"
                      style={{ 
                        color: appTheme === themeOption.key ? '#fff' : theme.colors.primary 
                      }}
                    >
                      {themeOption.label}
                    </ThemedText>
                  </ThemedButton>
                ))}
              </ThemedView>
            </ThemedView>

            {/* Notifications */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel={t('agent.profile.notifications')}
              >
                {t('agent.profile.notifications')}
              </ThemedText>
              <ThemedView variant="transparent" style={styles.switchContainer}>
                <ThemedText variant="secondary" size="sm">
                  {t('agent.profile.receiveNotifications')}
                </ThemedText>
                <ThemedButton
                  variant="outline"
                  size="sm"
                  style={styles.switchButton}
                  accessibilityLabel="Activer/désactiver notifications"
                  accessibilityHint="Active ou désactive les notifications"
                >
                  <FontAwesome name="toggle-on" size={16} color={theme.colors.success} />
                </ThemedButton>
              </ThemedView>
            </ThemedView>
          </ThemedCard>
        )}

        {/* Actions */}
        <ThemedView style={styles.actionsContainer}>
          <ThemedButton
            variant="outline"
            size="lg"
            fullWidth
            onPress={() => router.back()}
            accessibilityLabel={t('common.back')}
            accessibilityHint={t('common.back')}
            style={styles.button}
          >
            {t('common.back')}
          </ThemedButton>
          
          <ThemedButton
            variant="outline"
            size="lg"
            fullWidth
            onPress={handleLogout}
            style={{ ...styles.button, borderColor: theme.colors.error }}
            accessibilityLabel={t('agent.profile.logout')}
            accessibilityHint={t('agent.profile.logout')}
          >
            <FontAwesome name="sign-out" size={16} color={theme.colors.error} />
            <ThemedText size="base" style={{ color: theme.colors.error, marginLeft: 8 }}>
              {t('agent.profile.logout')}
            </ThemedText>
          </ThemedButton>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  headerCard: {
    marginBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerText: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  tabsCard: {
    marginBottom: 24,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tabIcon: {
    marginRight: 2,
  },
  infoCard: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formCard: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    marginBottom: 4,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  errorText: {
    marginTop: 4,
    marginLeft: 4,
  },
  saveButton: {
    marginTop: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minWidth: 80,
  },
  optionIcon: {
    marginRight: 2,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  button: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
