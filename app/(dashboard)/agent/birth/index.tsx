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
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { z } from 'zod';

// Schéma de validation pour la naissance
const birthSchema = z.object({
  babyFirstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  babyLastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  gender: z.enum(['male', 'female'], { required_error: 'Le sexe est requis' }),
  birthDate: z.string().min(1, 'La date de naissance est requise'),
  birthTime: z.string().min(1, 'L\'heure de naissance est requise'),
  birthPlace: z.string().min(5, 'Le lieu de naissance doit contenir au moins 5 caractères'),
  motherFirstName: z.string().min(2, 'Le prénom de la mère est requis'),
  motherLastName: z.string().min(2, 'Le nom de la mère est requis'),
  fatherFirstName: z.string().optional(),
  fatherLastName: z.string().optional(),
  doctorName: z.string().min(2, 'Le nom du médecin/agent est requis'),
  witnessName: z.string().min(2, 'Le nom du témoin est requis'),
  witnessContact: z.string().min(8, 'Le contact du témoin est requis'),
  pregnancyId: z.string().optional(),
  notes: z.string().optional(),
});

type BirthFormData = z.infer<typeof birthSchema>;

export default function BirthRegistration() {
  const router = useRouter();
  const theme = useTheme();
  const { isTablet } = useResponsive();
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | ''>('');

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<BirthFormData>({
    resolver: zodResolver(birthSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: BirthFormData) => {
    try {
      // Simulation de sauvegarde
      console.log('Données naissance:', data);
      
      Alert.alert(
        'Succès',
        'Naissance enregistrée avec succès !\n\nLe dossier sera transmis à l\'administration pour validation.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'enregistrer la naissance');
    }
  };

  const generateProof = async () => {
    setIsGeneratingProof(true);
    
    try {
      // Simulation de génération de preuve
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Preuve générée',
        'Un QR code et un PDF provisoire ont été générés pour les parents.\n\nCe document est temporaire en attendant la validation officielle.',
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

  const linkToPregnancy = () => {
    Alert.alert(
      'Lier à une grossesse',
      'Fonctionnalité à venir : recherche par ID ou QR code',
      [{ text: 'OK' }]
    );
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
              name="baby" 
              size={isTablet ? 40 : 32} 
              color={theme.colors.primary} 
            />
            <ThemedView style={styles.headerText}>
              <ThemedText 
                size="xl" 
                weight="bold" 
                style={styles.title}
                accessibilityLabel="Enregistrement de naissance"
              >
                Enregistrer Naissance
              </ThemedText>
              <ThemedText 
                variant="secondary" 
                size="sm"
                accessibilityLabel="Formulaire pour enregistrer une nouvelle naissance"
              >
                Nouvelle naissance
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedCard>

        {/* Lien vers grossesse */}
        <ThemedCard style={styles.linkCard}>
          <ThemedView style={styles.linkContent}>
            <FontAwesome 
              name="link" 
              size={20} 
              color={theme.colors.info} 
            />
            <ThemedView style={styles.linkText}>
              <ThemedText 
                size="base" 
                weight="medium"
                accessibilityLabel="Lier à une grossesse existante"
              >
                Lier à une grossesse existante
              </ThemedText>
              <ThemedText 
                variant="secondary" 
                size="sm"
                style={styles.linkSubtext}
              >
                Rechercher par ID ou QR code (optionnel)
              </ThemedText>
            </ThemedView>
            <ThemedButton
              variant="outline"
              size="sm"
              onPress={linkToPregnancy}
              accessibilityLabel="Bouton lier grossesse"
              accessibilityHint="Recherche une grossesse existante à lier"
            >
              Lier
            </ThemedButton>
          </ThemedView>
        </ThemedCard>

        {/* Informations du bébé */}
        <ThemedCard style={styles.formCard}>
          <ThemedText 
            size="lg" 
            weight="semibold" 
            style={styles.sectionTitle}
            accessibilityLabel="Informations du bébé"
          >
            Informations du bébé
          </ThemedText>

          {/* Prénom */}
          <ThemedView style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel="Prénom du bébé"
            >
              Prénom *
            </ThemedText>
            <Controller
              control={control}
              name="babyFirstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder="Prénom du bébé"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.babyFirstName ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  accessibilityLabel="Champ prénom du bébé"
                  accessibilityHint="Saisissez le prénom du bébé"
                  style={styles.input}
                />
              )}
            />
            {errors.babyFirstName && (
              <ThemedText variant="error" size="xs" style={styles.errorText}>
                {errors.babyFirstName.message}
              </ThemedText>
            )}
          </ThemedView>

          {/* Nom */}
          <ThemedView style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel="Nom de famille du bébé"
            >
              Nom de famille *
            </ThemedText>
            <Controller
              control={control}
              name="babyLastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder="Nom de famille du bébé"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.babyLastName ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  accessibilityLabel="Champ nom de famille du bébé"
                  accessibilityHint="Saisissez le nom de famille du bébé"
                  style={styles.input}
                />
              )}
            />
            {errors.babyLastName && (
              <ThemedText variant="error" size="xs" style={styles.errorText}>
                {errors.babyLastName.message}
              </ThemedText>
            )}
          </ThemedView>

          {/* Sexe */}
          <ThemedView style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel="Sexe du bébé"
            >
              Sexe *
            </ThemedText>
            <TouchableOpacity
              style={[
                styles.pickerButton,
                { 
                  borderColor: errors.gender ? theme.colors.error : theme.colors.border,
                  backgroundColor: theme.colors.surface 
                }
              ]}
              onPress={() => setShowGenderPicker(!showGenderPicker)}
              accessibilityLabel="Sélecteur de sexe"
              accessibilityHint="Appuie pour choisir le sexe du bébé"
            >
              <ThemedText 
                style={[
                  styles.pickerText,
                  { color: selectedGender ? theme.colors.text : theme.colors.textSecondary }
                ]}
              >
                {selectedGender === 'male' ? 'Masculin' : 
               selectedGender === 'female' ? 'Féminin' : 
               'Choisir le sexe'}
              </ThemedText>
              <FontAwesome
                name="chevron-down"
                size={16}
                color={theme.colors.textSecondary}
                style={{ transform: [{ rotate: showGenderPicker ? '180deg' : '0deg' }] }}
              />
            </TouchableOpacity>
            
            {showGenderPicker && (
              <ThemedView style={[styles.pickerDropdown, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
                <TouchableOpacity
                  style={styles.pickerItem}
                  onPress={() => {
                    setSelectedGender('male');
                    setValue('gender', 'male');
                    setShowGenderPicker(false);
                  }}
                >
                  <FontAwesome name="male" size={16} color={theme.colors.primary} />
                  <ThemedText style={styles.pickerItemText}>Masculin</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.pickerItem}
                  onPress={() => {
                    setSelectedGender('female');
                    setValue('gender', 'female');
                    setShowGenderPicker(false);
                  }}
                >
                  <FontAwesome name="female" size={16} color={theme.colors.primary} />
                  <ThemedText style={styles.pickerItemText}>Féminin</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            )}
            
            {errors.gender && (
              <ThemedText variant="error" size="xs" style={styles.errorText}>
                {errors.gender.message}
              </ThemedText>
            )}
          </ThemedView>

          {/* Date et heure de naissance */}
          <ThemedView style={styles.rowContainer}>
            <ThemedView style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel="Date de naissance"
              >
                Date de naissance *
              </ThemedText>
              <Controller
                control={control}
                name="birthDate"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder="JJ/MM/AAAA"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={errors.birthDate ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    accessibilityLabel="Champ date de naissance"
                    accessibilityHint="Saisissez la date de naissance au format JJ/MM/AAAA"
                    style={styles.input}
                  />
                )}
              />
            </ThemedView>
            
            <ThemedView style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel="Heure de naissance"
              >
                Heure *
              </ThemedText>
              <Controller
                control={control}
                name="birthTime"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder="HH:MM"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={errors.birthTime ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    accessibilityLabel="Champ heure de naissance"
                    accessibilityHint="Saisissez l'heure de naissance au format HH:MM"
                    style={styles.input}
                  />
                )}
              />
            </ThemedView>
          </ThemedView>

          {/* Lieu de naissance */}
          <ThemedView style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel="Lieu de naissance"
            >
              Lieu de naissance *
            </ThemedText>
            <Controller
              control={control}
              name="birthPlace"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder="Hôpital, clinique, domicile..."
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.birthPlace ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  accessibilityLabel="Champ lieu de naissance"
                  accessibilityHint="Saisissez le lieu de naissance"
                  style={styles.input}
                />
              )}
            />
            {errors.birthPlace && (
              <ThemedText variant="error" size="xs" style={styles.errorText}>
                {errors.birthPlace.message}
              </ThemedText>
            )}
          </ThemedView>
        </ThemedCard>

        {/* Informations des parents */}
        <ThemedCard style={styles.formCard}>
          <ThemedText 
            size="lg" 
            weight="semibold" 
            style={styles.sectionTitle}
            accessibilityLabel="Informations des parents"
          >
            Informations des parents
          </ThemedText>

          {/* Mère */}
          <ThemedView style={styles.rowContainer}>
            <ThemedView style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel="Prénom de la mère"
              >
                Prénom mère *
              </ThemedText>
              <Controller
                control={control}
                name="motherFirstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder="Prénom"
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
            </ThemedView>
            
            <ThemedView style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel="Nom de famille de la mère"
              >
                Nom mère *
              </ThemedText>
              <Controller
                control={control}
                name="motherLastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder="Nom de famille"
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
            </ThemedView>
          </ThemedView>

          {/* Père */}
          <ThemedView style={styles.rowContainer}>
            <ThemedView style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel="Prénom du père"
              >
                Prénom père
              </ThemedText>
              <Controller
                control={control}
                name="fatherFirstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder="Prénom"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant="default"
                    size="md"
                    fullWidth
                    accessibilityLabel="Champ prénom du père"
                    accessibilityHint="Saisissez le prénom du père (optionnel)"
                    style={styles.input}
                  />
                )}
              />
            </ThemedView>
            
            <ThemedView style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel="Nom de famille du père"
              >
                Nom père
              </ThemedText>
              <Controller
                control={control}
                name="fatherLastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder="Nom de famille"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant="default"
                    size="md"
                    fullWidth
                    accessibilityLabel="Champ nom de famille du père"
                    accessibilityHint="Saisissez le nom de famille du père (optionnel)"
                    style={styles.input}
                  />
                )}
              />
            </ThemedView>
          </ThemedView>
        </ThemedCard>

        {/* Informations médicales */}
        <ThemedCard style={styles.formCard}>
          <ThemedText 
            size="lg" 
            weight="semibold" 
            style={styles.sectionTitle}
            accessibilityLabel="Informations médicales"
          >
            Informations médicales
          </ThemedText>

          {/* Médecin/Agent */}
          <ThemedView style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel="Nom du médecin ou agent"
            >
              Médecin/Agent présent *
            </ThemedText>
            <Controller
              control={control}
              name="doctorName"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder="Nom du médecin ou agent"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.doctorName ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  accessibilityLabel="Champ nom du médecin ou agent"
                  accessibilityHint="Saisissez le nom du médecin ou agent présent"
                  style={styles.input}
                />
              )}
            />
            {errors.doctorName && (
              <ThemedText variant="error" size="xs" style={styles.errorText}>
                {errors.doctorName.message}
              </ThemedText>
            )}
          </ThemedView>

          {/* Témoin */}
          <ThemedView style={styles.rowContainer}>
            <ThemedView style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel="Nom du témoin"
              >
                Nom témoin *
              </ThemedText>
              <Controller
                control={control}
                name="witnessName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder="Nom du témoin"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={errors.witnessName ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    accessibilityLabel="Champ nom du témoin"
                    accessibilityHint="Saisissez le nom du témoin"
                    style={styles.input}
                  />
                )}
              />
            </ThemedView>
            
            <ThemedView style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel="Contact du témoin"
              >
                Contact témoin *
              </ThemedText>
              <Controller
                control={control}
                name="witnessContact"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder="Téléphone"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={errors.witnessContact ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    keyboardType="phone-pad"
                    accessibilityLabel="Champ contact du témoin"
                    accessibilityHint="Saisissez le contact du témoin"
                    style={styles.input}
                  />
                )}
              />
            </ThemedView>
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
            accessibilityHint="Enregistre les informations de naissance"
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
              {formData.babyFirstName && formData.babyLastName && 
                `${formData.babyFirstName} ${formData.babyLastName}`}
            </ThemedText>
            {formData.birthDate && (
              <ThemedText variant="secondary" size="sm" style={styles.summaryText}>
                Né(e) le: {formData.birthDate} à {formData.birthTime}
              </ThemedText>
            )}
            {formData.birthPlace && (
              <ThemedText variant="secondary" size="sm" style={styles.summaryText}>
                Lieu: {formData.birthPlace}
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
  linkCard: {
    marginBottom: 24,
    backgroundColor: 'rgba(23, 162, 184, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#17a2b8',
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  linkText: {
    flex: 1,
  },
  linkSubtext: {
    marginTop: 2,
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
  rowContainer: {
    flexDirection: 'row',
    gap: 16,
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
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 48,
  },
  pickerText: {
    fontSize: 16,
  },
  pickerDropdown: {
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 12,
  },
  pickerItemText: {
    fontSize: 16,
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