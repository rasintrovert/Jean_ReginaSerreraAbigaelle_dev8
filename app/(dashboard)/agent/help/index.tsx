import {
    ThemedButton,
    ThemedCard,
    ThemedText,
    ThemedView
} from '@/components/ThemedComponents';
import { useResponsive } from '@/hooks/useResponsive';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/theme';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet } from 'react-native';

export default function HelpScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { isTablet } = useResponsive();
  const t = useTranslation();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const contactSupport = () => {
    Alert.alert(
      t('agent.help.contactSupport'),
      t('agent.help.contactSupportDesc'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { 
          text: t('agent.help.email'), 
          onPress: () => Linking.openURL('mailto:support@graceregistry.ht')
        },
        { 
          text: t('agent.help.phone'), 
          onPress: () => Linking.openURL('tel:+50912345678')
        },
      ]
    );
  };

  const helpSections = [
    {
      id: 'getting-started',
      title: t('agent.help.gettingStarted'),
      icon: 'play-circle' as const,
      color: theme.colors.primary,
      content: [
        {
          subtitle: t('agent.help.login'),
          steps: [
            t('agent.help.login') + ' - ' + t('agent.help.gettingStarted'),
            t('agent.help.login') + ' - ' + t('agent.help.gettingStarted'),
            t('agent.help.login') + ' - ' + t('agent.help.gettingStarted'),
            t('agent.help.login') + ' - ' + t('agent.help.gettingStarted')
          ]
        },
        {
          subtitle: t('agent.help.navigation'),
          steps: [
            t('agent.help.navigation') + ' - ' + t('agent.help.gettingStarted'),
            t('agent.help.navigation') + ' - ' + t('agent.help.gettingStarted'),
            t('agent.help.navigation') + ' - ' + t('agent.help.gettingStarted'),
            t('agent.help.navigation') + ' - ' + t('agent.help.gettingStarted')
          ]
        }
      ]
    },
    {
      id: 'pregnancy-registration',
      title: t('agent.help.pregnancyRegistration'),
      icon: 'heart' as const,
      color: theme.colors.success,
      content: [
        {
          subtitle: t('agent.help.requiredInfo'),
          steps: [
            t('agent.help.requiredInfo') + ' - ' + t('agent.help.pregnancyRegistration'),
            t('agent.help.requiredInfo') + ' - ' + t('agent.help.pregnancyRegistration'),
            t('agent.help.requiredInfo') + ' - ' + t('agent.help.pregnancyRegistration'),
            t('agent.help.requiredInfo') + ' - ' + t('agent.help.pregnancyRegistration'),
            t('agent.help.requiredInfo') + ' - ' + t('agent.help.pregnancyRegistration'),
            t('agent.help.requiredInfo') + ' - ' + t('agent.help.pregnancyRegistration')
          ]
        },
        {
          subtitle: t('agent.help.proof'),
          steps: [
            t('agent.help.proof') + ' - ' + t('agent.help.pregnancyRegistration'),
            t('agent.help.proof') + ' - ' + t('agent.help.pregnancyRegistration'),
            t('agent.help.proof') + ' - ' + t('agent.help.pregnancyRegistration'),
            t('agent.help.proof') + ' - ' + t('agent.help.pregnancyRegistration'),
            t('agent.help.proof') + ' - ' + t('agent.help.pregnancyRegistration')
          ]
        }
      ]
    },
    {
      id: 'birth-registration',
      title: t('agent.help.birthRegistration'),
      icon: 'child' as const,
      color: theme.colors.primary,
      content: [
        {
          subtitle: t('agent.help.babyInfo'),
          steps: [
            t('agent.help.babyInfo') + ' - ' + t('agent.help.birthRegistration'),
            t('agent.help.babyInfo') + ' - ' + t('agent.help.birthRegistration'),
            t('agent.help.babyInfo') + ' - ' + t('agent.help.birthRegistration'),
            t('agent.help.babyInfo') + ' - ' + t('agent.help.birthRegistration')
          ]
        },
        {
          subtitle: t('agent.help.parentsInfo'),
          steps: [
            t('agent.help.parentsInfo') + ' - ' + t('agent.help.birthRegistration'),
            t('agent.help.parentsInfo') + ' - ' + t('agent.help.birthRegistration'),
            t('agent.help.parentsInfo') + ' - ' + t('agent.help.birthRegistration')
          ]
        },
        {
          subtitle: t('agent.help.medicalInfo'),
          steps: [
            t('agent.help.medicalInfo') + ' - ' + t('agent.help.birthRegistration'),
            t('agent.help.medicalInfo') + ' - ' + t('agent.help.birthRegistration'),
            t('agent.help.medicalInfo') + ' - ' + t('agent.help.birthRegistration')
          ]
        },
        {
          subtitle: t('agent.help.linkPregnancy'),
          steps: [
            t('agent.help.linkPregnancy') + ' - ' + t('agent.help.birthRegistration'),
            t('agent.help.linkPregnancy') + ' - ' + t('agent.help.birthRegistration'),
            t('agent.help.linkPregnancy') + ' - ' + t('agent.help.birthRegistration')
          ]
        }
      ]
    },
    {
      id: 'emergency-procedures',
      title: t('agent.help.emergencyProcedures'),
      icon: 'exclamation-triangle' as const,
      color: theme.colors.error,
      content: [
        {
          subtitle: t('agent.help.medicalEmergency'),
          steps: [
            t('agent.help.medicalEmergency') + ' - ' + t('agent.help.emergencyProcedures'),
            t('agent.help.medicalEmergency') + ' - ' + t('agent.help.emergencyProcedures'),
            t('agent.help.medicalEmergency') + ' - ' + t('agent.help.emergencyProcedures'),
            t('agent.help.medicalEmergency') + ' - ' + t('agent.help.emergencyProcedures'),
            t('agent.help.medicalEmergency') + ' - ' + t('agent.help.emergencyProcedures')
          ]
        },
        {
          subtitle: t('agent.help.reporting'),
          steps: [
            t('agent.help.reporting') + ' - ' + t('agent.help.emergencyProcedures'),
            t('agent.help.reporting') + ' - ' + t('agent.help.emergencyProcedures'),
            t('agent.help.reporting') + ' - ' + t('agent.help.emergencyProcedures'),
            t('agent.help.reporting') + ' - ' + t('agent.help.emergencyProcedures'),
            t('agent.help.reporting') + ' - ' + t('agent.help.emergencyProcedures')
          ]
        }
      ]
    },
    {
      id: 'history-management',
      title: t('agent.help.historyManagement'),
      icon: 'history' as const,
      color: theme.colors.secondary,
      content: [
        {
          subtitle: t('agent.help.consultation'),
          steps: [
            t('agent.help.consultation') + ' - ' + t('agent.help.historyManagement'),
            t('agent.help.consultation') + ' - ' + t('agent.help.historyManagement'),
            t('agent.help.consultation') + ' - ' + t('agent.help.historyManagement'),
            t('agent.help.consultation') + ' - ' + t('agent.help.historyManagement')
          ]
        },
        {
          subtitle: t('agent.help.status'),
          steps: [
            t('agent.help.status') + ' - ' + t('agent.help.historyManagement'),
            t('agent.help.status') + ' - ' + t('agent.help.historyManagement'),
            t('agent.help.status') + ' - ' + t('agent.help.historyManagement'),
            t('agent.help.status') + ' - ' + t('agent.help.historyManagement')
          ]
        },
        {
          subtitle: t('agent.help.actions'),
          steps: [
            t('agent.help.actions') + ' - ' + t('agent.help.historyManagement'),
            t('agent.help.actions') + ' - ' + t('agent.help.historyManagement'),
            t('agent.help.actions') + ' - ' + t('agent.help.historyManagement'),
            t('agent.help.actions') + ' - ' + t('agent.help.historyManagement')
          ]
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: t('agent.help.troubleshooting'),
      icon: 'wrench' as const,
      color: theme.colors.warning,
      content: [
        {
          subtitle: t('agent.help.connectionProblems'),
          steps: [
            t('agent.help.connectionProblems') + ' - ' + t('agent.help.troubleshooting'),
            t('agent.help.connectionProblems') + ' - ' + t('agent.help.troubleshooting'),
            t('agent.help.connectionProblems') + ' - ' + t('agent.help.troubleshooting'),
            t('agent.help.connectionProblems') + ' - ' + t('agent.help.troubleshooting')
          ]
        },
        {
          subtitle: t('agent.help.inputErrors'),
          steps: [
            t('agent.help.inputErrors') + ' - ' + t('agent.help.troubleshooting'),
            t('agent.help.inputErrors') + ' - ' + t('agent.help.troubleshooting'),
            t('agent.help.inputErrors') + ' - ' + t('agent.help.troubleshooting'),
            t('agent.help.inputErrors') + ' - ' + t('agent.help.troubleshooting')
          ]
        },
        {
          subtitle: t('agent.help.proofProblems'),
          steps: [
            t('agent.help.proofProblems') + ' - ' + t('agent.help.troubleshooting'),
            t('agent.help.proofProblems') + ' - ' + t('agent.help.troubleshooting'),
            t('agent.help.proofProblems') + ' - ' + t('agent.help.troubleshooting'),
            t('agent.help.proofProblems') + ' - ' + t('agent.help.troubleshooting')
          ]
        }
      ]
    }
  ];

  const quickActions = [
    {
      title: t('agent.help.quickGuide'),
      description: t('agent.help.quickGuideDesc'),
      icon: 'book' as const,
      color: theme.colors.info,
      action: () => Alert.alert(t('agent.help.quickGuide'), t('common.comingSoon')),
    },
    {
      title: t('agent.help.faq'),
      description: t('agent.help.faqDesc'),
      icon: 'question-circle' as const,
      color: theme.colors.warning,
      action: () => Alert.alert(t('agent.help.faq'), t('common.comingSoon')),
    },
    {
      title: t('agent.help.contactSupport'),
      description: t('agent.help.contactSupportDesc'),
      icon: 'phone' as const,
      color: theme.colors.success,
      action: contactSupport,
    },
    {
      title: t('agent.help.reportBug'),
      description: t('agent.help.reportBugDesc'),
      icon: 'bug' as const,
      color: theme.colors.error,
      action: () => Alert.alert(t('agent.help.reportBug'), t('common.comingSoon')),
    },
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
              name="question-circle" 
              size={isTablet ? 40 : 32} 
              color={theme.colors.warning} 
            />
            <ThemedView variant="transparent" style={styles.headerText}>
              <ThemedText 
                size="xl" 
                weight="bold" 
                style={styles.title}
                accessibilityLabel={t('agent.help.title')}
              >
                {t('agent.help.title')}
              </ThemedText>
              <ThemedText 
                variant="secondary" 
                size="sm"
                accessibilityLabel={t('agent.help.subtitle')}
              >
                {t('agent.help.subtitle')}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedCard>

        {/* Actions rapides */}
        <ThemedCard style={styles.quickActionsCard}>
          <ThemedText 
            size="lg" 
            weight="semibold" 
            style={styles.sectionTitle}
            accessibilityLabel={t('agent.help.quickActions')}
          >
            {t('agent.help.quickActions')}
          </ThemedText>
          
          <ThemedView variant="transparent" style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <ThemedButton
                key={index}
                variant="outline"
                style={{ ...styles.quickActionButton, borderColor: action.color }}
                onPress={action.action}
                accessibilityLabel={action.title}
                accessibilityHint={action.description}
              >
                <ThemedView variant="transparent" style={styles.quickActionContent}>
                  <FontAwesome 
                    name={action.icon} 
                    size={20} 
                    color={action.color} 
                  />
                  <ThemedView variant="transparent" style={styles.quickActionText}>
                    <ThemedText 
                      size="sm" 
                      weight="semibold"
                      style={{ color: action.color }}
                    >
                      {action.title}
                    </ThemedText>
                    <ThemedText 
                      variant="secondary" 
                      size="xs"
                      style={styles.quickActionDescription}
                    >
                      {action.description}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
              </ThemedButton>
            ))}
          </ThemedView>
        </ThemedCard>

        {/* Guide d'utilisation */}
        <ThemedCard style={styles.guideCard}>
          <ThemedText 
            size="lg" 
            weight="semibold" 
            style={styles.sectionTitle}
            accessibilityLabel={t('agent.help.usageGuide')}
          >
            {t('agent.help.usageGuide')}
          </ThemedText>
          
          {helpSections.map((section) => (
            <ThemedView key={section.id} variant="transparent" style={styles.sectionContainer}>
              <ThemedButton
                variant="ghost"
                style={styles.sectionHeader}
                onPress={() => toggleSection(section.id)}
                accessibilityLabel={`Section ${section.title}`}
                accessibilityHint={expandedSections.has(section.id) ? 'Fermer la section' : 'Ouvrir la section'}
              >
                <ThemedView variant="transparent" style={styles.sectionHeaderContent}>
                  <FontAwesome 
                    name={section.icon} 
                    size={20} 
                    color={section.color} 
                    style={styles.sectionIcon}
                  />
                  <ThemedText 
                    size="base" 
                    weight="semibold" 
                    style={styles.sectionTitle}
                  >
                    {section.title}
                  </ThemedText>
                  <FontAwesome
                    name={expandedSections.has(section.id) ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    color={theme.colors.textSecondary}
                    style={styles.chevronIcon}
                  />
                </ThemedView>
              </ThemedButton>
              
              {expandedSections.has(section.id) && (
                <ThemedView variant="transparent" style={styles.sectionContent}>
                  {section.content.map((content, contentIndex) => (
                    <ThemedView key={contentIndex} variant="transparent" style={styles.contentBlock}>
                      <ThemedText 
                        size="sm" 
                        weight="semibold" 
                        style={styles.contentSubtitle}
                        accessibilityLabel={content.subtitle}
                      >
                        {content.subtitle}
                      </ThemedText>
                      {content.steps.map((step, stepIndex) => (
                        <ThemedView key={stepIndex} variant="transparent" style={styles.stepItem}>
                          <FontAwesome 
                            name="check-circle" 
                            size={12} 
                            color={section.color} 
                            style={styles.stepIcon}
                          />
                          <ThemedText 
                            variant="secondary" 
                            size="sm" 
                            style={styles.stepText}
                            accessibilityLabel={`Étape ${stepIndex + 1}: ${step}`}
                          >
                            {step}
                          </ThemedText>
                        </ThemedView>
                      ))}
                    </ThemedView>
                  ))}
                </ThemedView>
              )}
            </ThemedView>
          ))}
        </ThemedCard>

        {/* Informations de contact */}
        <ThemedCard style={styles.contactCard}>
          <ThemedText 
            size="lg" 
            weight="semibold" 
            style={styles.sectionTitle}
            accessibilityLabel={t('agent.help.needMoreHelp')}
          >
            {t('agent.help.needMoreHelp')}
          </ThemedText>
          
          <ThemedView variant="transparent" style={styles.contactInfo}>
            <ThemedView variant="transparent" style={styles.contactItem}>
              <FontAwesome 
                name="envelope" 
                size={16} 
                color={theme.colors.info} 
                style={styles.contactIcon}
              />
              <ThemedView variant="transparent" style={styles.contactText}>
                <ThemedText variant="secondary" size="sm">
                  {t('agent.help.contactEmail')}
                </ThemedText>
                <ThemedText size="sm" weight="medium">
                  support@graceregistry.ht
                </ThemedText>
              </ThemedView>
            </ThemedView>
            
            <ThemedView variant="transparent" style={styles.contactItem}>
              <FontAwesome 
                name="phone" 
                size={16} 
                color={theme.colors.success} 
                style={styles.contactIcon}
              />
              <ThemedView variant="transparent" style={styles.contactText}>
                <ThemedText variant="secondary" size="sm">
                  {t('agent.help.contactPhone')}
                </ThemedText>
                <ThemedText size="sm" weight="medium">
                  +509 1234 5678
                </ThemedText>
              </ThemedView>
            </ThemedView>
            
            <ThemedView variant="transparent" style={styles.contactItem}>
              <FontAwesome 
                name="clock-o" 
                size={16} 
                color={theme.colors.warning} 
                style={styles.contactIcon}
              />
              <ThemedView variant="transparent" style={styles.contactText}>
                <ThemedText variant="secondary" size="sm">
                  {t('agent.help.openingHours')}
                </ThemedText>
                <ThemedText size="sm" weight="medium">
                  {t('agent.help.openingHoursValue')}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
          
          <ThemedButton
            variant="primary"
            size="md"
            fullWidth
            onPress={contactSupport}
            accessibilityLabel={t('agent.help.contactSupportButton')}
            accessibilityHint={t('agent.help.contactSupportButton')}
            style={styles.contactButton}
          >
            <FontAwesome name="phone" size={16} color="#fff" />
            <ThemedText size="base" weight="semibold" style={{ color: '#fff', marginLeft: 8 }}>
              {t('agent.help.contactSupportButton')}
            </ThemedText>
          </ThemedButton>
        </ThemedCard>

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
  quickActionsCard: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  quickActionsGrid: {
    gap: 12,
  },
  quickActionButton: {
    padding: 0,
  },
  quickActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
  },
  quickActionText: {
    flex: 1,
  },
  quickActionDescription: {
    marginTop: 2,
  },
  guideCard: {
    marginBottom: 24,
  },
  sectionContainer: {
    marginBottom: 8,
  },
  sectionHeader: {
    padding: 0,
    backgroundColor: 'transparent',
  },
  sectionHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  sectionIcon: {
    marginRight: 4,
  },
  chevronIcon: {
    marginLeft: 'auto',
  },
  sectionContent: {
    paddingLeft: 36,
    paddingBottom: 16,
  },
  contentBlock: {
    marginBottom: 16,
  },
  contentSubtitle: {
    marginBottom: 8,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 4,
  },
  stepIcon: {
    marginTop: 2,
  },
  stepText: {
    flex: 1,
    lineHeight: 18,
  },
  contactCard: {
    marginBottom: 24,
  },
  contactInfo: {
    gap: 12,
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactIcon: {
    marginRight: 4,
  },
  contactText: {
    flex: 1,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  button: {
    marginBottom: 8,
  },
});
