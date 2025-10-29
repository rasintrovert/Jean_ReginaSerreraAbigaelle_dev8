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
        'Urgence signalée',
        'Votre signalement d\'urgence a été transmis avec succès.\n\nL\'administration a été notifiée et prendra les mesures nécessaires.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'envoyer le signalement d\'urgence');
    } finally {
      setIsSending(false);
    }
  };

  const callEmergency = (number: string) => {
    Alert.alert(
      'Appel d\'urgence',
      `Appeler ${number} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Appeler', 
          onPress: () => Linking.openURL(`tel:${number}`)
        },
      ]
    );
  };

  const emergencyNumbers = [
    { name: 'Police', number: '114', icon: 'shield' as const, color: theme.colors.primary },
    { name: 'Pompiers', number: '115', icon: 'fire' as const, color: theme.colors.error },
    { name: 'Ambulance', number: '116', icon: 'ambulance' as const, color: theme.colors.success },
    { name: 'Urgences médicales', number: '118', icon: 'hospital' as const, color: theme.colors.info },
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Faible', color: theme.colors.success },
    { value: 'medium', label: 'Moyen', color: theme.colors.warning },
    { value: 'high', label: 'Élevé', color: theme.colors.error },
    { value: 'critical', label: 'Critique', color: '#8B0000' },
  ];

  const safetyTips = [
    {
      title: 'En cas d\'accouchement imminent',
      tips: [
        'Restez calme et rassurez la mère',
        'Préparez un endroit propre et confortable',
        'Appelez immédiatement les secours médicaux',
        'Ne coupez pas le cordon ombilical',
        'Gardez le bébé au chaud'
      ]
    },
    {
      title: 'En cas d\'urgence médicale',
      tips: [
        'Évaluez la situation rapidement',
        'Appelez les secours appropriés',
        'Ne déplacez pas la personne si blessée',
        'Appliquez les premiers secours si formé',
        'Restez avec la personne jusqu\'aux secours'
      ]
    },
    {
      title: 'En cas de danger imminent',
      tips: [
        'Évacuez la zone si nécessaire',
        'Appelez immédiatement la police',
        'Protégez les personnes vulnérables',
        'Ne vous mettez pas en danger',
        'Informez les autorités compétentes'
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
        <ThemedCard style={[styles.headerCard, { borderLeftWidth: 4, borderLeftColor: theme.colors.error }]}>
          <ThemedView style={styles.headerContent}>
            <FontAwesome 
              name="exclamation-triangle" 
              size={isTablet ? 40 : 32} 
              color={theme.colors.error} 
            />
            <ThemedView style={styles.headerText}>
              <ThemedText 
                size="xl" 
                weight="bold" 
                style={[styles.title, { color: theme.colors.error }]}
                accessibilityLabel="Signalement d'urgence"
              >
                Signalement d'Urgence
              </ThemedText>
              <ThemedText 
                variant="secondary" 
                size="sm"
                accessibilityLabel="Formulaire pour signaler une urgence critique"
              >
                Situation critique nécessitant une intervention immédiate
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
            accessibilityLabel="Numéros d'urgence"
          >
            📞 Numéros d'urgence
          </ThemedText>
          
          <ThemedView style={styles.emergencyGrid}>
            {emergencyNumbers.map((emergency) => (
              <ThemedButton
                key={emergency.number}
                variant="outline"
                style={[styles.emergencyButton, { borderColor: emergency.color }]}
                onPress={() => callEmergency(emergency.number)}
                accessibilityLabel={`Appeler ${emergency.name} - ${emergency.number}`}
                accessibilityHint={`Appuie pour appeler ${emergency.name}`}
              >
                <ThemedView style={styles.emergencyButtonContent}>
                  <FontAwesome 
                    name={emergency.icon} 
                    size={20} 
                    color={emergency.color} 
                  />
                  <ThemedView style={styles.emergencyButtonText}>
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
            accessibilityLabel="Conseils de sécurité"
          >
            🚨 Conseils de sécurité
          </ThemedText>
          
          {safetyTips.map((tip, index) => (
            <ThemedView key={index} style={styles.tipSection}>
              <ThemedText 
                size="base" 
                weight="semibold" 
                style={styles.tipTitle}
                accessibilityLabel={tip.title}
              >
                {tip.title}
              </ThemedText>
              {tip.tips.map((tipText, tipIndex) => (
                <ThemedView key={tipIndex} style={styles.tipItem}>
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
            accessibilityLabel="Formulaire de signalement"
          >
            📝 Signalement détaillé
          </ThemedText>

          {/* Type d'urgence */}
          <ThemedView style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel="Type d'urgence"
            >
              Type d'urgence *
            </ThemedText>
            <Controller
              control={control}
              name="emergencyType"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder="Ex: Accouchement imminent, accident, violence..."
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.emergencyType ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  accessibilityLabel="Champ type d'urgence"
                  accessibilityHint="Décrivez le type d'urgence"
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
          <ThemedView style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel="Niveau d'urgence"
            >
              Niveau d'urgence *
            </ThemedText>
            <ThemedView style={styles.urgencyButtons}>
              {urgencyLevels.map((level) => (
                <ThemedButton
                  key={level.value}
                  variant={selectedUrgency === level.value ? 'primary' : 'outline'}
                  size="sm"
                  style={[
                    styles.urgencyButton,
                    { 
                      borderColor: level.color,
                      backgroundColor: selectedUrgency === level.value ? level.color : 'transparent'
                    }
                  ]}
                  onPress={() => {
                    setSelectedUrgency(level.value);
                    setValue('urgencyLevel', level.value);
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
          <ThemedView style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel="Description de l'urgence"
            >
              Description détaillée *
            </ThemedText>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder="Décrivez la situation en détail..."
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.description ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  multiline
                  numberOfLines={5}
                  accessibilityLabel="Champ description de l'urgence"
                  accessibilityHint="Décrivez la situation d'urgence en détail"
                  style={[styles.input, styles.multilineInput]}
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
          <ThemedView style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel="Lieu de l'urgence"
            >
              Lieu de l'urgence *
            </ThemedText>
            <Controller
              control={control}
              name="location"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder="Adresse précise ou lieu"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.location ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  accessibilityLabel="Champ lieu de l'urgence"
                  accessibilityHint="Indiquez le lieu précis de l'urgence"
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
          <ThemedView style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel="Numéro de contact"
            >
              Votre numéro de contact *
            </ThemedText>
            <Controller
              control={control}
              name="contactPhone"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder="Votre numéro de téléphone"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.contactPhone ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  keyboardType="phone-pad"
                  accessibilityLabel="Champ numéro de contact"
                  accessibilityHint="Saisissez votre numéro de téléphone"
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
            accessibilityLabel="Bouton annuler"
            accessibilityHint="Annule le signalement et retourne à l'écran précédent"
            style={styles.button}
          >
            Annuler
          </ThemedButton>
          
          <ThemedButton
            variant="primary"
            size="lg"
            fullWidth
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || isSending}
            style={[styles.button, { backgroundColor: theme.colors.error }]}
            accessibilityLabel="Bouton envoyer signalement"
            accessibilityHint="Envoie le signalement d'urgence à l'administration"
          >
            {isSending ? 'Envoi en cours...' : 'Envoyer Signalement'}
          </ThemedButton>
        </ThemedView>

        {/* Avertissement */}
        <ThemedCard style={[styles.warningCard, { backgroundColor: 'rgba(220, 53, 69, 0.1)', borderLeftWidth: 4, borderLeftColor: theme.colors.error }]}>
          <FontAwesome 
            name="warning" 
            size={20} 
            color={theme.colors.error} 
            style={styles.warningIcon}
          />
          <ThemedView style={styles.warningContent}>
            <ThemedText 
              size="base" 
              weight="semibold"
              style={{ color: theme.colors.error }}
              accessibilityLabel="Avertissement important"
            >
              ⚠️ Avertissement important
            </ThemedText>
            <ThemedText 
              variant="secondary" 
              size="sm"
              style={styles.warningText}
            >
              Ce signalement sera transmis immédiatement à l'administration. 
              En cas de danger imminent, appelez d'abord les numéros d'urgence appropriés.
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
