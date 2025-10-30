import {
  ThemedButton,
  ThemedCard,
  ThemedInput,
  ThemedText,
  ThemedView
} from '@/components/ThemedComponents';
import { useResponsive } from '@/hooks/useResponsive';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/theme';
import { FontAwesome } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Linking, ScrollView, StyleSheet } from 'react-native';
import { z } from 'zod';

// Schéma de validation pour l'urgence
const emergencySchema = z.object({
  emergencyType: z.string().min(1, 'Le type d\'urgence est requis'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  location: z.string().min(5, 'Le lieu doit contenir au moins 5 caractères'),
  contactPhone: z.string().min(8, 'Le numéro de contact est requis'),
  urgencyLevel: z.enum(['low', 'medium', 'high', 'critical'], { required_error: 'Le niveau d\'urgence est requis' }),
});

type EmergencyFormData = z.infer<typeof emergencySchema>;

export default function EmergencyScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { isTablet } = useResponsive();
  const t = useTranslation();
  const [isSending, setIsSending] = useState(false);
  const [showUrgencyPicker, setShowUrgencyPicker] = useState(false);
  const [selectedUrgency, setSelectedUrgency] = useState<'low' | 'medium' | 'high' | 'critical' | ''>('');

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<EmergencyFormData>({
    resolver: zodResolver(emergencySchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: EmergencyFormData) => {
    setIsSending(true);
    
    try {
      // Simulation d'envoi d'urgence
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        t('agent.emergency.reported'),
        t('agent.emergency.reportedDesc'),
        [
          {
            text: t('common.confirm'),
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(t('common.error'), t('agent.emergency.sendReport'));
    } finally {
      setIsSending(false);
    }
  };

  const callEmergency = (number: string) => {
    Alert.alert(
      t('agent.emergency.callEmergency'),
      t('agent.emergency.callEmergencyDesc', { number }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { 
          text: t('agent.emergency.call'), 
          onPress: () => Linking.openURL(`tel:${number}`)
        },
      ]
    );
  };

  const emergencyNumbers = [
    { name: t('agent.emergency.police'), number: '114', icon: 'shield' as const, color: theme.colors.primary },
    { name: t('agent.emergency.firefighters'), number: '115', icon: 'fire' as const, color: theme.colors.error },
    { name: t('agent.emergency.ambulance'), number: '116', icon: 'ambulance' as const, color: theme.colors.success },
    { name: t('agent.emergency.medicalEmergency'), number: '118', icon: 'hospital-o' as const, color: theme.colors.info },
  ];

  const urgencyLevels = [
    { value: 'low', label: t('agent.emergency.urgencyLevels.low'), color: theme.colors.success },
    { value: 'medium', label: t('agent.emergency.urgencyLevels.medium'), color: theme.colors.warning },
    { value: 'high', label: t('agent.emergency.urgencyLevels.high'), color: theme.colors.error },
    { value: 'critical', label: t('agent.emergency.urgencyLevels.critical'), color: '#8B0000' },
  ];

  const safetyTips = [
    {
      title: t('agent.emergency.tips.imminentBirth'),
      tips: [
        t('agent.emergency.tips.imminentBirthTip1'),
        t('agent.emergency.tips.imminentBirthTip2'),
        t('agent.emergency.tips.imminentBirthTip3'),
        t('agent.emergency.tips.imminentBirthTip4'),
        t('agent.emergency.tips.imminentBirthTip5')
      ]
    },
    {
      title: t('agent.emergency.tips.medicalEmergencyTitle'),
      tips: [
        t('agent.emergency.tips.medicalEmergencyTip1'),
        t('agent.emergency.tips.medicalEmergencyTip2'),
        t('agent.emergency.tips.medicalEmergencyTip3'),
        t('agent.emergency.tips.medicalEmergencyTip4'),
        t('agent.emergency.tips.medicalEmergencyTip5')
      ]
    },
    {
      title: t('agent.emergency.tips.dangerTitle'),
      tips: [
        t('agent.emergency.tips.dangerTip1'),
        t('agent.emergency.tips.dangerTip2'),
        t('agent.emergency.tips.dangerTip3'),
        t('agent.emergency.tips.dangerTip4'),
        t('agent.emergency.tips.dangerTip5')
      ]
    }
  ];

  const formData = watch();

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.scrollContentTablet
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header d'urgence */}
        <ThemedCard style={{ ...styles.headerCard, borderLeftWidth: 4, borderLeftColor: theme.colors.error }}>
          <ThemedView variant="transparent" style={styles.headerContent}>
            <FontAwesome 
              name="exclamation-triangle" 
              size={isTablet ? 40 : 32} 
              color={theme.colors.error} 
            />
            <ThemedView variant="transparent" style={styles.headerText}>
              <ThemedText 
                size="xl" 
                weight="bold" 
                style={{ ...styles.title, color: theme.colors.error }}
                accessibilityLabel={t('agent.emergency.title')}
              >
                {t('agent.emergency.title')}
              </ThemedText>
              <ThemedText 
                variant="secondary" 
                size="sm"
                accessibilityLabel={t('agent.emergency.subtitle')}
              >
                {t('agent.emergency.subtitle')}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedCard>

        {/* Numéros d'urgence */}
        <ThemedCard style={styles.emergencyCard}>
          <ThemedText 
            size="lg" 
            weight="semibold" 
            style={styles.sectionTitle}
            accessibilityLabel={t('agent.emergency.emergencyNumbers')}
          >
            📞 {t('agent.emergency.emergencyNumbers')}
          </ThemedText>
          
          <ThemedView variant="transparent" style={styles.emergencyGrid}>
            {emergencyNumbers.map((emergency) => (
              <ThemedButton
                key={emergency.number}
                variant="outline"
                style={{ ...styles.emergencyButton, borderColor: emergency.color }}
                onPress={() => callEmergency(emergency.number)}
                accessibilityLabel={`Appeler ${emergency.name} - ${emergency.number}`}
                accessibilityHint={`Appuie pour appeler ${emergency.name}`}
              >
                <ThemedView variant="transparent" style={styles.emergencyButtonContent}>
                  <FontAwesome 
                    name={emergency.icon} 
                    size={20} 
                    color={emergency.color} 
                  />
                  <ThemedView variant="transparent" style={styles.emergencyButtonText}>
                    <ThemedText 
                      size="sm" 
                      weight="semibold"
                      style={{ color: emergency.color }}
                    >
                      {emergency.name}
                    </ThemedText>
                    <ThemedText 
                      size="lg" 
                      weight="bold"
                      style={{ color: emergency.color }}
                    >
                      {emergency.number}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
              </ThemedButton>
            ))}
          </ThemedView>
        </ThemedCard>

        {/* Conseils de sécurité */}
        <ThemedCard style={styles.tipsCard}>
          <ThemedText 
            size="lg" 
            weight="semibold" 
            style={styles.sectionTitle}
            accessibilityLabel={t('agent.emergency.safetyTips')}
          >
            🚨 {t('agent.emergency.safetyTips')}
          </ThemedText>
          
          {safetyTips.map((tip, index) => (
            <ThemedView key={index} variant="transparent" style={styles.tipSection}>
              <ThemedText 
                size="base" 
                weight="semibold" 
                style={styles.tipTitle}
                accessibilityLabel={tip.title}
              >
                {tip.title}
              </ThemedText>
              {tip.tips.map((tipText, tipIndex) => (
                <ThemedView key={tipIndex} variant="transparent" style={styles.tipItem}>
                  <FontAwesome 
                    name="check-circle" 
                    size={12} 
                    color={theme.colors.success} 
                    style={styles.tipIcon}
                  />
                  <ThemedText 
                    variant="secondary" 
                    size="sm" 
                    style={styles.tipText}
                    accessibilityLabel={`Conseil ${tipIndex + 1}: ${tipText}`}
                  >
                    {tipText}
                  </ThemedText>
                </ThemedView>
              ))}
            </ThemedView>
          ))}
        </ThemedCard>

        {/* Formulaire de signalement */}
        <ThemedCard style={styles.formCard}>
          <ThemedText 
            size="lg" 
            weight="semibold" 
            style={styles.sectionTitle}
            accessibilityLabel={t('agent.emergency.detailedReport')}
          >
            📝 {t('agent.emergency.detailedReport')}
          </ThemedText>

          {/* Type d'urgence */}
          <ThemedView variant="transparent" style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel={t('agent.emergency.emergencyType')}
            >
              {t('agent.emergency.emergencyType')} *
            </ThemedText>
            <Controller
              control={control}
              name="emergencyType"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder={t('agent.emergency.emergencyTypePlaceholder')}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.emergencyType ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  accessibilityLabel={t('agent.emergency.emergencyType')}
                  accessibilityHint={t('agent.emergency.emergencyType')}
                  style={styles.input}
                />
              )}
            />
            {errors.emergencyType && (
              <ThemedText variant="error" size="xs" style={styles.errorText}>
                {errors.emergencyType.message}
              </ThemedText>
            )}
          </ThemedView>

          {/* Niveau d'urgence */}
          <ThemedView variant="transparent" style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel={t('agent.emergency.urgencyLevel')}
            >
              {t('agent.emergency.urgencyLevel')} *
            </ThemedText>
            <ThemedView variant="transparent" style={styles.urgencyButtons}>
              {urgencyLevels.map((level) => (
                <ThemedButton
                  key={level.value}
                  variant={selectedUrgency === level.value ? 'primary' : 'outline'}
                  size="sm"
                  style={{
                    ...styles.urgencyButton,
                    borderColor: level.color,
                    backgroundColor: selectedUrgency === level.value ? level.color : 'transparent'
                  }}
                  onPress={() => {
                    setSelectedUrgency(level.value as 'low' | 'medium' | 'high' | 'critical');
                    setValue('urgencyLevel', level.value as 'low' | 'medium' | 'high' | 'critical');
                  }}
                  accessibilityLabel={`Niveau d'urgence ${level.label}`}
                  accessibilityHint={`Sélectionne le niveau d'urgence ${level.label}`}
                >
                  <ThemedText 
                    size="xs" 
                    weight="semibold"
                    style={{ 
                      color: selectedUrgency === level.value ? '#fff' : level.color 
                    }}
                  >
                    {level.label}
                  </ThemedText>
                </ThemedButton>
              ))}
            </ThemedView>
            {errors.urgencyLevel && (
              <ThemedText variant="error" size="xs" style={styles.errorText}>
                {errors.urgencyLevel.message}
              </ThemedText>
            )}
          </ThemedView>

          {/* Description */}
          <ThemedView variant="transparent" style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel={t('agent.emergency.description')}
            >
              {t('agent.emergency.description')} *
            </ThemedText>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder={t('agent.emergency.descriptionPlaceholder')}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.description ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  multiline
                  numberOfLines={5}
                  accessibilityLabel={t('agent.emergency.description')}
                  accessibilityHint={t('agent.emergency.description')}
                  style={{ ...styles.input, ...styles.multilineInput }}
                />
              )}
            />
            {errors.description && (
              <ThemedText variant="error" size="xs" style={styles.errorText}>
                {errors.description.message}
              </ThemedText>
            )}
          </ThemedView>

          {/* Lieu */}
          <ThemedView variant="transparent" style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel={t('agent.emergency.location')}
            >
              {t('agent.emergency.location')} *
            </ThemedText>
            <Controller
              control={control}
              name="location"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder={t('agent.emergency.locationPlaceholder')}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.location ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  accessibilityLabel={t('agent.emergency.location')}
                  accessibilityHint={t('agent.emergency.location')}
                  style={styles.input}
                />
              )}
            />
            {errors.location && (
              <ThemedText variant="error" size="xs" style={styles.errorText}>
                {errors.location.message}
              </ThemedText>
            )}
          </ThemedView>

          {/* Contact */}
          <ThemedView variant="transparent" style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel={t('agent.emergency.contactPhone')}
            >
              {t('agent.emergency.contactPhone')} *
            </ThemedText>
            <Controller
              control={control}
              name="contactPhone"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder={t('agent.profile.phone')}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.contactPhone ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  keyboardType="phone-pad"
                  accessibilityLabel={t('agent.emergency.contactPhone')}
                  accessibilityHint={t('agent.profile.phone')}
                  style={styles.input}
                />
              )}
            />
            {errors.contactPhone && (
              <ThemedText variant="error" size="xs" style={styles.errorText}>
                {errors.contactPhone.message}
              </ThemedText>
            )}
          </ThemedView>
        </ThemedCard>

        {/* Actions */}
        <ThemedView style={styles.actionsContainer}>
          <ThemedButton
            variant="outline"
            size="lg"
            fullWidth
            onPress={() => router.back()}
            accessibilityLabel={t('common.cancel')}
            accessibilityHint={t('common.cancel')}
            style={styles.button}
          >
            {t('common.cancel')}
          </ThemedButton>
          
          <ThemedButton
            variant="primary"
            size="lg"
            fullWidth
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || isSending}
            style={{ ...styles.button, backgroundColor: theme.colors.error }}
            accessibilityLabel={t('agent.emergency.sendReport')}
            accessibilityHint={t('agent.emergency.sendReport')}
          >
            {isSending ? t('agent.emergency.sending') : t('agent.emergency.sendReport')}
          </ThemedButton>
        </ThemedView>

        {/* Avertissement */}
        <ThemedCard style={{ ...styles.warningCard, backgroundColor: 'rgba(220, 53, 69, 0.1)', borderLeftWidth: 4, borderLeftColor: theme.colors.error }}>
          <FontAwesome 
            name="warning" 
            size={20} 
            color={theme.colors.error} 
            style={styles.warningIcon}
          />
          <ThemedView variant="transparent" style={styles.warningContent}>
            <ThemedText 
              size="base" 
              weight="semibold"
              style={{ color: theme.colors.error }}
              accessibilityLabel={t('agent.emergency.warning')}
            >
              ⚠️ {t('agent.emergency.warning')}
            </ThemedText>
            <ThemedText 
              variant="secondary" 
              size="sm"
              style={styles.warningText}
            >
              {t('agent.emergency.warningText')}
            </ThemedText>
          </ThemedView>
        </ThemedCard>
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
  emergencyCard: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  emergencyGrid: {
    gap: 12,
  },
  emergencyButton: {
    padding: 0,
  },
  emergencyButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
  },
  emergencyButtonText: {
    flex: 1,
  },
  tipsCard: {
    marginBottom: 24,
  },
  tipSection: {
    marginBottom: 16,
  },
  tipTitle: {
    marginBottom: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 4,
  },
  tipIcon: {
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    lineHeight: 18,
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
    minHeight: 100,
    textAlignVertical: 'top',
  },
  urgencyButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  urgencyButton: {
    flex: 1,
    minWidth: 80,
  },
  errorText: {
    marginTop: 4,
    marginLeft: 4,
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  button: {
    marginBottom: 8,
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  warningIcon: {
    marginTop: 2,
  },
  warningContent: {
    flex: 1,
  },
  warningText: {
    marginTop: 4,
    lineHeight: 18,
  },
});
