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
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { z } from 'zod';

// Schéma de validation pour la grossesse
const pregnancySchema = z.object({
  motherFirstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  motherLastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  motherBirthDate: z.string().min(1, 'La date de naissance est requise'),
  motherContact: z.string().min(8, 'Le contact doit contenir au moins 8 caractères'),
  motherAddress: z.string().min(10, 'L\'adresse doit contenir au moins 10 caractères'),
  expectedDeliveryDate: z.string().min(1, 'La date prévue d\'accouchement est requise'),
  notes: z.string().optional(),
});

type PregnancyFormData = z.infer<typeof pregnancySchema>;

export default function PregnancyRegistration() {
  const router = useRouter();
  const theme = useTheme();
  const { isTablet } = useResponsive();
  const t = useTranslation();
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<PregnancyFormData>({
    resolver: zodResolver(pregnancySchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: PregnancyFormData) => {
    try {
      // Simulation de sauvegarde
      console.log('Données grossesse:', data);
      
      Alert.alert(
        t('common.success'),
        t('agent.pregnancy.saved'),
        [
          {
            text: t('common.confirm'),
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(t('common.error'), t('errors.saveFailed'));
    }
  };

  const generateProof = async () => {
    setIsGeneratingProof(true);
    
    try {
      // Simulation de génération de preuve
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        t('agent.pregnancy.proofGenerated'),
        t('agent.pregnancy.proofGenerated'),
        [
          {
            text: t('agent.history.viewProof'),
            onPress: () => {
              // TODO: Ouvrir la preuve générée
              console.log('Ouvrir preuve générée');
            },
          },
          {
            text: t('common.confirm'),
            style: 'cancel',
          },
        ]
      );
    } catch (error) {
      Alert.alert(t('common.error'), t('errors.saveFailed'));
    } finally {
      setIsGeneratingProof(false);
    }
  };

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
        {/* Header */}
        <ThemedCard style={styles.headerCard}>
          <ThemedView variant="transparent" style={styles.headerContent}>
            <FontAwesome 
              name="heart" 
              size={isTablet ? 40 : 32} 
              color={theme.colors.success} 
            />
            <ThemedView variant="transparent" style={styles.headerText}>
              <ThemedText 
                size="xl" 
                weight="bold" 
                style={styles.title}
                accessibilityLabel={t('agent.pregnancy.title')}
              >
                {t('agent.pregnancy.title')}
              </ThemedText>
              <ThemedText 
                variant="secondary" 
                size="sm"
                accessibilityLabel={t('agent.pregnancy.subtitle')}
              >
                {t('agent.pregnancy.subtitle')}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedCard>

        {/* Formulaire */}
        <ThemedCard style={styles.formCard}>
          <ThemedText 
            size="lg" 
            weight="semibold" 
            style={styles.sectionTitle}
            accessibilityLabel={t('agent.pregnancy.subtitle')}
          >
            {t('agent.pregnancy.subtitle')}
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
              control={control}
              name="motherFirstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder={t('agent.profile.firstName')}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.motherFirstName ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  accessibilityLabel={t('agent.profile.firstName')}
                  accessibilityHint={t('agent.profile.firstName')}
                  style={styles.input}
                />
              )}
            />
            {errors.motherFirstName && (
              <ThemedText variant="error" size="xs" style={styles.errorText}>
                {errors.motherFirstName.message}
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
              control={control}
              name="motherLastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder={t('agent.profile.lastName')}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.motherLastName ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  accessibilityLabel={t('agent.profile.lastName')}
                  accessibilityHint={t('agent.profile.lastName')}
                  style={styles.input}
                />
              )}
            />
            {errors.motherLastName && (
              <ThemedText variant="error" size="xs" style={styles.errorText}>
                {errors.motherLastName.message}
              </ThemedText>
            )}
          </ThemedView>

          {/* Date de naissance */}
          <ThemedView variant="transparent" style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel={t('agent.pregnancy.motherDob')}
            >
              {t('agent.pregnancy.motherDob')} *
            </ThemedText>
            <Controller
              control={control}
              name="motherBirthDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder="JJ/MM/AAAA"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.motherBirthDate ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  accessibilityLabel={t('agent.pregnancy.motherDob')}
                  accessibilityHint={t('agent.pregnancy.motherDob')}
                  style={styles.input}
                />
              )}
            />
            {errors.motherBirthDate && (
              <ThemedText variant="error" size="xs" style={styles.errorText}>
                {errors.motherBirthDate.message}
              </ThemedText>
            )}
          </ThemedView>

          {/* Contact */}
          <ThemedView variant="transparent" style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel={t('agent.pregnancy.contact')}
            >
              {t('agent.pregnancy.contact')} *
            </ThemedText>
            <Controller
              control={control}
              name="motherContact"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder={t('agent.profile.phone')}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.motherContact ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  keyboardType="phone-pad"
                  accessibilityLabel={t('agent.pregnancy.contact')}
                  accessibilityHint={t('agent.profile.phone')}
                  style={styles.input}
                />
              )}
            />
            {errors.motherContact && (
              <ThemedText variant="error" size="xs" style={styles.errorText}>
                {errors.motherContact.message}
              </ThemedText>
            )}
          </ThemedView>

          {/* Adresse */}
          <ThemedView variant="transparent" style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel={t('agent.pregnancy.address')}
            >
              {t('agent.pregnancy.address')} *
            </ThemedText>
            <Controller
              control={control}
              name="motherAddress"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder={t('agent.profile.address')}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.motherAddress ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  multiline
                  numberOfLines={3}
                  accessibilityLabel={t('agent.pregnancy.address')}
                  accessibilityHint={t('agent.pregnancy.address')}
                  style={{ ...styles.input, ...styles.multilineInput }}
                />
              )}
            />
            {errors.motherAddress && (
              <ThemedText variant="error" size="xs" style={styles.errorText}>
                {errors.motherAddress.message}
              </ThemedText>
            )}
          </ThemedView>

          {/* Date prévue d'accouchement */}
          <ThemedView variant="transparent" style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel={t('agent.pregnancy.estimatedDelivery')}
            >
              {t('agent.pregnancy.estimatedDelivery')} *
            </ThemedText>
            <Controller
              control={control}
              name="expectedDeliveryDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder="JJ/MM/AAAA"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.expectedDeliveryDate ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  accessibilityLabel={t('agent.pregnancy.estimatedDelivery')}
                  accessibilityHint={t('agent.pregnancy.estimatedDelivery')}
                  style={styles.input}
                />
              )}
            />
            {errors.expectedDeliveryDate && (
              <ThemedText variant="error" size="xs" style={styles.errorText}>
                {errors.expectedDeliveryDate.message}
              </ThemedText>
            )}
          </ThemedView>

          {/* Notes */}
          <ThemedView variant="transparent" style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel={t('agent.pregnancy.notes')}
            >
              {t('agent.pregnancy.notes')} ({t('common.optional')})
            </ThemedText>
            <Controller
              control={control}
              name="notes"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder={t('agent.pregnancy.notes')}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant="default"
                  size="md"
                  fullWidth
                  multiline
                  numberOfLines={4}
                  accessibilityLabel={t('agent.pregnancy.notes')}
                  accessibilityHint={t('agent.pregnancy.notes')}
                  style={{ ...styles.input, ...styles.multilineInput }}
                />
              )}
            />
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
            disabled={!isValid}
            accessibilityLabel={t('common.save')}
            accessibilityHint={t('common.save')}
            style={styles.button}
          >
            {t('common.save')}
          </ThemedButton>

          <ThemedButton
            variant="secondary"
            size="lg"
            fullWidth
            onPress={generateProof}
            disabled={!isValid || isGeneratingProof}
            accessibilityLabel={t('agent.pregnancy.generateProof')}
            accessibilityHint={t('agent.pregnancy.generateProof')}
            style={styles.button}
          >
            {isGeneratingProof ? t('common.loading') : t('agent.pregnancy.generateProof')}
          </ThemedButton>
        </ThemedView>

        {/* Résumé des données */}
        {Object.keys(formData).length > 0 && (
          <ThemedCard style={styles.summaryCard}>
            <ThemedText 
              size="base" 
              weight="semibold" 
              style={styles.summaryTitle}
              accessibilityLabel="Résumé"
            >
              Résumé
            </ThemedText>
            <ThemedText variant="secondary" size="sm" style={styles.summaryText}>
              {formData.motherFirstName && formData.motherLastName && 
                `${formData.motherFirstName} ${formData.motherLastName}`}
            </ThemedText>
            {formData.expectedDeliveryDate && (
              <ThemedText variant="secondary" size="sm" style={styles.summaryText}>
                {t('agent.pregnancy.estimatedDelivery')}: {formData.expectedDeliveryDate}
              </ThemedText>
            )}
          </ThemedCard>
        )}
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
  formCard: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 20,
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
  actionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  button: {
    marginBottom: 8,
  },
  summaryCard: {
    backgroundColor: 'rgba(47, 149, 220, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#2f95dc',
  },
  summaryTitle: {
    marginBottom: 8,
  },
  summaryText: {
    marginBottom: 4,
  },
});