import {
    ThemedButton,
    ThemedCard,
    ThemedText,
    ThemedView
} from '@/components/ThemedComponents';
import { useResponsive } from '@/hooks/useResponsive';
import { useTheme } from '@/theme';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet } from 'react-native';

export default function HelpScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { isTablet } = useResponsive();
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
      'Contacter le support',
      'Comment souhaitez-vous contacter le support ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Email', 
          onPress: () => Linking.openURL('mailto:support@graceregistry.ht')
        },
        { 
          text: 'Téléphone', 
          onPress: () => Linking.openURL('tel:+50912345678')
        },
      ]
    );
  };

  const helpSections = [
    {
      id: 'getting-started',
      title: 'Premiers pas',
      icon: 'play-circle' as const,
      color: theme.colors.primary,
      content: [
        {
          subtitle: 'Connexion à l\'application',
          steps: [
            'Sélectionnez votre rôle (Agent)',
            'Saisissez vos identifiants',
            'Choisissez votre langue préférée',
            'Sélectionnez le thème (clair/sombre/auto)'
          ]
        },
        {
          subtitle: 'Navigation dans l\'application',
          steps: [
            'Utilisez les onglets en bas pour naviguer',
            'Le tableau de bord affiche vos actions rapides',
            'Consultez l\'historique pour voir vos enregistrements',
            'Accédez au profil pour modifier vos paramètres'
          ]
        }
      ]
    },
    {
      id: 'pregnancy-registration',
      title: 'Enregistrement de grossesse',
      icon: 'heart' as const,
      color: theme.colors.success,
      content: [
        {
          subtitle: 'Informations requises',
          steps: [
            'Prénom et nom de la mère',
            'Date de naissance de la mère',
            'Numéro de contact (téléphone)',
            'Adresse complète',
            'Date prévue d\'accouchement',
            'Notes additionnelles (optionnel)'
          ]
        },
        {
          subtitle: 'Génération de preuve',
          steps: [
            'Remplissez tous les champs obligatoires',
            'Cliquez sur "Générer Preuve"',
            'Un QR code et PDF provisoire sont créés',
            'Remettez la preuve aux parents',
            'Le dossier sera validé par l\'administration'
          ]
        }
      ]
    },
    {
      id: 'birth-registration',
      title: 'Enregistrement de naissance',
      icon: 'baby' as const,
      color: theme.colors.primary,
      content: [
        {
          subtitle: 'Informations du bébé',
          steps: [
            'Prénom et nom de famille',
            'Sexe (masculin/féminin)',
            'Date et heure de naissance',
            'Lieu de naissance précis'
          ]
        },
        {
          subtitle: 'Informations des parents',
          steps: [
            'Prénom et nom de la mère (obligatoire)',
            'Prénom et nom du père (optionnel)',
            'Vérifiez l\'exactitude des informations'
          ]
        },
        {
          subtitle: 'Informations médicales',
          steps: [
            'Nom du médecin ou agent présent',
            'Nom et contact du témoin',
            'Notes médicales si nécessaire'
          ]
        },
        {
          subtitle: 'Liaison avec grossesse',
          steps: [
            'Utilisez le bouton "Lier" si disponible',
            'Recherchez par ID ou QR code',
            'Cela accélère le processus de validation'
          ]
        }
      ]
    },
    {
      id: 'emergency-procedures',
      title: 'Procédures d\'urgence',
      icon: 'exclamation-triangle' as const,
      color: theme.colors.error,
      content: [
        {
          subtitle: 'En cas d\'urgence médicale',
          steps: [
            'Appelez immédiatement les secours (114, 115, 116)',
            'Utilisez l\'écran Urgence de l\'application',
            'Décrivez la situation en détail',
            'Indiquez le lieu précis',
            'Restez avec la personne jusqu\'aux secours'
          ]
        },
        {
          subtitle: 'Signalement via l\'application',
          steps: [
            'Accédez à l\'écran Urgence',
            'Sélectionnez le type d\'urgence',
            'Choisissez le niveau de priorité',
            'Décrivez la situation',
            'Envoyez le signalement'
          ]
        }
      ]
    },
    {
      id: 'history-management',
      title: 'Gestion de l\'historique',
      icon: 'history' as const,
      color: theme.colors.secondary,
      content: [
        {
          subtitle: 'Consultation des enregistrements',
          steps: [
            'Accédez à l\'onglet Historique',
            'Utilisez les filtres par type et statut',
            'Recherchez par nom ou description',
            'Consultez les détails de chaque dossier'
          ]
        },
        {
          subtitle: 'Statuts des dossiers',
          steps: [
            'Brouillon : En cours de saisie',
            'Soumis : En attente de validation',
            'Validé : Approuvé par l\'administration',
            'Rejeté : Nécessite des corrections'
          ]
        },
        {
          subtitle: 'Actions disponibles',
          steps: [
            'Modifier les brouillons',
            'Générer des preuves pour les dossiers validés',
            'Consulter les preuves existantes',
            'Suivre l\'état de validation'
          ]
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Résolution de problèmes',
      icon: 'wrench' as const,
      color: theme.colors.warning,
      content: [
        {
          subtitle: 'Problèmes de connexion',
          steps: [
            'Vérifiez votre connexion Internet',
            'Redémarrez l\'application',
            'Vérifiez vos identifiants',
            'Contactez le support si le problème persiste'
          ]
        },
        {
          subtitle: 'Erreurs de saisie',
          steps: [
            'Vérifiez que tous les champs obligatoires sont remplis',
            'Assurez-vous du format des dates (JJ/MM/AAAA)',
            'Vérifiez le format des numéros de téléphone',
            'Les champs en rouge indiquent des erreurs'
          ]
        },
        {
          subtitle: 'Problèmes de génération de preuve',
          steps: [
            'Vérifiez que tous les champs sont corrects',
            'Assurez-vous d\'avoir une connexion Internet',
            'Réessayez après quelques minutes',
            'Contactez le support si nécessaire'
          ]
        }
      ]
    }
  ];

  const quickActions = [
    {
      title: 'Guide rapide',
      description: 'Tutoriel interactif',
      icon: 'book' as const,
      color: theme.colors.info,
      action: () => Alert.alert('Guide rapide', 'Fonctionnalité à venir'),
    },
    {
      title: 'FAQ',
      description: 'Questions fréquentes',
      icon: 'question-circle' as const,
      color: theme.colors.warning,
      action: () => Alert.alert('FAQ', 'Fonctionnalité à venir'),
    },
    {
      title: 'Contacter le support',
      description: 'Aide personnalisée',
      icon: 'phone' as const,
      color: theme.colors.success,
      action: contactSupport,
    },
    {
      title: 'Signaler un bug',
      description: 'Rapporter un problème',
      icon: 'bug' as const,
      color: theme.colors.error,
      action: () => Alert.alert('Signaler un bug', 'Fonctionnalité à venir'),
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
          <ThemedView style={styles.headerContent}>
            <FontAwesome 
              name="question-circle" 
              size={isTablet ? 40 : 32} 
              color={theme.colors.warning} 
            />
            <ThemedView style={styles.headerText}>
              <ThemedText 
                size="xl" 
                weight="bold" 
                style={styles.title}
                accessibilityLabel="Centre d'aide"
              >
                Centre d'aide
              </ThemedText>
              <ThemedText 
                variant="secondary" 
                size="sm"
                accessibilityLabel="Guide d'utilisation de l'application"
              >
                Guide d'utilisation et support
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
            accessibilityLabel="Actions rapides"
          >
            Actions rapides
          </ThemedText>
          
          <ThemedView style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <ThemedButton
                key={index}
                variant="outline"
                style={[styles.quickActionButton, { borderColor: action.color }]}
                onPress={action.action}
                accessibilityLabel={action.title}
                accessibilityHint={action.description}
              >
                <ThemedView style={styles.quickActionContent}>
                  <FontAwesome 
                    name={action.icon} 
                    size={20} 
                    color={action.color} 
                  />
                  <ThemedView style={styles.quickActionText}>
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
            accessibilityLabel="Guide d'utilisation"
          >
            Guide d'utilisation
          </ThemedText>
          
          {helpSections.map((section) => (
            <ThemedView key={section.id} style={styles.sectionContainer}>
              <ThemedButton
                variant="ghost"
                style={styles.sectionHeader}
                onPress={() => toggleSection(section.id)}
                accessibilityLabel={`Section ${section.title}`}
                accessibilityHint={expandedSections.has(section.id) ? 'Fermer la section' : 'Ouvrir la section'}
              >
                <ThemedView style={styles.sectionHeaderContent}>
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
                <ThemedView style={styles.sectionContent}>
                  {section.content.map((content, contentIndex) => (
                    <ThemedView key={contentIndex} style={styles.contentBlock}>
                      <ThemedText 
                        size="sm" 
                        weight="semibold" 
                        style={styles.contentSubtitle}
                        accessibilityLabel={content.subtitle}
                      >
                        {content.subtitle}
                      </ThemedText>
                      {content.steps.map((step, stepIndex) => (
                        <ThemedView key={stepIndex} style={styles.stepItem}>
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
            accessibilityLabel="Informations de contact"
          >
            Besoin d'aide supplémentaire ?
          </ThemedText>
          
          <ThemedView style={styles.contactInfo}>
            <ThemedView style={styles.contactItem}>
              <FontAwesome 
                name="envelope" 
                size={16} 
                color={theme.colors.info} 
                style={styles.contactIcon}
              />
              <ThemedView style={styles.contactText}>
                <ThemedText variant="secondary" size="sm">
                  Email
                </ThemedText>
                <ThemedText size="sm" weight="medium">
                  support@graceregistry.ht
                </ThemedText>
              </ThemedView>
            </ThemedView>
            
            <ThemedView style={styles.contactItem}>
              <FontAwesome 
                name="phone" 
                size={16} 
                color={theme.colors.success} 
                style={styles.contactIcon}
              />
              <ThemedView style={styles.contactText}>
                <ThemedText variant="secondary" size="sm">
                  Téléphone
                </ThemedText>
                <ThemedText size="sm" weight="medium">
                  +509 1234 5678
                </ThemedText>
              </ThemedView>
            </ThemedView>
            
            <ThemedView style={styles.contactItem}>
              <FontAwesome 
                name="clock-o" 
                size={16} 
                color={theme.colors.warning} 
                style={styles.contactIcon}
              />
              <ThemedView style={styles.contactText}>
                <ThemedText variant="secondary" size="sm">
                  Heures d'ouverture
                </ThemedText>
                <ThemedText size="sm" weight="medium">
                  Lun-Ven: 8h-17h
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
          
          <ThemedButton
            variant="primary"
            size="md"
            fullWidth
            onPress={contactSupport}
            accessibilityLabel="Contacter le support"
            accessibilityHint="Ouvre les options de contact"
            style={styles.contactButton}
          >
            <FontAwesome name="phone" size={16} color="#fff" />
            <ThemedText size="base" weight="semibold" style={{ color: '#fff', marginLeft: 8 }}>
              Contacter le support
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
            accessibilityLabel="Bouton retour"
            accessibilityHint="Retourne à l'écran précédent"
            style={styles.button}
          >
            Retour
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
