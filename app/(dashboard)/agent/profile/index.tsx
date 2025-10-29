import {
    ThemedButton,
    ThemedCard,
    ThemedInput,
    ThemedText,
    ThemedView
} from '@/components/ThemedComponents';
import { useResponsive } from '@/hooks/useResponsive';
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
      
      Alert.alert('Succès', 'Profil mis à jour avec succès !');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de mettre à jour le profil');
    } finally {
      setIsSaving(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setIsSaving(true);
    
    try {
      // Simulation de changement de mot de passe
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert('Succès', 'Mot de passe modifié avec succès !');
      resetPasswordForm();
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de modifier le mot de passe');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
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
    { key: 'profile', label: 'Profil', icon: 'user' as const },
    { key: 'password', label: 'Mot de passe', icon: 'lock' as const },
    { key: 'settings', label: 'Paramètres', icon: 'cog' as const },
  ];

  const languages = [
    { key: 'kreyol', label: 'Kreyòl' },
    { key: 'francais', label: 'Français' },
    { key: 'english', label: 'English' },
  ];

  const themes = [
    { key: 'light', label: 'Clair', icon: 'sun-o' as const },
    { key: 'dark', label: 'Sombre', icon: 'moon-o' as const },
    { key: 'system', label: 'Automatique', icon: 'circle-o' as const },
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
          <ThemedView style={styles.headerContent}>
            <FontAwesome 
              name="user-circle" 
              size={isTablet ? 60 : 50} 
              color={theme.colors.primary} 
            />
            <ThemedView style={styles.headerText}>
              <ThemedText 
                size="xl" 
                weight="bold" 
                style={styles.title}
                accessibilityLabel="Profil agent"
              >
                Mon Profil
              </ThemedText>
              <ThemedText 
                variant="secondary" 
                size="sm"
                accessibilityLabel="Gestion du profil et des paramètres"
              >
                Profil et paramètres
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedCard>

        {/* Onglets */}
        <ThemedCard style={styles.tabsCard}>
          <ThemedView style={styles.tabsContainer}>
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
            accessibilityLabel="Informations générales"
          >
            Informations générales
          </ThemedText>
          
          <ThemedView style={styles.infoGrid}>
            <ThemedView style={styles.infoItem}>
              <ThemedText variant="secondary" size="sm">
                Rôle
              </ThemedText>
              <ThemedText size="base" weight="medium">
                {mockProfile.role}
              </ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.infoItem}>
              <ThemedText variant="secondary" size="sm">
                Enregistré le
              </ThemedText>
              <ThemedText size="base" weight="medium">
                {mockProfile.registrationDate}
              </ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.infoItem}>
              <ThemedText variant="secondary" size="sm">
                Total enregistrements
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
              accessibilityLabel="Modifier le profil"
            >
              Modifier le profil
            </ThemedText>

            {/* Prénom */}
            <ThemedView style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel="Prénom"
              >
                Prénom *
              </ThemedText>
              <Controller
                control={profileControl}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder="Prénom"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={profileErrors.firstName ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    accessibilityLabel="Champ prénom"
                    accessibilityHint="Modifiez votre prénom"
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
            <ThemedView style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel="Nom de famille"
              >
                Nom de famille *
              </ThemedText>
              <Controller
                control={profileControl}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder="Nom de famille"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={profileErrors.lastName ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    accessibilityLabel="Champ nom de famille"
                    accessibilityHint="Modifiez votre nom de famille"
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
            <ThemedView style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel="Email"
              >
                Email *
              </ThemedText>
              <Controller
                control={profileControl}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder="Email"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={profileErrors.email ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    keyboardType="email-address"
                    accessibilityLabel="Champ email"
                    accessibilityHint="Modifiez votre adresse email"
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
            <ThemedView style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel="Téléphone"
              >
                Téléphone *
              </ThemedText>
              <Controller
                control={profileControl}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder="Numéro de téléphone"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={profileErrors.phone ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    keyboardType="phone-pad"
                    accessibilityLabel="Champ téléphone"
                    accessibilityHint="Modifiez votre numéro de téléphone"
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
            <ThemedView style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel="Adresse"
              >
                Adresse *
              </ThemedText>
              <Controller
                control={profileControl}
                name="address"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder="Adresse complète"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={profileErrors.address ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    multiline
                    numberOfLines={3}
                    accessibilityLabel="Champ adresse"
                    accessibilityHint="Modifiez votre adresse"
                    style={[styles.input, styles.multilineInput]}
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
              accessibilityLabel="Bouton sauvegarder profil"
              accessibilityHint="Sauvegarde les modifications du profil"
              style={styles.saveButton}
            >
              {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
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
              accessibilityLabel="Changer le mot de passe"
            >
              Changer le mot de passe
            </ThemedText>

            {/* Mot de passe actuel */}
            <ThemedView style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel="Mot de passe actuel"
              >
                Mot de passe actuel *
              </ThemedText>
              <Controller
                control={passwordControl}
                name="currentPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder="Mot de passe actuel"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={passwordErrors.currentPassword ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    secureTextEntry
                    accessibilityLabel="Champ mot de passe actuel"
                    accessibilityHint="Saisissez votre mot de passe actuel"
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
            <ThemedView style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel="Nouveau mot de passe"
              >
                Nouveau mot de passe *
              </ThemedText>
              <Controller
                control={passwordControl}
                name="newPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder="Nouveau mot de passe"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={passwordErrors.newPassword ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    secureTextEntry
                    accessibilityLabel="Champ nouveau mot de passe"
                    accessibilityHint="Saisissez votre nouveau mot de passe"
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
            <ThemedView style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel="Confirmer le mot de passe"
              >
                Confirmer le mot de passe *
              </ThemedText>
              <Controller
                control={passwordControl}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder="Confirmer le mot de passe"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={passwordErrors.confirmPassword ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    secureTextEntry
                    accessibilityLabel="Champ confirmation mot de passe"
                    accessibilityHint="Confirmez votre nouveau mot de passe"
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
              accessibilityLabel="Bouton changer mot de passe"
              accessibilityHint="Change le mot de passe"
              style={styles.saveButton}
            >
              {isSaving ? 'Modification...' : 'Changer le mot de passe'}
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
              accessibilityLabel="Paramètres de l'application"
            >
              Paramètres de l'application
            </ThemedText>

            {/* Langue */}
            <ThemedView style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel="Langue de l'application"
              >
                Langue
              </ThemedText>
              <ThemedView style={styles.optionsContainer}>
                {languages.map((language) => (
                  <ThemedButton
                    key={language.key}
                    variant="outline"
                    size="sm"
                    style={styles.optionButton}
                    accessibilityLabel={`Langue ${language.label}`}
                    accessibilityHint={`Change la langue vers ${language.label}`}
                  >
                    <ThemedText size="sm">
                      {language.label}
                    </ThemedText>
                  </ThemedButton>
                ))}
              </ThemedView>
            </ThemedView>

            {/* Thème */}
            <ThemedView style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel="Thème de l'application"
              >
                Thème
              </ThemedText>
              <ThemedView style={styles.optionsContainer}>
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
            <ThemedView style={styles.inputContainer}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel="Notifications"
              >
                Notifications
              </ThemedText>
              <ThemedView style={styles.switchContainer}>
                <ThemedText variant="secondary" size="sm">
                  Recevoir les notifications push
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
            accessibilityLabel="Bouton retour"
            accessibilityHint="Retourne à l'écran précédent"
            style={styles.button}
          >
            Retour
          </ThemedButton>
          
          <ThemedButton
            variant="outline"
            size="lg"
            fullWidth
            onPress={handleLogout}
            style={[styles.button, { borderColor: theme.colors.error }]}
            accessibilityLabel="Bouton déconnexion"
            accessibilityHint="Se déconnecter de l'application"
          >
            <FontAwesome name="sign-out" size={16} color={theme.colors.error} />
            <ThemedText size="base" style={{ color: theme.colors.error, marginLeft: 8 }}>
              Déconnexion
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
