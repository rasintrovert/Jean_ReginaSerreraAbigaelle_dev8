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
  const t = useTranslation();
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
        t('common.success'),
        t('agent.birth.saved'),
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
        t('agent.birth.proofGenerated'),
        t('agent.birth.proofGeneratedDesc'),
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

  const linkToPregnancy = () => {
    Alert.alert(
      t('agent.birth.linkPregnancy'),
      t('agent.birth.searchPregnancy'),
      [{ text: t('common.confirm') }]
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
          <ThemedView variant="transparent" style={styles.headerContent}>
            <FontAwesome 
              name="child" 
              size={isTablet ? 40 : 32} 
              color={theme.colors.primary} 
            />
            <ThemedView variant="transparent" style={styles.headerText}>
              <ThemedText 
                size="xl" 
                weight="bold" 
                style={styles.title}
                accessibilityLabel={t('agent.birth.title')}
              >
                {t('agent.birth.title')}
              </ThemedText>
              <ThemedText 
                variant="secondary" 
                size="sm"
                accessibilityLabel={t('agent.birth.subtitle')}
              >
                {t('agent.birth.subtitle')}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedCard>

        {/* Lien vers grossesse */}
        <ThemedCard style={styles.linkCard}>
          <ThemedView variant="transparent" style={styles.linkContent}>
            <FontAwesome 
              name="link" 
              size={20} 
              color={theme.colors.info} 
            />
            <ThemedView variant="transparent" style={styles.linkText}>
              <ThemedText 
                size="base" 
                weight="medium"
                accessibilityLabel={t('agent.birth.linkPregnancy')}
              >
                {t('agent.birth.linkPregnancy')}
              </ThemedText>
              <ThemedText 
                variant="secondary" 
                size="sm"
                style={styles.linkSubtext}
              >
                {t('agent.birth.searchPregnancy')} ({t('common.optional')})
              </ThemedText>
            </ThemedView>
            <ThemedButton
              variant="outline"
              size="sm"
              onPress={linkToPregnancy}
              accessibilityLabel={t('agent.birth.linkPregnancy')}
              accessibilityHint={t('agent.birth.linkPregnancy')}
            >
              {t('agent.birth.link')}
            </ThemedButton>
          </ThemedView>
        </ThemedCard>

        {/* Informations du bébé */}
        <ThemedCard style={styles.formCard}>
          <ThemedText 
            size="lg" 
            weight="semibold" 
            style={styles.sectionTitle}
            accessibilityLabel={t('agent.birth.babyInfo')}
          >
            {t('agent.birth.babyInfo')}
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
              name="babyFirstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder={t('agent.birth.babyName')}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.babyFirstName ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  accessibilityLabel={t('agent.profile.firstName')}
                  accessibilityHint={t('agent.profile.firstName')}
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
              name="babyLastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder={t('agent.profile.lastName')}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.babyLastName ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  accessibilityLabel={t('agent.profile.lastName')}
                  accessibilityHint={t('agent.profile.lastName')}
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
          <ThemedView variant="transparent" style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel={t('agent.birth.sex')}
            >
              {t('agent.birth.sex')} *
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
              accessibilityLabel={t('agent.birth.sex')}
              accessibilityHint={t('agent.birth.sex')}
            >
              <ThemedText 
                style={{
                  ...styles.pickerText,
                  color: selectedGender ? theme.colors.text : theme.colors.textSecondary
                }}
              >
                {selectedGender === 'male' ? t('agent.birth.sexMale') : 
               selectedGender === 'female' ? t('agent.birth.sexFemale') : 
               t('agent.birth.selectSex')}
              </ThemedText>
              <FontAwesome
                name="chevron-down"
                size={16}
                color={theme.colors.textSecondary}
                style={{ transform: [{ rotate: showGenderPicker ? '180deg' : '0deg' }] }}
              />
            </TouchableOpacity>
            
            {showGenderPicker && (
              <ThemedView style={{ ...styles.pickerDropdown, backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}>
                <TouchableOpacity
                  style={styles.pickerItem}
                  onPress={() => {
                    setSelectedGender('male');
                    setValue('gender', 'male');
                    setShowGenderPicker(false);
                  }}
                >
                  <FontAwesome name="male" size={16} color={theme.colors.primary} />
                  <ThemedText style={styles.pickerItemText}>{t('agent.birth.sexMale')}</ThemedText>
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
                  <ThemedText style={styles.pickerItemText}>{t('agent.birth.sexFemale')}</ThemedText>
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
          <ThemedView variant="transparent" style={styles.rowContainer}>
            <ThemedView variant="transparent" style={{ ...styles.inputContainer, flex: 1, marginRight: 8 }}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel={t('agent.birth.birthDate')}
              >
                {t('agent.birth.birthDate')} *
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
                    accessibilityLabel={t('agent.birth.birthDate')}
                    accessibilityHint={t('agent.birth.birthDate')}
                    style={styles.input}
                  />
                )}
              />
            </ThemedView>
            
            <ThemedView variant="transparent" style={{ ...styles.inputContainer, flex: 1, marginLeft: 8 }}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel={t('agent.birth.birthTime')}
              >
                {t('agent.birth.birthTime')} *
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
                    accessibilityLabel={t('agent.birth.birthTime')}
                    accessibilityHint={t('agent.birth.birthTime')}
                    style={styles.input}
                  />
                )}
              />
            </ThemedView>
          </ThemedView>

          {/* Lieu de naissance */}
          <ThemedView variant="transparent" style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel={t('agent.birth.birthPlace')}
            >
              {t('agent.birth.birthPlace')} *
            </ThemedText>
            <Controller
              control={control}
              name="birthPlace"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder={t('agent.birth.birthPlace')}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.birthPlace ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  accessibilityLabel={t('agent.birth.birthPlace')}
                  accessibilityHint={t('agent.birth.birthPlace')}
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
            accessibilityLabel={t('agent.birth.parentsInfo')}
          >
            {t('agent.birth.parentsInfo')}
          </ThemedText>

          {/* Mère */}
          <ThemedView variant="transparent" style={styles.rowContainer}>
            <ThemedView variant="transparent" style={{ ...styles.inputContainer, flex: 1, marginRight: 8 }}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel={t('agent.pregnancy.motherName')}
              >
                {t('agent.profile.firstName')} {t('agent.pregnancy.motherName')} *
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
            </ThemedView>
            
            <ThemedView variant="transparent" style={{ ...styles.inputContainer, flex: 1, marginLeft: 8 }}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel={t('agent.pregnancy.motherName')}
              >
                {t('agent.profile.lastName')} {t('agent.pregnancy.motherName')} *
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
            </ThemedView>
          </ThemedView>

          {/* Père */}
          <ThemedView variant="transparent" style={styles.rowContainer}>
            <ThemedView variant="transparent" style={{ ...styles.inputContainer, flex: 1, marginRight: 8 }}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel={t('agent.birth.fatherName')}
              >
                {t('agent.profile.firstName')} {t('agent.birth.fatherName')} ({t('common.optional')})
              </ThemedText>
              <Controller
                control={control}
                name="fatherFirstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t('agent.profile.firstName')}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant="default"
                    size="md"
                    fullWidth
                    accessibilityLabel={t('agent.profile.firstName')}
                    accessibilityHint={t('agent.profile.firstName')}
                    style={styles.input}
                  />
                )}
              />
            </ThemedView>
            
            <ThemedView variant="transparent" style={{ ...styles.inputContainer, flex: 1, marginLeft: 8 }}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel={t('agent.birth.fatherName')}
              >
                {t('agent.profile.lastName')} {t('agent.birth.fatherName')} ({t('common.optional')})
              </ThemedText>
              <Controller
                control={control}
                name="fatherLastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t('agent.profile.lastName')}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant="default"
                    size="md"
                    fullWidth
                    accessibilityLabel={t('agent.profile.lastName')}
                    accessibilityHint={t('agent.profile.lastName')}
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
            accessibilityLabel={t('agent.birth.medicalInfo')}
          >
            {t('agent.birth.medicalInfo')}
          </ThemedText>

          {/* Médecin/Agent */}
          <ThemedView variant="transparent" style={styles.inputContainer}>
            <ThemedText 
              size="sm" 
              weight="medium" 
              style={styles.label}
              accessibilityLabel={t('agent.birth.doctor')}
            >
              {t('agent.birth.doctor')} *
            </ThemedText>
            <Controller
              control={control}
              name="doctorName"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder={t('agent.birth.doctor')}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  variant={errors.doctorName ? 'error' : 'default'}
                  size="md"
                  fullWidth
                  accessibilityLabel={t('agent.birth.doctor')}
                  accessibilityHint={t('agent.birth.doctor')}
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
          <ThemedView variant="transparent" style={styles.rowContainer}>
            <ThemedView variant="transparent" style={{ ...styles.inputContainer, flex: 1, marginRight: 8 }}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel={t('agent.birth.witness')}
              >
                {t('agent.birth.witness')} *
              </ThemedText>
              <Controller
                control={control}
                name="witnessName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t('agent.birth.witness')}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={errors.witnessName ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    accessibilityLabel={t('agent.birth.witness')}
                    accessibilityHint={t('agent.birth.witness')}
                    style={styles.input}
                  />
                )}
              />
            </ThemedView>
            
            <ThemedView variant="transparent" style={{ ...styles.inputContainer, flex: 1, marginLeft: 8 }}>
              <ThemedText 
                size="sm" 
                weight="medium" 
                style={styles.label}
                accessibilityLabel={t('agent.pregnancy.contact')}
              >
                {t('agent.pregnancy.contact')} {t('agent.birth.witness')} *
              </ThemedText>
              <Controller
                control={control}
                name="witnessContact"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t('agent.profile.phone')}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={errors.witnessContact ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    keyboardType="phone-pad"
                    accessibilityLabel={t('agent.profile.phone')}
                    accessibilityHint={t('agent.profile.phone')}
                    style={styles.input}
                  />
                )}
              />
            </ThemedView>
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
            accessibilityLabel={t('agent.birth.generateProof')}
            accessibilityHint={t('agent.birth.generateProof')}
            style={styles.button}
          >
            {isGeneratingProof ? t('common.loading') : t('agent.birth.generateProof')}
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
              {formData.babyFirstName && formData.babyLastName && 
                `${formData.babyFirstName} ${formData.babyLastName}`}
            </ThemedText>
            {formData.birthDate && (
              <ThemedText variant="secondary" size="sm" style={styles.summaryText}>
                {t('agent.birth.birthDate')}: {formData.birthDate} {t('agent.birth.birthTime')}: {formData.birthTime}
              </ThemedText>
            )}
            {formData.birthPlace && (
              <ThemedText variant="secondary" size="sm" style={styles.summaryText}>
                {t('agent.birth.birthPlace')}: {formData.birthPlace}
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