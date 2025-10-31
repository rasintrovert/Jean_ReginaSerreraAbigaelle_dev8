import { DateInput } from '@/components/DateInput';
import { PressableButton } from '@/components/PressableButton';
import {
  ThemedCard,
  ThemedInput,
  ThemedText,
  ThemedView
} from '@/components/ThemedComponents';
import { BLOOD_GROUPS, HAITIAN_DEPARTMENTS } from '@/constants/departments';
import { useResponsive } from '@/hooks/useResponsive';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguageStore } from '@/store/languageStore';
import { useTheme } from '@/theme';
import { FontAwesome } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { z } from 'zod';

// Schéma de validation pour l'étape 1 (Informations de la mère)
const step1Schema = z.object({
  motherFirstNames: z.array(z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'))
    .refine((names) => names.some(name => name && name.trim().length >= 2), {
      message: 'Au moins un prénom est requis',
    }),
  motherLastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  motherBirthDate: z.string().min(1, 'La date de naissance est requise'),
  motherPhone: z.string().min(8, 'Le numéro de téléphone est requis'),
  motherPhoneAlt: z.string().optional(),
  motherAddress: z.string().min(5, 'L\'adresse est requise'),
  motherCity: z.string().min(2, 'La commune ou ville est requise'),
  motherDepartment: z.string().min(1, 'Le département est requis'),
  motherBloodGroup: z.string().optional(),
});

// Schéma de validation pour l'étape 2 (Informations de grossesse)
const step2Schema = z.object({
  estimatedDeliveryDate: z.string().optional(),
  estimatedDeliveryMonth: z.string().optional(),
  pregnancyCount: z.string().min(1, 'La quantité de grossesses est requise'),
  healthCondition: z.string().optional(),
  notes: z.string().optional(),
}).refine((data) => {
  // Condition: Au moins une des deux dates (complète OU mois) doit être remplie
  // Les deux sont obligatoires mais l'utilisateur peut choisir l'un ou l'autre
  const hasFullDate = data.estimatedDeliveryDate && data.estimatedDeliveryDate.trim().length > 0;
  const hasMonthDate = data.estimatedDeliveryMonth && data.estimatedDeliveryMonth.trim().length > 0;
  return hasFullDate || hasMonthDate;
}, {
  message: 'La date complète OU le mois est requis (au moins l\'un des deux)',
  path: ['estimatedDeliveryDate'],
});

type Step1FormData = z.infer<typeof step1Schema>;
type Step2FormData = z.infer<typeof step2Schema>;
type PregnancyFormData = Step1FormData & Step2FormData;

export default function PregnancyRegistration() {
  const router = useRouter();
  const theme = useTheme();
  const { isTablet } = useResponsive();
  const t = useTranslation();
  const currentLanguage = useLanguageStore((state) => state.language);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [step1Data, setStep1Data] = useState<Step1FormData | null>(null);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [showBloodGroupModal, setShowBloodGroupModal] = useState(false);
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);

  // Formulaire pour l'étape 1
  const step1Form = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    mode: 'onChange',
    defaultValues: step1Data || {
      motherFirstNames: [''],
    },
  });

  // Formulaire pour l'étape 2
  const step2Form = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    mode: 'onChange',
  });

  const handleStep1Next = (data: Step1FormData) => {
    setStep1Data(data);
    setCurrentStep(2);
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (step2Data: Step2FormData) => {
    if (!step1Data) return;

    try {
      const fullData: PregnancyFormData = { ...step1Data, ...step2Data };
      console.log('Données grossesse:', fullData);

      Alert.alert(
        t('common.success'),
        t('hospital.pregnancy.saved'),
        [
          {
            text: t('agent.birth.generateProof'),
            onPress: () => generateProof(fullData),
          },
          {
            text: t('common.confirm'),
            style: 'cancel' as const,
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(t('common.error'), t('errors.saveFailed'));
    }
  };

  const generateProof = async (pregnancyData: PregnancyFormData) => {
    setIsGeneratingProof(true);
    
    try {
      // Simulation de génération de preuve
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        t('hospital.pregnancy.proofGenerated'),
        t('agent.birth.proofGeneratedDesc'),
        [
          {
            text: t('agent.history.viewProof'),
            onPress: () => {
              // TODO: Ouvrir la preuve générée ou naviguer vers l'historique
              console.log('Ouvrir preuve générée');
              router.back();
            },
          },
          {
            text: t('common.confirm'),
            style: 'cancel' as const,
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(t('common.error'), t('errors.saveFailed'));
    } finally {
      setIsGeneratingProof(false);
    }
  };

  const progress = currentStep === 1 ? 0.5 : 1;

  // Add/Remove functions for mother first names
  const addMotherFirstName = () => {
    const currentNames = step1Form.getValues('motherFirstNames') || [''];
    step1Form.setValue('motherFirstNames', [...currentNames, '']);
  };

  const removeMotherFirstName = (index: number) => {
    const currentNames = step1Form.getValues('motherFirstNames') || [''];
    if (currentNames.length > 1) {
      const newNames = currentNames.filter((_, i) => i !== index);
      step1Form.setValue('motherFirstNames', newNames);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header avec retour, titre et sous-titre */}
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
            {t('hospital.pregnancy.title')}
          </ThemedText>
          <ThemedText variant="secondary" size="sm" style={styles.headerSubtitle}>
            {t('hospital.pregnancy.description')}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Indicateur d'étape */}
      <ThemedView style={styles.stepIndicator}>
        <ThemedText variant="secondary" size="sm" style={styles.stepText}>
          {currentStep === 1 ? t('hospital.pregnancy.step1') : t('hospital.pregnancy.step2')}
        </ThemedText>
        <View style={styles.progressBar}>
            <View
              style={{
                ...styles.progressFill,
                width: `${progress * 100}%`,
                backgroundColor: theme.colors.primary,
              }}
            />
        </View>
      </ThemedView>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.scrollContentTablet
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Étape 1 : Informations de la mère */}
        {currentStep === 1 && (
          <ThemedCard style={styles.formCard}>
            <ThemedView variant="transparent" style={styles.cardHeader}>
              <FontAwesome
                name="female"
                size={24}
                color={theme.colors.primary}
                style={styles.cardIcon}
              />
              <ThemedText size="lg" weight="semibold" style={styles.cardTitle}>
                {t('hospital.pregnancy.step1Title')}
              </ThemedText>
            </ThemedView>

            {/* Prénoms */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText size="sm" weight="medium" style={styles.label}>
                {t('hospital.pregnancy.motherFirstNames')} *
              </ThemedText>
              {(step1Form.watch('motherFirstNames') || ['']).map((_, index) => (
                <ThemedView key={index} variant="transparent" style={styles.firstNameRow}>
                  <Controller
                    control={step1Form.control}
                    name={`motherFirstNames.${index}` as any}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <ThemedInput
                        placeholder={t('hospital.pregnancy.motherFirstName')}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        variant={step1Form.formState.errors.motherFirstNames ? 'error' : 'default'}
                        size="md"
                        fullWidth={false}
                        style={{ ...styles.input, ...styles.firstNameRowInput } as any}
                      />
                    )}
                  />
                  {index > 0 && (
                    <Pressable
                      onPress={() => removeMotherFirstName(index)}
                      style={styles.removeButton}
                    >
                      <FontAwesome name="times" size={16} color={theme.colors.error} />
                    </Pressable>
                  )}
                </ThemedView>
              ))}
              <Pressable onPress={addMotherFirstName} style={styles.addButton}>
                <FontAwesome name="plus" size={16} color={theme.colors.primary} />
                <ThemedText size="sm" style={{ color: theme.colors.primary, marginLeft: 8 }}>
                  {t('hospital.pregnancy.addFirstName')}
                </ThemedText>
              </Pressable>
              {step1Form.formState.errors.motherFirstNames && (
                <ThemedText variant="error" size="xs" style={styles.errorText}>
                  {step1Form.formState.errors.motherFirstNames.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Nom / Siyati */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText size="sm" weight="medium" style={styles.label}>
                {t('hospital.pregnancy.motherLastName')} *
              </ThemedText>
              <Controller
                control={step1Form.control}
                name="motherLastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t('hospital.pregnancy.motherLastName')}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={step1Form.formState.errors.motherLastName ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    style={styles.input}
                  />
                )}
              />
              {step1Form.formState.errors.motherLastName && (
                <ThemedText variant="error" size="xs" style={styles.errorText}>
                  {step1Form.formState.errors.motherLastName.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Date de naissance */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText size="sm" weight="medium" style={styles.label}>
                {t('hospital.pregnancy.motherDob')} *
              </ThemedText>
              <Controller
                control={step1Form.control}
                name="motherBirthDate"
                render={({ field: { onChange, onBlur, value } }) => (
                  <DateInput
                    placeholder="JJ/MM/AAAA"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={step1Form.formState.errors.motherBirthDate ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    style={styles.input}
                    mode="date"
                    maximumDate={new Date()} // Pas de date future
                  />
                )}
              />
              {step1Form.formState.errors.motherBirthDate && (
                <ThemedText variant="error" size="xs" style={styles.errorText}>
                  {step1Form.formState.errors.motherBirthDate.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Numéro de téléphone personnel */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText size="sm" weight="medium" style={styles.label}>
                {t('hospital.pregnancy.motherPhone')} *
              </ThemedText>
              <Controller
                control={step1Form.control}
                name="motherPhone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t('hospital.pregnancy.motherPhone')}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={step1Form.formState.errors.motherPhone ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    keyboardType="phone-pad"
                    style={styles.input}
                  />
                )}
              />
              {step1Form.formState.errors.motherPhone && (
                <ThemedText variant="error" size="xs" style={styles.errorText}>
                  {step1Form.formState.errors.motherPhone.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Numéro d'un proche */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText size="sm" weight="medium" style={styles.label}>
                {t('hospital.pregnancy.motherPhoneAlt')}
              </ThemedText>
              <Controller
                control={step1Form.control}
                name="motherPhoneAlt"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t('hospital.pregnancy.motherPhoneAlt')}
                    value={value || ''}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    size="md"
                    fullWidth
                    keyboardType="phone-pad"
                    style={styles.input}
                  />
                )}
              />
            </ThemedView>

            {/* Adresse */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText size="sm" weight="medium" style={styles.label}>
                {t('hospital.pregnancy.motherAddress')} *
              </ThemedText>
              <Controller
                control={step1Form.control}
                name="motherAddress"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t('hospital.pregnancy.motherAddress')}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={step1Form.formState.errors.motherAddress ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    multiline
                    numberOfLines={2}
                    style={{ ...styles.input, ...styles.multilineInput }}
                  />
                )}
              />
              {step1Form.formState.errors.motherAddress && (
                <ThemedText variant="error" size="xs" style={styles.errorText}>
                  {step1Form.formState.errors.motherAddress.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Commune ou Ville */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText size="sm" weight="medium" style={styles.label}>
                {t('hospital.pregnancy.motherCity')} *
              </ThemedText>
              <Controller
                control={step1Form.control}
                name="motherCity"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t('hospital.pregnancy.motherCity')}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={step1Form.formState.errors.motherCity ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    style={styles.input}
                  />
                )}
              />
              {step1Form.formState.errors.motherCity && (
                <ThemedText variant="error" size="xs" style={styles.errorText}>
                  {step1Form.formState.errors.motherCity.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Département */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText size="sm" weight="medium" style={styles.label}>
                {t('hospital.pregnancy.motherDepartment')} *
              </ThemedText>
              <Controller
                control={step1Form.control}
                name="motherDepartment"
                render={({ field: { onChange, value } }) => (
                  <ThemedView variant="transparent" style={styles.pickerContainer}>
                    <Pressable
                      style={{
                        ...styles.pickerButton,
                        borderColor: theme.colors.border,
                        backgroundColor: theme.colors.surface,
                      }}
                      onPress={() => setShowDepartmentModal(true)}
                    >
                      <ThemedText
                        style={{
                          ...styles.pickerText,
                          ...(!value && { color: theme.colors.textSecondary }),
                        }}
                      >
                        {value
                          ? (currentLanguage === 'fr'
                            ? HAITIAN_DEPARTMENTS.find(d => d.code === value)?.name
                            : HAITIAN_DEPARTMENTS.find(d => d.code === value)?.nameKr) || value
                          : t('hospital.pregnancy.motherDepartment')}
                      </ThemedText>
                      <FontAwesome name="chevron-down" size={16} color={theme.colors.textSecondary} />
                    </Pressable>

                    {/* Modal pour sélectionner le département */}
                    <Modal
                      visible={showDepartmentModal}
                      transparent
                      animationType="slide"
                      onRequestClose={() => setShowDepartmentModal(false)}
                    >
                      <Pressable
                        style={styles.modalOverlay}
                        onPress={() => setShowDepartmentModal(false)}
                      >
                        <ThemedView style={styles.modalContent}>
                          <ThemedView variant="transparent" style={styles.modalHeader}>
                            <ThemedView variant="transparent" style={styles.modalHeaderText}>
                              <ThemedText size="lg" weight="bold" style={styles.modalTitle}>
                                {t('hospital.pregnancy.motherDepartment')}
                              </ThemedText>
                            </ThemedView>
                            <Pressable
                              onPress={() => setShowDepartmentModal(false)}
                              style={styles.modalCloseButton}
                            >
                              <FontAwesome name="times" size={20} color={theme.colors.text} />
                            </Pressable>
                          </ThemedView>
                          
                          <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={true}>
                            {HAITIAN_DEPARTMENTS.map((dept) => (
                              <Pressable
                                key={dept.code}
                                style={[
                                  styles.modalOption,
                                  {
                                    backgroundColor: value === dept.code 
                                      ? theme.colors.primary + '20' 
                                      : theme.colors.surface,
                                    borderColor: value === dept.code 
                                      ? theme.colors.primary 
                                      : theme.colors.border,
                                  }
                                ]}
                                onPress={() => {
                                  onChange(dept.code);
                                  setShowDepartmentModal(false);
                                }}
                              >
                                <ThemedText
                                  size="base"
                                  weight={value === dept.code ? 'semibold' : 'normal'}
                                  style={{
                                    color: value === dept.code ? theme.colors.primary : theme.colors.text,
                                  }}
                                >
                                  {currentLanguage === 'fr' ? dept.name : dept.nameKr}
                                </ThemedText>
                              </Pressable>
                            ))}
                          </ScrollView>
                        </ThemedView>
                      </Pressable>
                    </Modal>
                  </ThemedView>
                )}
              />
              {step1Form.formState.errors.motherDepartment && (
                <ThemedText variant="error" size="xs" style={styles.errorText}>
                  {step1Form.formState.errors.motherDepartment.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Groupe sanguin (optionnel) */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText size="sm" weight="medium" style={styles.label}>
                {t('hospital.pregnancy.motherBloodGroup')} ({t('common.optional')})
              </ThemedText>
              <ThemedText variant="secondary" size="xs" style={styles.helpText}>
                {t('hospital.pregnancy.bloodGroupHelp')}
              </ThemedText>
              <Controller
                control={step1Form.control}
                name="motherBloodGroup"
                render={({ field: { onChange, value } }) => (
                  <ThemedView variant="transparent" style={styles.pickerContainer}>
                    <Pressable
                      style={{
                        ...styles.pickerButton,
                        borderColor: theme.colors.border,
                        backgroundColor: theme.colors.surface,
                      }}
                      onPress={() => setShowBloodGroupModal(true)}
                    >
                      <ThemedText
                        style={{
                          ...styles.pickerText,
                          ...(!value && { color: theme.colors.textSecondary }),
                        }}
                      >
                        {value || t('hospital.pregnancy.motherBloodGroup')}
                      </ThemedText>
                      <FontAwesome name="chevron-down" size={16} color={theme.colors.textSecondary} />
                    </Pressable>

                    {/* Modal pour sélectionner le groupe sanguin */}
                    <Modal
                      visible={showBloodGroupModal}
                      transparent
                      animationType="slide"
                      onRequestClose={() => setShowBloodGroupModal(false)}
                    >
                      <Pressable
                        style={styles.modalOverlay}
                        onPress={() => setShowBloodGroupModal(false)}
                      >
                        <ThemedView style={styles.modalContent}>
                          <ThemedView variant="transparent" style={styles.modalHeader}>
                            <ThemedView variant="transparent" style={styles.modalHeaderText}>
                              <ThemedText size="lg" weight="bold" style={styles.modalTitle}>
                                {t('hospital.pregnancy.motherBloodGroup')}
                              </ThemedText>
                              <ThemedText variant="secondary" size="sm" style={styles.modalSubtitle}>
                                {t('hospital.pregnancy.bloodGroupHelp')}
                              </ThemedText>
                            </ThemedView>
                            <Pressable
                              onPress={() => setShowBloodGroupModal(false)}
                              style={styles.modalCloseButton}
                            >
                              <FontAwesome name="times" size={20} color={theme.colors.text} />
                            </Pressable>
                          </ThemedView>
                          
                          <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={true}>
                            {BLOOD_GROUPS.map((group) => (
                              <Pressable
                                key={group}
                                style={[
                                  styles.modalOption,
                                  {
                                    backgroundColor: value === group 
                                      ? theme.colors.primary + '20' 
                                      : theme.colors.surface,
                                    borderColor: value === group 
                                      ? theme.colors.primary 
                                      : theme.colors.border,
                                  }
                                ]}
                                onPress={() => {
                                  onChange(group);
                                  setShowBloodGroupModal(false);
                                }}
                              >
                                <ThemedText
                                  size="base"
                                  weight={value === group ? 'semibold' : 'normal'}
                                  style={{
                                    color: value === group ? theme.colors.primary : theme.colors.text,
                                  }}
                                >
                                  {group}
                                </ThemedText>
                              </Pressable>
                            ))}
                          </ScrollView>
                        </ThemedView>
                      </Pressable>
                    </Modal>
                  </ThemedView>
                )}
              />
            </ThemedView>
          </ThemedCard>
        )}

        {/* Étape 2 : Informations de grossesse */}
        {currentStep === 2 && (
          <ThemedCard style={styles.formCard}>
            <ThemedView variant="transparent" style={styles.cardHeader}>
              <FontAwesome
                name="heart"
                size={24}
                color={theme.colors.success}
                style={styles.cardIcon}
              />
              <ThemedText size="lg" weight="semibold" style={styles.cardTitle}>
                {t('hospital.pregnancy.step2Title')}
              </ThemedText>
            </ThemedView>

            {/* Date prévue d'accouchement - Date complète */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText size="sm" weight="medium" style={styles.label}>
                {t('hospital.pregnancy.estimatedDeliveryFull')} *
              </ThemedText>
              <Controller
                control={step2Form.control}
                name="estimatedDeliveryDate"
                render={({ field: { onChange, onBlur, value } }) => (
                  <DateInput
                    placeholder="JJ/MM/AAAA"
                    value={value || ''}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={step2Form.formState.errors.estimatedDeliveryDate ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    style={styles.input}
                    mode="date"
                    minimumDate={new Date()} // Pas de date passée
                  />
                )}
              />
              <ThemedText variant="secondary" size="xs" style={styles.helpText}>
                {t('hospital.pregnancy.estimatedDeliveryFull')}
              </ThemedText>
            </ThemedView>

            {/* Date prévue d'accouchement - Mois seulement */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText size="sm" weight="medium" style={styles.label}>
                {t('hospital.pregnancy.estimatedDeliveryMonth')} *
              </ThemedText>
              <Controller
                control={step2Form.control}
                name="estimatedDeliveryMonth"
                render={({ field: { onChange, onBlur, value } }) => (
                  <DateInput
                    placeholder="MM/AAAA"
                    value={value || ''}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={step2Form.formState.errors.estimatedDeliveryMonth ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    style={styles.input}
                    mode="month"
                    minimumDate={new Date()} // Pas de date passée
                  />
                )}
              />
              <ThemedText variant="secondary" size="xs" style={styles.helpText}>
                {t('hospital.pregnancy.estimatedDeliveryMonth')}
              </ThemedText>
              {step2Form.formState.errors.estimatedDeliveryDate && (
                <ThemedText variant="error" size="xs" style={styles.errorText}>
                  {step2Form.formState.errors.estimatedDeliveryDate.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Quantité de grossesses déjà vécues */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText size="sm" weight="medium" style={styles.label}>
                {t('hospital.pregnancy.pregnancyCount')} *
              </ThemedText>
              <ThemedText variant="secondary" size="xs" style={styles.helpText}>
                {t('hospital.pregnancy.pregnancyCountHelp')}
              </ThemedText>
              <Controller
                control={step2Form.control}
                name="pregnancyCount"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder="Ex: 1, 2, 3..."
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    variant={step2Form.formState.errors.pregnancyCount ? 'error' : 'default'}
                    size="md"
                    fullWidth
                    keyboardType="numeric"
                    style={styles.input}
                  />
                )}
              />
              {step2Form.formState.errors.pregnancyCount && (
                <ThemedText variant="error" size="xs" style={styles.errorText}>
                  {step2Form.formState.errors.pregnancyCount.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Condition de santé (optionnel) */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText size="sm" weight="medium" style={styles.label}>
                {t('hospital.pregnancy.healthCondition')} ({t('common.optional')})
              </ThemedText>
              <ThemedText variant="secondary" size="xs" style={styles.helpText}>
                {t('hospital.pregnancy.healthConditionNote')}
              </ThemedText>
              <Controller
                control={step2Form.control}
                name="healthCondition"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t('hospital.pregnancy.healthCondition')}
                    value={value || ''}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    size="md"
                    fullWidth
                    multiline
                    numberOfLines={3}
                    style={{ ...styles.input, ...styles.multilineInput }}
                  />
                )}
              />
            </ThemedView>

            {/* Note (optionnelle) */}
            <ThemedView variant="transparent" style={styles.inputContainer}>
              <ThemedText size="sm" weight="medium" style={styles.label}>
                {t('hospital.pregnancy.notes')} ({t('common.optional')})
              </ThemedText>
              <Controller
                control={step2Form.control}
                name="notes"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t('hospital.pregnancy.notes')}
                    value={value || ''}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    size="md"
                    fullWidth
                    multiline
                    numberOfLines={4}
                    style={{ ...styles.input, ...styles.multilineInput }}
                  />
                )}
              />
            </ThemedView>
          </ThemedCard>
        )}

        {/* Boutons d'action */}
        <ThemedView style={styles.actionsContainer}>
          {currentStep === 1 ? (
            <PressableButton
              variant="primary"
              size="lg"
              fullWidth
              onPress={step1Form.handleSubmit(handleStep1Next)}
              disabled={!step1Form.formState.isValid}
              accessibilityLabel={t('hospital.pregnancy.next')}
              style={styles.button}
            >
              {t('hospital.pregnancy.next')}
            </PressableButton>
          ) : (
            <ThemedView variant="transparent" style={styles.twoButtonsRow}>
              <PressableButton
                variant="outline"
                size="lg"
                onPress={handleStep2Back}
                accessibilityLabel={t('common.cancel')}
                style={{ ...styles.button, ...styles.buttonHalf }}
              >
                {t('common.cancel')}
              </PressableButton>
              <PressableButton
                variant="primary"
                size="lg"
                onPress={step2Form.handleSubmit(handleSubmit)}
                disabled={!step2Form.formState.isValid}
                accessibilityLabel={t('hospital.pregnancy.register')}
                style={{ ...styles.button, ...styles.buttonHalf }}
              >
                {t('hospital.pregnancy.register')}
              </PressableButton>
            </ThemedView>
          )}
        </ThemedView>
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
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    marginBottom: 4,
  },
  headerSubtitle: {
    lineHeight: 18,
  },
  stepIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  stepText: {
    textAlign: 'center',
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Espace pour la navigation en bas
  },
  scrollContentTablet: {
    paddingHorizontal: 32,
    maxWidth: 800,
    alignSelf: 'center',
  },
  formCard: {
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  cardIcon: {
    marginRight: 4,
  },
  cardTitle: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  helpText: {
    marginBottom: 8,
    fontStyle: 'italic',
  },
  input: {
    marginBottom: 4,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  firstNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    width: '100%',
  },
  firstNameRowInput: {
    flex: 1,
    minWidth: 0,
    marginBottom: 0,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  removeButton: {
    padding: 8,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 32,
    minHeight: 32,
  },
  errorText: {
    marginTop: 4,
    marginLeft: 4,
  },
  pickerContainer: {
    marginBottom: 4,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 48,
  },
  pickerText: {
    flex: 1,
  },
  actionsContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  twoButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    marginBottom: 12,
  },
  buttonHalf: {
    flex: 1,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  modalHeaderText: {
    flex: 1,
  },
  modalTitle: {
    marginBottom: 4,
  },
  modalSubtitle: {
    marginBottom: 4,
  },
  modalCloseButton: {
    padding: 8,
    borderRadius: 8,
  },
  modalScrollView: {
    maxHeight: 400,
  },
  modalOption: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    alignItems: 'center',
  },
});
