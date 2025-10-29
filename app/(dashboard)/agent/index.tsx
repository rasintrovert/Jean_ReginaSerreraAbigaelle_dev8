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
import { Modal, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function AgentDashboard() {
  const router = useRouter();
  const theme = useTheme();
  const { isTablet } = useResponsive();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'pregnancy':
        router.push('/(dashboard)/agent/pregnancy' as any);
        break;
      case 'birth':
        router.push('/(dashboard)/agent/birth' as any);
        break;
      case 'emergency':
        router.push('/(dashboard)/agent/emergency' as any);
        break;
      case 'history':
        router.push('/(dashboard)/agent/history' as any);
        break;
      case 'profile':
        router.push('/(dashboard)/agent/profile' as any);
        break;
      case 'help':
        router.push('/(dashboard)/agent/help' as any);
        break;
    }
  };

  const handleNotificationPress = () => {
    // TODO: Ouvrir les notifications
    console.log('Ouvrir notifications');
  };

  const handleSettingsPress = () => {
    router.push('/(dashboard)/agent/profile' as any);
  };

  const handleProofsPress = () => {
    router.push('/(dashboard)/agent/history' as any);
  };

  const handleHelpPress = () => {
    router.push('/(dashboard)/agent/help' as any);
  };

  const handleBottomNavPress = (section: string) => {
    switch (section) {
      case 'home':
        // Déjà sur l'accueil
        break;
      case 'history':
        router.push('/(dashboard)/agent/history' as any);
        break;
      case 'add':
        setShowAddModal(true);
        break;
      case 'emergency':
        router.push('/(dashboard)/agent/emergency' as any);
        break;
      case 'profile':
        router.push('/(dashboard)/agent/profile' as any);
        break;
    }
  };

  const handleAddOption = (option: 'pregnancy' | 'birth') => {
    setShowAddModal(false);
    if (option === 'pregnancy') {
      router.push('/(dashboard)/agent/pregnancy' as any);
    } else {
      router.push('/(dashboard)/agent/birth' as any);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.scrollContentTablet
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* 1️⃣ En-tête avec profil et icônes fonctionnelles */}
        <ThemedView style={styles.header}>
          <ThemedView style={styles.profileSection}>
            <ThemedView style={styles.profileIcon}>
              <FontAwesome 
                name="user-circle" 
                size={isTablet ? 50 : 40} 
                color={theme.colors.primary} 
              />
            </ThemedView>
            <ThemedView style={styles.profileText}>
              <ThemedText 
                size="lg" 
                weight="bold" 
                style={styles.welcomeText}
                accessibilityLabel="Bienvenue"
              >
                Byenveni
              </ThemedText>
              <ThemedText 
                size="base" 
                weight="semibold"
                style={styles.userName}
                accessibilityLabel="Nom de l'utilisateur"
              >
                Jean Dupont
              </ThemedText>
              <ThemedText 
                variant="secondary" 
                size="sm"
                style={styles.userRole}
                accessibilityLabel="Rôle de l'utilisateur"
              >
                Agent - Zone Sud
              </ThemedText>
            </ThemedView>
          </ThemedView>
          
          <ThemedView style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerIconButton}
              onPress={handleNotificationPress}
              accessibilityLabel="Notifications"
              accessibilityHint="Voir les notifications"
            >
              <FontAwesome 
                name="bell" 
                size={isTablet ? 24 : 20} 
                color={theme.colors.textSecondary} 
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerIconButton}
              onPress={handleSettingsPress}
              accessibilityLabel="Paramètres"
              accessibilityHint="Ouvrir les paramètres"
            >
              <FontAwesome 
                name="cog" 
                size={isTablet ? 24 : 20} 
                color={theme.colors.textSecondary} 
              />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        {/* 2️⃣ Section de titre principal */}
        <ThemedView style={styles.titleSection}>
          <ThemedText 
            size="xl" 
            weight="bold" 
            style={styles.mainTitle}
            accessibilityLabel="Actions rapides"
          >
            Aksyon Rapid
          </ThemedText>
          <ThemedView style={styles.connectionStatus}>
            <FontAwesome 
              name="wifi" 
              size={16} 
              color={theme.colors.success} 
            />
            <ThemedText 
              variant="secondary" 
              size="sm"
              style={styles.statusText}
              accessibilityLabel="État de connexion"
            >
              Sou Entènèt
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* 3️⃣ Bloc des actions principales */}
        <ThemedView style={styles.mainActionsContainer}>
          <TouchableOpacity
            style={styles.mainActionCard}
            onPress={() => handleQuickAction('pregnancy')}
            accessibilityLabel="Enregistrer Grossesse"
            accessibilityHint="Enregistrer une nouvelle grossesse"
          >
            <ThemedView style={{ ...styles.actionIconContainer, backgroundColor: theme.colors.success + '20' }}>
              <FontAwesome 
                name="heart" 
                size={isTablet ? 40 : 32} 
                color={theme.colors.success} 
              />
            </ThemedView>
            <ThemedText 
              size="base" 
              weight="semibold"
              style={styles.actionTitle}
            >
              Anrejistre Gwosès
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainActionCard}
            onPress={() => handleQuickAction('birth')}
            accessibilityLabel="Enregistrer Naissance"
            accessibilityHint="Enregistrer une nouvelle naissance"
          >
            <ThemedView style={{ ...styles.actionIconContainer, backgroundColor: theme.colors.primary + '20' }}>
              <FontAwesome 
                name="child" 
                size={isTablet ? 40 : 32} 
                color={theme.colors.primary} 
              />
            </ThemedView>
            <ThemedText 
              size="base" 
              weight="semibold"
              style={styles.actionTitle}
            >
              Anrejistre Nesans
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* 4️⃣ Bloc secondaire - Prèv Mwen yo */}
        <TouchableOpacity
          style={styles.secondaryCard}
          onPress={handleProofsPress}
          accessibilityLabel="Mes Preuves"
          accessibilityHint="Voir mes preuves générées"
        >
          <ThemedView style={styles.secondaryContent}>
            <ThemedView style={styles.secondaryIconContainer}>
              <FontAwesome 
                name="file-text-o" 
                size={isTablet ? 32 : 28} 
                color={theme.colors.info} 
              />
              <ThemedView style={styles.badge}>
                <ThemedText 
                  size="xs" 
                  weight="bold"
                  style={styles.badgeText}
                >
                  4
                </ThemedText>
              </ThemedView>
            </ThemedView>
            <ThemedView style={styles.secondaryText}>
              <ThemedText 
                size="lg" 
                weight="semibold"
                style={styles.secondaryTitle}
              >
                Prèv Mwen yo
              </ThemedText>
              <ThemedText 
                variant="secondary" 
                size="sm"
                style={styles.secondarySubtitle}
              >
                Preuves générées récemment
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </TouchableOpacity>

        {/* 5️⃣ Bloc informatif / message d'aide */}
        <ThemedCard style={styles.infoCard}>
          <ThemedView style={styles.infoContent}>
            <FontAwesome 
              name="info-circle" 
              size={20} 
              color={theme.colors.info} 
              style={styles.infoIcon}
            />
            <ThemedView style={styles.infoText}>
              <ThemedText 
                size="sm" 
                weight="medium"
                style={styles.infoMessage}
              >
                Ou ka anrejistre gwosès ak nesans, epi jenere prev provizwa pou paran yo.
              </ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedButton
            variant="outline"
            size="sm"
            onPress={handleHelpPress}
            accessibilityLabel="Aide"
            accessibilityHint="Ouvrir l'aide"
            style={styles.helpButton}
          >
            <FontAwesome name="question-circle" size={14} color={theme.colors.primary} />
            <ThemedText size="sm" style={{ color: theme.colors.primary, marginLeft: 6 }}>
              Èd
            </ThemedText>
          </ThemedButton>
        </ThemedCard>
      </ScrollView>

      {/* 6️⃣ Barre de navigation inférieure */}
      <ThemedView style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleBottomNavPress('home')}
          accessibilityLabel="Accueil"
          accessibilityHint="Retour à l'accueil"
        >
          <FontAwesome 
            name="home" 
            size={isTablet ? 24 : 20} 
            color={theme.colors.primary} 
          />
          <ThemedText 
            size="xs" 
            weight="medium"
            style={{ ...styles.navLabel, color: theme.colors.primary }}
          >
            Akèy
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleBottomNavPress('history')}
          accessibilityLabel="Historique"
          accessibilityHint="Voir l'historique"
        >
          <FontAwesome 
            name="history" 
            size={isTablet ? 24 : 20} 
            color={theme.colors.textSecondary} 
          />
          <ThemedText 
            variant="secondary" 
            size="xs" 
            weight="medium"
            style={styles.navLabel}
          >
            Istwa
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItemCenter}
          onPress={() => handleBottomNavPress('add')}
          accessibilityLabel="Ajouter"
          accessibilityHint="Ajouter un enregistrement"
        >
          <ThemedView style={styles.centerNavIcon}>
            <FontAwesome 
              name="plus" 
              size={isTablet ? 28 : 24} 
              color="#fff" 
            />
          </ThemedView>
          <ThemedText 
            size="xs" 
            weight="medium"
            style={{ ...styles.navLabel, color: theme.colors.primary }}
          >
            Ajoute
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleBottomNavPress('emergency')}
          accessibilityLabel="Urgence"
          accessibilityHint="Signaler une urgence"
        >
          <FontAwesome 
            name="exclamation-triangle" 
            size={isTablet ? 24 : 20} 
            color={theme.colors.error} 
          />
          <ThemedText 
            size="xs" 
            weight="medium"
            style={{ ...styles.navLabel, color: theme.colors.error }}
          >
            Ijans
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleBottomNavPress('profile')}
          accessibilityLabel="Profil"
          accessibilityHint="Ouvrir le profil"
        >
          <FontAwesome 
            name="user" 
            size={isTablet ? 24 : 20} 
            color={theme.colors.textSecondary} 
          />
          <ThemedText 
            variant="secondary" 
            size="xs" 
            weight="medium"
            style={styles.navLabel}
          >
            Pwofil
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Modal pour choisir le type d'enregistrement */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAddModal(false)}
      >
        <ThemedView style={styles.modalOverlay}>
          <ThemedView style={styles.modalContent}>
            <ThemedText 
              size="lg" 
              weight="bold" 
              style={styles.modalTitle}
            >
              Chwazi Tip Anrejistreman
            </ThemedText>
            <ThemedText 
              variant="secondary" 
              size="sm" 
              style={styles.modalSubtitle}
            >
              Chwazi sa ou vle anrejistre
            </ThemedText>
            
            <ThemedView style={styles.modalOptions}>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleAddOption('pregnancy')}
                accessibilityLabel="Enregistrer Grossesse"
                accessibilityHint="Ouvrir le formulaire d'enregistrement de grossesse"
              >
                <ThemedView style={{ ...styles.modalOptionIcon, backgroundColor: theme.colors.success + '20' }}>
                  <FontAwesome 
                    name="heart" 
                    size={isTablet ? 32 : 28} 
                    color={theme.colors.success} 
                  />
                </ThemedView>
                <ThemedView style={styles.modalOptionText}>
                  <ThemedText 
                    size="base" 
                    weight="semibold"
                    style={styles.modalOptionTitle}
                  >
                    Anrejistre Gwosès
                  </ThemedText>
                  <ThemedText 
                    variant="secondary" 
                    size="sm"
                    style={styles.modalOptionSubtitle}
                  >
                    Enregistrer une nouvelle grossesse
                  </ThemedText>
                </ThemedView>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleAddOption('birth')}
                accessibilityLabel="Enregistrer Naissance"
                accessibilityHint="Ouvrir le formulaire d'enregistrement de naissance"
              >
                <ThemedView style={{ ...styles.modalOptionIcon, backgroundColor: theme.colors.primary + '20' }}>
                  <FontAwesome 
                    name="child" 
                    size={isTablet ? 32 : 28} 
                    color={theme.colors.primary} 
                  />
                </ThemedView>
                <ThemedView style={styles.modalOptionText}>
                  <ThemedText 
                    size="base" 
                    weight="semibold"
                    style={styles.modalOptionTitle}
                  >
                    Anrejistre Nesans
                  </ThemedText>
                  <ThemedText 
                    variant="secondary" 
                    size="sm"
                    style={styles.modalOptionSubtitle}
                  >
                    Enregistrer une nouvelle naissance
                  </ThemedText>
                </ThemedView>
              </TouchableOpacity>
            </ThemedView>

            <ThemedButton
              variant="outline"
              size="md"
              onPress={() => setShowAddModal(false)}
              accessibilityLabel="Annuler"
              accessibilityHint="Fermer le menu"
              style={styles.modalCancelButton}
            >
              <FontAwesome name="times" size={14} color={theme.colors.textSecondary} />
              <ThemedText size="sm" style={{ color: theme.colors.textSecondary, marginLeft: 8 }}>
                Annuler
              </ThemedText>
            </ThemedButton>
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Espace pour la navigation inférieure
  },
  scrollContentTablet: {
    paddingHorizontal: 32,
    maxWidth: 800,
    alignSelf: 'center',
    paddingBottom: 120,
  },
  
  // 1️⃣ En-tête avec profil et icônes fonctionnelles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 4,
    marginBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(47, 149, 220, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileText: {
    flex: 1,
  },
  welcomeText: {
    marginBottom: 2,
  },
  userName: {
    marginBottom: 2,
  },
  userRole: {
    lineHeight: 16,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(108, 117, 125, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // 2️⃣ Section de titre principal
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  mainTitle: {
    flex: 1,
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    lineHeight: 16,
  },
  
  // 3️⃣ Bloc des actions principales
  mainActionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  mainActionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    textAlign: 'center',
    lineHeight: 20,
  },
  
  // 4️⃣ Bloc secondaire - Prèv Mwen yo
  secondaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondaryIconContainer: {
    position: 'relative',
    marginRight: 16,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#dc3545',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
  },
  secondaryText: {
    flex: 1,
  },
  secondaryTitle: {
    marginBottom: 4,
  },
  secondarySubtitle: {
    lineHeight: 16,
  },
  
  // 5️⃣ Bloc informatif / message d'aide
  infoCard: {
    marginBottom: 24,
    padding: 16,
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoIcon: {
    marginTop: 2,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
  },
  infoMessage: {
    lineHeight: 18,
  },
  helpButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  
  // 6️⃣ Barre de navigation inférieure
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingBottom: 20, // Espace pour le safe area
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemCenter: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  centerNavIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2f95dc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    shadowColor: '#2f95dc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  navLabel: {
    marginTop: 4,
    textAlign: 'center',
    lineHeight: 14,
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
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 18,
  },
  modalOptions: {
    gap: 16,
    marginBottom: 24,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  modalOptionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  modalOptionText: {
    flex: 1,
  },
  modalOptionTitle: {
    marginBottom: 4,
  },
  modalOptionSubtitle: {
    lineHeight: 16,
  },
  modalCancelButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});