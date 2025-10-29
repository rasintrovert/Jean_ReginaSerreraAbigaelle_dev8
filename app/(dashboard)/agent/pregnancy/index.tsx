import {
    ThemedButton,
    ThemedCard,
    ThemedInput,
    ThemedText,
    ThemedView
} from '@/components/ThemedComponents';
import { useResponsive } from '@/hooks/useResponsive';
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
        'Succès',
        'Grossesse enregistrée avec succès !',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'enregistrer la grossesse');
    }
  };

  const generateProof = async () => {
    setIsGeneratingProof(true);
    
    try {
      // Simulation de génération de preuve
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Preuve générée',
        'Un QR code et un PDF provisoire ont été générés pour les parents.',
        [
          {
            text: 'Voir la preuve',
            onPress: () => {
              // TODO: Ouvrir la preuve générée
              console.log('Ouvrir preuve générée');
            },
          },
          {
            text: 'OK',
            style: 'cancel',
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de générer la preuve');
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
          <ThemedView style={styles.headerContent}>
            <FontAwesome 
              name="heart" 
              size={isTablet ? 40 : 32} 
              color={theme.colors.success} 
            />
            <ThemedView style={styles.headerText}>
              <ThemedText 
                size="xl" 
                weight="bold" 
                style={styles.title}
                accessibilityLabel="Enregistrement de grossesse"
              >
                Enregistrer Grossesse
              </ThemedText>
              <ThemedText 
                variant="secondary" 
                size="sm"
                accessibilityLabel="Formulaire pour enregistrer une nouvelle grossesse"
              >
                Nouvelle grossesse
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
            accessibilityLabel="Informations de la mère"
          >
            Informations de la mère
          </ThemedText>

          {/* Prénom */}
          <ThemedView style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel="Prénom de la mère"
            >
              Prénom *
            </ThemedText>
            <Controller
              control={control}
              name="motherFirstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder="Prénom de la mère"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.motherFirstName ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  accessibilityLabel="Champ prénom de la mère"
                  accessibilityHint="Saisissez le prénom de la mère"
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
          <ThemedView style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel="Nom de famille de la mère"
            >
              Nom de famille *
            </ThemedText>
            <Controller
              control={control}
              name="motherLastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder="Nom de famille de la mère"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.motherLastName ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  accessibilityLabel="Champ nom de famille de la mère"
                  accessibilityHint="Saisissez le nom de famille de la mère"
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
          <ThemedView style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel="Date de naissance de la mère"
            >
              Date de naissance *
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
                  accessibilityLabel="Champ date de naissance de la mère"
                  accessibilityHint="Saisissez la date de naissance au format JJ/MM/AAAA"
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
          <ThemedView style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel="Contact de la mère"
            >
              Contact (téléphone) *
            </ThemedText>
            <Controller
              control={control}
              name="motherContact"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder="Numéro de téléphone"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.motherContact ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  keyboardType="phone-pad"
                  accessibilityLabel="Champ contact téléphone de la mère"
                  accessibilityHint="Saisissez le numéro de téléphone de la mère"
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
          <ThemedView style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel="Adresse de la mère"
            >
              Adresse *
            </ThemedText>
            <Controller
              control={control}
              name="motherAddress"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder="Adresse complète"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.motherAddress ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  multiline
                  numberOfLines={3}
                  accessibilityLabel="Champ adresse de la mère"
                  accessibilityHint="Saisissez l'adresse complète de la mère"
                  style={[styles.input, styles.multilineInput]}
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
          <ThemedView style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel="Date prévue d'accouchement"
            >
              Date prévue d'accouchement *
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
                  accessibilityLabel="Champ date prévue d'accouchement"
                  accessibilityHint="Saisissez la date prévue d'accouchement au format JJ/MM/AAAA"
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
          <ThemedView style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel="Notes additionnelles"
            >
              Notes (optionnel)
            </ThemedText>
            <Controller
              control={control}
              name="notes"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder="Informations supplémentaires..."
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant="default"
                  size="md"
                  fullWidth
                  multiline
                  numberOfLines={4}
                  accessibilityLabel="Champ notes additionnelles"
                  accessibilityHint="Saisissez des informations supplémentaires si nécessaire"
                  style={[styles.input, styles.multilineInput]}
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
            accessibilityLabel="Bouton annuler"
            accessibilityHint="Annule la saisie et retourne à l'écran précédent"
            style={styles.button}
          >
            Annuler
          </ThemedButton>
          
          <ThemedButton
            variant="primary"
            size="lg"
            fullWidth
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
            accessibilityLabel="Bouton enregistrer"
            accessibilityHint="Enregistre les informations de grossesse"
            style={styles.button}
          >
            Enregistrer
          </ThemedButton>

          <ThemedButton
            variant="secondary"
            size="lg"
            fullWidth
            onPress={generateProof}
            disabled={!isValid || isGeneratingProof}
            accessibilityLabel="Bouton générer preuve"
            accessibilityHint="Génère une preuve provisoire PDF/QR code pour les parents"
            style={styles.button}
          >
            {isGeneratingProof ? 'Génération...' : 'Générer Preuve'}
          </ThemedButton>
        </ThemedView>

        {/* Résumé des données */}
        {Object.keys(formData).length > 0 && (
          <ThemedCard style={styles.summaryCard}>
            <ThemedText 
              size="base" 
              weight="semibold" 
              style={styles.summaryTitle}
              accessibilityLabel="Résumé des données saisies"
            >
              Résumé
            </ThemedText>
            <ThemedText variant="secondary" size="sm" style={styles.summaryText}>
              {formData.motherFirstName && formData.motherLastName && 
                `${formData.motherFirstName} ${formData.motherLastName}`}
            </ThemedText>
            {formData.expectedDeliveryDate && (
              <ThemedText variant="secondary" size="sm" style={styles.summaryText}>
                Accouchement prévu le: {formData.expectedDeliveryDate}
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